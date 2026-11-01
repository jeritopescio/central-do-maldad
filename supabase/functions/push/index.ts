// Avisos al celu de la Central do Maldad (Web Push).
// Se despliega en Supabase como la función «push», sin verificación de JWT (la app no tiene login).
// Ops: key (clave pública), sub / unsub (suscripciones), notify (algo nuevo en la base), daily (cron de las 10).
// Los avisos se arman siempre con lo que hay en la base: nadie puede mandar textos inventados.
import * as webpush from "jsr:@negrel/webpush@0.5.0";
import { createClient } from "jsr:@supabase/supabase-js@2";

// La clave secreta la pone Supabase sola en la función (nombre viejo o nuevo, según el proyecto).
function secretKey() {
  const raw = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (raw) {
    try { const k = JSON.parse(raw); return typeof k === "string" ? k : k.default || Object.values(k)[0]; } catch { return raw.split(",")[0].trim(); }
  }
  return Deno.env.get("SUPABASE_SECRET_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
}
const secret = secretKey();
const db = createClient(Deno.env.get("SUPABASE_URL")!, secret as string, { auth: { persistSession: false } });

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const M: Record<string, string> = { jero: "Jero", mica: "Mica", fran: "Fran" };
const IDS = Object.keys(M);
const DOW = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], MON = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fmt = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); const x = new Date(Date.UTC(y, m - 1, d)); return `${DOW[x.getUTCDay()]} ${d} ${MON[m - 1]}`; };
const arDay = (plus = 0) => new Date(Date.now() - 3 * 3600e3 + plus * 864e5).toISOString().slice(0, 10); // hora argentina
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...CORS, "Content-Type": "application/json" } });

/* ---------- claves VAPID: se crean solas la primera vez y quedan en una tabla privada ---------- */
let server: webpush.ApplicationServer | null = null, pub = "";
async function app() {
  if (server) return server;
  let { data } = await db.from("push_keys").select("pub, jwk").eq("id", 1).maybeSingle();
  if (!data) {
    const kp = await webpush.generateVapidKeys({ extractable: true });
    const row = { id: 1, pub: await webpush.exportApplicationServerKey(kp), jwk: await webpush.exportVapidKeys(kp) };
    await db.from("push_keys").insert(row); // si otra llamada ganó, se usa la suya
    data = (await db.from("push_keys").select("pub, jwk").eq("id", 1).single()).data;
  }
  pub = data!.pub;
  server = await webpush.ApplicationServer.new({ contactInformation: "mailto:evvil.lml@gmail.com", vapidKeys: await webpush.importVapidKeys(data!.jwk) });
  return server;
}

/* ---------- mandar ---------- */
type Msg = { title: string; body: string; url?: string; tag?: string };
async function sendTo(subs: { endpoint: string; sub: webpush.PushSubscription }[], msg: Msg) {
  const as = await app();
  let n = 0;
  await Promise.all(subs.map(async (s) => {
    try { await as.subscribe(s.sub).pushTextMessage(JSON.stringify(msg), { ttl: 43200, urgency: webpush.Urgency.High } as webpush.PushMessageOptions); n++; }
    catch (e) {
      if (e instanceof webpush.PushMessageError && e.isGone()) await db.from("push_subs").delete().eq("endpoint", s.endpoint);
      else console.error("push", String(e));
    }
  }));
  return n;
}
async function send(members: string[], msg: Msg) {
  if (!members.length) return 0;
  const { data } = await db.from("push_subs").select("endpoint, sub").in("member", members);
  return sendTo(data || [], msg);
}
// Cada aviso sale una sola vez: la clave queda anotada.
async function once(key: string) { const { error } = await db.from("push_log").insert({ key }); return !error; }
async function item(id: string) {
  for (let i = 0; i < 4; i++) {
    const { data } = await db.from("items").select("data").eq("id", id).maybeSingle();
    if (data) return data.data;
    await new Promise((r) => setTimeout(r, 1500));
  }
  return null;
}

/* ---------- algo nuevo en la base ---------- */
async function notify(type: string, id: string, by: string) {
  if (!M[by] || !/^[\w-]{1,40}$/.test(id)) return 0;
  if (type === "task") {
    const t = await item("task:" + id); if (!t || t.done) return 0;
    const to = (t.who === "all" ? IDS : [t.who]).filter((i: string) => i !== by && M[i]);
    if (!to.length || !(await once(`task:${id}`))) return 0;
    return send(to, { title: `${M[by]} te cargó una quest`, body: `«${t.title}», para el ${fmt(t.due)}`, url: "./#misiones", tag: "task-" + id });
  }
  if (type === "event") {
    const e = await item("event:" + id); if (!e || !(await once(`event:${id}`))) return 0;
    return send(IDS.filter((i) => i !== by), { title: `${M[by]} agendó algo`, body: `${e.title} · ${fmt(e.date)}${e.time ? `, ${e.time} hs` : ""}`, url: "./#agenda", tag: "event-" + id });
  }
  if (type === "note") {
    const e = await item("event:" + id); if (!e) return 0;
    const n = (e.notes || []).filter((x: { who: string }) => x.who === by).sort((a: { at: number }, b: { at: number }) => b.at - a.at)[0];
    if (!n || Date.now() - n.at > 10 * 60e3 || !(await once(`note:${id}:${n.at}`))) return 0;
    return send(IDS.filter((i) => i !== by), { title: `Nota de ${M[by]} · ${e.title}`, body: n.text, url: "./#agenda", tag: "note-" + id });
  }
  return 0;
}

/* ---------- todos los días a las 10 ---------- */
async function daily() {
  const today = arDay(), tomorrow = arDay(1), monday = new Date(today + "T12:00:00Z").getUTCDay() === 1;
  const { data } = await db.from("items").select("kind, data").in("kind", ["task", "event", "call"]);
  const rows = data || [], of = (k: string) => rows.filter((r) => r.kind === k).map((r) => r.data);
  const tasks = of("task").filter((t) => !t.done), events = of("event"), calls = of("call");
  const evs = events.filter((e) => e.date === today || e.date === tomorrow).sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")))
    .map((e) => `${e.date === today ? "Hoy" : "Mañana"}${e.time ? ` ${e.time} hs` : ""}: ${e.title}`);
  const cl = calls.filter((c) => (c.status ?? 0) < 2 && c.close && c.close >= today && c.close <= arDay(3)).map((c) => `«${c.name}» cierra el ${fmt(c.close)}`);
  const show = events.find((e) => e.id === "e16"), left = show ? Math.round((Date.parse(show.date + "T12:00:00Z") - Date.parse(today + "T12:00:00Z")) / 864e5) : null;
  let n = 0;
  for (const m of IDS) {
    if (!(await once(`daily:${today}:${m}`))) continue;
    const mine = tasks.filter((t) => (t.who === m || t.who === "all") && (t.due === today || t.due === tomorrow))
      .map((t) => `${t.due === today ? "Hoy" : "Mañana"} vence «${t.title}»`);
    const lines = [...evs, ...mine, ...cl];
    if (monday) {
      const head = left !== null && left >= 0 ? `Faltan ${left} días para el tercer show. ` : "";
      n += await send([m], { title: "Arranca la semana en la Central", body: `${head}El parte está listo para mandar al grupo.${lines.length ? " " + lines.join(" · ") : ""}`, url: "./#parte", tag: "daily" });
    } else if (lines.length) {
      n += await send([m], { title: lines.length === 1 ? "Hoy en la Central" : `Hoy en la Central: ${lines.length} cosas`, body: lines.join(" · "), url: "./#hoy", tag: "daily" });
    }
  }
  return n;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "solo POST" }, 405);
  let b: Record<string, any> = {};
  try { b = await req.json(); } catch { return json({ error: "json" }, 400); }
  try {
    switch (b.op) {
      case "key": await app(); return json({ key: pub });
      case "sub": {
        const s = b.sub;
        if (!M[b.member] || !s || typeof s.endpoint !== "string" || !/^https:\/\//.test(s.endpoint) || !s.keys?.p256dh || !s.keys?.auth) return json({ error: "sub" }, 400);
        const { error } = await db.from("push_subs").upsert({ endpoint: s.endpoint, member: b.member, sub: { endpoint: s.endpoint, keys: s.keys }, updated_at: new Date().toISOString() });
        if (error) throw error;
        if (b.hello) await sendTo([{ endpoint: s.endpoint, sub: { endpoint: s.endpoint, keys: s.keys } }], { title: "Avisos activados", body: `Listo, ${M[b.member]}: los avisos de la Central llegan a este celu.`, url: "./#banda", tag: "hello" });
        return json({ ok: true });
      }
      case "unsub": if (typeof b.endpoint === "string") await db.from("push_subs").delete().eq("endpoint", b.endpoint); return json({ ok: true });
      case "notify": return json({ sent: await notify(String(b.type), String(b.id), String(b.by)) });
      case "daily": return json({ sent: await daily() });
      default: return json({ error: "op" }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});

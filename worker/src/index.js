// Alchemy log store. One KV entry per play: that play's full save, log included.
// The id in the path is the play's own id, so a player who starts over keeps their earlier logs.
//   PUT  /w/:world/:play            body = { player: {id, name}, state }   (from the game)
//   GET  /w/:world/:play            the stored save (future: restore on another phone)
//   GET  /dump?key=ADMIN_KEY        every save, for analysis
const CORS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,PUT,OPTIONS", "access-control-allow-headers": "content-type" };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...CORS } });

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/w\/([\w-]{1,32})\/([\w-]{1,64})$/);

    if (m && req.method === "PUT") {
      const text = await req.text();
      if (text.length > 1_000_000) return json({ error: "too big" }, 413);
      let body; try { body = JSON.parse(text); } catch { return json({ error: "bad json" }, 400); }
      const record = { world: m[1], player: body.player ?? { id: m[2] }, state: body.state, savedAt: Date.now() };
      await env.LOGS.put(`w/${m[1]}/${m[2]}`, JSON.stringify(record));
      return json({ ok: true });
    }
    if (m && req.method === "GET") {
      const v = await env.LOGS.get(`w/${m[1]}/${m[2]}`);
      return v ? new Response(v, { headers: { "content-type": "application/json", ...CORS } }) : json({ error: "not found" }, 404);
    }
    if (url.pathname === "/dump" && req.method === "GET") {
      if (url.searchParams.get("key") !== env.ADMIN_KEY) return json({ error: "no" }, 403);
      const out = [];
      let cursor;
      do {
        const page = await env.LOGS.list({ prefix: "w/", cursor });
        for (const k of page.keys) { const v = await env.LOGS.get(k.name); if (v) out.push(JSON.parse(v)); }
        cursor = page.list_complete ? undefined : page.cursor;
      } while (cursor);
      return json(out);
    }
    return json({ error: "not found" }, 404);
  },
};

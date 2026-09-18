// Reads a play log and prints the story of the session: timeline, streaks, stalls, hints, duds.
// Usage: node tools/analyze-log.mjs playlogs/x.json worlds/world1.js
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const log = JSON.parse(readFileSync(process.argv[2], "utf8"));
const world = (await import(pathToFileURL(resolve(process.argv[3] ?? "worlds/world1.js")).href)).default;
const byId = new Map(world.items.map((i) => [i.id, i]));
const N = (id) => byId.get(id)?.name ?? id;
const t0 = log.startedAt;
const mm = (t) => `${String(Math.floor((t - t0) / 60000)).padStart(2)}:${String(Math.floor(((t - t0) % 60000) / 1000)).padStart(2, "0")}`;

const events = log.log;
const tries = events.filter((e) => e.kind === "try");
const fresh = tries.filter((e) => !e.repeat);
const hits = fresh.filter((e) => e.result);
const duds = fresh.filter((e) => !e.result);
const hints = events.filter((e) => e.kind === "hint");

console.log(`session ${mm(log.finishedAt ?? events.at(-1).t)} to summit, ${mm(events.at(-1).t)} total`);
console.log(`${fresh.length} attempts: ${hits.length} hits, ${duds.length} duds (${Math.round(100 * hits.length / fresh.length)}% hit rate), ${tries.length - fresh.length} repeats, ${hints.length} hints`);

// timeline
console.log("\n--- timeline (hits and hints, gaps > 2 min marked) ---");
let last = t0;
for (const e of events) {
  const gap = (e.t - last) / 60000;
  if (gap > 2) console.log(`      … ${gap.toFixed(1)} min gap`);
  if (e.kind === "try" && e.result && !e.repeat) console.log(`${mm(e.t)}  ${N(e.a)} + ${N(e.b)} = ${N(e.result)}`);
  if (e.kind === "hint") console.log(`${mm(e.t)}  HINT ${e.type} ${N(e.target ?? e.from)}${e.revealed ? " → " + N(e.revealed) : ""}${e.partner ? " ↔ " + N(e.partner) : ""}${e.partner === null && e.type === "pairs" ? " (dead end)" : ""}${e.revealed === null && e.type === "leads" ? " (dead end)" : ""}`);
  last = e.t;
}

// duds per attempt between hits (how hard was each discovery)
console.log("\n--- duds before each hit ---");
let count = 0;
for (const e of fresh) {
  if (e.result) { console.log(`${String(count).padStart(3)}  ${N(e.result)}`); count = 0; } else count++;
}
if (count) console.log(`${String(count).padStart(3)}  (trailing, no hit)`);

// which item was hammered with duds
console.log("\n--- duds by item ---");
const dudBy = new Map();
for (const e of duds) for (const id of new Set([e.a, e.b])) dudBy.set(id, (dudBy.get(id) ?? 0) + 1);
for (const [id, n] of [...dudBy].sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(`${String(n).padStart(3)}  ${N(id)}`);

// duds tried more than once (strong expectation)
console.log("\n--- duds tried more than once ---");
const dudCount = new Map();
for (const e of tries.filter((e) => !e.result)) { const k = [e.a, e.b].sort().join("+"); dudCount.set(k, (dudCount.get(k) ?? 0) + 1); }
for (const [k, n] of [...dudCount].filter(([, n]) => n > 1)) console.log(`${n}x  ${k.split("+").map(N).join(" + ")}`);

// how each discovery was reached: guessed, or after a hint that pointed at it
console.log("\n--- how each discovery was found ---");
const hintedTargets = new Set(); const hintedRecipes = new Set(); const hintedPartners = new Set();
for (const e of events) {
  if (e.kind === "hint" && e.type === "recipe") hintedRecipes.add(e.target);
  if (e.kind === "hint" && e.type === "leads" && e.revealed) hintedTargets.add(e.revealed);
  if (e.kind === "hint" && e.type === "pairs" && e.partner) hintedPartners.add([e.from, e.partner].sort().join("+"));
  if (e.kind === "try" && e.result && !e.repeat) {
    const k = [e.a, e.b].sort().join("+");
    const how = hintedRecipes.has(e.result) ? "recipe given" : hintedPartners.has(k) ? "partner given" : hintedTargets.has(e.result) ? "name known" : "guessed";
    console.log(`${how.padEnd(14)} ${N(e.result)}`);
  }
}

// never found
const owned = new Set(log.owned);
console.log("\n--- never found ---");
for (const it of world.items) if (!owned.has(it.id)) console.log(`${it.name} = ${it.recipe.map(N).join(" + ")}`);

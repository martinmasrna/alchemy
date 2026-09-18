// Sanity checks for a world file: ids, recipes, reachability, summit, counts.
// Usage: node tools/check-world.mjs worlds/world1.js
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const file = process.argv[2] ?? "worlds/world1.js";
const world = (await import(pathToFileURL(resolve(file)).href)).default;

const byId = new Map(world.items.map((i) => [i.id, i]));
const errors = [];

// unique ids, valid recipes
const seen = new Set();
for (const it of world.items) {
  if (seen.has(it.id)) errors.push(`duplicate id ${it.id}`);
  seen.add(it.id);
  if (it.seed && it.recipe) errors.push(`${it.id} is both seed and recipe`);
  if (!it.seed && !it.recipe) errors.push(`${it.id} has no recipe and is not a seed`);
  if (it.recipe) {
    if (it.recipe.length !== 2) errors.push(`${it.id} recipe must have 2 ingredients`);
    for (const p of it.recipe) if (!byId.has(p)) errors.push(`${it.id} uses unknown ingredient ${p}`);
  }
  if (!it.blurb) errors.push(`${it.id} has no blurb`);
}
for (const s of world.seeds) if (!byId.get(s)?.seed) errors.push(`seed ${s} not marked seed`);
if (!byId.has(world.summit)) errors.push(`summit ${world.summit} missing`);

// one recipe per unordered pair
const pairKey = (a, b) => [a, b].sort().join("+");
const pairs = new Map();
for (const it of world.items) if (it.recipe) {
  const k = pairKey(...it.recipe);
  if (pairs.has(k)) errors.push(`pair ${k} makes both ${pairs.get(k)} and ${it.id}`);
  pairs.set(k, it.id);
}

// reachability by simulated play (combine everything owned until nothing new)
const owned = new Set(world.seeds);
let grew = true;
const depth = new Map(world.seeds.map((s) => [s, 0]));
while (grew) {
  grew = false;
  for (const it of world.items) if (it.recipe && !owned.has(it.id)) {
    const [a, b] = it.recipe;
    if (owned.has(a) && owned.has(b)) {
      owned.add(it.id);
      depth.set(it.id, Math.max(depth.get(a), depth.get(b)) + 1);
      grew = true;
    }
  }
}
for (const it of world.items) if (!owned.has(it.id)) errors.push(`${it.id} is unreachable`);

// dead ends (nothing uses them), excluding the summit
const used = new Set(world.items.flatMap((i) => i.recipe ?? []));
const deadEnds = world.items.filter((i) => !used.has(i.id) && i.id !== world.summit).map((i) => i.id);

// summit ancestors = critical path
const anc = new Set();
(function walk(id) { const it = byId.get(id); if (!it.recipe) return; for (const p of it.recipe) if (!anc.has(p)) { anc.add(p); walk(p); } })(world.summit);
const critical = [...anc].filter((id) => !byId.get(id).seed);

const discoveries = world.items.filter((i) => !i.seed).length;
console.log(`world: ${world.name}`);
console.log(`discoveries: ${discoveries} (seeds ${world.seeds.length}, summit ${world.summit}, depth ${depth.get(world.summit)})`);
console.log(`critical path (${critical.length}): ${critical.join(", ")}`);
console.log(`dead ends (${deadEnds.length}): ${deadEnds.join(", ")}`);
if (errors.length) { console.error("\nERRORS:\n - " + errors.join("\n - ")); process.exit(1); }
console.log("ok");

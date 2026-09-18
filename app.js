import world from "./worlds/world1.js";

// ---------- data ----------
const byId = new Map(world.items.map((i) => [i.id, i]));
const pairKey = (a, b) => [a, b].sort().join("+");
const recipes = new Map(); // pairKey -> result id
for (const it of world.items) if (it.recipe) recipes.set(pairKey(...it.recipe), it.id);
const children = (id) => world.items.filter((i) => i.recipe?.includes(id));
const discoveries = world.items.filter((i) => !i.seed);

// ---------- state ----------
const KEY = `alchemy.${world.id}`;
const fresh = () => ({
  owned: [...world.seeds],
  tried: [],              // pairKeys that produced nothing
  targets: [world.summit], // names the player knows exist
  recipesKnown: [],       // target ids whose recipe was revealed
  startedAt: Date.now(),
  finishedAt: null,
  log: [],                // { t, kind: "try"|"hint", ... }
});
let S = load();
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return { ...fresh(), ...JSON.parse(raw) }; } catch {}
  return fresh();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
const owned = () => new Set(S.owned);

// ---------- dom ----------
const $ = (id) => document.getElementById(id);
const el = { grid: $("grid"), targets: $("targets"), slotA: $("slotA"), slotB: $("slotB"), bench: $("bench"),
  hintLeads: $("hintLeads"), hintPairs: $("hintPairs"), count: $("count"), total: $("total"),
  toast: $("toast"), overlay: $("overlay"), reveal: $("reveal"), elapsed: $("elapsed") };

let selected = null; // id of first pick
let justMade = null; // id to animate

$("worldName").textContent = world.name;
document.title = `${world.name} · Alchemy`;
el.total.textContent = discoveries.length;

// ---------- rendering ----------
function render() {
  const own = owned();
  el.count.textContent = S.owned.filter((id) => !byId.get(id).seed).length;

  // targets
  el.targets.innerHTML = "";
  for (const tid of S.targets) {
    if (own.has(tid)) continue;
    const t = byId.get(tid);
    const chip = document.createElement("div");
    chip.className = "target" + (tid === world.summit ? " summit" : "");
    chip.innerHTML = `<span>${t.icon} ${t.name}</span>`;
    if (S.recipesKnown.includes(tid)) {
      const [a, b] = t.recipe.map((x) => byId.get(x));
      chip.innerHTML += `<span class="recipe">= ${a.icon} ${a.name} + ${b.icon} ${b.name}</span>`;
    } else {
      const btn = document.createElement("button");
      btn.textContent = "how?";
      btn.onclick = (e) => { e.stopPropagation(); revealRecipe(tid); };
      chip.appendChild(btn);
    }
    el.targets.appendChild(chip);
  }
  if (own.has(world.summit)) {
    const done = document.createElement("div");
    done.className = "target summit";
    done.innerHTML = `<span>${byId.get(world.summit).icon} ${byId.get(world.summit).name} — reached</span>`;
    el.targets.appendChild(done);
  }

  // bench
  const sel = selected ? byId.get(selected) : null;
  el.slotA.className = "slot" + (sel ? " filled" : "");
  el.slotA.innerHTML = sel ? `<span class="icon">${sel.icon}</span>${sel.name}` : "tap a card";
  el.slotB.className = "slot";
  el.slotB.textContent = sel ? "then another (or the same)" : "then another";
  el.hintLeads.disabled = el.hintPairs.disabled = !sel;

  // grid: seeds first, then in discovery order
  el.grid.innerHTML = "";
  for (const id of S.owned) {
    const it = byId.get(id);
    const card = document.createElement("div");
    card.className = "card";
    if (id === selected) card.classList.add("selected");
    if (selected) {
      const k = pairKey(selected, id);
      if (S.tried.includes(k)) card.classList.add("tried");
      else if (recipes.has(k) && own.has(recipes.get(k))) card.classList.add("made");
    }
    if (id === justMade) card.classList.add("new");
    card.innerHTML = `<div class="icon">${it.icon}</div><div class="name">${it.name}</div>`;
    card.onclick = () => pick(id);
    el.grid.appendChild(card);
  }
  justMade = null;
}

// ---------- play ----------
function pick(id) {
  if (!selected) { selected = id; render(); return; }
  combine(selected, id);
  selected = null;
}

function combine(a, b) {
  const k = pairKey(a, b);
  const result = recipes.get(k);
  const own = owned();
  if (result && !own.has(result)) {
    S.owned.push(result);
    S.log.push({ t: Date.now(), kind: "try", a, b, result });
    if (result === world.summit && !S.finishedAt) S.finishedAt = Date.now();
    justMade = result;
    save(); render();
    showReveal(result, a, b);
  } else if (result) {
    S.log.push({ t: Date.now(), kind: "try", a, b, result, repeat: true });
    save(); render();
    toast(`You already made ${byId.get(result).name} this way.`);
  } else {
    if (!S.tried.includes(k)) S.tried.push(k);
    S.log.push({ t: Date.now(), kind: "try", a, b, result: null });
    save(); render();
    el.bench.classList.remove("shake"); void el.bench.offsetWidth; el.bench.classList.add("shake");
    toast("Nothing happens.");
  }
}

function showReveal(id, a, b) {
  const it = byId.get(id);
  const isSummit = id === world.summit;
  const A = byId.get(a), B = byId.get(b);
  let stats = "";
  if (isSummit) {
    const mins = Math.round((S.finishedAt - S.startedAt) / 60000);
    const tries = S.log.filter((e) => e.kind === "try").length;
    const hints = S.log.filter((e) => e.kind === "hint").length;
    const found = S.owned.filter((x) => !byId.get(x).seed).length;
    stats = `<div class="stats">${mins} min · ${tries} attempts · ${hints} hints · ${found} of ${discoveries.length} found<br>World 2 is not built yet. You can keep exploring this one.</div>`;
  }
  el.reveal.className = "reveal" + (isSummit ? " summit" : "");
  el.reveal.innerHTML = `
    <div class="icon">${it.icon}</div>
    <h2>${it.name}</h2>
    <div class="made">${A.icon} ${A.name} + ${B.icon} ${B.name}</div>
    <p>${it.blurb}</p>
    <button id="closeReveal">${isSummit ? "Home." : "Go on"}</button>${stats}`;
  el.overlay.classList.add("show");
  $("closeReveal").onclick = closeReveal;
  el.overlay.onclick = (e) => { if (e.target === el.overlay) closeReveal(); };
}
function closeReveal() { el.overlay.classList.remove("show"); }

let toastTimer;
function toast(msg) {
  el.toast.textContent = msg; el.toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.toast.classList.remove("show"), 1400);
}

// ---------- hints (free for now) ----------
function addTarget(id) { if (!S.targets.includes(id) && !owned().has(id)) S.targets.push(id); }

function revealRecipe(tid) {
  const t = byId.get(tid);
  if (!S.recipesKnown.includes(tid)) S.recipesKnown.push(tid);
  for (const p of t.recipe) addTarget(p);
  S.log.push({ t: Date.now(), kind: "hint", type: "recipe", target: tid });
  save(); render();
}

el.hintLeads.onclick = () => {
  const own = owned();
  const cands = children(selected).filter((c) => !own.has(c.id) && !S.targets.includes(c.id));
  const known = children(selected).filter((c) => !own.has(c.id) && S.targets.includes(c.id));
  const name = byId.get(selected).name;
  if (cands.length) {
    const c = cands[Math.floor(Math.random() * cands.length)];
    addTarget(c.id);
    S.log.push({ t: Date.now(), kind: "hint", type: "leads", from: selected, revealed: c.id });
    toast(`${name} leads to ${c.name}.`);
  } else if (known.length) {
    toast(`${name} leads to ${known.map((c) => c.name).join(", ")}. You knew that.`);
  } else if (children(selected).length) {
    toast(`You've already made everything ${name} leads to.`);
  } else {
    S.log.push({ t: Date.now(), kind: "hint", type: "leads", from: selected, revealed: null });
    toast(`${name} leads nowhere further. A dead end.`);
  }
  selected = null; save(); render();
};

el.hintPairs.onclick = () => {
  const own = owned();
  const cands = children(selected).filter((c) => !own.has(c.id));
  const name = byId.get(selected).name;
  if (cands.length) {
    const c = cands[Math.floor(Math.random() * cands.length)];
    const partner = c.recipe[0] === selected ? c.recipe[1] : c.recipe[0];
    if (partner === selected) toast(`${name} goes with itself.`);
    else { addTarget(partner); toast(`${name} goes with ${byId.get(partner).name}.`); }
    S.log.push({ t: Date.now(), kind: "hint", type: "pairs", from: selected, partner });
  } else if (children(selected).length) {
    toast(`You've already made everything ${name} leads to.`);
  } else {
    S.log.push({ t: Date.now(), kind: "hint", type: "pairs", from: selected, partner: null });
    toast(`${name} goes with nothing. A dead end.`);
  }
  selected = null; save(); render();
};

// ---------- footer ----------
$("copyLog").onclick = async () => {
  const text = JSON.stringify({ world: world.id, ...S }, null, 0);
  try { await navigator.clipboard.writeText(text); toast("Play log copied."); }
  catch { prompt("Copy this:", text); }
};
$("reset").onclick = () => {
  if (!confirm("Start over? This wipes your progress in this world.")) return;
  S = fresh(); selected = null; save(); render();
};
setInterval(() => {
  const end = S.finishedAt ?? Date.now();
  el.elapsed.textContent = `${Math.floor((end - S.startedAt) / 60000)} min`;
}, 1000);

// ---------- pwa ----------
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

render();

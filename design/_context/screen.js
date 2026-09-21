// The game screen, built once and shared by every palette/type mockup, so the only thing
// that differs between siblings is CSS and the icon renderer. Class names match the real
// app, so a winning direction ports back as a stylesheet swap rather than a rewrite.
import { world, discovery } from "./fixture.js";

// Mid-game owned set. Black Hole and Solar System are in here on purpose: they are the
// longest names in world 1 and they are where a card layout breaks.
// tier is only read by directions that colour by depth; the others ignore it.
export const items = [
  { id: "energy", icon: "✨", name: "Energy", tier: "seed" },
  { id: "matter", icon: "⚛️", name: "Matter", tier: "seed" },
  { id: "space", icon: "⬛", name: "Space", tier: "seed" },
  { id: "time", icon: "⏳", name: "Time", tier: "seed" },
  { id: "particle", icon: "🔹", name: "Particle", tier: "cosmos" },
  { id: "light", icon: "💡", name: "Light", tier: "cosmos" },
  { id: "gravity", icon: "🌀", name: "Gravity", tier: "cosmos" },
  { id: "hydrogen", icon: "🎈", name: "Hydrogen", tier: "cosmos" },
  { id: "nebula", icon: "🌫️", name: "Nebula", tier: "cosmos" },
  { id: "star", icon: "⭐", name: "Star", tier: "cosmos" },
  { id: "helium", icon: "🎈", name: "Helium", tier: "cosmos" },
  { id: "carbon", icon: "⚫", name: "Carbon", tier: "cosmos" },
  { id: "oxygen", icon: "🫧", name: "Oxygen", tier: "cosmos" },
  { id: "blackhole", icon: "🕳️", name: "Black Hole", tier: "cosmos" },
  { id: "solarsystem", icon: "🪐", name: "Solar System", tier: "cosmos" },
  { id: "water", icon: "💧", name: "Water", tier: "world" },
];
const it = (id) => items.find((i) => i.id === id);

export const goalItem = { id: "earth", icon: "🌍", name: "Earth", tier: "world" };
// Recipes carry parts rather than a baked string, so a drawn set can render them too.
export const namedItems = [
  { id: "ocean", icon: "🌊", name: "Ocean", tier: "world", recipe: null },
  { id: "air", icon: "🌬️", name: "Air", tier: "world", recipe: [{ id: "volcano", icon: "🌋", name: "Volcano" }, it("gravity")] },
];

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

// Default renderer: the emoji, as the game ships today. A direction can pass its own.
let renderIcon = (item) => `<span class="i">${item.icon}</span>`;

function card(item, picked) {
  return `<div class="card${picked ? " picked" : ""}" data-tier="${item.tier}">
    <span class="well">${renderIcon(item)}</span><span class="n">${esc(item.name)}</span></div>`;
}

function slot(content, cls = "") {
  return `<div class="slot ${cls}">${content}</div>`;
}

function bench(state) {
  const filled = (item) => `${renderIcon(item)}<span class="n">${esc(item.name)}</span>`;
  if (state === "picked")
    return `<div class="row">${slot(filled(it("nebula")), "filled")}<div class="op">+</div>${slot(`<span class="ph">then another</span>`)}<div class="op">=</div>${slot(`<span class="ph">?</span>`, "result")}</div>`;
  if (state === "dud")
    return `<div class="row">${slot(filled(it("nebula")), "filled")}<div class="op">+</div>${slot(filled(it("gravity")), "filled")}<div class="op">=</div>${slot(`<span class="n">Nothing</span>`, "result dud")}</div>`;
  return `<div class="row">${slot(`<span class="ph">tap a card</span>`)}<div class="op">+</div>${slot(`<span class="ph">then another</span>`)}<div class="op">=</div>${slot(`<span class="ph">?</span>`, "result")}</div>`;
}

const inlineItem = (item) => `<span class="ii">${renderIcon(item)}<span>${esc(item.name)}</span></span>`;

function chips() {
  return namedItems
    .map((n) => {
      const body = `${renderIcon(n)}<span class="cn">${esc(n.name)}</span>`;
      return n.recipe
        ? `<div class="chip" data-tier="${n.tier}">${body}<span class="r">= ${n.recipe.map(inlineItem).join(" + ")}</span></div>`
        : `<div class="chip" data-tier="${n.tier}">${body}<button class="how">how? · 5</button></div>`;
    })
    .join("");
}

function squares(state) {
  return Array.from({ length: 15 }, (_, i) =>
    state === "picked" && i === 3 ? `<div class="sq armed">name? · 1</div>` : `<div class="sq">?</div>`,
  ).join("");
}

function overlay() {
  return `<div class="stage show"><div class="backdrop"></div><div class="who">
    <div class="pair">${inlineItem(it("nebula"))} + ${inlineItem(it("gravity"))}</div>
    <div class="bigicon">${renderIcon(it("star"))}</div>
    <div class="name">${esc(discovery.name)}</div>
    <div class="blurb">${esc(discovery.blurb)}</div>
    <div class="credit">+1 credit</div>
  </div></div>`;
}

// state: playing | picked | dud | discovery
export function screen(state) {
  const pickedId = state === "picked" || state === "dud" ? "nebula" : null;
  return `<div class="app">
    <header><h1>${esc(world.name)}</h1>
      <div class="meta"><span class="credits">⬡ ${world.credits}</span><span class="count">10 / ${world.total}</span></div>
    </header>
    <div class="goalrow"><div class="target summit" data-tier="${goalItem.tier}">${renderIcon(goalItem)}<span class="cn">${esc(goalItem.name)}</span><button class="how">how? · 5</button></div></div>
    <section class="bench">${bench(state)}</section>
    <div class="label">You have · ${items.length}</div>
    <div class="grid">${items.map((i) => card(i, i.id === pickedId)).join("")}</div>
    <div class="label">Undiscovered · 17</div>
    <div class="chips">${chips()}</div>
    <div class="squares">${squares(state)}</div>
    <footer><span>14 min</span><span class="acts"><button>Copy play log</button><button>Reset</button></span></footer>
    ${state === "discovery" ? overlay() : ""}
  </div>`;
}

const FRAMES = [
  ["playing", "Playing"],
  ["picked", "A card held, one square armed"],
  ["dud", "Nothing happens"],
  ["discovery", "A discovery"],
];

// opts.icon lets a direction swap the emoji for its own mark.
export function lab(title, idea, opts = {}) {
  if (opts.icon) renderIcon = opts.icon;
  document.title = title;
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="labhead"><h2>${esc(title)}</h2><p>${esc(idea)}</p></div>
     <div class="frames">${FRAMES.map(
       ([s, cap]) => `<figure class="frame"><div class="phone" data-state="${s}">${screen(s)}</div><figcaption>${esc(cap)}</figcaption></figure>`,
     ).join("")}</div>`,
  );
}

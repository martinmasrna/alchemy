// The game screen, built once and shared by every palette/type mockup, so the only
// thing that differs between siblings is CSS. Class names match the real app, so a
// winning direction ports back as a stylesheet swap rather than a rewrite.
import { world, goal, named, discovery } from "./fixture.js";

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

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const icon = (ch) => `<span class="i">${ch}</span>`;

function card(it, picked) {
  return `<div class="card${picked ? " picked" : ""}" data-tier="${it.tier}">
    <span class="well">${icon(it.icon)}</span><span class="n">${esc(it.name)}</span></div>`;
}

function slot(content, cls = "") {
  return `<div class="slot ${cls}">${content}</div>`;
}

function bench(state) {
  const empty = `<span class="ph">tap a card</span>`;
  const empty2 = `<span class="ph">then another</span>`;
  const filled = (it) => `${icon(it.icon)}<span class="n">${esc(it.name)}</span>`;
  const nebula = items.find((i) => i.id === "nebula");
  const gravity = items.find((i) => i.id === "gravity");
  if (state === "picked")
    return `<div class="row">${slot(filled(nebula), "filled")}<div class="op">+</div>${slot(empty2)}<div class="op">=</div>${slot(`<span class="ph">?</span>`, "result")}</div>`;
  if (state === "dud")
    return `<div class="row">${slot(filled(nebula), "filled")}<div class="op">+</div>${slot(filled(gravity), "filled")}<div class="op">=</div>${slot(`<span class="n">Nothing</span>`, "result dud")}</div>`;
  return `<div class="row">${slot(empty)}<div class="op">+</div>${slot(empty2)}<div class="op">=</div>${slot(`<span class="ph">?</span>`, "result")}</div>`;
}

function chips() {
  return named
    .map((n) =>
      n.recipe
        ? `<div class="chip">${icon(n.icon)}<span class="cn">${esc(n.name)}</span><span class="r">= ${esc(n.recipe)}</span></div>`
        : `<div class="chip">${icon(n.icon)}<span class="cn">${esc(n.name)}</span><button class="how">how? · 5</button></div>`,
    )
    .join("");
}

function squares(state) {
  const n = 15;
  return Array.from({ length: n }, (_, i) =>
    state === "picked" && i === 3 ? `<div class="sq armed">name? · 1</div>` : `<div class="sq">?</div>`,
  ).join("");
}

function overlay() {
  const nebula = items.find((i) => i.id === "nebula");
  const gravity = items.find((i) => i.id === "gravity");
  return `<div class="stage show"><div class="backdrop"></div><div class="who">
    <div class="pair">${nebula.icon} ${esc(nebula.name)} + ${gravity.icon} ${esc(gravity.name)}</div>
    <div class="bigicon">${discovery.icon}</div>
    <div class="name">${esc(discovery.name)}</div>
    <div class="blurb">${esc(discovery.blurb)}</div>
    <div class="credit">+1 credit</div>
  </div></div>`;
}

// state: playing | picked | dud | discovery
export function screen(state) {
  const pickedId = state === "picked" || state === "dud" ? "nebula" : null;
  const grid = items.map((it) => card(it, it.id === pickedId)).join("");
  return `<div class="app">
    <header><h1>${esc(world.name)}</h1>
      <div class="meta"><span class="credits">⬡ ${world.credits}</span><span class="count">10 / ${world.total}</span></div>
    </header>
    <div class="goalrow"><div class="target summit">${icon(goal.icon)}<span class="cn">${esc(goal.name)}</span><button class="how">how? · 5</button></div></div>
    <section class="bench">${bench(state)}</section>
    <div class="label">You have · ${items.length}</div>
    <div class="grid">${grid}</div>
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

export function lab(title, idea) {
  document.title = title;
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="labhead"><h2>${esc(title)}</h2><p>${esc(idea)}</p></div>
     <div class="frames">${FRAMES.map(
       ([s, cap]) => `<figure class="frame"><div class="phone" data-state="${s}">${screen(s)}</div><figcaption>${esc(cap)}</figcaption></figure>`,
     ).join("")}</div>`,
  );
}

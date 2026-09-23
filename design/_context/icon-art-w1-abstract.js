// The first real problem of the icon build, taken first on purpose.
//
// Habitat's rule is "the thing plus exactly one piece of the world it belongs to". It was
// proven on Star, Fire, Car, Human, Tribe, City — things that live somewhere. World 1 is the
// world before anywhere exists. Eight of its thirty-one subjects have no habitat at all, and
// four of those are the seeds, so they are the first icons a player ever sees.
//
// Three answers, same silhouettes, same paint (shadow box). Only the piece of world changes.
//
//   effect  the world-piece is what the abstraction does to something else. Light gets the
//           floor it lands on, Gravity the sheet it dents, Lightyear the two stars it spans.
//           Faithful to the rule, but every one has to be invented separately.
//   void    all eight share one world-piece: the early universe, a cold scatter of first
//           light at the margins. One element, drawn once. It also gives world 1 an arc the
//           player can see — the early items float in the dark, and the ground only arrives
//           later with Rock, Lava and Ocean.
//   bare    no world at all, and the absence is the signal: these are the things that exist
//           before there is anywhere to be. Cheapest, and the one that risks looking unfinished.
import { star4, disc } from "./shapes-w1.js";

// The eight as they were drawn for this round, frozen here so the page keeps showing what was
// judged while the live set in shapes-w1.js moves on.
const abstracts = [
  ["energy", "Energy"], ["matter", "Matter"], ["space", "Space"], ["time", "Time"],
  ["particle", "Particle"], ["light", "Light"], ["gravity", "Gravity"], ["lightyear", "Lightyear"],
];
const hues = {
  energy:    { base: "#F7C948", dark: "#A85A10", light: "#FFF6DC", accent: "#FF8A2E" },
  matter:    { base: "#9A8E80", dark: "#5E554A", light: "#D6CCBE", accent: "#E3C08A" },
  space:     { base: "#2A3352", dark: "#141A2E", light: "#5A6894", accent: "#D8E4F4" },
  time:      { base: "#8A5A34", dark: "#4A2E18", light: "#E8EEF2", accent: "#F5B93C" },
  particle:  { base: "#5FBEEA", dark: "#1E5C84", light: "#E6F7FF", accent: "#A8E6FF" },
  light:     { base: "#F7D774", dark: "#B8862A", light: "#FFF7DC", accent: "#FFFFFF" },
  gravity:   { base: "#39405C", dark: "#161A2A", light: "#7C88A8", accent: "#A8C4E0" },
  lightyear: { base: "#CFE4F2", dark: "#3E6E96", light: "#FFF7DC", accent: "#F5B93C" },
};
const parts = {
  energy: [
    { d: "M28.5 4L13 27h8.5L19 44L35 21h-8.5z", tone: "base" },
    { d: "M27.4 10L18.5 26.4h6L21.8 37.6L30 23.2h-6z", tone: "light" },
  ],
  matter: [
    { d: disc(17.5, 29, 7.6), tone: "base" },
    { d: disc(30.5, 29, 7.6), tone: "dark" },
    { d: disc(24, 18.5, 7.6), tone: "light" },
  ],
  space: [
    { d: "M14 11h20a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", tone: "base" },
    { d: disc(18, 18, 1.3) + disc(30, 16.5, 1) + disc(24, 26, .9) + disc(32, 30, 1.3) + disc(16.5, 29, .9), tone: "accent" },
  ],
  time: [
    { d: "M15.5 9H32.5L25.4 21.4h-2.8z", tone: "light" },
    { d: "M15.5 35H32.5L25.4 22.6h-2.8z", tone: "light" },
    { d: "M17.8 11.6H30.2L27.3 16.6H20.7z", tone: "accent" },
    { d: "M19 35c.3-3.4 2.3-5.4 5-5.4s4.7 2 5 5.4z", tone: "accent" },
    { d: "M24 22.4V29", tone: "accent", w: 1 },
    { d: "M12 5.4h24V9H12zM12 35h24v3.6H12z", tone: "base" },
  ],
  particle: [
    { d: disc(13, 33, 2), tone: "dark" },
    { d: disc(18.5, 28, 3.4), tone: "dark" },
    { d: disc(27.5, 20.5, 7), tone: "base" },
    { d: disc(25, 18, 2.4), tone: "light" },
  ],
  light: [
    { d: "M5 24q4.75-10 9.5 0t9.5 0t9.5 0t9.5 0", tone: "base", w: 5 },
  ],
  gravity: [
    { d: disc(24, 24, 9), tone: "base" },
    { d: disc(21, 21, 3.2), tone: "light" },
    { d: "M20.2 6.4L24 10.2L27.8 6.4M41.6 20.2L37.8 24L41.6 27.8M27.8 41.6L24 37.8L20.2 41.6M6.4 27.8L10.2 24L6.4 20.2", tone: "accent", w: 2.2 },
  ],
  lightyear: [
    { d: "M11 22.6h26v2.8H11z", tone: "light" },
    { d: "M9 17h2.8v14H9zM36.2 17H39v14h-2.8z", tone: "dark" },
  ],
};

const box = (b) => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${b}</svg>`;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lighter = (c, t) => "#" + hx(c).map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");

// Shadow box, copied verbatim from the settled renderer so this round tests the framing and
// nothing else: black shadow at a 50% offset, the flat fill, then a 90% copy 18% lighter at
// half opacity for the light catching the raised edge.
const shadowbox = (id, world) => {
  let body = world ? `<g opacity=".85">${world}</g>` : "";
  parts[id].forEach((p) => {
    const c = hues[id][p.tone] ?? hues[id].base;
    if (p.w) {
      body += draw(p, "#000", 'opacity=".45" transform="translate(1.6 2.2)" filter="url(#w1-soft)"') + draw(p, c);
      return;
    }
    body += draw(p, "#000", 'opacity=".5" transform="translate(1.8 2.4)" filter="url(#w1-soft)"')
      + draw(p, c)
      + draw(p, lighter(c, .18), 'transform="translate(-.5 -.6) scale(.9)" transform-origin="24 24" opacity=".5"');
  });
  return box(body);
};

// ---- 1. effect: the world-piece is what the thing does ------------------------------------
const FAR = "#A8C4E0", LINE = "#6E7890", WARM = "#F5B93C";
const EFFECT = {
  // What it lands on, and the two chips it threw clear on the way.
  energy: `<path d="M14 43.4h20l3.6-3.2H10.4z" fill="#FFE9A8" opacity=".4"/>
    <path d="M5 43.6h38" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round"/>
    <g fill="#C6A184" opacity=".7"><path d="M38.6 33.4l3.8 2-2.2 3-3.2-1.8z"/>
    <path d="M6.4 35.6l4-1.4 1.2 3.6-3.6 1.4z"/></g>`,
  // Matter is the only stuff there is. What it belongs to is the emptiness around it.
  matter: `<g fill="${FAR}" opacity=".4"><circle cx="8" cy="9" r="1.1"/><circle cx="41" cy="10" r=".8"/>
    <circle cx="43" cy="38" r="1"/><circle cx="7" cy="40" r=".8"/></g>`,
  // Something crossing it, so a piece of dark reads as a distance rather than a panel.
  space: `<g opacity=".8"><circle cx="43.5" cy="7.5" r="2.4" fill="#E8F2FF"/>
    <path d="M41.6 9.6L33 18M43 12.4l-4.4 4.4" stroke="#8FB6DC" stroke-width="1.2" stroke-linecap="round"/></g>`,
  // Moments, laid out and counted. Every third one is taller, the way a scale is read.
  time: `<g fill="${LINE}" opacity=".5">${[6, 12, 18, 24, 30, 36, 42].map((x, i) =>
    `<rect x="${x - .8}" y="${i % 3 === 0 ? 40 : 42}" width="1.6" height="${i % 3 === 0 ? 5 : 3}" rx=".7"/>`).join("")}</g>`,
  // The edge of something enormous, in the corner rather than along the bottom, because a
  // curve across the bottom of the box is read as ground no matter what it is meant to be.
  particle: `<path d="${disc(6, 50, 26)}" fill="${FAR}" opacity=".22"/>`,
  // The floor it lands on, and the patch of it that is now lit. Flat ink, no glow.
  light: `<path d="M13 41.4h22l4.5-3.6H8.5z" fill="#FFE9A8" opacity=".45"/>
    <path d="M5 41.6h38" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round"/>`,
  // The sheet it dents. This is the one subject where the world does most of the explaining.
  gravity: `<g stroke="${FAR}" stroke-width=".8" fill="none" opacity=".5" stroke-linecap="round">
    <path d="M4 14q20 5 40 0M4 21q20 9 40 0M4 28q20 11 40 0M4 35q20 7 40 0"/>
    <path d="M11 11q4 13 0 26M19 10q2 14 0 28M29 10q-2 14 0 28M37 11q-4 13 0 26"/></g>`,
  // The two ends of the span, which is the only reason the distance means anything.
  lightyear: `<g fill="${WARM}" opacity=".9"><path d="${star4(6, 24, 4.6)}"/><path d="${star4(42, 24, 4.6)}"/></g>`,
};

// ---- 2. void: one shared world-piece for all eight -----------------------------------------
// The early universe, as a cold scatter of first light held to the margins so it never fights
// the subject. Identical in every icon, which is the point: these eight are a set, and the
// player feels the ground arrive later in the world because these never had any.
const VOID = `<g fill="#A8C4E0" opacity=".62">
  <circle cx="7" cy="8" r="1.1"/><circle cx="41" cy="7" r=".8"/><circle cx="44.5" cy="19" r=".7"/>
  <circle cx="39" cy="39.5" r="1"/><circle cx="8" cy="40" r=".9"/><circle cx="3.8" cy="28" r=".7"/>
  <circle cx="25" cy="3.6" r=".8"/><circle cx="15" cy="44.5" r=".7"/><circle cx="34" cy="45" r=".9"/></g>`;

const build = (world) => Object.fromEntries(abstracts.map(([id]) => [id, shadowbox(id, world(id))]));

export const w1abstract = {
  effect: build((id) => EFFECT[id]),
  void: build(() => VOID),
  bare: build(() => ""),
};

export const w1abstractNotes = {
  effect: "Each abstraction gets the thing it acts on. Light gets the floor it lands on, Gravity the sheet it dents, Lightyear the two stars it spans, Time a scale of moments. Faithful to the rule, and the most work: eight separate inventions, and thirty more coming.",
  void: "All eight share one world-piece — the early universe, a cold scatter of first light at the margins. One element, drawn once. It also makes world 1's arc visible: everything here floats in the dark, and the ground only arrives with Rock, Lava and Ocean.",
  bare: "No world, and the absence is the signal: these are the things that exist before there is anywhere to be. The cheapest answer and the one that risks reading as unfinished rather than as empty.",
};

export const W1_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="w1-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
</defs></svg>`;

export { abstracts };

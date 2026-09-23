// World 1's paper subjects as silhouettes and hues, in the same shape as `shapes.js`: colour is
// a role (base / dark / light / accent, plus extra keys where a subject genuinely needs more),
// geometry is an ordered list of parts, outermost first, and `w` means the part is a stroke.
// 48x48 box.
//
// Only things that reflect light live here, because shadow box is cut paper and paper is how
// matter looks. Things that give off light — stars, nebulae, lava, energy — are drawn as light
// in `icon-art-w1.js`, and Water and Earth come from `shapes.js`.
//
// Rules being honoured: a thing is the colour a person already thinks it is, every part gets a
// ramp from its own colour rather than the body's, and the drawing has to work at 34px.

const disc = (cx, cy, r) =>
  `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}z`;
const ell = (cx, cy, rx, ry) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 1 ${2 * rx} 0a${rx} ${ry} 0 1 1 ${-2 * rx} 0z`;
// A tilted ellipse. A level one with something in the middle of it is an eye.
const ellR = (cx, cy, rx, ry, deg) => {
  const t = (deg * Math.PI) / 180, dx = Math.cos(t) * rx, dy = Math.sin(t) * rx;
  const [ax, ay] = [(cx - dx).toFixed(2), (cy - dy).toFixed(2)];
  const [bx, by] = [(cx + dx).toFixed(2), (cy + dy).toFixed(2)];
  return `M${ax} ${ay}A${rx} ${ry} ${deg} 1 1 ${bx} ${by}A${rx} ${ry} ${deg} 1 1 ${ax} ${ay}z`;
};
const star4 = (x, y, r) => {
  const s = r * 0.13, m = r * 0.87;
  return `M${x} ${y - r}c${s} ${m} ${r - m + s} ${m} ${r} ${r}` +
    `c${-m} ${s} ${-m} ${r - m + s} ${-r} ${r}` +
    `c${-s} ${-m} ${-(r - m + s)} ${-m} ${-r} ${-r}` +
    `c${m} ${-s} ${m} ${-(r - m + s)} ${r} ${-r}z`;
};
const wave = (y, n = 4, step = 10, amp = 5) =>
  `M4 ${y}q${step / 2} ${-amp} ${step} 0` + `t${step} 0`.repeat(n - 1);

export const hues = {
  // Textbook protons and neutrons: red and blue, each with its own highlight.
  matter:     { base: "#D8584A", light: "#F6B0A6", blue: "#5E86C0", blueL: "#C4D6F0" },
  time:       { base: "#8A5A34", dark: "#4A2E18", light: "#E8EEF2", accent: "#F5B93C" },
  particle:   { base: "#5FBEEA", dark: "#1E5C84", light: "#E6F7FF", accent: "#A8E6FF" },
  gravity:    { base: "#39405C", dark: "#161A2A", light: "#7C88A8", accent: "#A8C4E0" },
  rainbow:    { base: "#F5B93C", dark: "#3E7FC6", light: "#FFF7DC", accent: "#E8623C", green: "#4FA35C" },
  rock:       { base: "#8A7C6A", dark: "#4E4438", light: "#C2B39C", accent: "#6A5E50" },
  // Rust, not ochre: ochre with a ring was Saturn, and blue-green is taken by Earth.
  planet:     { base: "#C8683E", dark: "#5E2616", light: "#F6B488", accent: "#E8935E", band: "#9E4628" },
  solarsystem:{ base: "#F5B93C", dark: "#3E4A6E", light: "#FFF6DC", accent: "#5FBEEA" },
  moon:       { base: "#B8BCC6", dark: "#6E727C", light: "#E8EAF0", accent: "#8A8E98" },
  volcano:    { base: "#5E5248", dark: "#332C26", light: "#8A7E70", accent: "#E8762F", hot: "#FFD24B" },
  air:        { base: "#A8C4E0", dark: "#4A6480", light: "#E8F2FF", accent: "#8FB6DC" },
  cloud:      { base: "#E8F0F8", dark: "#9FB4C8", light: "#FFFFFF", accent: "#C8D8E8" },
};

export const parts = {
  // A clump of protons and neutrons, the textbook picture of what everything is built from.
  // Particle is one ball and Matter is the clump, so the recipe reads in the drawings. Three grey
  // chips were a snowman, three primitive solids were geometry, and the atom symbol said
  // "atom" rather than "stuff".
  matter: [[19.5, 17, "base"], [28.5, 17.5, "blue"], [14.5, 24.5, "blue"], [24, 24, "base"], [33.5, 25, "base"],
    [19, 32, "base"], [28.5, 32.5, "blue"], [23.5, 39, "blue"]]
    .flatMap(([x, y, t]) => [{ d: disc(x, y, 5.4), tone: t }, { d: disc(x - 1.8, y - 1.8, 1.6), tone: t === "base" ? "light" : "blueL" }]),
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
  gravity: [
    { d: disc(24, 24, 9), tone: "base" },
    { d: disc(21, 21, 3.2), tone: "light" },
    { d: "M20.2 6.4L24 10.2L27.8 6.4M41.6 20.2L37.8 24L41.6 27.8M27.8 41.6L24 37.8L20.2 41.6M6.4 27.8L10.2 24L6.4 20.2", tone: "accent", w: 2.2 },
  ],
  rainbow: [
    { d: "M4 40a20 20 0 0 1 40 0", tone: "accent", w: 3.2 },
    { d: "M8 40a16 16 0 0 1 32 0", tone: "base", w: 3.2 },
    { d: "M12 40a12 12 0 0 1 24 0", tone: "green", w: 3.2 },
    { d: "M16 40a8 8 0 0 1 16 0", tone: "dark", w: 3.2 },
  ],
  // A boulder with a lit top, a shadowed flank and the grit it was made from. The pebbles are
  // its piece of world: the blurb is dust becoming pebbles becoming boulders.
  rock: [
    { d: disc(7.5, 40.5, 2.4) + disc(42.5, 40.6, 2) + disc(45, 36.4, 1.2), tone: "accent" },
    { d: "M9 37.5L11 24.5L19 15.5L30 14L38.5 20L41.5 31L37.5 38.5z", tone: "base" },
    { d: "M11 24.5L19 15.5L30 14L38.5 20L28.5 23.5L17.5 25.5z", tone: "light" },
    { d: "M28.5 23.5L38.5 20L41.5 31L37.5 38.5L29.5 38.5z", tone: "dark" },
    { d: "M19.5 26.5L22.5 31.5L20.5 38M23 18.4l3.4 2.6", tone: "accent", w: .9 },
    { d: disc(14.5, 31, .6) + disc(24.5, 34, .5) + disc(16, 35.5, .5) + disc(25.5, 28.5, .5), tone: "accent" },
  ],
  // Banded rock with a night side. The shadow line is what makes a disc a world in space.
  planet: [
    { d: disc(24, 24, 13), tone: "base" },
    { d: "M11.6 19.5c7.6 1.6 17.2 1.6 24.8 0-.3 1.6-.7 2.6-1.3 3.6-7.6 1.4-14.6 1.4-22.2 0-.6-1-1-2-1.3-3.6z", tone: "accent" },
    { d: "M12.4 28.6c7.2 1.4 16 1.4 23.2 0-.5 1.3-1.1 2.4-1.8 3.4-6.6 1.1-13 1.1-19.6 0-.7-1-1.3-2.1-1.8-3.4z", tone: "band" },
    { d: "M15.5 13.6c5.4-2 11.6-2 17 0-2.4-1.4-5.4-2.4-8.5-2.4s-6.1 1-8.5 2.4z", tone: "light" },
    { d: disc(18.5, 19, 2.4), tone: "light" },
    { d: "M24 11a13 13 0 0 1 0 26a18 18 0 0 0 0-26z", tone: "dark" },
  ],
  solarsystem: [
    { d: ellR(24, 24, 20, 8.5, -18), tone: "dark", w: 1.2 },
    { d: ellR(24, 24, 13, 5.5, -18), tone: "dark", w: 1.2 },
    { d: disc(24, 24, 6), tone: "base" },
    { d: disc(22, 22, 2.2), tone: "light" },
    { d: disc(43, 18, 2.6) + disc(11.6, 27.6, 2), tone: "accent" },
  ],
  moon: [
    { d: disc(26, 20, 10.5), tone: "base" },
    { d: disc(23, 15, 2.6) + disc(30.5, 24, 3.2) + disc(22, 24, 1.8), tone: "accent" },
  ],
  volcano: [
    { d: "M9 41L21 17h6l12 24z", tone: "base" },
    { d: "M24 17h3l12 24H24z", tone: "dark" },
    { d: "M23 21l-2 10 1 9M27 21l2 9-1 10", tone: "accent", w: 1.4 },
    { d: "M20.6 18.4h6.8l-1.4 3h-4z", tone: "accent" },
    { d: disc(15, 8.5, 1.6) + disc(33, 8, 1.4) + disc(24, 5.2, 1.9) + disc(19, 12, 1.2) + disc(29.4, 11.6, 1.3), tone: "hot" },
  ],
  air: [
    { d: "M6 17h20a5.5 5.5 0 1 0-5.5-5.5", tone: "base", w: 3 },
    { d: "M6 26h26a5 5 0 1 1-5 5", tone: "base", w: 3 },
    { d: "M6 35h15", tone: "accent", w: 2.6 },
  ],
  cloud: [
    { d: "M13.5 35.5a7.5 7.5 0 0 1 .8-15A10.5 10.5 0 0 1 34 17.5 7.8 7.8 0 0 1 34.5 35.5z", tone: "base" },
    { d: "M16 22c3-6 12-7 17-2-5-2-12-1-17 2z", tone: "light" },
  ],
};

// World 1 in play order: the four seeds, then every discovery in the order the table unlocks
// them.
export const w1subjects = [
  ["energy", "Energy"], ["matter", "Matter"], ["space", "Space"], ["time", "Time"],
  ["particle", "Particle"], ["light", "Light"], ["gravity", "Gravity"], ["hydrogen", "Hydrogen"],
  ["nebula", "Nebula"], ["star", "Star"], ["helium", "Helium"],
  ["carbon", "Carbon"], ["oxygen", "Oxygen"], ["water", "Water"], ["comet", "Comet"],
  ["rainbow", "Rainbow"], ["supernova", "Supernova"], ["stardust", "Stardust"],
  ["blackhole", "Black Hole"], ["rock", "Rock"], ["planet", "Planet"],
  ["solarsystem", "Solar System"], ["galaxy", "Galaxy"], ["moon", "Moon"], ["lava", "Lava"],
  ["volcano", "Volcano"], ["air", "Air"], ["ocean", "Ocean"], ["cloud", "Cloud"],
  ["earth", "Earth"],
];

export { disc, ell, ellR, star4, wave };

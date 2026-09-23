// World 1's paper subjects as silhouettes and hues, in the same shape as `shapes.js`: colour is
// a role (base / dark / light / accent, plus extra keys where a subject genuinely needs more),
// geometry is an ordered list of parts, outermost first, and `w` means the part is a stroke.
// 48x48 box.
//
// The subjects still built from flat parts: the ones where cut paper, with enough detail, holds
// up beside the hand-drawn ones. Everything else — every light source, and the matter that
// needed real shading to look finished — is drawn by hand in `icon-art-w1.js`.
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
  rock:       { base: "#8A7C6A", dark: "#4E4438", light: "#C2B39C", accent: "#6A5E50" },
  // A colour no famous planet owns, because every one that does names it: rust was Mars, ochre
  // with a ring was Saturn, banded tan is Jupiter, blue-green is Earth and grey is the Moon.
  planet:     { base: "#8E78B8", dark: "#2E2640", light: "#D2C4EE", accent: "#A892D0", band: "#6B5698" },
  solarsystem:{ base: "#F5B93C", dark: "#3E4A6E", light: "#FFF6DC", accent: "#5FBEEA" },
  moon:       { base: "#B8BCC6", dark: "#6E727C", light: "#E8EAF0", accent: "#8A8E98" },
};

export const parts = {
  // A clump of protons and neutrons, the textbook picture of what everything is built from.
  // Particle is one ball and Matter is the clump, so the recipe reads in the drawings. Three grey
  // chips were a snowman, three primitive solids were geometry, and the atom symbol said
  // "atom" rather than "stuff".
  matter: [[19.5, 17, "base"], [28.5, 17.5, "blue"], [14.5, 24.5, "blue"], [24, 24, "base"], [33.5, 25, "base"],
    [19, 32, "base"], [28.5, 32.5, "blue"]]
    .flatMap(([x, y, t]) => [{ d: disc(x, y, 5.4), tone: t }, { d: disc(x - 1.8, y - 1.8, 1.6), tone: t === "base" ? "light" : "blueL" }]),
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
    { d: disc(16.5, 26, 1.6) + disc(25.5, 25.4, 1.1) + disc(21, 32.6, 1.2), tone: "band" },
    { d: "M24 11a13 13 0 0 1 0 26a18 18 0 0 0 0-26z", tone: "dark" },
  ],
  // Orbits and planets are paper; the sun is light, and is laid over them in icon-art-w1.js.
  solarsystem: [
    { d: ellR(24, 24, 20, 8.5, -18), tone: "dark", w: 1.2 },
    { d: ellR(24, 24, 13, 5.5, -18), tone: "dark", w: 1.2 },
    { d: disc(43, 18, 2.6) + disc(11.6, 27.6, 2), tone: "accent" },
  ],
  moon: [
    { d: disc(26, 20, 10.5), tone: "base" },
    { d: disc(23, 15, 2.6) + disc(30.5, 24, 3.2) + disc(22, 24, 1.8), tone: "accent" },
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

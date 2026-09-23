// World 1's subjects as silhouettes and hues, in the same shape as `shapes.js`: colour is a
// role (base / dark / light / accent, plus the odd extra where a subject genuinely needs a
// fifth), geometry is an ordered list of parts, outermost first, and `w` means the part is a
// stroke. 48x48 box.
//
// Star, Water and Earth are not here. They were drawn when the style was chosen and they live
// in `shapes.js`; the renderer merges them in, so they stay the control.
//
// Rules being honoured: a thing is the colour a person already thinks it is, every part gets a
// ramp from its own colour rather than the body's, and the drawing has to work at 34px.

const disc = (cx, cy, r) =>
  `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}z`;
const ell = (cx, cy, rx, ry) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 1 ${2 * rx} 0a${rx} ${ry} 0 1 1 ${-2 * rx} 0z`;
// A tilted ellipse. Needed because a level one with something in the middle of it is an eye,
// which is what Hydrogen, Helium, Solar System and Galaxy all turned into on the first pass.
const ellR = (cx, cy, rx, ry, deg) => {
  const t = (deg * Math.PI) / 180, dx = Math.cos(t) * rx, dy = Math.sin(t) * rx;
  const [ax, ay] = [(cx - dx).toFixed(2), (cy - dy).toFixed(2)];
  const [bx, by] = [(cx + dx).toFixed(2), (cy + dy).toFixed(2)];
  return `M${ax} ${ay}A${rx} ${ry} ${deg} 1 1 ${bx} ${by}A${rx} ${ry} ${deg} 1 1 ${ax} ${ay}z`;
};

// A tapered spike from r0 to a point at r1, half-width w at the base. 0 degrees is right.
const ray = (deg, r0, r1, w) => {
  const t = (deg * Math.PI) / 180, n = t + Math.PI / 2;
  const P = (r, o) => [
    (24 + Math.cos(t) * r + Math.cos(n) * o).toFixed(2),
    (24 + Math.sin(t) * r + Math.sin(n) * o).toFixed(2),
  ];
  const [a, b, c] = [P(r0, -w), P(r0, w), P(r1, 0)];
  return `M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}Z`;
};
const star4 = (x, y, r) => {
  const s = r * 0.13, m = r * 0.87;
  return `M${x} ${y - r}c${s} ${m} ${r - m + s} ${m} ${r} ${r}` +
    `c${-m} ${s} ${-m} ${r - m + s} ${-r} ${r}` +
    `c${-s} ${-m} ${-(r - m + s)} ${-m} ${-r} ${-r}` +
    `c${m} ${-s} ${m} ${-(r - m + s)} ${r} ${-r}z`;
};
const rays = (n, r0, r1, w, from = -90) =>
  Array.from({ length: n }, (_, i) => ray(from + (i * 360) / n, r0, r1, w)).join("");
const wave = (y, n = 4, step = 10, amp = 5) =>
  `M4 ${y}q${step / 2} ${-amp} ${step} 0` + `t${step} 0`.repeat(n - 1);

export const hues = {
  energy:     { base: "#F7C948", dark: "#A85A10", light: "#FFF6DC", accent: "#FF8A2E" },
  matter:     { base: "#B4AEA4", dark: "#6E685E", light: "#E2DED6", accent: "#C6A184" },
  space:      { base: "#2A3352", dark: "#141A2E", light: "#5A6894", accent: "#D8E4F4" },
  time:       { base: "#8A5A34", dark: "#4A2E18", light: "#E8EEF2", accent: "#F5B93C" },
  particle:   { base: "#5FBEEA", dark: "#1E5C84", light: "#E6F7FF", accent: "#A8E6FF" },
  light:      { base: "#F7D774", dark: "#B8862A", light: "#FFF7DC", accent: "#FFFFFF" },
  gravity:    { base: "#39405C", dark: "#161A2A", light: "#7C88A8", accent: "#A8C4E0" },
  lightyear:  { base: "#CFE4F2", dark: "#3E6E96", light: "#FFF7DC", accent: "#F5B93C" },
  // The three fusion steps are siblings on purpose: same diagram, different count, and the
  // nucleus warms up as the star works its way down the chain.
  hydrogen:   { base: "#D8E8F5", dark: "#5A7A96", light: "#FFFFFF", accent: "#F5B93C" },
  helium:     { base: "#F5D98A", dark: "#A87E28", light: "#FFF6DC", accent: "#FF8A2E" },
  // Carbon is black and the card is nearly black, so it is drawn as graphite with a hard lit
  // facet. The expected colour has to survive the surface it is printed on.
  carbon:     { base: "#3E4046", dark: "#16171B", light: "#B8BCC6", accent: "#7A7E88" },
  oxygen:     { base: "#5FC6C0", dark: "#1E6E6A", light: "#C8F2EE", accent: "#FFFFFF" },
  nebula:     { base: "#8A5FC6", dark: "#3E2470", light: "#D8B8F0", accent: "#5FBEEA" },
  comet:      { base: "#CFE4F2", dark: "#3E6E96", light: "#FFFFFF", accent: "#9FD0EE" },
  // The one subject where the four roles are just four colours, because a rainbow is a list.
  rainbow:    { base: "#F5B93C", dark: "#3E7FC6", light: "#FFF7DC", accent: "#E8623C", green: "#4FA35C" },
  supernova:  { base: "#E8762F", dark: "#8A2E0C", light: "#FFF6DC", accent: "#FF6B2E" },
  stardust:   { base: "#F5D98A", dark: "#8A6E28", light: "#FFF6DC", accent: "#C6A184" },
  blackhole:  { base: "#14141A", dark: "#07070A", light: "#FF9A3C", accent: "#FFD79A" },
  rock:       { base: "#7A6B58", dark: "#3E352A", light: "#B8A88E", accent: "#5E5244" },
  planet:     { base: "#C69A5E", dark: "#7A5628", light: "#EAD2A8", accent: "#8A7A5E" },
  solarsystem:{ base: "#F5B93C", dark: "#3E4A6E", light: "#FFF6DC", accent: "#5FBEEA" },
  galaxy:     { base: "#8FB6DC", dark: "#2E3A5E", light: "#FFF6DC", accent: "#C6A8E8" },
  moon:       { base: "#B8BCC6", dark: "#6E727C", light: "#E8EAF0", accent: "#8A8E98" },
  lava:       { base: "#E8762F", dark: "#8A2E0C", light: "#FFD24B", accent: "#3E3630" },
  volcano:    { base: "#5E5248", dark: "#332C26", light: "#8A7E70", accent: "#E8762F", hot: "#FFD24B" },
  air:        { base: "#A8C4E0", dark: "#4A6480", light: "#E8F2FF", accent: "#8FB6DC" },
  ocean:      { base: "#2E82C6", dark: "#123E68", light: "#5FBEEA", accent: "#A8E6FF" },
  cloud:      { base: "#E8F0F8", dark: "#9FB4C8", light: "#FFFFFF", accent: "#C8D8E8" },
};

export const parts = {
  // A bolt, not a burst. Radial rays are the truer idea — energy is what happens, not what is
  // — but in amber at 34px they came out as a second Star, and Energy is a seed the player
  // meets ten discoveries before Star exists. Shape has to do the separating.
  energy: [
    { d: "M28.5 4L13 27h8.5L19 44L35 21h-8.5z", tone: "base" },
    { d: "M27.4 10L18.5 26.4h6L21.8 37.6L30 23.2h-6z", tone: "light" },
  ],
  // A clump. Three flat chips rather than one modelled lump, because cut paper cannot bulge.
  matter: [
    { d: disc(17.5, 29, 7.6), tone: "base" },
    { d: disc(30.5, 29, 7.6), tone: "dark" },
    { d: disc(24, 18.5, 7.6), tone: "light" },
  ],
  // A piece of dark, cut out and lifted. The stars sit on the front sheet, not behind it, so
  // they survive whatever is or is not put behind the icon.
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
  // One sphere and the track it left, because a lone dot says nothing about being small.
  particle: [
    { d: disc(13, 33, 2), tone: "dark" },
    { d: disc(18.5, 28, 3.4), tone: "dark" },
    { d: disc(27.5, 20.5, 7), tone: "base" },
    { d: disc(25, 18, 2.4), tone: "light" },
  ],
  // A wave, not a beam and not a burst. The one depiction of light that cannot be confused
  // with Energy or Star, and a thick ribbon takes a cast shadow well.
  light: [
    { d: "M5 24q4.75-10 9.5 0t9.5 0t9.5 0t9.5 0", tone: "base", w: 5 },
  ],
  // The mass, and four things falling in. Without its world this is a grey ball.
  gravity: [
    { d: disc(24, 24, 9), tone: "base" },
    { d: disc(21, 21, 3.2), tone: "light" },
    { d: "M20.2 6.4L24 10.2L27.8 6.4M41.6 20.2L37.8 24L41.6 27.8M27.8 41.6L24 37.8L20.2 41.6M6.4 27.8L10.2 24L6.4 20.2", tone: "accent", w: 2.2 },
  ],
  // A measured span. Cream bar for the light, cold caps for the two ends of the ruler.
  lightyear: [
    { d: "M11 22.6h26v2.8H11z", tone: "light" },
    { d: "M9 17h2.8v14H9zM36.2 17H39v14h-2.8z", tone: "dark" },
  ],
  // The atom symbol, which needs all three orbits. One ellipse round a filled middle is an
  // eye and two is a winking one; three is the shape everybody already reads as "atom".
  // Hydrogen and Helium are meant to be siblings — same diagram, one electron against two,
  // and the nucleus warms up as the star works down the chain.
  hydrogen: [
    { d: [-60, 0, 60].map((a) => ellR(24, 24, 17, 6.5, a)).join(""), tone: "dark", w: 1.4 },
    { d: disc(24, 24, 5.6), tone: "base" },
    { d: disc(22.2, 22.2, 2), tone: "light" },
    { d: disc(38.6, 15.4, 3), tone: "accent" },
  ],
  helium: [
    { d: [-60, 0, 60].map((a) => ellR(24, 24, 17, 6.5, a)).join(""), tone: "dark", w: 1.4 },
    { d: disc(24, 24, 6.2), tone: "base" },
    { d: disc(22.2, 22.2, 2), tone: "light" },
    { d: disc(38.6, 15.4, 3) + disc(9.4, 32.6, 3), tone: "accent" },
  ],
  // A dark crystal, split rather than faceted from the centre. Three lines to the middle of a
  // hexagon is an isometric cube, and that is what the first attempt drew.
  carbon: [
    { d: "M24 7L38.7 15.5V32.5L24 41 9.3 32.5V15.5z", tone: "base" },
    { d: "M24 7L38.7 15.5V32.5L24 41z", tone: "dark" },
    { d: "M9.3 15.5L24 7", tone: "light", w: 1.8 },
  ],
  oxygen: [
    { d: disc(31.5, 24, 9), tone: "base" },
    { d: disc(16.5, 24, 9), tone: "base" },
    { d: disc(13.6, 20.6, 3) + disc(28.6, 20.6, 3), tone: "light" },
  ],
  nebula: [
    { d: "M10 20c2-7 9-11 16-9 6 1.6 9-2 13 1 4.6 3.4 3 9 1 12 2.4 4.6-.4 9.6-5 11-4 1.2-7-1.4-11-.6-5 1-8.6 4-13 1.6C7.4 34.6 7.6 26.4 10 20z", tone: "base" },
    { d: "M17 22c3-4 9-5 13-2 3 2.4 2 7-1 9-4 2.6-10 2-13-1-2-2-1.6-4.4 1-6z", tone: "light" },
    { d: disc(19, 19, 1.4) + disc(31, 28, 1.2) + disc(26, 17, 1), tone: "accent" },
  ],
  // Three separate streaks fanning off the head. Every solid tail read as an object: parallel
  // slivers were a syringe, a constant-width wedge was a bone, and a single triangle with a
  // round head on it was a bone again. A tail has to have gaps in it.
  comet: [
    { d: "M29 19L6 39", tone: "accent", w: 4.6 },
    { d: "M26.5 11.5L11 24", tone: "accent", w: 3.2 },
    { d: "M34.5 20.5L23 35", tone: "light", w: 3 },
    { d: disc(32, 15, 6.5), tone: "base" },
    { d: disc(30, 13, 2.4), tone: "light" },
  ],
  rainbow: [
    { d: "M4 40a20 20 0 0 1 40 0", tone: "accent", w: 3.2 },
    { d: "M8 40a16 16 0 0 1 32 0", tone: "base", w: 3.2 },
    { d: "M12 40a12 12 0 0 1 24 0", tone: "green", w: 3.2 },
    { d: "M16 40a8 8 0 0 1 16 0", tone: "dark", w: 3.2 },
  ],
  supernova: [
    { d: disc(24, 24, 19), tone: "accent", w: 2 },
    { d: rays(8, 9, 17, 2.6), tone: "base" },
    { d: disc(24, 24, 7), tone: "light" },
  ],
  stardust: [
    { d: disc(21, 25, 1.6) + disc(38, 19, 1.4) + disc(11, 32, 1.8) + disc(25, 38, 1.4) + disc(41, 38, 1.2) + disc(17, 39, 1), tone: "accent" },
    { d: star4(30, 13, 3), tone: "light" },
    { d: star4(14, 16, 5) + star4(33, 30, 4.2), tone: "base" },
  ],
  // A bright ring around a hole. Drawn as a flat disc with a level ellipse behind it, it was
  // Saturn — and Planet arrives two discoveries later, so that reading is fatal.
  blackhole: [
    { d: disc(24, 24, 14.5), tone: "light", w: 4.4 },
    { d: disc(24, 24, 10.5), tone: "base" },
    { d: disc(24, 24, 10.8), tone: "accent", w: 1.2 },
  ],
  rock: [
    { d: "M8 39L10.5 25 20 17l12 1.5 8 11-2 9.5z", tone: "base" },
    { d: "M10.5 25L20 17l12 1.5 4 6-13 3z", tone: "light" },
    { d: "M20 39l4-10 7-2", tone: "dark", w: 1.2 },
  ],
  planet: [
    { d: "M6 26a18 6 0 0 1 36 0", tone: "accent", w: 2.6 },
    { d: disc(24, 24, 11), tone: "base" },
    { d: "M13.5 21.5c6.5-2.2 14.5-2.2 21 0-6.5 2.4-14.5 2.4-21 0z", tone: "dark" },
    { d: disc(20, 20, 4), tone: "light" },
    { d: "M42 26a18 6 0 0 1-36 0", tone: "accent", w: 2.6 },
  ],
  solarsystem: [
    { d: ellR(24, 24, 20, 8.5, -18), tone: "dark", w: 1.2 },
    { d: ellR(24, 24, 13, 5.5, -18), tone: "dark", w: 1.2 },
    { d: disc(24, 24, 6), tone: "base" },
    { d: disc(22, 22, 2.2), tone: "light" },
    { d: disc(43, 18, 2.6) + disc(11.6, 27.6, 2), tone: "accent" },
  ],
  // Two arms wound round a bright middle. Concentric ellipses are an eye however far they are
  // tilted, and thin strokes were a swoosh, so the arms have to have width and taper.
  galaxy: [
    { d: disc(24, 24, 17), tone: "dark" },
    { d: "M24 17.5c9 0 14.6 6 14.6 13.5 0 2.4-.5 4.5-1.4 6.3-.2-6.7-1.7-11.1-4.7-13.9-2.6-2.5-6-3.5-8.5-3.5z", tone: "base" },
    { d: "M24 30.5c-9 0-14.6-6-14.6-13.5 0-2.4.5-4.5 1.4-6.3.2 6.7 1.7 11.1 4.7 13.9 2.6 2.5 6 3.5 8.5 3.5z", tone: "base" },
    { d: disc(24, 24, 5.4), tone: "light" },
    { d: disc(35, 14, 1.2) + disc(13, 34, 1) + disc(38, 33, .9), tone: "accent" },
  ],
  moon: [
    { d: disc(26, 20, 10.5), tone: "base" },
    { d: disc(23, 15, 2.6) + disc(30.5, 24, 3.2) + disc(22, 24, 1.8), tone: "accent" },
  ],
  lava: [
    { d: "M4 31c5-4 9 1 15-2 6-3 9 4 15 1 4-2 7-1 10 1v11H4z", tone: "base" },
    { d: "M5 37c7-3 11 1 18-1s12 1 20-1v4c-8 2-13-1-20 1s-11-1-18 1z", tone: "light" },
    { d: "M12 30l6-1 3 3-5 2zM28 28l7 1 1 3-6 1z", tone: "accent" },
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
  ocean: [
    { d: wave(23), tone: "dark", w: 3.6 },
    { d: wave(30), tone: "base", w: 4.2 },
    { d: wave(37), tone: "light", w: 4.2 },
  ],
  cloud: [
    { d: "M13.5 35.5a7.5 7.5 0 0 1 .8-15A10.5 10.5 0 0 1 34 17.5 7.8 7.8 0 0 1 34.5 35.5z", tone: "base" },
    { d: "M16 22c3-6 12-7 17-2-5-2-12-1-17 2z", tone: "light" },
  ],
};

// World 1 in play order: the four seeds, then every discovery in the order the table unlocks
// them. Star, Water and Earth come from `shapes.js`.
export const w1subjects = [
  ["energy", "Energy"], ["matter", "Matter"], ["space", "Space"], ["time", "Time"],
  ["particle", "Particle"], ["light", "Light"], ["gravity", "Gravity"], ["hydrogen", "Hydrogen"],
  ["lightyear", "Lightyear"], ["nebula", "Nebula"], ["star", "Star"], ["helium", "Helium"],
  ["carbon", "Carbon"], ["oxygen", "Oxygen"], ["water", "Water"], ["comet", "Comet"],
  ["rainbow", "Rainbow"], ["supernova", "Supernova"], ["stardust", "Stardust"],
  ["blackhole", "Black Hole"], ["rock", "Rock"], ["planet", "Planet"],
  ["solarsystem", "Solar System"], ["galaxy", "Galaxy"], ["moon", "Moon"], ["lava", "Lava"],
  ["volcano", "Volcano"], ["air", "Air"], ["ocean", "Ocean"], ["cloud", "Cloud"],
  ["earth", "Earth"],
];

// The eight with no habitat, kept as its own list because the round that drew them first is
// still a page in `design/` and reads from here.
export const abstracts = w1subjects.slice(0, 9).filter(([id]) => id !== "hydrogen");

export { disc, ell, ellR, ray, rays, star4, wave };

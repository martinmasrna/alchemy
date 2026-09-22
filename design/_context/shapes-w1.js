// World 1's subjects as silhouettes and hues, in the same shape as `shapes.js`: colour is a
// role (base / dark / light / accent), geometry is an ordered list of parts, outermost first,
// and `w` means the part is a stroke. 48x48 box.
//
// This file starts with the eight abstracts, because they are the ones the framing might not
// survive. Energy, Matter, Space, Time, Particle, Light, Gravity and Lightyear have nowhere to
// be, and habitat's whole device is putting a thing somewhere.
//
// Rule being honoured: a thing is the colour a person already thinks it is, and every part
// gets a ramp from its own colour rather than the body's.

const disc = (cx, cy, r) =>
  `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 ${-2 * r}z`;

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

export const hues = {
  energy:    { base: "#F7C948", dark: "#A85A10", light: "#FFF6DC", accent: "#FF8A2E" },
  // Stuff. Warm stone grey, so it does not collide with Gravity's cold heavy grey.
  matter:    { base: "#9A8E80", dark: "#5E554A", light: "#D6CCBE", accent: "#E3C08A" },
  // Dark with points of light on it. The only subject whose expected colour is "almost black".
  space:     { base: "#2A3352", dark: "#141A2E", light: "#5A6894", accent: "#D8E4F4" },
  // Wood and sand, because an hourglass is the picture everyone already has.
  time:      { base: "#8A5A34", dark: "#4A2E18", light: "#E8EEF2", accent: "#F5B93C" },
  particle:  { base: "#5FBEEA", dark: "#1E5C84", light: "#E6F7FF", accent: "#A8E6FF" },
  light:     { base: "#F7D774", dark: "#B8862A", light: "#FFF7DC", accent: "#FFFFFF" },
  // Heavy and cold. Gravity is the one thing here that should feel like it weighs something.
  gravity:   { base: "#39405C", dark: "#161A2A", light: "#7C88A8", accent: "#A8C4E0" },
  lightyear: { base: "#CFE4F2", dark: "#3E6E96", light: "#FFF7DC", accent: "#F5B93C" },
};

export const parts = {
  // A bolt, not a burst. The monoline's radial rays are the truer idea — energy is what
  // happens, not what is — but drawn in amber they came out as a second Star, and Energy is a
  // seed the player sees ten discoveries before Star arrives. Shape has to do the separating,
  // because the expected colour of energy is the same yellow.
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
  // A piece of dark, cut out and lifted. The stars sit on the front sheet, not behind it,
  // so they survive whatever the context turns out to be.
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
  // A wave, not a beam and not a burst. It is the one depiction of light that cannot be
  // confused with Energy or Star, and a thick ribbon takes a cast shadow well.
  light: [
    { d: "M5 24q4.75-10 9.5 0t9.5 0t9.5 0t9.5 0", tone: "base", w: 5 },
  ],
  // The mass, and four things falling in. Without the arrows this is a grey ball, which is
  // the whole reason gravity needs a world more than anything else here does.
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
};

export const abstracts = [
  ["energy", "Energy"], ["matter", "Matter"], ["space", "Space"], ["time", "Time"],
  ["particle", "Particle"], ["light", "Light"], ["gravity", "Gravity"], ["lightyear", "Lightyear"],
];

export { disc, ray, star4 };

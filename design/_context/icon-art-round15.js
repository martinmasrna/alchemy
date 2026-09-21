// Round 15. A different axis entirely.
//
// Fourteen rounds and about forty candidates have all varied ONE thing: how the object is
// rendered. Pictogram, flat vector, print, paint, ornament, digital texture, material, light
// behaviour. That axis is mined out, which is why each new round returns less.
//
// What has never been questioned is the depiction itself. Every candidate so far has been a
// picture of the object, alone, seen from the front, because my very first round assumed that
// and nothing since has argued with it. These four argue with it.
//
//   personified  the thing has a face and a temperament
//   typographic  the thing is its name, and the drawing steps out of the way
//   cutaway      the thing is opened up, because the inside is the interesting part
//   naive        drawn by a hand with no skill at all, on purpose
//
// Everything else holds: expected colour, the same twelve subjects, both sizes, and no support
// unless it earns one.
import { hues, parts } from "./shapes.js";

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const tone = (id, t) => hues[id][t] ?? hues[id].base;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixTo = (c, t, target) => "#" + hx(c).map((v) => Math.round(v + (target - v) * t).toString(16).padStart(2, "0")).join("");
const lighter = (c, t) => mixTo(c, t, 255);
const darker = (c, t) => mixTo(c, t, 0);

// ---- 1. personified: the thing has a face and a temperament -----------------------------
// The only direction that can make somebody laugh at the grid itself rather than at a line of
// text under it. A face also solves a problem no rendering trick has: thirty unrelated objects
// become one cast the moment they are all looking at you.
// Anchors are per subject because a face goes where the thing's head would be, not its middle.
const faces = {
  star:     { x: 24, y: 25, s: 1,   mood: "smug" },
  water:    { x: 24, y: 31, s: .95, mood: "calm" },
  earth:    { x: 24, y: 25, s: 1,   mood: "calm" },
  life:     { x: 24, y: 16, s: .7,  mood: "happy" },
  human:    { x: 24, y: 18, s: .85, mood: "happy" },
  fire:     { x: 24, y: 31, s: .9,  mood: "wild" },
  hunting:  { x: 13, y: 24, s: .7,  mood: "wild" },
  tribe:    { x: 24, y: 34, s: .7,  mood: "happy" },
  city:     { x: 17, y: 26, s: .7,  mood: "tired" },
  car:      { x: 25, y: 28, s: .8,  mood: "happy" },
  calculus: { x: 27, y: 30, s: .75, mood: "tired" },
  bitcoin:  { x: 24, y: 24, s: .95, mood: "shifty" },
};
const mouths = {
  smug:   "M-3.4 3.4q3.4 2.6 6.8 0",
  calm:   "M-2.6 3.6h5.2",
  happy:  "M-3.6 2.8q3.6 3.8 7.2 0",
  wild:   "M-3 2.6q3 4.4 6 0 -3 1.2-6 0z",
  tired:  "M-3.2 4q3.2-2 6.4 0",
  shifty: "M-3.6 3.6q2.4 1.6 4.4-.4",
};
const face = (id) => {
  const f = faces[id];
  const eye = (dx, tilt) => `
    <ellipse cx="${dx}" cy="0" rx="2.15" ry="2.4" fill="#fff"/>
    <circle cx="${dx + (f.mood === "shifty" ? .9 : 0)}" cy="${f.mood === "tired" ? .5 : .25}" r="1.15" fill="#17181C"/>
    ${f.mood === "tired" ? `<path d="M${dx - 2.3} -1.4q2.3-1.5 4.6 0" stroke="#17181C" stroke-width=".9" fill="none" stroke-linecap="round"/>` : ""}
    ${f.mood === "smug" ? `<path d="M${dx - 2.4} -3.2q2.4-1.4 4.8-.2" stroke="#17181C" stroke-width=".95" fill="none" stroke-linecap="round" transform="rotate(${tilt} ${dx} -3)"/>` : ""}`;
  return `<g transform="translate(${f.x} ${f.y}) scale(${f.s})">
    ${eye(-3.6, -6)}${eye(3.6, 6)}
    <path d="${mouths[f.mood]}" stroke="#17181C" stroke-width="1.05" fill="${f.mood === "wild" ? "#17181C" : "none"}" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="-7.2" cy="2.6" rx="1.7" ry="1.1" fill="#F2836E" opacity=".5"/>
    <ellipse cx="7.2" cy="2.6" rx="1.7" ry="1.1" fill="#F2836E" opacity=".5"/>
  </g>`;
};
const personified = (id) => {
  const g = `pe-${id}`;
  let defs = "", body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone), r = `${g}-${i}`;
    if (p.w) { body += draw(p, c); return; }
    defs += `<radialGradient id="${r}" cx=".36" cy=".3" r=".95">
      <stop offset="0" stop-color="${lighter(c, .3)}"/><stop offset=".6" stop-color="${c}"/>
      <stop offset="1" stop-color="${darker(c, .3)}"/></radialGradient>`;
    body += draw(p, `url(#${r})`);
  });
  return box(
    `<ellipse cx="24" cy="43.4" rx="12.5" ry="2.2" fill="#000" opacity=".35" filter="url(#r15-soft)"/>
     ${body}${face(id)}`, `<defs>${defs}</defs>`);
};

// ---- 2. typographic: the thing is its name ----------------------------------------------
// The name already carries the meaning, so the drawing stops competing with it. This is the
// only direction where Calculus and Bitcoin are no harder than Water, because a word does not
// care whether its subject has an appearance.
const typographic = (id, label) => {
  const c = hues[id].base;
  const n = label.length;
  const size = n <= 4 ? 13 : n <= 5 ? 11.4 : n <= 7 ? 9.2 : 8.2;
  return box(
    `<rect x="4" y="19.5" width="40" height="13" rx="2.4" fill="${darker(c, .5)}"/>
     <rect x="4" y="19.5" width="40" height="13" rx="2.4" fill="none" stroke="${c}" stroke-width="1.1"/>
     <rect x="4" y="30.6" width="40" height="1.9" rx=".9" fill="${c}"/>
     <text x="24" y="28.2" text-anchor="middle" fill="${lighter(c, .72)}"
       font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
       font-size="${size}" font-weight="700" letter-spacing="-.3"
       textLength="${Math.min(36, n * size * .62)}" lengthAdjust="spacingAndGlyphs">${label.toUpperCase()}</text>
     <circle cx="24" cy="13.4" r="3.1" fill="${c}"/>`);
};

// ---- 3. cutaway: the thing opened up ------------------------------------------------------
// A different claim about what is worth showing: not what a thing looks like but how it is
// put together. It is also the only direction whose pleasure is the same as the game's, which
// is finding out that you already half knew how something works.
const cut = (body, defs = "") => box(
  `<ellipse cx="24" cy="43.4" rx="12" ry="2.2" fill="#000" opacity=".3" filter="url(#r15-soft)"/>${body}`, defs);
const ring = (r, fill) => `<circle cx="24" cy="24" r="${r}" fill="${fill}"/>`;
const wedge = `<path d="M24 24L46 8v32z" fill="#0A0B0F"/>`;   // the quarter taken out
const cutaway = {
  star: cut(`${ring(18, "#F5B93C")}${ring(12.5, "#FFD87A")}${ring(6.5, "#FFF7E0")}
    <g>${wedge}</g>
    <path d="M24 24l22-16M24 24l22 16" stroke="#B85E18" stroke-width=".9" fill="none"/>
    <path d="M30 18.6q3 1.6 6 .6M30 29.4q3-1.6 6-.6" stroke="#FFF7E0" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>`),
  water: cut(`${ring(17, "#14456F")}
    <circle cx="24" cy="24" r="17" fill="none" stroke="#2E82C6" stroke-width="2"/>
    <g fill="#A8E6FF"><circle cx="19" cy="20" r="4.4"/><circle cx="27.4" cy="17.4" r="2.8"/><circle cx="26.6" cy="24.6" r="2.8"/></g>
    <g fill="#5FBEEA" opacity=".9"><circle cx="30" cy="31" r="3.4"/><circle cx="20" cy="32.4" r="2.4"/><circle cx="15.6" cy="28.6" r="2"/></g>
    <path d="M19 20l8.4-2.6M19 20l7.6 4.6" stroke="#14456F" stroke-width="1.1"/>`),
  earth: cut(`${ring(18.5, "#2E82C6")}
    <path d="M24 5.5a18.5 18.5 0 0 1 0 37z" fill="#0E3358"/>
    <g><path d="M24 24L24 5.5A18.5 18.5 0 0 1 42.5 24z" fill="#8A5A34"/>
      <path d="M24 24L24 9.6A14.4 14.4 0 0 1 38.4 24z" fill="#C4512C"/>
      <path d="M24 24L24 16.4A7.6 7.6 0 0 1 31.6 24z" fill="#FFD87A"/></g>
    <path d="M24 5.5v18.5h18.5" stroke="#F0F6FA" stroke-width="1" fill="none"/>
    <path d="M6 20c4-1.4 7 .6 10 0 3-.6 4-2.6 7-2" stroke="#4FA368" stroke-width="2.6" fill="none" stroke-linecap="round"/>`),
  life: cut(`<path d="M6 30h36v14H6z" fill="#3A2A18"/>
    <path d="M24 42V20" stroke="#4FA35C" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M24 30c-4-2-7-6-7-10 4 .4 7 4 7 10zM24 27c0-6 3-10 7-10 0 5-3 9-7 10z" fill="#4FA35C"/>
    <path d="M24 34c-3 2-4 5-4 8M24 34c3 2 4.6 5 5 8M24 31v10" stroke="#C8A06A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="31.6" r="3.6" fill="#C8E9A0"/><circle cx="24" cy="31.6" r="1.5" fill="#E8623C"/>
    <path d="M6 30h36" stroke="#6E4229" stroke-width="1" opacity=".8"/>`),
  human: cut(`<path d="M12.4 44c0-9.6 5.2-15.6 11.6-15.6S35.6 34.4 35.6 44z" fill="#C98A5E"/>
    <circle cx="24" cy="17.6" r="9.2" fill="#C98A5E"/>
    <path d="M24 8.4a9.2 9.2 0 0 1 0 18.4z" fill="#6E4229" opacity=".35"/>
    <path d="M24 10.4a7.2 7.2 0 0 1 0 14.4 7.2 7.2 0 0 1 0-14.4z" fill="#E8A0A8"/>
    <path d="M20.4 13.6q3.6-2.4 7.2 0 2.4 3.6 0 7.2-3.6 2.4-7.2 0-2.4-3.6 0-7.2z" fill="#F2C4CC"/>
    <path d="M22 14q2.4 2 0 4.2 2.4 2 0 3.6M26 14q-2.4 2 0 4.2-2.4 2 0 3.6" stroke="#B06A78" stroke-width=".85" fill="none"/>
    <path d="M24 26.8v6" stroke="#B06A78" stroke-width="1.6" stroke-linecap="round"/>`),
  fire: cut(`<path d="M24 5c9.6 9.6 14.6 15.8 14.6 21.8a14.6 14.6 0 0 1-29.2 0C9.4 20.8 14.4 14.6 24 5z" fill="#A32E12"/>
    <path d="M24 16.6c5.8 5.8 8.8 9.6 8.8 13a8.8 8.8 0 0 1-17.6 0c0-3.4 3-7.2 8.8-13z" fill="#E8762F"/>
    <path d="M24 27c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z" fill="#3A4A6E"/>
    <g stroke="#FFE8A8" stroke-width=".9" fill="none" opacity=".85">
      <path d="M38.6 27h5M9.4 27h-5M32.8 29.6h4M15.2 29.6h-4M27.6 32.4h3.4M20.4 32.4h-3.4"/></g>
    <path d="M18 40q6 3 12 0" stroke="#6E4229" stroke-width="2" fill="none" stroke-linecap="round"/>`),
  hunting: cut(`<path d="M13 7c8.4 6.4 8.4 27.6 0 34" stroke="#8A5A34" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M13 7c-2 8.6-2 25.4 0 34" stroke="#E3C08A" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M15 24h23" stroke="#4A2E18" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M40 24l-6.6-4.2v8.4z" fill="#C4452F"/>
    <g stroke="#C4452F" stroke-width=".9" fill="none" opacity=".75">
      <path d="M17.6 18.6q4 5.4 0 10.8M20.6 20.4q2.6 3.6 0 7.2"/></g>
    <path d="M33.4 19.8l4.6-3.4M33.4 28.2l4.6 3.4" stroke="#E3C08A" stroke-width=".9" fill="none" stroke-linecap="round" opacity=".8"/>`),
  tribe: cut(`<ellipse cx="24" cy="28" rx="19" ry="12" fill="#3A2A18"/>
    <ellipse cx="24" cy="28" rx="19" ry="12" fill="none" stroke="#5A3620" stroke-width="1.2"/>
    <ellipse cx="24" cy="28" rx="6.4" ry="4" fill="#E8762F"/>
    <ellipse cx="24" cy="28" rx="2.8" ry="1.8" fill="#FFD98A"/>
    <g fill="#C98A5E">
      <circle cx="9.6" cy="27" r="3"/><circle cx="38.4" cy="27" r="3"/>
      <circle cx="24" cy="16.6" r="3"/><circle cx="24" cy="39.4" r="3"/>
      <circle cx="13.6" cy="19.6" r="2.6"/><circle cx="34.4" cy="19.6" r="2.6"/>
      <circle cx="13.6" cy="36" r="2.6"/><circle cx="34.4" cy="36" r="2.6"/></g>
    <g stroke="#FFD98A" stroke-width=".7" opacity=".55" fill="none">
      <path d="M9.6 27h8M38.4 27h-8M24 16.6v7M24 39.4v-7"/></g>`),
  city: cut(`<path d="M6 44V16h14v28z" fill="#4A6480"/><path d="M22 44V24h8v20z" fill="#3A5068"/>
    <path d="M32 44V12h10v32z" fill="#4A6480"/>
    <g stroke="#1E2A3E" stroke-width=".9"><path d="M6 22h14M6 28h14M6 34h14M6 40h14M32 18h10M32 24h10M32 30h10M32 36h10M32 42h10M22 30h8M22 36h8M22 42h8"/></g>
    <g fill="#F5B93C"><rect x="8" y="17.6" width="3" height="3"/><rect x="14" y="23.6" width="3" height="3"/>
      <rect x="8" y="29.6" width="3" height="3"/><rect x="34" y="13.6" width="3" height="3"/>
      <rect x="38" y="25.6" width="3" height="3"/><rect x="34" y="37.6" width="3" height="3"/>
      <rect x="24" y="31.6" width="3" height="3"/></g>
    <path d="M2 44h44" stroke="#8A5A34" stroke-width="2"/>`),
  car: cut(`<path d="M7 33.4c0-4.8 2.6-7.8 6.2-7.8h4.4l4.2-5.8h9c2.1 0 3.4 1.7 4.4 5.8l4.2.6c1.9.3 3 1.7 3 3.6v3.6z" fill="#C4452F"/>
    <path d="M21.8 25.6h7.4l-2.4-4.2h-5z" fill="#DCE8F0"/>
    <rect x="9.6" y="26.6" width="7.6" height="5.4" rx="1" fill="#5A6A7A"/>
    <g stroke="#DCE8F0" stroke-width=".8" fill="none"><path d="M11.2 27.4v3.8M13.4 27.4v3.8M15.6 27.4v3.8"/></g>
    <rect x="24.6" y="27" width="9" height="4.6" rx="1" fill="#2A3442"/>
    <circle cx="26.8" cy="29.3" r="1.2" fill="#F5B93C"/><circle cx="31.2" cy="29.3" r="1.2" fill="#F5B93C"/>
    <circle cx="15" cy="34" r="4.6" fill="#1E1C18"/><circle cx="15" cy="34" r="1.8" fill="#8A929C"/>
    <circle cx="34" cy="34" r="4.6" fill="#1E1C18"/><circle cx="34" cy="34" r="1.8" fill="#8A929C"/>`),
  calculus: cut(`<path d="M9 40h31M11 42V9" stroke="#22405C" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M11 40q11-2 14-13T37 9V40z" fill="#4A7FA8" opacity=".35"/>
    <g fill="#4A7FA8" opacity=".85">
      <rect x="12" y="34" width="4.4" height="6"/><rect x="17" y="30.4" width="4.4" height="9.6"/>
      <rect x="22" y="25" width="4.4" height="15"/><rect x="27" y="18.6" width="4.4" height="21.4"/>
      <rect x="32" y="12" width="4.4" height="28"/></g>
    <g stroke="#CFE4F2" stroke-width=".6" opacity=".7" fill="none">
      <path d="M12 34h4.4M17 30.4h4.4M22 25h4.4M27 18.6h4.4M32 12h4.4"/></g>
    <path d="M11 40q11-2 14-13T37 9" stroke="#C4452F" stroke-width="2.2" fill="none" stroke-linecap="round"/>`),
  bitcoin: cut(`<circle cx="24" cy="24" r="15" fill="#8A4E06"/>
    <path d="M24 9a15 15 0 0 1 0 30z" fill="#F7931A"/>
    <g fill="#2A1A08">
      <rect x="27" y="14" width="2.4" height="20"/><rect x="31" y="14" width="2.4" height="20"/>
      <path d="M27.4 16.8h5.2c2.4 0 3.8 1.4 3.8 3.4s-1.4 3.4-3.8 3.4h-5.2zM27.4 25h5.6c2.5 0 4 1.4 4 3.4s-1.5 3.4-4 3.4h-5.6z"/></g>
    <g fill="#FFE0A8" opacity=".9">
      <rect x="11" y="16.4" width="4.6" height="4.6" rx=".8"/><rect x="16.6" y="16.4" width="4.6" height="4.6" rx=".8"/>
      <rect x="11" y="22" width="4.6" height="4.6" rx=".8"/><rect x="16.6" y="22" width="4.6" height="4.6" rx=".8"/>
      <rect x="11" y="27.6" width="4.6" height="4.6" rx=".8"/><rect x="16.6" y="27.6" width="4.6" height="4.6" rx=".8"/></g>
    <g stroke="#8A4E06" stroke-width=".7" fill="none"><path d="M15.6 18.7h1M15.6 24.3h1M15.6 29.9h1M13.3 21v1M18.9 21v1M13.3 26.6v1M18.9 26.6v1"/></g>`),
};

// ---- 4. naive: drawn by a hand with no skill, on purpose ---------------------------------
// Not the sketch from round 4, which was a neat line pretending to wobble. This is a wax
// crayon held in a fist: the fill overshoots the outline, the outline does not close, the
// pressure varies, and the whole point is warmth rather than craft.
const naive = (id) => {
  let body = "";
  parts[id].forEach((p, i) => {
    const c = tone(id, p.tone);
    if (p.w) { body += draw(p, c, `stroke-width="${p.w + 1.4}" opacity=".9"`); return; }
    body += draw(p, c, `opacity=".8" transform="translate(${1.2 - i * .6} ${-1 + i * .5}) scale(1.05)" transform-origin="24 24"`)
      + draw(p, lighter(c, .2), 'opacity=".55" transform="translate(-1.4 1.2) scale(.92)" transform-origin="24 24"')
      + `<path d="${p.d}" stroke="${darker(c, .45)}" stroke-width="1.6" fill="none"
          stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="26 2.2" opacity=".95"/>`;
  });
  return box(`<g filter="url(#r15-crayon)">${body}</g>`);
};

const build = (fn) => Object.fromEntries(Object.keys(parts).map((id) => [id, fn(id)]));
const LABELS = { star: "Star", water: "Water", earth: "Earth", life: "Life", human: "Human", fire: "Fire",
  hunting: "Hunting", tribe: "Tribe", city: "City", car: "Car", calculus: "Calculus", bitcoin: "Bitcoin" };
export const round15Styles = {
  personified: build(personified),
  typographic: Object.fromEntries(Object.keys(parts).map((id) => [id, typographic(id, LABELS[id])])),
  cutaway,
  naive: build(naive),
};
export const round15Notes = {
  personified: "The thing has a face and a temperament. The only direction that can make somebody laugh at the grid itself rather than at a line of text under it, and a face solves something no rendering trick has: thirty unrelated objects become one cast the moment they are all looking at you.",
  typographic: "The thing is its name, and the drawing steps out of the way. The name already carries the meaning, so nothing competes with it. The only direction where Calculus and Bitcoin are no harder than Water, because a word does not care whether its subject has an appearance.",
  cutaway: "The thing opened up, because the inside is the interesting part. A different claim about what is worth showing: not what something looks like but how it is put together. Its pleasure is the same as the game's, which is finding out you already half knew how something works.",
  naive: "Drawn by a hand with no skill, on purpose. Not the sketch from round four, which was a neat line pretending to wobble. A wax crayon held in a fist: the fill overshoots the outline, the outline does not close, and the point is warmth rather than craft.",
};
export const R15_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="r15-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="r15-crayon" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".11" numOctaves="3" seed="27" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="5" result="w"/>
    <feColorMatrix in="w" type="saturate" values="0" result="ww"/>
    <feComponentTransfer in="ww" result="wa"><feFuncA type="linear" slope=".45"/></feComponentTransfer>
    <feComposite in="wa" in2="d" operator="in" result="wax"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="wax"/></feMerge>
  </filter>
</defs></svg>`;
export { subjects } from "./shapes.js";

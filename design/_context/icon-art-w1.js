// World 1, all thirty-one, in the settled style: habitat's framing, shadow box rendering.
//
// The abstracts round settled how the framing survives a world where almost nothing has a
// place yet, and the answer is not a rule applied thirty-one times. A piece of world is drawn
// when the thing is only itself in relation to something else, and left off when the
// silhouette already carries the name.
//
//   Gravity    is a grey ball until the sheet dents under it.
//   Lightyear  is a dumbbell until there is a star at each end.
//   Moon       is a grey rock until there is a planet under it.
//   Star       is a shape until there are other stars around it.
//   Water      is a teardrop until it is about to land on something.
//   Earth      is a blue marble until its sun is in the frame.
//
// That is six of thirty-one, and it is the honest count for this world rather than a budget.
// World 1 is the universe before anywhere exists: Nebula, Rock, Volcano and Ocean have no
// neighbours to be placed next to, because there is nothing else yet. Later worlds are full of
// things that only make sense somewhere, and habitat will carry most of their weight.
import { hues as w1hues, parts as w1parts, w1subjects, disc } from "./shapes-w1.js";
import { hues as baseHues, parts as baseParts } from "./shapes.js";
import { habitatR } from "./icon-art-habitat-r.js";

const hues = { ...baseHues, ...w1hues };
const parts = { ...baseParts, ...w1parts };

const box = (b) => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${b}</svg>`;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lighter = (c, t) => "#" + hx(c).map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");

// Shadow box, unchanged from the renderer the style was chosen on: a black shadow at a 50%
// offset and blurred, the flat fill, then a 90% copy 18% lighter at half opacity, which is the
// light catching the raised edge.
const shadowbox = (id, world = "") => {
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

// The three pieces of world this set earns. Each is drawn in ink the dark card can take, and
// each explains something the silhouette on its own cannot.
const WORLDS = {
  // The sheet it dents. Without this, Gravity is a ball with four arrows pointing at it.
  gravity: `<g stroke="#A8C4E0" stroke-width=".8" fill="none" opacity=".5" stroke-linecap="round">
    <path d="M4 14q20 5 40 0M4 21q20 9 40 0M4 28q20 11 40 0M4 35q20 7 40 0"/>
    <path d="M11 11q4 13 0 26M19 10q2 14 0 28M29 10q-2 14 0 28M37 11q-4 13 0 26"/></g>`,
  // The two ends of the span, which is the only reason the distance means anything.
  lightyear: `<g fill="#F5B93C" opacity=".9">
    <path d="M6 19.4c.6 3.2 1.4 4 4.6 4.6-3.2.6-4 1.4-4.6 4.6-.6-3.2-1.4-4-4.6-4.6 3.2-.6 4-1.4 4.6-4.6z"/>
    <path d="M42 19.4c.6 3.2 1.4 4 4.6 4.6-3.2.6-4 1.4-4.6 4.6-.6-3.2-1.4-4-4.6-4.6 3.2-.6 4-1.4 4.6-4.6z"/></g>`,
  // The planet it goes around. A moon with nothing under it is a rock, and Rock is already in
  // this world four discoveries earlier.
  // Drawn as a whole circle and left to the viewBox to crop, because an arc closed by hand
  // came out as a wedge with two straight sides. It sits under the moon rather than beside
  // it: a curve along the bottom of the box is read as ground, and for a moon the ground is
  // exactly right.
  moon: `<path d="${disc(24, 72, 32)}" fill="#2E6E96" opacity=".6"/>
    <path d="${disc(24, 72, 32)}" fill="none" stroke="#7FB8DC" stroke-width="1.2" opacity=".55"/>`,
};

// Star, Water and Earth come through untouched from the set the style was chosen on, so they
// stay the control the other twenty-eight have to match.
const settled = habitatR.shadowbox;
export const w1icons = Object.fromEntries(
  w1subjects.map(([id]) => [id, settled[id] && !w1parts[id] ? settled[id] : shadowbox(id, WORLDS[id])]));

export const w1worlds = WORLDS;
export const W1_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="w1-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
</defs></svg>`;
export { w1subjects };

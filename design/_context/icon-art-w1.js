// World 1, the whole set, in the settled style: habitat's framing, shadow box rendering —
// with one rule the first review forced.
//
// Things that give off light are drawn as light; things that reflect it are paper. Shadow box
// is cut paper, and its no-glow rule was right for a drop, a moon or a volcano and wrong for a
// star, a nebula or lava, whose whole substance is glow. The first pass drew those as flat
// card and every one failed: no heat, no majesty, the nebula ugly beside the luminous ones
// from earlier rounds. So light sources here get real gradients and bloom, and sit in the
// same grid as the paper objects, which is also what a dark sky looks like.
//
// Habitat still applies to both: a piece of world is drawn when the thing is only itself in
// relation to something else — Gravity's sheet, the Moon's planet, the Star's neighbours, the
// Rock's pebbles, the Ocean's sun.
import { hues as w1hues, parts as w1parts, w1subjects, disc, star4 } from "./shapes-w1.js";
import { hues as baseHues, parts as baseParts, rng } from "./shapes.js";
import { habitatR } from "./icon-art-habitat-r.js";

const hues = { ...baseHues, ...w1hues };
const parts = { ...baseParts, ...w1parts };

const box = (b) => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${b}</svg>`;
const draw = (p, fill, extra = "") =>
  p.w ? `<path d="${p.d}" stroke="${fill}" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
      : `<path d="${p.d}" fill="${fill}" ${extra}/>`;
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lighter = (c, t) => "#" + hx(c).map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
const n = (v) => +v.toFixed(2);

// ---- paper -------------------------------------------------------------------------------
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

const WORLDS = {
  // The sheet it dents. Without this, Gravity is a ball with four arrows pointing at it.
  gravity: `<g stroke="#A8C4E0" stroke-width=".8" fill="none" opacity=".5" stroke-linecap="round">
    <path d="M4 14q20 5 40 0M4 21q20 9 40 0M4 28q20 11 40 0M4 35q20 7 40 0"/>
    <path d="M11 11q4 13 0 26M19 10q2 14 0 28M29 10q-2 14 0 28M37 11q-4 13 0 26"/></g>`,
  // Drawn as a whole circle and left to the viewBox to crop, because an arc closed by hand
  // came out as a wedge with two straight sides. It sits under the moon rather than beside
  // it: a curve along the bottom of the box is read as ground, and for a moon the ground is
  // exactly right.
  moon: `<path d="${disc(24, 72, 32)}" fill="#2E6E96" opacity=".6"/>
    <path d="${disc(24, 72, 32)}" fill="none" stroke="#7FB8DC" stroke-width="1.2" opacity=".55"/>`,
};

// ---- light -------------------------------------------------------------------------------
const ray = (cx, cy, deg, r0, r1, w) => {
  const t = (deg * Math.PI) / 180, o = t + Math.PI / 2;
  const P = (r, k) => `${n(cx + Math.cos(t) * r + Math.cos(o) * k)} ${n(cy + Math.sin(t) * r + Math.sin(o) * k)}`;
  return `M${P(r0, -w)}L${P(r0, w)}L${P(r1, 0)}Z`;
};
const star5 = (cx, cy, R, r) => "M" + Array.from({ length: 10 }, (_, i) => {
  const a = ((-90 + i * 36) * Math.PI) / 180, k = i % 2 ? r : R;
  return `${n(cx + Math.cos(a) * k)} ${n(cy + Math.sin(a) * k)}`;
}).join("L") + "Z";
const blob = (cx, cy, rad, jitter, count, seed) => {
  const r = rng(seed);
  return "M" + Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2, k = rad + (r() - .5) * 2 * jitter;
    return `${n(cx + Math.cos(a) * k)} ${n(cy + Math.sin(a) * k)}`;
  }).join("L") + "Z";
};

// A five-pointed star, because every child already draws one. Rounded tips so it glows rather
// than stabs, and its neighbours kept small and cold at the margins.
const s5 = star5(24, 25.5, 17, 7);
const star = box(`<defs><radialGradient id="st-b" cx=".5" cy=".56" r=".6">
    <stop offset="0" stop-color="#FFFCEB"/><stop offset=".45" stop-color="#FFD85A"/><stop offset="1" stop-color="#F59A1E"/></radialGradient></defs>
  <g fill="#F0F6FA" opacity=".85"><circle cx="8" cy="8" r="1"/><circle cx="41" cy="7" r=".9"/>
    <circle cx="44.5" cy="31" r=".7"/><circle cx="3.6" cy="31" r=".7"/><circle cx="24" cy="45" r=".8"/></g>
  <path d="${s5}" fill="#FFB23A" opacity=".75" filter="url(#w1-haze)"/>
  <path d="${s5}" fill="url(#st-b)" stroke="url(#st-b)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="${star5(24, 25.5, 7.5, 3.2)}" fill="#FFFDF4" opacity=".75" filter="url(#w1-fine)"/>`);

// Energy as a ball of raw charge throwing off arcs. A bolt said electricity, and warm rays said
// Star, so it goes electric blue-white: the one light in the set that is not fire-coloured.
const energy = (() => {
  const r = rng(7);
  const arcs = Array.from({ length: 7 }, (_, i) => {
    const a = ((i * 360) / 7 + r() * 22) * Math.PI / 180;
    let d = "";
    for (let s = 0; s <= 4; s++) {
      const k = 5 + s * 3.9, j = s && s < 4 ? (r() - .5) * 4.4 : 0;
      d += `${s ? "L" : "M"}${n(24 + Math.cos(a) * k - Math.sin(a) * j)} ${n(24 + Math.sin(a) * k + Math.cos(a) * j)}`;
    }
    return d;
  }).join("");
  return box(`<defs><radialGradient id="en-h"><stop offset="0" stop-color="#7A5CFF" stop-opacity=".6"/>
      <stop offset="1" stop-color="#7A5CFF" stop-opacity="0"/></radialGradient>
    <radialGradient id="en-c"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#9FEEFF"/></radialGradient></defs>
    <circle cx="24" cy="24" r="20" fill="url(#en-h)"/>
    <circle cx="24" cy="24" r="10" fill="#3FD8FF" opacity=".4" filter="url(#w1-haze)"/>
    <path d="${arcs}" stroke="#5FE0FF" stroke-width="2.6" opacity=".65" fill="none" filter="url(#w1-bloom)" stroke-linejoin="round"/>
    <path d="${arcs}" stroke="#E6FBFF" stroke-width=".9" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="7" fill="#9FF0FF" filter="url(#w1-bloom)"/>
    <circle cx="24" cy="24" r="4.6" fill="url(#en-c)"/>`);
})();

// Rays, not a wave: sunbeams fanning down from a source just above the frame. Directional, so
// it can never be confused with the radial Energy or the pointed Star.
const light = (() => {
  const src = [24, 5.5];
  const beams = [-38, -19, 0, 19, 38].map((deg) => {
    const a = (deg * Math.PI) / 180, dx = Math.sin(a), dy = Math.cos(a), px = Math.cos(a), py = -Math.sin(a);
    const P = (d, w) => `${n(src[0] + dx * d + px * w)} ${n(src[1] + dy * d + py * w)}`;
    return `M${P(3, -.6)}L${P(42, -3.8)}L${P(42, 3.8)}L${P(3, .6)}Z`;
  }).join("");
  return box(`<defs><linearGradient id="li-r" gradientUnits="userSpaceOnUse" x1="0" y1="5" x2="0" y2="46">
      <stop offset="0" stop-color="#FFF8DE"/><stop offset=".55" stop-color="#FFE38A" stop-opacity=".75"/>
      <stop offset="1" stop-color="#FFD35A" stop-opacity="0"/></linearGradient></defs>
    <path d="${beams}" fill="#FFE9A8" opacity=".55" filter="url(#w1-bloom)"/>
    <path d="${beams}" fill="url(#li-r)"/>
    <circle cx="24" cy="5.5" r="7.5" fill="#FFE9A8" opacity=".9" filter="url(#w1-haze)"/>
    <circle cx="24" cy="5.5" r="3.4" fill="#FFFFFF"/>`);
})();

// Lit gas, the way the luminous nebulas of the earlier rounds were: violet body, magenta
// heart, a teal knot, a dark dust lane for structure, and young stars inside it.
const nebula = box(`
  <g filter="url(#w1-haze)">
    <ellipse cx="22" cy="25" rx="17" ry="11" transform="rotate(-24 22 25)" fill="#5B3BC4" opacity=".85"/>
    <ellipse cx="28" cy="21" rx="12" ry="8" transform="rotate(-30 28 21)" fill="#E04FB0" opacity=".8"/>
    <ellipse cx="16" cy="30" rx="9" ry="6" transform="rotate(-10 16 30)" fill="#2FC6C8" opacity=".75"/>
  </g>
  <g filter="url(#w1-bloom)">
    <ellipse cx="26" cy="22.5" rx="7" ry="4" transform="rotate(-28 26 22.5)" fill="#FFC8EC" opacity=".75"/>
    <ellipse cx="17" cy="29.5" rx="4" ry="2.4" fill="#BFFFF6" opacity=".6"/>
  </g>
  <path d="M8 32c6-2 11-7 17-8s10 1 15-2" stroke="#170A2A" stroke-width="2.4" fill="none" opacity=".5" filter="url(#w1-fine)" stroke-linecap="round"/>
  <g fill="#FFFFFF"><circle cx="20" cy="22" r=".8"/><circle cx="35" cy="26" r=".6"/><circle cx="12" cy="24" r=".5"/>
    <circle cx="42" cy="12" r=".6" opacity=".7"/><circle cx="6" cy="40" r=".5" opacity=".7"/></g>
  <path d="${star4(31, 17, 3)}" fill="#FFFFFF" opacity=".95"/>`);

// A comet as it actually looks: a fuzzy bright head and two soft tails streaming away from the
// Sun — a curved warm dust tail and a straight blue ion tail. Hard-edged tails were a syringe,
// a bone, and a broom.
// It travels left to right, the way a reader's eye expects motion to go, so the head leads on
// the right and the tails stream back to the left.
const comet = box(`<defs>
    <linearGradient id="co-d" gradientUnits="userSpaceOnUse" x1="13" y1="35" x2="46" y2="9">
      <stop offset="0" stop-color="#FFF6E6" stop-opacity=".95"/><stop offset="1" stop-color="#FFE2B8" stop-opacity="0"/></linearGradient>
    <linearGradient id="co-i" gradientUnits="userSpaceOnUse" x1="13" y1="35" x2="46" y2="4">
      <stop offset="0" stop-color="#BFE8FF" stop-opacity=".9"/><stop offset="1" stop-color="#5FB8FF" stop-opacity="0"/></linearGradient></defs>
  <g transform="matrix(-1 0 0 1 48 0)">
  <path d="M11 32.5Q24 13 45 7L47 15Q28 22 15.5 37.5Z" fill="url(#co-d)" filter="url(#w1-bloom)"/>
  <path d="M11 32.5Q24 13 45 7L47 15Q28 22 15.5 37.5Z" fill="url(#co-d)" opacity=".8"/>
  <path d="M12.6 34.2L46 3.2L46.8 5.6L14.2 36.6Z" fill="url(#co-i)" filter="url(#w1-fine)"/>
  <circle cx="13" cy="35" r="6" fill="#CFEFFF" opacity=".75" filter="url(#w1-bloom)"/>
  <circle cx="13" cy="35" r="2.8" fill="#FFFFFF"/></g>`);

// An explosion, not a sun: a ragged shock shell, debris thrown unevenly, a white-hot core and
// the flash cross a camera sees. The symmetric ring with even spikes was a sun.
const supernova = (() => {
  const r = rng(21);
  const debris = Array.from({ length: 9 }, () =>
    ray(24, 24, r() * 360, 12 + r() * 2, 18 + r() * 5.5, .7 + r() * .6)).join("");
  return box(`<defs><radialGradient id="sn-h"><stop offset="0" stop-color="#FF7A3A" stop-opacity=".6"/>
      <stop offset="1" stop-color="#FF7A3A" stop-opacity="0"/></radialGradient></defs>
    <circle cx="24" cy="24" r="21" fill="url(#sn-h)"/>
    <path d="${blob(24, 24, 15.5, 3.2, 26, 3)}" stroke="#FF6A2E" stroke-width="3" opacity=".7" filter="url(#w1-bloom)"/>
    <path d="${blob(24, 24, 15.5, 3.2, 26, 3)}" stroke="#FFB070" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="${debris}" fill="#FFD27A"/>
    <path d="${blob(24, 24, 8.5, 3.4, 16, 11)}" fill="#FFB347" filter="url(#w1-bloom)"/>
    <path d="${blob(24, 24, 7, 2.2, 16, 11)}" fill="#FFD890"/>
    <path d="M5 24H43M24 7V41" stroke="#FFFFFF" stroke-width=".8" opacity=".55" filter="url(#w1-fine)"/>
    <circle cx="24" cy="24" r="6" fill="#D8ECFF" filter="url(#w1-bloom)"/>
    <circle cx="24" cy="24" r="3.6" fill="#F6FBFF"/>`);
})();

// Dust has to feel like dust: a drifting haze and a dense stream of fine, varied grains —
// gold, rose, iron grey — thinning towards the ends. Evenly spread sparkles were a night sky.
const stardust = (() => {
  const r = rng(5);
  const B = (t) => [(1 - t) ** 2 * 5 + 2 * (1 - t) * t * 18 + t * t * 43, (1 - t) ** 2 * 41 + 2 * (1 - t) * t * 18 + t * t * 8];
  const colours = ["#FFE3A0", "#FFD0B0", "#FFFFFF", "#E8B070", "#B8A898"];
  let grains = "";
  for (let i = 0; i < 110; i++) {
    const t = r(), [x, y] = B(t), [x2, y2] = B(Math.min(1, t + .01));
    const len = Math.hypot(x2 - x, y2 - y) || 1, nx = -(y2 - y) / len, ny = (x2 - x) / len;
    const spread = (r() + r() + r() - 1.5) * 6.5 * (1 - Math.abs(t - .5));
    grains += `<circle cx="${n(x + nx * spread)}" cy="${n(y + ny * spread)}" r="${n(.3 + r() ** 2 * 1)}"
      fill="${colours[Math.floor(r() * colours.length)]}" opacity="${n(.5 + r() * .5)}"/>`;
  }
  const glint = [.32, .55, .78].map((t) => { const [x, y] = B(t); return star4(n(x), n(y), 2.2); }).join("");
  return box(`<path d="M5 41Q18 18 43 8" stroke="#E6B070" stroke-width="12" opacity=".42" filter="url(#w1-haze)" stroke-linecap="round"/>
    <path d="M7 38Q19 19 41 10" stroke="#D07AA0" stroke-width="6" opacity=".32" filter="url(#w1-haze)" stroke-linecap="round"/>
    <path d="M9 36Q20 20 39 12" stroke="#FFE3B0" stroke-width="2.4" opacity=".3" filter="url(#w1-bloom)" stroke-linecap="round"/>
    ${grains}<path d="${glint}" fill="#FFFFFF" opacity=".95"/>`);
})();

// Gargantua, from Interstellar: the most widely recognised picture of a black hole. A black
// shadow, the far side of the disc bent up over the top and under the bottom by lensing, and
// the near side crossing in front as a bright band.
const blackhole = box(`<defs>
    <linearGradient id="bh-d" gradientUnits="userSpaceOnUse" x1="2" y1="0" x2="46" y2="0">
      <stop offset="0" stop-color="#C9481A" stop-opacity=".15"/><stop offset=".25" stop-color="#FFB35C"/>
      <stop offset=".5" stop-color="#FFF6DC"/><stop offset=".75" stop-color="#FFB35C"/>
      <stop offset="1" stop-color="#C9481A" stop-opacity=".15"/></linearGradient>
    <radialGradient id="bh-h"><stop offset="0" stop-color="#FF9A3C" stop-opacity=".4"/>
      <stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient></defs>
  <circle cx="24" cy="24" r="19" fill="url(#bh-h)"/>
  <path d="M2 24A22 3.4 0 0 1 46 24Z" fill="url(#bh-d)"/>
  <path d="M11.6 24A12.4 12.4 0 0 1 36.4 24" stroke="#FFC777" stroke-width="5" opacity=".6" filter="url(#w1-bloom)"/>
  <path d="M11.6 24A12.4 12.4 0 0 1 36.4 24" stroke="#FFF0CC" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M11.6 24A12.4 12.4 0 0 0 36.4 24" stroke="#FFB35C" stroke-width="1.4" opacity=".85" stroke-linecap="round"/>
  <circle cx="24" cy="24" r="9.6" fill="#000"/>
  <circle cx="24" cy="24" r="9.9" stroke="#FFE7B8" stroke-width=".8"/>
  <path d="M2 24A22 3.4 0 0 0 46 24Z" fill="url(#bh-d)" filter="url(#w1-fine)"/>
  <path d="M2 24A22 3.4 0 0 0 46 24Z" fill="url(#bh-d)"/>`);

// A real spiral: two logarithmic arms seen at a tilt, glowing blue-white with pink star-forming
// knots, round a warm bright bulge. Two flat crescents had the right shape and nothing else.
const galaxy = (() => {
  const tilt = (-28 * Math.PI) / 180;
  const arm = (k) => Array.from({ length: 44 }, (_, i) => {
    const th = (i / 43) * 7.6, rad = 2.2 * Math.exp(.28 * th);
    const x = rad * Math.cos(th + k), y = rad * Math.sin(th + k) * .62;
    return `${i ? "L" : "M"}${n(24 + x * Math.cos(tilt) - y * Math.sin(tilt))} ${n(24 + x * Math.sin(tilt) + y * Math.cos(tilt))}`;
  }).join("");
  const arms = arm(0) + arm(Math.PI);
  return box(`<ellipse cx="24" cy="24" rx="20" ry="12.4" transform="rotate(-28 24 24)" fill="#3050C0" opacity=".38" filter="url(#w1-haze)"/>
    <path d="${arms}" stroke="#7FB0FF" stroke-width="4.2" opacity=".55" fill="none" filter="url(#w1-bloom)" stroke-linecap="round"/>
    <path d="${arms}" stroke="#D8E8FF" stroke-width="1.3" opacity=".9" fill="none" stroke-linecap="round"/>
    <g fill="#FF8AD0"><circle cx="33.5" cy="15.5" r=".9"/><circle cx="14" cy="32.6" r=".9"/><circle cx="37" cy="27" r=".7"/>
      <circle cx="10.8" cy="21" r=".7"/></g>
    <ellipse cx="24" cy="24" rx="7.5" ry="5" transform="rotate(-28 24 24)" fill="#FFC878" opacity=".85" filter="url(#w1-bloom)"/>
    <ellipse cx="24" cy="24" rx="4.6" ry="3.2" transform="rotate(-28 24 24)" fill="#FFF0CE"/>
    <g fill="#FFFFFF" opacity=".7"><circle cx="6" cy="8" r=".6"/><circle cx="42" cy="40" r=".6"/><circle cx="44" cy="10" r=".5"/></g>`);
})();

// Heat you can feel: a black crust split into plates, white-yellow melt glowing through every
// crack, a haze of heat around it, embers and shimmer rising. The flat orange band was bread.
// The plates are shrunk towards their own centres so the melt, not the crust, is what you see.
const PLATES = [
  [[6, 31], [12, 25], [19, 27], [18, 34], [9, 37]], [[20, 26], [28, 23], [31, 30], [24, 34], [19.5, 33]],
  [[32, 24], [40, 26], [42, 32], [35, 35], [32.5, 30]], [[10, 38.5], [18.5, 35.5], [23, 39], [19, 42], [14, 41]],
  [[24.5, 35.5], [31.5, 31.5], [34.5, 36.5], [29, 41], [24, 40.5]], [[36, 36.5], [42.5, 33.5], [39.5, 39], [35.5, 40.5]],
].map((pts) => {
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return `<path d="M${pts.map(([x, y]) => `${n(cx + (x - cx) * .7)} ${n(cy + (y - cy) * .7)}`).join("L")}Z"/>`;
}).join("");
const lava = box(`<defs><radialGradient id="la-m" cx=".5" cy=".45" r=".65">
    <stop offset="0" stop-color="#FFF2B0"/><stop offset=".5" stop-color="#FFB03A"/><stop offset="1" stop-color="#E8480E"/></radialGradient></defs>
  <ellipse cx="24" cy="30" rx="22" ry="14" fill="#FF5A12" opacity=".55" filter="url(#w1-haze)"/>
  <ellipse cx="24" cy="32.5" rx="20.5" ry="10.5" fill="url(#la-m)"/>
  <g fill="#2A1B14" stroke="#4A2C1E" stroke-width=".5" stroke-linejoin="round">${PLATES}</g>
  <path d="M16 21q1.5-2 0-4t0-4M26 19q1.5-2 0-4t0-4M34 22q1.5-2 0-4" stroke="#FF9A4A" stroke-width=".7" fill="none" opacity=".45" stroke-linecap="round"/>
  <g fill="#FFD27A" filter="url(#w1-fine)"><circle cx="14" cy="16" r=".9"/><circle cx="22" cy="10" r=".7"/>
    <circle cx="30" cy="13" r="1"/><circle cx="37" cy="8.5" r=".6"/><circle cx="27" cy="5.5" r=".6"/></g>`);

// Still a piece of dark cut out and lifted, which is what made Space work, but a window into
// the deep now: violet falling to black, the Milky Way across it, a distant glow and two stars
// bright enough to flare. The paper shadow under it keeps it an object in the set.
const space = (() => {
  const panel = "M11 8h26a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5z";
  const r = rng(17);
  let dots = "";
  for (let i = 0; i < 26; i++) {
    const t = r(), along = [6 + t * 36, 38 - t * 24], off = (r() - .5) * (i < 14 ? 10 : 30);
    dots += `<circle cx="${n(along[0] + off * .55)}" cy="${n(along[1] + off * .83)}" r="${n(.22 + r() ** 2 * .6)}" opacity="${n(.45 + r() * .55)}"/>`;
  }
  return box(`<defs><linearGradient id="sp-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070A1E"/><stop offset=".55" stop-color="#151743"/><stop offset="1" stop-color="#2C1452"/></linearGradient>
    <clipPath id="sp-c"><path d="${panel}"/></clipPath></defs>
    <path d="${panel}" fill="#000" opacity=".5" transform="translate(1.8 2.4)" filter="url(#w1-soft)"/>
    <path d="${panel}" fill="url(#sp-g)"/>
    <g clip-path="url(#sp-c)">
      <path d="M2 40L46 12" stroke="#9C8CFF" stroke-width="11" opacity=".3" filter="url(#w1-haze)"/>
      <path d="M2 40L46 12" stroke="#FFE6C8" stroke-width="3.4" opacity=".22" filter="url(#w1-bloom)"/>
      <circle cx="35" cy="31" r="5" fill="#E04FB0" opacity=".28" filter="url(#w1-haze)"/>
      <g fill="#FFFFFF">${dots}</g>
      <circle cx="16" cy="17" r="3" fill="#CFE0FF" opacity=".7" filter="url(#w1-bloom)"/>
      <path d="${star4(16, 17, 3.8)}" fill="#FFFFFF"/>
      <path d="${star4(33, 23, 2.4)}" fill="#FFF3DC"/>
    </g>
    <path d="${panel}" stroke="#7C88C8" stroke-width=".8" opacity=".6"/>`);
})();

// The view that means ocean rather than water: open sea to a far horizon, a low sun, and its
// road of glitter coming towards you. The sea is paper-matte blue, pale at the horizon because
// distance is pale, and it fades into the card instead of stopping, since a sea cut off by the
// frame is a block. The sun is its one piece of world. Stacked waves were a pattern, a lens of
// sea a bowl, and Hokusai's great wave was a wave.
const ocean = (() => {
  const rows = [[22, 2.4, .5], [24.4, 3.6, .6], [27.2, 5, .7], [30.6, 6.6, .85], [34.6, 8.4, 1], [39.4, 10.4, 1.15]];
  const glitter = rows.map(([y, w, sw], i) => {
    const gap = w * .22;
    return `<path d="M${n(24 - w)} ${y}H${n(24 - gap)}M${n(24 + gap)} ${y}H${n(24 + w)}" stroke="#FFE3A0" stroke-width="${sw}"
      opacity="${n(.95 - i * .1)}" stroke-linecap="round"/>`;
  }).join("");
  return box(`<defs>
      <linearGradient id="oc-s" x1="0" y1="20" x2="0" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#8CC2EA"/><stop offset=".3" stop-color="#2E82C6"/><stop offset="1" stop-color="#123E68"/></linearGradient>
      <linearGradient id="oc-v" x1="0" y1="20" x2="0" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <linearGradient id="oc-h" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#000"/><stop offset=".16" stop-color="#fff"/><stop offset=".84" stop-color="#fff"/>
        <stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="oc-mv"><rect x="0" y="19" width="48" height="29" fill="url(#oc-v)"/></mask>
      <mask id="oc-m"><rect x="0" y="0" width="48" height="48" fill="url(#oc-h)"/></mask></defs>
    <circle cx="24" cy="20" r="9" fill="#FFB45A" opacity=".45" filter="url(#w1-haze)"/>
    <g mask="url(#oc-m)"><g mask="url(#oc-mv)">
      <rect x="0" y="20" width="48" height="28" fill="url(#oc-s)"/>
      <path d="M6 25.6h3M13 26h3.4M33 25.8h3.2M40 26.2h3M4 31h4.4M12 31.6h5M31.6 31.4h5M39.4 31h4.6M7 38h6M34 38.4h6.4"
        stroke="#A8D8F4" stroke-width=".6" opacity=".55" stroke-linecap="round"/>
      ${glitter}
    </g></g>
    <path d="M4 20H44" stroke="#C8E4F6" stroke-width=".6" opacity=".7" mask="url(#oc-m)"/>
    <path d="M18 20a6 6 0 0 1 12 0z" fill="#FFD890" filter="url(#w1-bloom)" opacity=".9"/>
    <path d="M18.6 20a5.4 5.4 0 0 1 10.8 0z" fill="#FFF0C8"/>`);
})();

// ---- the elements --------------------------------------------------------------------------
// Martin's call: the periodic-table square, symbol and atomic number, which says Hydrogen and
// not "an atom". Boring alone, so the symbol is lit like a discharge tube in the colour that
// gas really glows — hydrogen pink, helium peach, oxygen lilac, carbon arc white-blue. The four
// are made inside stars, so it is fitting that they are the four tiles that give off light.
const element = (sym, num, tile, glow) => {
  const t = "M13 8h22a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5z";
  const txt = (extra) => `<text x="24" y="31.5" text-anchor="middle" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"
    font-weight="700" font-size="${sym.length > 1 ? 17 : 19}" ${extra}>${sym}</text>`;
  return box(`<path d="${t}" fill="#000" opacity=".5" transform="translate(1.8 2.4)" filter="url(#w1-soft)"/>
    <path d="${t}" fill="${tile}"/>
    <path d="${t}" stroke="${lighter(tile, .22)}" stroke-width=".9"/>
    <text x="12.2" y="16.6" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="6.6" font-weight="600"
      fill="${lighter(tile, .6)}">${num}</text>
    ${txt(`fill="${glow}" opacity=".7" filter="url(#w1-haze)"`)}
    ${txt(`fill="${glow}" filter="url(#w1-bloom)"`)}
    ${txt(`fill="${lighter(glow, .65)}"`)}`);
};

// Light is allowed past the frame. Cropped at the viewBox, a glow ends in a hard square edge,
// which is the one thing a glow can never have; on the card it should bleed a little instead.
// Paper stays cropped, because the Moon's planet and others rely on the crop.
const unclip = (svg) => svg.replace("<svg ", '<svg overflow="visible" ');
const BESPOKE = Object.fromEntries(Object.entries({
  star, energy, light, nebula, comet, supernova, stardust, blackhole, galaxy, lava, space, ocean,
  hydrogen: element("H", 1, "#2A2340", "#FF5FB0"),
  helium: element("He", 2, "#33261E", "#FFA25A"),
  carbon: element("C", 6, "#24262C", "#A8DCFF"),
  oxygen: element("O", 8, "#1F2840", "#B49CFF"),
}).map(([id, svg]) => [id, unclip(svg)]));

// Water and Earth come through untouched from the set the style was chosen on.
const settled = habitatR.shadowbox;
export const w1icons = Object.fromEntries(w1subjects.map(([id]) =>
  [id, BESPOKE[id] ?? (w1parts[id] ? shadowbox(id, WORLDS[id]) : settled[id])]));

export const w1worlds = WORLDS;
export const w1glowing = Object.keys(BESPOKE);
export const W1_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="w1-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <filter id="w1-fine" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation=".8"/></filter>
  <filter id="w1-bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="w1-haze" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.6"/></filter>
</defs></svg>`;
export { w1subjects };

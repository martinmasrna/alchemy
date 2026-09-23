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
// `front` is light laid over the paper (a glowing sun, hot lava), because a paper thing can
// contain a light source. `scale` evens out visual weight, so a small subject is not a dot in
// the grid; it grows the thing and leaves its piece of world where it is.
const shadowbox = (id, world = "", { front = "", scale = 1 } = {}) => {
  let body = "";
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
  body += front;
  if (scale !== 1) body = `<g transform="translate(24 24) scale(${scale}) translate(-24 -24)">${body}</g>`;
  return box((world ? `<g opacity=".85">${world}</g>` : "") + body);
};

const WORLDS = {
  // Drawn as a whole circle and left to the viewBox to crop, because an arc closed by hand
  // came out as a wedge with two straight sides. It sits under the moon rather than beside
  // it: a curve along the bottom of the box is read as ground, and for a moon the ground is
  // exactly right.
  // The planet fades out downwards rather than being cut by the frame: a hard crop along the
  // bottom was the one place in the set where the viewBox showed.
  moon: `<defs><linearGradient id="mo-f" x1="0" y1="38" x2="0" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="mo-m"><rect x="0" y="0" width="48" height="48" fill="url(#mo-f)"/></mask></defs>
    <g mask="url(#mo-m)"><path d="${disc(24, 72, 32)}" fill="#2E6E96" opacity=".6"/>
    <path d="${disc(24, 72, 32)}" fill="none" stroke="#7FB8DC" stroke-width="1.2" opacity=".55"/></g>`,
};

// Light that sits inside a paper subject, laid over its parts: the Solar System's sun, which
// was the one star in the set drawn as paper, and the Volcano's lava, which was flat orange
// beside a Lava that glows.
const FRONT = {
  solarsystem: `<defs><radialGradient id="ss-s" cx=".42" cy=".4" r=".62">
      <stop offset="0" stop-color="#FFFCEB"/><stop offset=".5" stop-color="#FFD85A"/><stop offset="1" stop-color="#F59A1E"/></radialGradient></defs>
    <circle cx="24" cy="24" r="8" fill="#FFB23A" opacity=".7" filter="url(#w1-haze)"/>
    <circle cx="24" cy="24" r="6" fill="url(#ss-s)"/>`,
  volcano: `<g filter="url(#w1-bloom)" opacity=".85">
      <path d="M23 21l-2 10 1 9M27 21l2 9-1 10" stroke="#FF7A2A" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.6 18.4h6.8l-1.4 3h-4z" fill="#FFA040"/></g>
    <path d="M23 21l-2 10 1 9M27 21l2 9-1 10" stroke="#FFD27A" stroke-width=".7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#FFD24B" opacity=".8" filter="url(#w1-fine)"><circle cx="15" cy="8.5" r="2.2"/><circle cx="33" cy="8" r="2"/>
      <circle cx="24" cy="5.2" r="2.5"/><circle cx="19" cy="12" r="1.7"/><circle cx="29.4" cy="11.6" r="1.8"/></g>
    <path d="M20.6 18.4h6.8l-1.4 3h-4z" fill="#FFE08A" opacity=".85"/>`,
};

// Visual weight, evened out: Planet and the Moon's body were half the size of the full-bleed
// icons.
const SCALE = { planet: 1.2, moon: 1.2 };

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

// The deep itself, with no frame round it: violet-indigo dissolving into the card, the Milky Way
// across it, stars thinning out towards the edge, and two bright enough to flare. As a lifted
// panel it was a fifth element tile sitting next to the four real ones.
const space = (() => {
  const r = rng(17);
  let dots = "";
  for (let i = 0; i < 44; i++) {
    const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * 20, near = i < 18;
    const t = r(), x = near ? 6 + t * 36 + (r() - .5) * 6 : 24 + Math.cos(a) * rad;
    const y = near ? 38 - t * 24 + (r() - .5) * 9 : 24 + Math.sin(a) * rad;
    dots += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(.22 + r() ** 2 * .6)}" opacity="${n(.45 + r() * .55)}"/>`;
  }
  return box(`<defs><radialGradient id="sp-g" cx="24" cy="24" r="23" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#241A5C"/><stop offset=".55" stop-color="#15164A" stop-opacity=".85"/>
      <stop offset="1" stop-color="#0B0D12" stop-opacity="0"/></radialGradient>
    <radialGradient id="sp-f" cx="24" cy="24" r="22" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="sp-m"><rect x="0" y="0" width="48" height="48" fill="url(#sp-f)"/></mask></defs>
    <circle cx="24" cy="24" r="23" fill="url(#sp-g)"/>
    <g mask="url(#sp-m)">
      <path d="M2 40L46 12" stroke="#9C8CFF" stroke-width="11" opacity=".32" filter="url(#w1-haze)"/>
      <path d="M2 40L46 12" stroke="#FFE6C8" stroke-width="3.4" opacity=".24" filter="url(#w1-bloom)"/>
      <circle cx="33" cy="31" r="5" fill="#E04FB0" opacity=".3" filter="url(#w1-haze)"/>
      <g fill="#FFFFFF">${dots}</g>
    </g>
    <circle cx="17" cy="18" r="3" fill="#CFE0FF" opacity=".7" filter="url(#w1-bloom)"/>
    <path d="${star4(17, 18, 3.8)}" fill="#FFFFFF"/>
    <path d="${star4(31, 24, 2.4)}" fill="#FFF3DC"/>`);
})();

// The view that means ocean rather than water: open sea to a far horizon under a high sun, its
// glitter coming towards you. The sea is paper-matte blue, pale at the horizon because distance
// is pale, and it fades into the card instead of stopping, since a sea cut off by the frame is
// a block. The sun is its one piece of world, high and yellow: on the horizon and gold it was a
// sunset, and high and white it was the Moon. Stacked waves were a pattern, a lens of sea a bowl, Hokusai's wave a wave.
const ocean = (() => {
  const sx = 31;
  const rows = [[22, 1.6, .5], [24.4, 2.6, .6], [27.2, 3.6, .7], [30.6, 4.8, .85], [34.6, 6.2, 1], [39.4, 7.6, 1.15]];
  const glitter = rows.map(([y, w, sw], i) => {
    const gap = w * .24;
    return `<path d="M${n(sx - w)} ${y}H${n(sx - gap)}M${n(sx + gap)} ${y}H${n(sx + w)}" stroke="#FFF3C4" stroke-width="${sw}"
      opacity="${n(.9 - i * .1)}" stroke-linecap="round"/>`;
  }).join("");
  return box(`<defs>
      <linearGradient id="oc-s" x1="0" y1="20" x2="0" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#8CC2EA"/><stop offset=".3" stop-color="#2E82C6"/><stop offset="1" stop-color="#123E68"/></linearGradient>
      <linearGradient id="oc-v" x1="0" y1="20" x2="0" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <linearGradient id="oc-h" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#000"/><stop offset=".28" stop-color="#fff"/><stop offset=".72" stop-color="#fff"/>
        <stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="oc-mv"><rect x="0" y="19" width="48" height="29" fill="url(#oc-v)"/></mask>
      <mask id="oc-m"><rect x="0" y="0" width="48" height="48" fill="url(#oc-h)"/></mask></defs>
    <g mask="url(#oc-m)"><g mask="url(#oc-mv)">
      <rect x="0" y="20" width="48" height="28" fill="url(#oc-s)"/>
      <path d="M5 22.6h2M10 22.8h2.4M16 22.5h2M36 22.7h2.2M41 22.5h2M4 25.8h3M10.4 26.2h3.4M17 25.9h3M38 26.1h3.2M6 30.2h4M13 30.8h4.4M20 30.4h3.6M40 30.6h4M4 35h5M12 35.6h5.6M21 35.2h4.4M8 40.6h6M18 41.2h5"
        stroke="#A8D8F4" stroke-width=".6" opacity=".55" stroke-linecap="round"/>
      ${glitter}
    </g></g>
    <path d="M4 20H44" stroke="#C8E4F6" stroke-width=".6" opacity=".7" mask="url(#oc-m)"/>
    <circle cx="${sx}" cy="8" r="6.4" fill="#FFD24B" opacity=".6" filter="url(#w1-haze)"/>
    <circle cx="${sx}" cy="8" r="3.8" fill="#FFE070"/>
    <circle cx="${sx - .9}" cy="7.1" r="1.8" fill="#FFF6D0"/>`);
})();

// ---- matter, modelled ------------------------------------------------------------------------
// Things that reflect light, drawn by hand with the light they reflect: shading, highlights,
// rims, texture. Built from flat parts, Air was three lines, Rainbow four arcs and Cloud two
// shapes, and beside the hand-drawn lights they looked like a different, cheaper game. The
// silhouettes are the same universal shapes; only the effort changed.

const shade = (dx = 1.6, dy = 2.4, o = .45) =>
  `opacity="${o}" transform="translate(${dx} ${dy})" filter="url(#w1-soft)" fill="#000"`;

// Puffs share one gradient, lit from above and shaded blue-grey underneath, with a soft lit
// cap on each puff so the volumes read.
const puffs = (id, list, pill) => {
  const shapes = list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("") + `<path d="${pill}"/>`;
  const [top, bot] = [Math.min(...list.map(([, y, r]) => y - r)), Math.max(...list.map(([, y, r]) => y + r))];
  return `<defs><linearGradient id="${id}-g" x1="0" y1="${top}" x2="0" y2="${bot}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#EDF2FA"/><stop offset="1" stop-color="#AEBFD6"/></linearGradient>
    <clipPath id="${id}-c">${shapes}</clipPath></defs>
    <g ${shade(1.4, 2.4, .5)}>${shapes}</g>
    <g fill="url(#${id}-g)">${shapes}</g>
    <g clip-path="url(#${id}-c)">
      <ellipse cx="${n(list.reduce((s, [x]) => s + x, 0) / list.length)}" cy="${bot}" rx="18" ry="${n((bot - top) * .28)}"
        fill="#8EA3BE" opacity=".5" filter="url(#w1-fine)"/>
      <g fill="#FFFFFF" opacity=".75" filter="url(#w1-fine)">${list.map(([x, y, r]) =>
        `<circle cx="${n(x - r * .25)}" cy="${n(y - r * .3)}" r="${n(r * .55)}"/>`).join("")}</g>
    </g>`;
};

const cloud = box(puffs("cl",
  [[9.5, 31.5, 4.8], [15, 28, 7], [23, 21.5, 9.4], [32, 24, 8.4], [38.5, 30, 6]],
  "M13.5 29h23a4.2 4.2 0 0 1 0 8.4h-23a4.2 4.2 0 0 1 0-8.4z"));

// Six bands of refracted light with a soft glow behind them, and the two little clouds every
// child draws its feet into.
const rainbow = (() => {
  const cy = 33, cols = ["#E8453C", "#F28A2E", "#F7CF3A", "#58B85A", "#3D8BD9", "#7A5CC8"];
  const arc = (r) => `M${n(24 - r)} ${cy}A${r} ${r} 0 0 1 ${n(24 + r)} ${cy}`;
  const bands = cols.map((c, i) => [arc(18 - i * 1.95), c]);
  return box(`<g filter="url(#w1-bloom)" opacity=".45">${bands.map(([d, c]) =>
      `<path d="${d}" stroke="${c}" stroke-width="2.4"/>`).join("")}</g>
    ${bands.map(([d, c]) => `<path d="${d}" stroke="${c}" stroke-width="2.05"/>`).join("")}
    <path d="${arc(19)}" stroke="#FFFFFF" stroke-width=".5" opacity=".3"/>
    ${puffs("rbl", [[6.5, 33.5, 4.2], [12, 31, 5], [17.5, 33.8, 3.8]], "M6 33h12a3.4 3.4 0 0 1 0 6.8H6a3.4 3.4 0 0 1 0-6.8z")}
    ${puffs("rbr", [[41.5, 33.5, 4.2], [36, 31, 5], [30.5, 33.8, 3.8]], "M30 33h12a3.4 3.4 0 0 1 0 6.8H30a3.4 3.4 0 0 1 0-6.8z")}`);
})();

// Wind as moving, translucent ribbons that thicken and brighten as they sweep in, carrying a
// little dust. Three flat lines were a symbol for wind, not wind.
const air = (() => {
  const lines = ["M5 17h21a5.5 5.5 0 1 0-5.5-5.5", "M5 26h27a5 5 0 1 1-5 5", "M5 35h16", "M9 21.6h9"];
  const widths = [2.6, 2.6, 2.2, 1.2];
  return box(`<defs><linearGradient id="ai-g" x1="4" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#CFE6FF" stop-opacity="0"/><stop offset=".35" stop-color="#CFE6FF" stop-opacity=".75"/>
      <stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs>
    <g filter="url(#w1-bloom)" opacity=".45">${lines.slice(0, 3).map((d) =>
      `<path d="${d}" stroke="#7FB2E6" stroke-width="4.6" stroke-linecap="round"/>`).join("")}</g>
    ${lines.map((d, i) => `<path d="${d}" stroke="url(#ai-g)" stroke-width="${widths[i]}" stroke-linecap="round" ${i === 3 ? 'opacity=".55"' : ""}/>`).join("")}
    <g fill="#FFFFFF"><circle cx="30.5" cy="17.4" r=".7" opacity=".7"/><circle cx="37" cy="23" r=".5" opacity=".6"/>
      <circle cx="25" cy="35.3" r=".6" opacity=".6"/><circle cx="40" cy="36" r=".45" opacity=".5"/><circle cx="15" cy="30" r=".4" opacity=".45"/></g>`);
})();

// An hourglass with real glass: tinted bulbs with a streak of reflection, sand that glows
// where it falls, and turned wooden posts between two lit plates.
const time = box(`<defs>
    <linearGradient id="ti-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C08A52"/><stop offset="1" stop-color="#6E4524"/></linearGradient>
    <linearGradient id="ti-p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6E4524"/><stop offset=".45" stop-color="#C08A52"/><stop offset="1" stop-color="#5A3820"/></linearGradient>
    <linearGradient id="ti-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset="1" stop-color="#E09A2E"/></linearGradient>
    <linearGradient id="ti-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8F4FF" stop-opacity=".42"/>
      <stop offset=".5" stop-color="#BFD6E8" stop-opacity=".16"/><stop offset="1" stop-color="#E8F4FF" stop-opacity=".32"/></linearGradient></defs>
  <g ${shade()}><path d="M9 5.4h30v5H9zM9 34.4h30v5H9zM16 9.4H32C32 15 26.6 18.6 25.2 22H22.8C21.4 18.6 16 15 16 9.4zM16 34.6H32C32 29 26.6 25.4 25.2 22H22.8C21.4 25.4 16 29 16 34.6z"/></g>
  <path d="M12.6 10h1.8v24.6h-1.8zM33.6 10h1.8v24.6h-1.8z" fill="url(#ti-p)"/>
  <path d="M16 9.4H32C32 15 26.6 18.6 25.2 22H22.8C21.4 18.6 16 15 16 9.4zM16 34.6H32C32 29 26.6 25.4 25.2 22H22.8C21.4 25.4 16 29 16 34.6z" fill="url(#ti-g)"/>
  <path d="M18.6 13.4H29.4C28.6 15.8 26 17.8 24.8 20.4H23.2C22 17.8 19.4 15.8 18.6 13.4z" fill="url(#ti-s)"/>
  <path d="M17.2 34.4C18 30.6 20.8 28.6 24 28.6S30 30.6 30.8 34.4z" fill="url(#ti-s)"/>
  <path d="M24 20.6V28.8" stroke="#FFD27A" stroke-width="1.8" opacity=".55" filter="url(#w1-fine)"/>
  <path d="M24 20.6V28.8" stroke="#FFF0C0" stroke-width=".7"/>
  <path d="M16 9.4H32C32 15 26.6 18.6 25.2 22H22.8C21.4 18.6 16 15 16 9.4zM16 34.6H32C32 29 26.6 25.4 25.2 22H22.8C21.4 25.4 16 29 16 34.6z" stroke="#CFE2F2" stroke-width=".6" opacity=".7"/>
  <path d="M18.4 11.2C18.8 14.6 20.6 16.6 22 18.6M18.4 32.8C18.8 30 20.4 28 21.6 26.4" stroke="#FFFFFF" stroke-width=".9" opacity=".6" stroke-linecap="round"/>
  <path d="M10.5 5.4h27a1.6 1.6 0 0 1 1.6 1.6v1.8a1.6 1.6 0 0 1-1.6 1.6h-27a1.6 1.6 0 0 1-1.6-1.6V7a1.6 1.6 0 0 1 1.6-1.6zM10.5 34.4h27a1.6 1.6 0 0 1 1.6 1.6v1.8a1.6 1.6 0 0 1-1.6 1.6h-27a1.6 1.6 0 0 1-1.6-1.6V36a1.6 1.6 0 0 1 1.6-1.6z" fill="url(#ti-w)"/>
  <path d="M10.4 5.9h27.2M10.4 34.9h27.2" stroke="#E8C28E" stroke-width=".6" opacity=".8"/>`);

// The composition Martin passed — a mass, the sheet it dents, four arrows falling in — with the
// finish the rest of the set has: a lit, heavy ball, a warped grid that glows and fades out
// before its edges, and arrows that catch the light. Redrawn as a perspective funnel with a
// marble spiralling in, it read as a net and then as a ball under a lid.
const gravity = box(`<defs><radialGradient id="gr-f" cx="24" cy="24" r="23" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
  <mask id="gr-m"><rect x="0" y="0" width="48" height="48" fill="url(#gr-f)"/></mask>
  <radialGradient id="gr-b" cx=".36" cy=".3" r=".75"><stop offset="0" stop-color="#A4B0D2"/>
    <stop offset=".55" stop-color="#454E70"/><stop offset="1" stop-color="#1C2034"/></radialGradient></defs>
  <g mask="url(#gr-m)" stroke-linecap="round">
    <path d="M4 14q20 5 40 0M4 21q20 9 40 0M4 28q20 11 40 0M4 35q20 7 40 0M11 11q4 13 0 26M19 10q2 14 0 28M29 10q-2 14 0 28M37 11q-4 13 0 26"
      stroke="#7FB0E8" stroke-width="1.8" opacity=".25" filter="url(#w1-bloom)"/>
    <path d="M4 14q20 5 40 0M4 21q20 9 40 0M4 28q20 11 40 0M4 35q20 7 40 0M11 11q4 13 0 26M19 10q2 14 0 28M29 10q-2 14 0 28M37 11q-4 13 0 26"
      stroke="#9CC4F0" stroke-width=".6" opacity=".7"/>
  </g>
  <path d="M20.2 6.4L24 10.2L27.8 6.4M41.6 20.2L37.8 24L41.6 27.8M27.8 41.6L24 37.8L20.2 41.6M6.4 27.8L10.2 24L6.4 20.2"
    stroke="#7FB0E8" stroke-width="3.6" opacity=".35" filter="url(#w1-bloom)" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.2 6.4L24 10.2L27.8 6.4M41.6 20.2L37.8 24L41.6 27.8M27.8 41.6L24 37.8L20.2 41.6M6.4 27.8L10.2 24L6.4 20.2"
    stroke="#CFE6FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="24" cy="24" r="9.4" fill="#000" opacity=".5" transform="translate(1.6 2.4)" filter="url(#w1-soft)"/>
  <circle cx="24" cy="24" r="9.4" fill="url(#gr-b)"/>
  <path d="M17.6 29.6a9.4 9.4 0 0 0 14.2-.9" stroke="#8FB8E8" stroke-width=".8" opacity=".6" stroke-linecap="round"/>
  <ellipse cx="20.6" cy="20.4" rx="2.6" ry="1.7" fill="#FFFFFF" opacity=".55"/>`);

// A glossy particle and the track it leaves in a cloud chamber, sweeping in from behind in one
// arc, droplets growing and brightening towards it. A track that curled back under the ball
// was a string, and the whole thing a balloon.
const particle = (() => {
  const drops = Array.from({ length: 22 }, (_, i) => {
    const t = i / 21, u = 1 - t;
    const x = u * u * 4 + 2 * u * t * 12 + t * t * 22.5, y = u * u * 42 + 2 * u * t * 26 + t * t * 23.5;
    return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(.3 + t * .85)}" opacity="${n(.15 + t * .7)}"/>`;
  }).join("");
  return box(`<defs><radialGradient id="pa-b" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#E6F7FF"/>
      <stop offset=".45" stop-color="#5FBEEA"/><stop offset="1" stop-color="#1E5C84"/></radialGradient></defs>
    <g fill="#9FD8F4">${drops}</g>
    <circle cx="29.5" cy="18.5" r="8.2" fill="#000" opacity=".45" transform="translate(1.6 2.4)" filter="url(#w1-soft)"/>
    <circle cx="29.5" cy="18.5" r="8.2" fill="url(#pa-b)"/>
    <path d="M24.4 23.4a8.2 8.2 0 0 0 12.6-1.6" stroke="#A8E6FF" stroke-width=".8" opacity=".7" stroke-linecap="round"/>
    <ellipse cx="26.6" cy="15.4" rx="2.6" ry="1.8" transform="rotate(-30 26.6 15.4)" fill="#FFFFFF" opacity=".8"/>`);
})();

// Glossy water about to land: light caught at the bottom of the drop, a sharp reflection, a
// thin bright rim, and ripples spreading on the surface it falls towards.
const water = box(`<defs><radialGradient id="wa-b" cx=".4" cy=".66" r=".72"><stop offset="0" stop-color="#8FD0F6"/>
    <stop offset=".5" stop-color="#2E82C6"/><stop offset="1" stop-color="#123E68"/></radialGradient>
    <clipPath id="wa-c"><path d="${baseParts.water[0].d}"/></clipPath></defs>
  <ellipse cx="24" cy="42" rx="14" ry="2.6" fill="#2E82C6" opacity=".35"/>
  <ellipse cx="24" cy="42.2" rx="17.5" ry="3.3" stroke="#5FBEEA" stroke-width=".8" opacity=".5"/>
  <ellipse cx="24" cy="42.6" rx="21.5" ry="4.2" stroke="#5FBEEA" stroke-width=".6" opacity=".25"/>
  <ellipse cx="25.5" cy="41.4" rx="8" ry="1.6" fill="#000" opacity=".4" filter="url(#w1-soft)"/>
  <path d="${baseParts.water[0].d}" fill="url(#wa-b)"/>
  <g clip-path="url(#wa-c)"><ellipse cx="26" cy="34.5" rx="8" ry="4.5" fill="#9FE4FF" opacity=".45" filter="url(#w1-fine)"/></g>
  <path d="${baseParts.water[0].d}" stroke="#A8E6FF" stroke-width=".6" opacity=".55"/>
  <path d="${baseParts.water[1].d}" fill="#FFFFFF" opacity=".78"/>
  <circle cx="30" cy="24.5" r="1.3" fill="#FFFFFF" opacity=".75"/>
  <circle cx="9" cy="37" r=".9" fill="#8FD0F6" opacity=".7"/><circle cx="39.5" cy="36.2" r=".7" fill="#8FD0F6" opacity=".6"/>`);

// The summit, so the most finished drawing in the world: lit ocean, shaded land, clouds
// crossing it, a night side, a halo of atmosphere, and its sun. It still has to pass the test
// the whole style was built on: Earth has to be obviously Earth.
const earth = box(`<defs>
    <radialGradient id="ea-o" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#6CBAF0"/>
      <stop offset=".5" stop-color="#2E82C6"/><stop offset="1" stop-color="#123E68"/></radialGradient>
    <linearGradient id="ea-l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7CCB84"/><stop offset="1" stop-color="#3E8A52"/></linearGradient>
    <radialGradient id="ea-n" cx="14" cy="13" r="32" gradientUnits="userSpaceOnUse"><stop offset=".5" stop-color="#050A1A" stop-opacity="0"/>
      <stop offset="1" stop-color="#050A1A" stop-opacity=".72"/></radialGradient>
    <clipPath id="ea-c"><circle cx="24" cy="24" r="17"/></clipPath></defs>
  <circle cx="24" cy="24" r="18.4" stroke="#6FC2FF" stroke-width="2.2" opacity=".45" filter="url(#w1-bloom)"/>
  <circle cx="24" cy="24" r="17" fill="#000" opacity=".45" transform="translate(1.6 2.4)" filter="url(#w1-soft)"/>
  <circle cx="24" cy="24" r="17" fill="url(#ea-o)"/>
  <g clip-path="url(#ea-c)">
    <path d="${baseParts.earth[1].d}${baseParts.earth[2].d}" fill="url(#ea-l)"/>
    <path d="M9 14c5-3 11-3 15-1M26 30c4 1.4 9 .8 13-2M11 32c3 1.6 6 1.8 9 1" stroke="#FFFFFF" stroke-width="1.6" opacity=".7" stroke-linecap="round" filter="url(#w1-fine)"/>
    <path d="M28 12c3-1 6-.6 8 1" stroke="#FFFFFF" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="17" fill="url(#ea-n)"/>
    <ellipse cx="17" cy="15" rx="5" ry="3" fill="#FFFFFF" opacity=".22" filter="url(#w1-fine)"/>
  </g>
  <circle cx="24" cy="24" r="17" stroke="#BFE8FF" stroke-width=".6" opacity=".55"/>
  <circle cx="41.5" cy="6.5" r="4" fill="#FFD890" opacity=".8" filter="url(#w1-bloom)"/>
  <circle cx="41.5" cy="6.5" r="1.9" fill="#FFFBEA"/>`);

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
  cloud, rainbow, air, time, gravity, particle, water, earth,
  hydrogen: element("H", 1, "#2A2340", "#FF5FB0"),
  helium: element("He", 2, "#33261E", "#FFA25A"),
  carbon: element("C", 6, "#24262C", "#A8DCFF"),
  oxygen: element("O", 8, "#1F2840", "#B49CFF"),
}).map(([id, svg]) => [id, unclip(svg)]));

// Water and Earth come through untouched from the set the style was chosen on.
const settled = habitatR.shadowbox;
export const w1icons = Object.fromEntries(w1subjects.map(([id]) =>
  [id, BESPOKE[id] ?? (w1parts[id]
    ? shadowbox(id, WORLDS[id], { front: FRONT[id] ?? "", scale: SCALE[id] ?? 1 })
    : settled[id])]));

export const w1worlds = WORLDS;
export const w1glowing = Object.keys(BESPOKE);
export const W1_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="w1-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.7"/></filter>
  <filter id="w1-fine" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation=".8"/></filter>
  <filter id="w1-bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="w1-haze" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.6"/></filter>
</defs></svg>`;
export { w1subjects };

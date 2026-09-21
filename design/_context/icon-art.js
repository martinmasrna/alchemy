// Four ILLUSTRATION directions, as opposed to four weights of the same pictogram.
//
// The previous round was one family wearing four coats: monoline geometry, thin, heavy,
// filled, wobbly. None of it was art. These four have colour, depth and a point of view,
// and they are as different from each other as a woodcut is from a neon sign.
//
// The coherence argument still holds and is the whole reason this is safe: emoji are chaos
// because thirty different artists chose thirty palettes. Here we choose the palette once,
// so a full-colour set is as coherent as a monochrome one.
//
// 48x48 box, because illustration needs room that a 24 box does not give.
const A = (id, body, extra = "") =>
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true" data-art="${id}">${extra}${body}</svg>`;

// Star geometry, shared so the styles are compared on drawing and not on shape.
const STAR = "M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6-2.2-9.8-6.8-14.4-16.6-16.6 9.8-2.2 14.4-6.8 16.6-16.6z";
const STAR_S = "M24 14c1.4 6.2 4.3 9.1 10.5 10.5-6.2 1.4-9.1 4.3-10.5 10.5-1.4-6.2-4.3-9.1-10.5-10.5 6.2-1.4 9.1-4.3 10.5-10.5z";
const DROP = "M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z";
const BLOB = "M11 20c0-6.4 7-10.2 12.4-7.6 6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2-8 .4-11-7.6-7.8-13z";

// A burst of n spikes, as one filled polygon.
const burst = (n, rOut, rIn, cx = 24, cy = 24) => {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n;
    const r = i % 2 ? rIn : rOut;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy - r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};

// ---- 1. paper: cut and layered. Flat shapes, no outline, one warm limited palette ------
// The look of a mid-century science book: gouache shapes laid over each other, the darker
// tone doing the shading because there is no shading, only another piece of paper.
const pa = { cream: "#F0E3C8", amber: "#E7A23C", rust: "#C4512C", teal: "#2F7F73", deep: "#22344E", violet: "#6A5AA8", sky: "#4E86C6" };
const paper = {
  energy: A("pa-energy", `
    <path d="${burst(8, 21, 6.5)}" fill="${pa.rust}"/>
    <path d="${burst(8, 17, 5)}" fill="${pa.amber}" transform="rotate(22.5 24 24)"/>
    <circle cx="24" cy="24" r="5.4" fill="${pa.cream}"/>`),
  gravity: A("pa-gravity", `
    <path d="M3 15c10 0 11.4 5.4 15.2 12.4 2.2 4 3.8 5.6 5.8 5.6s3.6-1.6 5.8-5.6C33.6 20.4 35 15 45 15v5.6c-6.6 0-7.6 4-11 10.4-2.8 5.2-5.6 8-10 8s-7.2-2.8-10-8C10.6 24.6 9.6 20.6 3 20.6z" fill="${pa.deep}"/>
    <circle cx="26" cy="40" r="6.6" fill="${pa.rust}"/>
    <circle cx="23.4" cy="37.6" r="6.6" fill="${pa.amber}"/>`),
  star: A("pa-star", `
    <path d="${STAR}" fill="${pa.rust}" transform="translate(2.4 2.4)"/>
    <path d="${STAR}" fill="${pa.amber}"/>
    <path d="${STAR_S}" fill="${pa.cream}" transform="translate(-1.4 -1.4)"/>`),
  nebula: A("pa-nebula", `
    <path d="${BLOB}" fill="${pa.violet}" transform="translate(3 2)"/>
    <path d="${BLOB}" fill="${pa.sky}" opacity="1"/>
    <path d="M18 22c0-4 4.4-6.4 7.8-4.8 3.8-3.6 10.4-1.2 10.4 4 2.6 1.6 2.2 6.4-1.6 7.6-2.4 4-8.8 4-11.8 1.4-5 .2-7-4.8-4.8-8.2z" fill="${pa.cream}" opacity=".55"/>
    <circle cx="15" cy="16" r="1.9" fill="${pa.cream}"/><circle cx="38" cy="33" r="1.5" fill="${pa.cream}"/>`),
  water: A("pa-water", `
    <path d="${DROP}" fill="${pa.deep}" transform="translate(2 1.6)"/>
    <path d="${DROP}" fill="${pa.sky}"/>
    <path d="M19.6 27.6c0-3 1.8-6.4 4.6-10.4-4.8 5.2-8 9.6-8 13.2 0 3.2 1.6 5.8 4.2 7.2-.6-3-.8-6.6-.8-10z" fill="${pa.cream}" opacity=".7"/>`),
  earth: A("pa-earth", `
    <circle cx="24" cy="24" r="19" fill="${pa.deep}"/>
    <circle cx="22.4" cy="22.4" r="19" fill="${pa.sky}"/>
    <path d="M12 17c4.4-1.4 7.4.6 10.6 0 3-.6 4.4-3 8-2.2 2.6.6 3.4 3 1.6 4.8-2.4 2.4-6.6 1.4-9.4 3-3 1.8-2.4 4.8-6 5-3.4.2-5.6-2.2-5.6-5.4 0-2.4.2-4.4.8-5.2z" fill="${pa.teal}"/>
    <path d="M17.6 33.6c2.6-1.8 5.4-.4 8.4-.8 2.4-.4 4-2 6-1 1.8.9 1.4 3.2-.6 4.4-3.6 2.2-8 3-11.4 1.8-2.4-.8-3.4-2.8-2.4-4.4z" fill="${pa.teal}"/>
    <path d="M6.2 30.4a19 19 0 0 0 33.6 4.2 19 19 0 0 1-33.6-4.2z" fill="${pa.cream}" opacity=".18"/>`),
};

// ---- 2. luminous: the thing actually emits light ---------------------------------------
// Radial light, dark cores, rim light. The one style whose subject matter is literally
// correct: a star is a glowing ball, a nebula is lit gas, a planet has a terminator.
const luminous = {
  energy: A("lu-energy", `
    <circle cx="24" cy="24" r="21" fill="url(#lu-e-glow)"/>
    <path d="${burst(8, 22, 3.2)}" fill="url(#lu-e-ray)"/>
    <circle cx="24" cy="24" r="6" fill="#FFF6DF"/>`,
    `<defs>
      <radialGradient id="lu-e-glow"><stop offset=".1" stop-color="#FFC24B" stop-opacity=".55"/><stop offset="1" stop-color="#FFC24B" stop-opacity="0"/></radialGradient>
      <radialGradient id="lu-e-ray"><stop offset="0" stop-color="#FFF6DF"/><stop offset=".55" stop-color="#FFC24B"/><stop offset="1" stop-color="#FF8A3D" stop-opacity=".25"/></radialGradient>
    </defs>`),
  gravity: A("lu-gravity", `
    <ellipse cx="24" cy="30" rx="21" ry="11" fill="url(#lu-g-well)"/>
    <path d="M3 15q10.5 0 15.6 12 2.9 6.6 5.4 6.6t5.4-6.6Q34.5 15 45 15" stroke="url(#lu-g-line)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="36" r="8" fill="url(#lu-g-ball-glow)"/>
    <circle cx="24" cy="36" r="4.4" fill="#FFD98A"/>`,
    `<defs>
      <radialGradient id="lu-g-well"><stop offset=".2" stop-color="#7AA7FF" stop-opacity=".45"/><stop offset="1" stop-color="#7AA7FF" stop-opacity="0"/></radialGradient>
      <linearGradient id="lu-g-line" x1="0" x2="1"><stop offset="0" stop-color="#7AA7FF" stop-opacity=".25"/><stop offset=".5" stop-color="#CFE2FF"/><stop offset="1" stop-color="#7AA7FF" stop-opacity=".25"/></linearGradient>
      <radialGradient id="lu-g-ball-glow"><stop offset=".3" stop-color="#FFD98A" stop-opacity=".75"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>
    </defs>`),
  star: A("lu-star", `
    <circle cx="24" cy="24" r="22" fill="url(#lu-s-glow)"/>
    <path d="${STAR}" fill="url(#lu-s-body)"/>
    <circle cx="24" cy="24" r="7.4" fill="#FFFDF6"/>`,
    `<defs>
      <radialGradient id="lu-s-glow"><stop offset=".15" stop-color="#FFD15C" stop-opacity=".7"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
      <radialGradient id="lu-s-body"><stop offset="0" stop-color="#FFFDF6"/><stop offset=".45" stop-color="#FFD15C"/><stop offset="1" stop-color="#FF9A3C" stop-opacity=".55"/></radialGradient>
    </defs>`),
  nebula: A("lu-nebula", `
    <g filter="url(#lu-n-soft)">
      <ellipse cx="20" cy="21" rx="15" ry="12" fill="#8E6BE8" opacity=".85"/>
      <ellipse cx="30" cy="27" rx="13" ry="10" fill="#3FA9C9" opacity=".75"/>
      <ellipse cx="25" cy="24" rx="8" ry="7" fill="#E86BA8" opacity=".6"/>
    </g>
    <circle cx="14" cy="14" r="1.6" fill="#FFF"/><circle cx="36" cy="18" r="1.1" fill="#FFF" opacity=".85"/>
    <circle cx="33" cy="35" r="1.4" fill="#FFF" opacity=".95"/><circle cx="17" cy="34" r="1" fill="#FFF" opacity=".7"/>`,
    `<defs><filter id="lu-n-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.6"/></filter></defs>`),
  water: A("lu-water", `
    <path d="${DROP}" fill="url(#lu-w-body)"/>
    <ellipse cx="19" cy="30" rx="3.4" ry="5" fill="#EAF8FF" opacity=".75" transform="rotate(-18 19 30)"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z" stroke="url(#lu-w-rim)" stroke-width="1.4" fill="none"/>`,
    `<defs>
      <radialGradient id="lu-w-body" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#8FE3FF"/><stop offset=".55" stop-color="#2E8FD6"/><stop offset="1" stop-color="#14355E"/></radialGradient>
      <linearGradient id="lu-w-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF8FF" stop-opacity=".95"/><stop offset="1" stop-color="#EAF8FF" stop-opacity="0"/></linearGradient>
    </defs>`),
  earth: A("lu-earth", `
    <circle cx="24" cy="24" r="21" fill="url(#lu-t-atmo)"/>
    <circle cx="24" cy="24" r="18" fill="url(#lu-t-sea)"/>
    <g clip-path="url(#lu-t-clip)" opacity="1">
      <path d="M9 19c5-2 8 .6 11.6 0 3.4-.6 5-3.2 9-2.4 3 .6 3.8 3.4 1.8 5.4-2.8 2.6-7.4 1.6-10.6 3.4-3.4 2-2.8 5.4-6.8 5.6-3.8.2-6.4-2.4-6.4-6z" fill="#3E9E6B"/>
      <path d="M17 35c3-2 6-.4 9.4-1 2.8-.4 4.6-2.2 6.8-1 2 1 1.6 3.6-.6 5-4 2.4-9 3.2-12.8 2-2.6-.8-3.8-3-2.8-5z" fill="#3E9E6B"/>
    </g>
    <circle cx="24" cy="24" r="18" fill="url(#lu-t-term)"/>
    <path d="M24 6a18 18 0 0 1 12.8 5.3" stroke="#CFF3FF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".95"/>`,
    `<defs>
      <clipPath id="lu-t-clip"><circle cx="24" cy="24" r="18"/></clipPath>
      <radialGradient id="lu-t-atmo"><stop offset=".84" stop-color="#6FD3FF" stop-opacity="0"/><stop offset=".92" stop-color="#6FD3FF" stop-opacity=".45"/><stop offset="1" stop-color="#6FD3FF" stop-opacity="0"/></radialGradient>
      <radialGradient id="lu-t-sea" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="#4FB6EE"/><stop offset=".7" stop-color="#1D5E9E"/><stop offset="1" stop-color="#0B2540"/></radialGradient>
      <radialGradient id="lu-t-term" cx=".34" cy=".28" r=".92"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#00040B" stop-opacity=".82"/></radialGradient>
    </defs>`),
};

// ---- 3. riso: two inks, off-register, grain --------------------------------------------
// A risograph prints one ink at a time and never lines them up perfectly. The offset IS the
// style. Two inks means the whole set is coherent by construction, and the third colour is
// free: it is what the two make where they overlap.
// A risograph multiplies its inks into paper. There is no paper here, and multiply against a
// near-black ground makes black, so this overprints the other way: the inks add light, and the
// third colour appears where they overlap. Same misregistration, same grain, lit instead of printed.
const PINK = "#FF4F7B", BLUE = "#3D7BFF";
const R = (body) => `<g filter="url(#riso-grain)" style="mix-blend-mode:screen">${body}</g>`;
const riso = {
  energy: A("ri-energy", R(`
    <path d="${burst(8, 21, 6)}" fill="${BLUE}" opacity="1" transform="translate(-1.6 1.4)"/>
    <path d="${burst(8, 21, 6)}" fill="${PINK}" opacity=".95" transform="translate(1.6 -1.4)"/>`)),
  gravity: A("ri-gravity", R(`
    <path d="M3 14q10.5 0 15.6 12 2.9 6.6 5.4 6.6t5.4-6.6Q34.5 14 45 14" stroke="${BLUE}" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="1" transform="translate(-1.4 1.2)"/>
    <path d="M3 14q10.5 0 15.6 12 2.9 6.6 5.4 6.6t5.4-6.6Q34.5 14 45 14" stroke="${PINK}" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".95" transform="translate(1.4 -1.2)"/>
    <circle cx="22.6" cy="38.4" r="6.4" fill="${BLUE}" opacity="1"/>
    <circle cx="25.4" cy="36.6" r="6.4" fill="${PINK}" opacity=".95"/>`)),
  star: A("ri-star", R(`
    <path d="${STAR}" fill="${BLUE}" opacity="1" transform="translate(-1.8 1.6)"/>
    <path d="${STAR}" fill="${PINK}" opacity=".95" transform="translate(1.8 -1.6)"/>`)),
  nebula: A("ri-nebula", R(`
    <path d="${BLOB}" fill="${BLUE}" opacity=".95" transform="translate(-2.4 1.8)"/>
    <path d="${BLOB}" fill="${PINK}" opacity=".95" transform="translate(2.4 -1.8)"/>
    <circle cx="14" cy="15" r="1.8" fill="${BLUE}"/><circle cx="37" cy="34" r="1.5" fill="${PINK}"/>`)),
  water: A("ri-water", R(`
    <path d="${DROP}" fill="${BLUE}" opacity="1" transform="translate(-1.8 1.4)"/>
    <path d="${DROP}" fill="${PINK}" opacity=".95" transform="translate(1.8 -1.4)"/>`)),
  earth: A("ri-earth", R(`
    <circle cx="22.2" cy="25.6" r="18.5" fill="${BLUE}" opacity="1"/>
    <circle cx="25.8" cy="22.4" r="18.5" fill="${PINK}" opacity=".8"/>
    <g fill="${BLUE}" opacity=".95">
      <path d="M11 19c4.4-1.4 7.4.6 10.6 0 3-.6 4.4-3 8-2.2 2.6.6 3.4 3 1.6 4.8-2.4 2.4-6.6 1.4-9.4 3-3 1.8-2.4 4.8-6 5-3.4.2-5.6-2.2-5.6-5.4z"/>
      <path d="M17 34.6c2.6-1.8 5.4-.4 8.4-.8 2.4-.4 4-2 6-1 1.8.9 1.4 3.2-.6 4.4-3.6 2.2-8 3-11.4 1.8-2.4-.8-3.4-2.8-2.4-4.4z"/>
    </g>`)),
};

// ---- 4. plate: an engraved astronomy plate ---------------------------------------------
// One ink, and every tone made of lines. This is the only style whose own history is the
// same subject: people drew the sky like this for two hundred years before photographs.
const INK = "#E4D8B8";
const hatchRays = (n, r0, r1, wob = 0) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const rr = r1 - (wob ? (i % 3) * wob : 0);
    d += `M${(24 + r0 * Math.cos(a)).toFixed(2)} ${(24 + r0 * Math.sin(a)).toFixed(2)}L${(24 + rr * Math.cos(a)).toFixed(2)} ${(24 + rr * Math.sin(a)).toFixed(2)}`;
  }
  return d;
};
// Latitude lines across a sphere, bunching toward the limb the way an engraver spaces them.
const latitudes = (r, n) => {
  let d = "";
  for (let i = 1; i < n; i++) {
    const t = -1 + (2 * i) / n;
    const y = 24 + t * r * 0.94;
    const half = Math.sqrt(Math.max(r * r - (y - 24) * (y - 24), 0));
    d += `M${(24 - half).toFixed(2)} ${y.toFixed(2)}q${half.toFixed(2)} ${(2.6 * (1 - Math.abs(t))).toFixed(2)} ${(2 * half).toFixed(2)} 0`;
  }
  return d;
};
const plate = {
  energy: A("pl-energy", `
    <path d="M24 9q2.4 3.6 0 7.2t0 7.2M24 39q-2.4-3.6 0-7.2t0-7.2M9 24q3.6-2.4 7.2 0t7.2 0M39 24q-3.6 2.4-7.2 0t-7.2 0M13.4 13.4q3.4 1 4.6 3.6t3.6 4.6M34.6 34.6q-3.4-1-4.6-3.6t-3.6-4.6M34.6 13.4q-1 3.4-3.6 4.6t-4.6 3.6M13.4 34.6q1-3.4 3.6-4.6t4.6-3.6" stroke="${INK}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`),
  gravity: A("pl-gravity", `
    <g stroke="${INK}" fill="none" stroke-linecap="round">
      <path d="M2 14q11 0 16.4 10.4 3 5.8 5.6 5.8t5.6-5.8Q35 14 46 14" stroke-width="1.1"/>
      <path d="M2 19q11 0 16.4 11.4 3 6.4 5.6 6.4t5.6-6.4Q35 19 46 19" stroke-width="1.1" opacity=".8"/>
      <path d="M2 24.5q11 0 16.4 12.4 3 7 5.6 7t5.6-7Q35 24.5 46 24.5" stroke-width="1.1" opacity=".55"/>
      <path d="M13 13.6v5.2M19.5 16.4v6.6M30 16v6.8M36.6 13.4v5.4" stroke-width=".9" opacity=".45"/>
    </g>
    <circle cx="24" cy="31.6" r="4.6" fill="${INK}"/>`),
  star: A("pl-star", `
    <path d="${hatchRays(24, 9.5, 21, 3.2)}" stroke="${INK}" stroke-width=".95" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="6.6" fill="${INK}"/>
    <circle cx="24" cy="24" r="9" stroke="${INK}" stroke-width="1.1" fill="none" opacity=".7"/>`),
  nebula: A("pl-nebula", `
    <path d="${BLOB}" stroke="${INK}" stroke-width="1.1" fill="none"/>
    <g fill="${INK}">
      <circle cx="20" cy="21" r="1.05"/><circle cx="26" cy="19" r=".8"/><circle cx="31" cy="22" r="1"/>
      <circle cx="23" cy="25" r=".75"/><circle cx="29" cy="27" r=".95"/><circle cx="18" cy="26" r=".7"/>
      <circle cx="34" cy="26" r=".65"/><circle cx="25" cy="31" r=".85"/><circle cx="20" cy="30" r=".6"/>
      <circle cx="32" cy="31" r=".55"/><circle cx="27" cy="23" r=".55"/><circle cx="16" cy="23" r=".5"/>
    </g>`),
  water: A("pl-water", `
    <path d="${DROP}" stroke="${INK}" stroke-width="1.2" fill="none"/>
    <g stroke="${INK}" stroke-width=".85" fill="none" stroke-linecap="round" opacity=".85">
      <path d="M15.4 29.6q3.4 2.2 6.8 0M13.2 33.4q5.2 3 10.4 0M14.4 37q6.2 3.4 12.4 0M18.4 39.8q4.4 2 8.8 0M17.6 25.8q2.6 1.6 5.2 0"/>
    </g>
    <path d="M26.4 13.6q3 4.4 4.4 7.6" stroke="${INK}" stroke-width="1" opacity=".5" fill="none" stroke-linecap="round"/>`),
  earth: A("pl-earth", `
    <circle cx="24" cy="24" r="18.5" stroke="${INK}" stroke-width="1.2" fill="none"/>
    <path d="${latitudes(18.5, 9)}" stroke="${INK}" stroke-width=".8" fill="none" opacity=".75"/>
    <path d="M24 5.5c-5.4 5.6-5.4 31.4 0 37M24 5.5c5.4 5.6 5.4 31.4 0 37M24 5.5v37" stroke="${INK}" stroke-width=".8" fill="none" opacity=".6"/>
    <path d="M13.6 17.4c4-1.2 6.6.6 9.4 0 2.6-.6 4-2.6 7-2 2.4.6 3 2.6 1.4 4.2-2 2-5.8 1.2-8.2 2.6-2.6 1.6-2 4.2-5.2 4.4-3 .2-5.6-2-5.6-5z" fill="${INK}" opacity=".95"/>
    <path d="M19 32.6c2.2-1.6 4.6-.4 7.2-.8 2-.4 3.4-1.8 5.2-.8 1.6.8 1.2 2.8-.6 3.8-3 1.8-6.8 2.6-9.8 1.6-2-.6-2.8-2.4-2-3.8z" fill="${INK}" opacity=".95"/>`),
};

export const artStyles = { paper, luminous, riso, plate };
export const artNotes = {
  paper: "Cut and layered gouache shapes, no outline, one warm limited palette. A mid-century science book: the shading is just another piece of paper.",
  luminous: "The thing actually emits light. Radial light, dark cores, rim light, a real terminator on the planet. The only style whose physics is literally correct.",
  riso: "Two inks, laid down one at a time and never quite lined up. The misregistration is the style and the third colour is free where they overlap. Printed grain, but lit rather than printed, because a dark screen is not paper.",
  plate: "An engraved astronomy plate. One ink, every tone made of lines. People drew the sky exactly like this for two hundred years before photography.",
};
export const artSubjects = [
  ["energy", "Energy"], ["gravity", "Gravity"], ["star", "Star"],
  ["nebula", "Nebula"], ["water", "Water"], ["earth", "Earth"],
];
// One shared grain filter for riso; it has to live in the page, not in each icon.
export const RISO_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="riso-grain" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="a"><feFuncA type="linear" slope=".5"/></feComponentTransfer>
    <feComposite in="SourceGraphic" in2="a" operator="arithmetic" k1=".55" k2=".78" k3="0" k4="0"/>
  </filter>
</defs></svg>`;

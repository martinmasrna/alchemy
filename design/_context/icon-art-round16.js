// Round 16. The axis was right and all four executions were bad, which is worth separating.
// Forty-eight drawings in one pass is how four columns end up crude: a face pasted onto a
// droplet, a word in a box, a wedge cut out of a disc.
//
// So this round trades breadth for quality. Six subjects rather than twelve, spanning
// cosmology, the everyday, a person and a pure abstraction, each drawn properly. The full
// twelve once a direction survives.
//
// Still the depiction axis, four strategies nobody has tried here:
//
//   compound  the icon visibly contains the two things that made it
//   action    the thing caught mid-verb instead of sitting still
//   habitat   the thing plus exactly one piece of the world it belongs to
//   cutout    the thing is the absence: everything except it is drawn
//
// compound is the one that could only exist in this game. It cannot spoil anything, because
// an icon is only ever seen after its recipe has already been found.

const box = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const C = {
  sun: "#F5B93C", sunLt: "#FFE9A8", sunDk: "#C46A12", hot: "#FFF7E0", ember: "#D8451C",
  sea: "#2E82C6", seaLt: "#A8E6FF", seaDk: "#123E68", abyss: "#08203A",
  land: "#4FA368", landDk: "#2B6B45", cloud: "#F0F6FA",
  skin: "#C98A5E", skinDk: "#6E4229", skinLt: "#F2D6B8",
  coin: "#F7931A", coinDk: "#8A4E06", coinLt: "#FFE0A8", ink: "#2A1A08",
  neb: "#8E6BE8", grav: "#5C7FD8", night: "#0B0D14", ground: "#2A2118",
};
export const subjects6 = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"],
  ["human", "Human"], ["fire", "Fire"], ["bitcoin", "Bitcoin"],
];
// Recipes, real for world 1 and plausible for the later worlds. Only used by `compound`.
export const madeOf = {
  star: "Nebula + Gravity", water: "Hydrogen + Oxygen", earth: "Ocean + Air",
  human: "Cell + Time", fire: "Wood + Lightning", bitcoin: "Computer + Money",
};

// =========================================================================================
// 1. COMPOUND — the icon carries its own recipe inside it
// =========================================================================================
const compound = {
  star: box(`
    <circle cx="24" cy="24" r="21" fill="url(#cp-s-h)"/>
    <path d="M9 12q10-3 17 4t13 3" stroke="${C.neb}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".5" filter="url(#r16-soft)"/>
    <path d="M40 30a16 16 0 0 1-30 4" stroke="${C.grav}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M10 34l-1.6-4.6 4.6 1.4z" fill="${C.grav}" opacity=".9"/>
    <circle cx="24" cy="24" r="10.5" fill="url(#cp-s-c)"/>
    <circle cx="24" cy="24" r="5" fill="${C.hot}"/>`,
    `<defs><radialGradient id="cp-s-h"><stop offset=".15" stop-color="${C.sun}" stop-opacity=".5"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
     <radialGradient id="cp-s-c"><stop offset="0" stop-color="${C.hot}"/><stop offset=".6" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient></defs>`),
  water: box(`
    <path d="M24 5c8.2 10.2 12.6 16.8 12.6 22.4a12.6 12.6 0 0 1-25.2 0C11.4 21.8 15.8 15.2 24 5z" fill="url(#cp-w-b)"/>
    <g opacity=".92">
      <circle cx="24" cy="26.4" r="6.2" fill="${C.seaLt}" opacity=".35"/>
      <circle cx="24" cy="26.4" r="4" fill="${C.seaLt}" opacity=".55"/>
      <circle cx="17.6" cy="21.6" r="3" fill="${C.cloud}" opacity=".75"/>
      <circle cx="30.4" cy="21.6" r="3" fill="${C.cloud}" opacity=".75"/>
      <path d="M19.6 23.4l2.6 1.8M28.4 23.4l-2.6 1.8" stroke="${C.cloud}" stroke-width="1.1" opacity=".7"/>
    </g>
    <ellipse cx="18.6" cy="31" rx="2.4" ry="4" fill="${C.cloud}" opacity=".5" transform="rotate(-18 18.6 31)"/>`,
    `<defs><radialGradient id="cp-w-b" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient></defs>`),
  earth: box(`
    <circle cx="24" cy="24" r="19.6" fill="url(#cp-e-air)"/>
    <circle cx="24" cy="24" r="17" fill="url(#cp-e-sea)"/>
    <g clip-path="url(#cp-e-c)">
      <path d="M10 19.6c4.6-1.8 7.8.6 11 0 3.2-.6 4.6-3 8.4-2.2 2.8.6 3.6 3.2 1.6 5-2.6 2.4-6.8 1.4-9.8 3.2-3.2 1.8-2.6 5-6.2 5.2-3.6.2-6-2.2-6-5.6z" fill="${C.land}"/>
      <path d="M7 30q8 4 17 0t17 2v14H7z" fill="${C.sea}" opacity=".85"/>
      <path d="M7 33.4q8 3.6 17 0t17 1.6" stroke="${C.seaLt}" stroke-width="1.2" fill="none" opacity=".8"/>
    </g>
    <path d="M6.4 18.6q8-5 17.6-1t17.6-3" stroke="${C.cloud}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M8 13.6q7-3.4 14 .4" stroke="${C.cloud}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>`,
    `<defs><clipPath id="cp-e-c"><circle cx="24" cy="24" r="17"/></clipPath>
     <radialGradient id="cp-e-air"><stop offset=".84" stop-color="${C.cloud}" stop-opacity="0"/><stop offset=".93" stop-color="${C.cloud}" stop-opacity=".55"/><stop offset="1" stop-color="${C.cloud}" stop-opacity="0"/></radialGradient>
     <radialGradient id="cp-e-sea" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient></defs>`),
  human: box(`
    <path d="M12.4 44c0-9.6 5.2-15.6 11.6-15.6S35.6 34.4 35.6 44z" fill="${C.skin}"/>
    <circle cx="24" cy="17.6" r="9.2" fill="${C.skin}"/>
    <path d="M24 8.4a9.2 9.2 0 0 1 0 18.4z" fill="${C.skinDk}" opacity=".3"/>
    <circle cx="24" cy="17.6" r="6" fill="${C.skinLt}" opacity=".45"/>
    <circle cx="24" cy="17.6" r="2.4" fill="${C.skinDk}" opacity=".7"/>
    <path d="M24 11.6a6 6 0 0 1 0 12" stroke="${C.cloud}" stroke-width="1" fill="none" opacity=".6"/>
    <path d="M16.6 36a7.4 7.4 0 0 0 14.8 0" stroke="${C.skinDk}" stroke-width="1.2" fill="none" opacity=".55"/>
    <path d="M24 32.4v7l3.6 2.4" stroke="${C.cloud}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".85"/>
    <circle cx="24" cy="36.4" r="7.6" fill="none" stroke="${C.cloud}" stroke-width="1.1" opacity=".55"/>`),
  fire: box(`
    <path d="M6 38h36v6H6z" fill="${C.ground}"/>
    <path d="M9 40.6q8-3 15 0t15-1" stroke="${C.skinDk}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M24 6c9.6 9.6 14.6 15.8 14.6 21.8a14.6 14.6 0 0 1-29.2 0C9.4 20.8 14.4 14.6 24 6z" fill="url(#cp-f-a)"/>
    <path d="M24 17c5.8 5.8 8.8 9.6 8.8 13a8.8 8.8 0 0 1-17.6 0c0-3.4 3-7.2 8.8-13z" fill="url(#cp-f-b)"/>
    <path d="M24 27c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z" fill="${C.hot}"/>
    <path d="M31 4l-4.6 8h5L28 20" stroke="${C.sunLt}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`,
    `<defs><linearGradient id="cp-f-a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".75"/></linearGradient>
     <linearGradient id="cp-f-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sunLt}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient></defs>`),
  bitcoin: box(`
    <circle cx="24" cy="24" r="15.4" fill="url(#cp-b-c)"/>
    <g fill="${C.ink}">
      <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
      <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>
    <g stroke="${C.coinLt}" stroke-width="1" fill="none" opacity=".85">
      <path d="M8.6 24h5.4M34 24h5.4M24 8.6v5.4M24 34v5.4"/>
      <circle cx="8.6" cy="24" r="1.5" fill="${C.coinLt}" stroke="none"/>
      <circle cx="39.4" cy="24" r="1.5" fill="${C.coinLt}" stroke="none"/>
      <circle cx="24" cy="8.6" r="1.5" fill="${C.coinLt}" stroke="none"/>
      <circle cx="24" cy="39.4" r="1.5" fill="${C.coinLt}" stroke="none"/></g>
    <circle cx="24" cy="24" r="15.4" fill="none" stroke="${C.coinDk}" stroke-width="1"/>`,
    `<defs><radialGradient id="cp-b-c" cx=".34" cy=".3"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient></defs>`),
};

// =========================================================================================
// 2. ACTION — caught mid-verb
// =========================================================================================
const action = {
  star: box(`
    <circle cx="24" cy="24" r="22" fill="none" stroke="${C.sunLt}" stroke-width="1.2" opacity=".35"/>
    <circle cx="24" cy="24" r="17" fill="none" stroke="${C.sun}" stroke-width="2" opacity=".6"/>
    <circle cx="24" cy="24" r="21" fill="url(#ac-s-h)"/>
    <circle cx="24" cy="24" r="8.6" fill="url(#ac-s-c)"/>
    <circle cx="24" cy="24" r="3.6" fill="#fff"/>`,
    `<defs><radialGradient id="ac-s-h"><stop offset=".2" stop-color="${C.sun}" stop-opacity=".75"/><stop offset="1" stop-color="${C.ember}" stop-opacity="0"/></radialGradient>
     <radialGradient id="ac-s-c"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${C.sunLt}"/><stop offset="1" stop-color="${C.sun}"/></radialGradient></defs>`),
  water: box(`
    <path d="M24 2v9" stroke="${C.seaLt}" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>
    <path d="M24 8c6.4 8.6 9.8 14 9.8 18.4a9.8 9.8 0 0 1-19.6 0C14.2 22 17.6 16.6 24 8z" fill="url(#ac-w-b)"/>
    <ellipse cx="20.6" cy="26" rx="2" ry="3.4" fill="${C.cloud}" opacity=".6" transform="rotate(-16 20.6 26)"/>
    <path d="M9 40q6-2.6 10-8M39 40q-6-2.6-10-8" stroke="${C.sea}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/>
    <ellipse cx="24" cy="41.4" rx="11" ry="2.2" fill="none" stroke="${C.seaLt}" stroke-width="1.3" opacity=".7"/>
    <circle cx="13.6" cy="37" r="1.5" fill="${C.seaLt}"/><circle cx="34.4" cy="37" r="1.5" fill="${C.seaLt}"/>`,
    `<defs><radialGradient id="ac-w-b" cx=".36" cy=".28" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient></defs>`),
  earth: box(`
    <circle cx="24" cy="24" r="17" fill="url(#ac-e-s)"/>
    <g clip-path="url(#ac-e-c)">
      <path d="M8 19c4.6-1.8 7.8.6 11 0 3.2-.6 4.6-3 8.4-2.2 2.8.6 3.6 3.2 1.6 5-2.6 2.4-6.8 1.4-9.8 3.2-3.2 1.8-2.6 5-6.2 5.2-3.6.2-6-2.2-6-5.6z" fill="${C.land}"/>
      <path d="M32 33c2.8-1.8 5.6-.4 8.6-1 2.6-.4 4.2-2 6.2-1v8H30z" fill="${C.land}"/>
      <circle cx="24" cy="24" r="17" fill="url(#ac-e-t)"/></g>
    <g stroke="${C.cloud}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8">
      <path d="M41.6 16.4q3.4 1 5.4 0M41 22q3.6 1 6 0M40.4 27.6q3.4 1 5.4 0"/></g>
    <path d="M24 5.4a18.6 18.6 0 0 1 12.8 5.2" stroke="${C.seaLt}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    `<defs><clipPath id="ac-e-c"><circle cx="24" cy="24" r="17"/></clipPath>
     <radialGradient id="ac-e-s" cx=".34" cy=".3" r=".92"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>
     <radialGradient id="ac-e-t" cx=".3" cy=".26" r=".95"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient></defs>`),
  human: box(`
    <path d="M17 44l2.4-11.4-3.8-7.4 3-8.6 6.6-2.2 6 3.6 4.6 6.4" stroke="${C.skin}" stroke-width="5.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.6 44l2.6-12.6" stroke="${C.skin}" stroke-width="5.4" fill="none" stroke-linecap="round"/>
    <circle cx="20.6" cy="10.6" r="5.4" fill="${C.skinLt}"/>
    <path d="M13.6 26.4l-5.2 4.6" stroke="${C.skin}" stroke-width="4.4" fill="none" stroke-linecap="round"/>
    <path d="M9.6 44q7-2.6 14 0" stroke="${C.skinDk}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".5"/>`),
  fire: box(`
    <path d="M6 41h36v3.4H6z" fill="${C.ground}"/>
    <path d="M24 9c9.2 9.2 14 15.2 14 21a14 14 0 0 1-28 0c0-5.8 4.8-11.8 14-21z" fill="url(#ac-f-a)"/>
    <path d="M24 20c5.4 5.4 8.2 9 8.2 12.2a8.2 8.2 0 0 1-16.4 0c0-3.2 2.8-6.8 8.2-12.2z" fill="url(#ac-f-b)"/>
    <path d="M24 29.4c2.2 2.2 3.4 3.8 3.4 5a3.4 3.4 0 0 1-6.8 0c0-1.2 1.2-2.8 3.4-5z" fill="#fff" opacity=".9"/>
    <g fill="${C.sunLt}">
      <circle cx="13.6" cy="15" r="1.5" opacity=".9"/><circle cx="34.6" cy="11.6" r="1.2" opacity=".8"/>
      <circle cx="30" cy="5.4" r="1" opacity=".7"/><circle cx="17" cy="7" r="1.15" opacity=".8"/>
      <circle cx="39" cy="19" r=".9" opacity=".6"/></g>`,
    `<defs><linearGradient id="ac-f-a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset=".7" stop-color="${C.ember}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".2"/></linearGradient>
     <linearGradient id="ac-f-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient></defs>`),
  bitcoin: box(`
    <g transform="translate(24 24) rotate(-16) translate(-24 -24)">
      <ellipse cx="24" cy="24" rx="9.4" ry="15.4" fill="url(#ac-b-c)"/>
      <ellipse cx="24" cy="24" rx="9.4" ry="15.4" fill="none" stroke="${C.coinDk}" stroke-width="1"/>
      <g fill="${C.ink}" transform="translate(24 24) scale(.62 1) translate(-24 -24)">
        <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
        <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>
    </g>
    <path d="M9 14q-2.6 10 0 20M39 14q2.6 10 0 20" stroke="${C.coinLt}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M13.6 10.6q-3.4 13.4 0 26.8" stroke="${C.coin}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".4"/>`,
    `<defs><linearGradient id="ac-b-c" x1="0" x2="1"><stop offset="0" stop-color="${C.coinDk}"/><stop offset=".45" stop-color="${C.coinLt}"/><stop offset="1" stop-color="${C.coin}"/></linearGradient></defs>`),
};

// =========================================================================================
// 3. HABITAT — the thing plus exactly one piece of its world
// =========================================================================================
const habitat = {
  star: box(`
    <g fill="${C.cloud}"><circle cx="8" cy="10" r="1.1" opacity=".85"/><circle cx="40" cy="8.6" r=".85" opacity=".7"/>
      <circle cx="37" cy="36" r="1" opacity=".75"/><circle cx="11" cy="38" r=".8" opacity=".6"/>
      <circle cx="43" cy="22" r=".7" opacity=".55"/><circle cx="5.6" cy="26" r=".7" opacity=".5"/></g>
    <circle cx="24" cy="24" r="19" fill="url(#hb-s-h)"/>
    <circle cx="24" cy="24" r="10" fill="url(#hb-s-c)"/>
    <circle cx="24" cy="24" r="4.6" fill="${C.hot}"/>`,
    `<defs><radialGradient id="hb-s-h"><stop offset=".2" stop-color="${C.sun}" stop-opacity=".55"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
     <radialGradient id="hb-s-c"><stop offset="0" stop-color="${C.hot}"/><stop offset=".6" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient></defs>`),
  water: box(`
    <path d="M4 36h40" stroke="${C.seaDk}" stroke-width="1.2" opacity=".8"/>
    <path d="M24 8c7.4 9.6 11.4 15.6 11.4 20.6 0 4-2.6 7-6.4 7.4H19c-3.8-.4-6.4-3.4-6.4-7.4C12.6 23.6 16.6 17.6 24 8z" fill="url(#hb-w-b)"/>
    <ellipse cx="24" cy="36" rx="11.4" ry="2.4" fill="${C.sea}" opacity=".55"/>
    <ellipse cx="19.6" cy="26" rx="2.2" ry="3.8" fill="${C.cloud}" opacity=".6" transform="rotate(-16 19.6 26)"/>
    <ellipse cx="24" cy="36.6" rx="16" ry="3.2" fill="none" stroke="${C.sea}" stroke-width="1" opacity=".5"/>
    <ellipse cx="24" cy="37.4" rx="20" ry="4" fill="none" stroke="${C.sea}" stroke-width=".8" opacity=".3"/>`,
    `<defs><radialGradient id="hb-w-b" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient></defs>`),
  earth: box(`
    <circle cx="16" cy="26" r="15.6" fill="url(#hb-e-s)"/>
    <g clip-path="url(#hb-e-c)">
      <path d="M3 22c4.2-1.6 7-.4 9.8-1 3-.6 4.2-2.8 7.6-2 2.6.6 3.2 2.8 1.4 4.6-2.4 2.2-6.2 1.2-9 3-2.8 1.6-2.4 4.6-5.6 4.8-3.2.2-5.4-2-5.4-5z" fill="${C.land}"/>
      <circle cx="16" cy="26" r="15.6" fill="url(#hb-e-t)"/></g>
    <circle cx="39" cy="12" r="4.6" fill="url(#hb-e-sun)"/>
    <path d="M16 10.4a15.6 15.6 0 0 1 11 4.4" stroke="${C.seaLt}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
    `<defs><clipPath id="hb-e-c"><circle cx="16" cy="26" r="15.6"/></clipPath>
     <radialGradient id="hb-e-s" cx=".6" cy=".2" r=".95"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".65" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>
     <radialGradient id="hb-e-t" cx=".72" cy=".18" r="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".82"/></radialGradient>
     <radialGradient id="hb-e-sun"><stop offset=".3" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient></defs>`),
  human: box(`
    <path d="M4 40h40" stroke="${C.ground}" stroke-width="2.4"/>
    <path d="M26 40q9-1.6 17-6" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round" opacity=".38"/>
    <path d="M14.6 40c0-8.6 4.4-14 9.4-14s9.4 5.4 9.4 14z" fill="${C.skin}"/>
    <circle cx="24" cy="17.6" r="8" fill="${C.skinLt}"/>
    <path d="M24 9.6a8 8 0 0 1 0 16z" fill="${C.skinDk}" opacity=".25"/>`),
  fire: box(`
    <path d="M10 38.6h28" stroke="${C.ground}" stroke-width="3" stroke-linecap="round"/>
    <path d="M13.6 38.6q10.4-5 20.8 0" stroke="${C.skinDk}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M24 8c9.2 9.2 14 15.2 14 21a14 14 0 0 1-28 0c0-5.8 4.8-11.8 14-21z" fill="url(#hb-f-a)"/>
    <path d="M24 19c5.4 5.4 8.2 9 8.2 12.2a8.2 8.2 0 0 1-16.4 0c0-3.2 2.8-6.8 8.2-12.2z" fill="url(#hb-f-b)"/>
    <path d="M24 28.4c2.2 2.2 3.4 3.8 3.4 5a3.4 3.4 0 0 1-6.8 0c0-1.2 1.2-2.8 3.4-5z" fill="#fff" opacity=".9"/>
    <ellipse cx="24" cy="40" rx="17" ry="4" fill="url(#hb-f-g)"/>`,
    `<defs><linearGradient id="hb-f-a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".7"/></linearGradient>
     <linearGradient id="hb-f-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient>
     <radialGradient id="hb-f-g"><stop offset="0" stop-color="${C.sun}" stop-opacity=".55"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient></defs>`),
  bitcoin: box(`
    <path d="M4 34h40" stroke="#1C232E" stroke-width="10"/>
    <ellipse cx="24" cy="34" rx="13" ry="3" fill="#000" opacity=".45" filter="url(#r16-soft)"/>
    <g transform="translate(0 -6)">
      <circle cx="24" cy="24" r="14" fill="url(#hb-b-c)"/>
      <g fill="${C.ink}" transform="translate(24 24) scale(.92) translate(-24 -24)">
        <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
        <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>
      <circle cx="24" cy="24" r="14" fill="none" stroke="${C.coinLt}" stroke-width="1" opacity=".7"/>
    </g>`,
    `<defs><radialGradient id="hb-b-c" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient></defs>`),
};

// =========================================================================================
// 4. CUTOUT — the thing is the absence
// =========================================================================================
const cutout = (id, shape, colour) => box(
  `<rect x="2" y="2" width="44" height="44" rx="8" fill="url(#co-${id})" mask="url(#co-m-${id})"/>`,
  `<defs>
    <linearGradient id="co-${id}" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="${colour[0]}"/><stop offset="1" stop-color="${colour[1]}"/></linearGradient>
    <mask id="co-m-${id}"><rect x="2" y="2" width="44" height="44" rx="8" fill="#fff"/>${shape}</mask>
  </defs>`);
const cutouts = {
  star: cutout("s", `<path d="M24 6c2.4 10.4 7.2 15.2 17.6 17.6C31.2 26 26.4 30.8 24 41.2 21.6 30.8 16.8 26 6.4 23.6 16.8 21.2 21.6 16.4 24 6z" fill="#000"/>`, [C.sunLt, C.sunDk]),
  water: cutout("w", `<path d="M24 7c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 23.4 16 17 24 7z" fill="#000"/>`, [C.seaLt, C.seaDk]),
  earth: cutout("e", `<circle cx="24" cy="24" r="16.6" fill="#000"/>
    <path d="M11.6 20c4.4-1.6 7.4.6 10.6 0 3-.6 4.4-3 8-2.2 2.6.6 3.4 3 1.6 4.8-2.6 2.4-6.8 1.6-9.8 3.2-3 1.8-2.4 4.8-6 5-3.4.2-5.6-2.2-5.6-5.4z" fill="#fff"/>
    <path d="M18 33.6c2.6-1.8 5.6-.4 8.6-1 2.4-.4 4-2 6-1 1.8.9 1.4 3.2-.6 4.4-3.6 2.2-8.2 3-11.6 1.8-2.4-.8-3.4-2.8-2.4-4.2z" fill="#fff"/>`, ["#7FD2F5", C.abyss]),
  human: cutout("h", `<path d="M13 42c0-9 5-14.6 11-14.6S35 33 35 42z" fill="#000"/><circle cx="24" cy="17.6" r="8.6" fill="#000"/>`, [C.skinLt, C.skinDk]),
  fire: cutout("f", `<path d="M24 7c9.2 9.2 14 15.2 14 21a14 14 0 0 1-28 0c0-5.8 4.8-11.8 14-21z" fill="#000"/>
    <path d="M24 18c5.4 5.4 8.2 9 8.2 12.2a8.2 8.2 0 0 1-16.4 0c0-3.2 2.8-6.8 8.2-12.2z" fill="#fff"/>`, [C.sunLt, C.ember]),
  bitcoin: cutout("b", `<circle cx="24" cy="24" r="15.4" fill="#000"/>
    <g fill="#fff"><path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
      <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>`, [C.coinLt, C.coinDk]),
};

export const round16Styles = { compound, action, habitat, cutout: cutouts };
export const round16Notes = {
  compound: "The icon visibly contains the two things that made it. Star is a nebula still falling into its own core, Water has its hydrogen and oxygen in it, Earth is an ocean with an atmosphere over it. This one could only exist in this game, and it cannot spoil anything, because an icon is only ever seen after its recipe has been found.",
  action: "Caught mid-verb instead of sitting still. The star is igniting rather than shining, the drop is landing rather than hanging, the planet is turning, the person is walking, the coin is spinning. A grid of these is a grid of things happening.",
  habitat: "The thing plus exactly one piece of the world it belongs to. A star gets a few other stars, a drop gets the surface it lands on, Earth gets its sun, a person gets a ground and a long shadow. One element, never a scene.",
  cutout: "The thing is the absence. Everything except it is drawn, and the shape is a hole punched through a field of its own colour. The most legible thing in the entire search, because a silhouette at maximum contrast is all a small icon ever really is.",
};
export const R16_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="r16-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
</defs></svg>`;

// Round 18. Back to the depiction axis itself.
//
// Round 17 was a framing mistake: habitat advanced and I varied habitat's sub-kinds instead
// of staying on the axis, which is exactly the narrowing error from round 12 wearing new
// clothes. All four came out worse than the thing they were meant to improve.
//
// So: four depiction strategies that have not been tried. Not four kinds of habitat.
//
//   scale     the thing beside something whose size everyone already knows
//   plan      everything seen from directly overhead, one unusual viewpoint held for all
//   specimen  the thing collected, mounted and catalogued
//   macro     a characteristic detail at huge magnification, not the whole object
//
// Six subjects again, drawn properly. The best single drawing of round 15 was Tribe seen from
// above, which is the lead `plan` is following up.
export const subjects6 = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"],
  ["human", "Human"], ["fire", "Fire"], ["bitcoin", "Bitcoin"],
];
const box = (b, d = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${d}${b}</svg>`;
const C = {
  sun: "#F5B93C", sunLt: "#FFE9A8", sunDk: "#C46A12", hot: "#FFF7E0", ember: "#D8451C",
  sea: "#2E82C6", seaLt: "#A8E6FF", seaDk: "#123E68", abyss: "#08203A",
  land: "#4FA368", landDk: "#2B6B45", cloud: "#F0F6FA",
  skin: "#C98A5E", skinDk: "#6E4229", skinLt: "#F2D6B8",
  coin: "#F7931A", coinDk: "#8A4E06", coinLt: "#FFE0A8", ink: "#2A1A08",
  stone: "#6E6A62", ground: "#2A2118", brass: "#B9975B", card: "#1B1E26",
};

// =========================================================================================
// 1. SCALE — the thing beside something whose size everyone already knows
// Magnitude is the actual subject of a game that runs from a particle to a planet, and it is
// the one thing a picture of an object alone can never say.
// =========================================================================================
const scale = {
  star: box(`<circle cx="20" cy="24" r="17" fill="url(#sc-s)"/>
    <circle cx="20" cy="24" r="17" fill="none" stroke="${C.sunLt}" stroke-width=".8" opacity=".4"/>
    <circle cx="42.6" cy="24" r="1.7" fill="${C.sea}"/>
    <path d="M42.6 30v4M40.6 34h4" stroke="${C.cloud}" stroke-width=".7" opacity=".55"/>`,
    `<defs><radialGradient id="sc-s" cx=".36" cy=".3"><stop offset="0" stop-color="${C.hot}"/><stop offset=".55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient></defs>`),
  water: box(`<path d="M6 40q10-9 21-4 5 2 15 .6-9 7-19 5.4Q12 40.6 6 40z" fill="${C.landDk}"/>
    <path d="M10 40q9-5 19-2" stroke="${C.land}" stroke-width="1.2" fill="none" opacity=".85"/>
    <path d="M22 8c7 9 10.6 14.8 10.6 19.6a10.6 10.6 0 0 1-21.2 0C11.4 22.8 15 17 22 8z" fill="url(#sc-w)"/>
    <ellipse cx="18.2" cy="26" rx="2" ry="3.4" fill="${C.cloud}" opacity=".6" transform="rotate(-16 18.2 26)"/>`,
    `<defs><radialGradient id="sc-w" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient></defs>`),
  earth: box(`<circle cx="19" cy="25" r="15" fill="url(#sc-e)"/>
    <g clip-path="url(#sc-ec)">
      <path d="M6 21c4-1.6 6.8.6 9.6 0 2.8-.6 4-2.8 7.4-2 2.4.6 3 2.8 1.2 4.4-2.2 2.2-6 1.2-8.6 2.8-2.8 1.6-2.2 4.4-5.4 4.6-3 .2-5.2-2-5.2-4.8z" fill="${C.land}"/></g>
    <circle cx="40.6" cy="15" r="4.1" fill="#9A9AA4"/>
    <circle cx="41.8" cy="13.8" r="1" fill="#7A7A86"/><circle cx="39.4" cy="16.2" r=".8" fill="#7A7A86"/>
    <path d="M34 25h12" stroke="${C.cloud}" stroke-width=".6" opacity=".35" stroke-dasharray="1.6 1.8"/>`,
    `<defs><clipPath id="sc-ec"><circle cx="19" cy="25" r="15"/></clipPath>
     <radialGradient id="sc-e" cx=".34" cy=".3" r=".92"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient></defs>`),
  human: box(`<path d="M2 42h44" stroke="${C.ground}" stroke-width="2.4"/>
    <path d="M32 42V22l7-6 7 6v20z" fill="${C.stone}"/><path d="M36 42V32h6v10z" fill="${C.ground}"/>
    <path d="M30.4 22.6L39 15.4l8.6 7.2" stroke="${C.skinDk}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M12 42c0-7 3.6-11.4 8-11.4S28 35 28 42z" fill="${C.skin}"/>
    <circle cx="20" cy="25.4" r="6.4" fill="${C.skinLt}"/>
    <path d="M20 19a6.4 6.4 0 0 1 0 12.8z" fill="${C.skinDk}" opacity=".25"/>`),
  fire: box(`<path d="M2 41h44" stroke="${C.ground}" stroke-width="2.6"/>
    <path d="M38 41V20" stroke="#C8A06A" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M38 20c1.8 1.8 2.8 3 2.8 4.2a2.8 2.8 0 0 1-5.6 0c0-1.2 1-2.4 2.8-4.2z" fill="${C.sun}"/>
    <path d="M18 8c8.6 8.6 13 14.4 13 19.8A13 13 0 0 1 5 27.8C5 22.4 9.4 16.6 18 8z" fill="url(#sc-fa)"/>
    <path d="M18 18.4c5 5 7.6 8.4 7.6 11.2a7.6 7.6 0 0 1-15.2 0c0-2.8 2.6-6.2 7.6-11.2z" fill="url(#sc-fb)"/>
    <path d="M18 27.4c2 2 3 3.4 3 4.6a3 3 0 0 1-6 0c0-1.2 1-2.6 3-4.6z" fill="#fff" opacity=".9"/>`,
    `<defs><linearGradient id="sc-fa" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".72"/></linearGradient>
     <linearGradient id="sc-fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient></defs>`),
  bitcoin: box(`<path d="M4 44q6-14 16-14h8q10 0 16 14z" fill="${C.skin}"/>
    <path d="M16 31.6q4-3.4 8 0" stroke="${C.skinDk}" stroke-width="1" fill="none" opacity=".5"/>
    <g transform="translate(24 22)"><circle r="11" fill="url(#sc-b)"/>
      <g fill="${C.ink}" transform="scale(.72)">
        <path d="M-4.4-10.2h2.7v20.4h-2.7zM-.1-10.2h2.7v20.4H-.1z"/>
        <path d="M-4-7.1h7c2.9 0 4.8 1.7 4.8 4.2S5.9 1.3 3 1.3h-7zM-4 1.1h7.7c3 0 4.9 1.7 4.9 4.2S6.7 9.5 3.7 9.5H-4z"/></g></g>`,
    `<defs><radialGradient id="sc-b" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient></defs>`),
};

// =========================================================================================
// 2. PLAN — everything from directly overhead
// One unusual viewpoint held across the whole set. A viewpoint is a cheap way to make thirty
// unrelated things look like one collection, and nobody expects to look down on a person.
// =========================================================================================
const plan = {
  star: box(`<circle cx="24" cy="24" r="21" fill="url(#pl-sh)"/>
    <circle cx="24" cy="24" r="12" fill="url(#pl-sc)"/>
    <g stroke="${C.sunDk}" stroke-width=".8" opacity=".55" fill="none">
      <path d="M17 17q4 3 2 7t3 6M31 18q-4 3-2 7t-3 6M24 13q2 5-1 8M24 35q-2-5 1-8"/></g>
    <circle cx="24" cy="24" r="4" fill="${C.hot}"/>`,
    `<defs><radialGradient id="pl-sh"><stop offset=".3" stop-color="${C.sun}" stop-opacity=".45"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
     <radialGradient id="pl-sc"><stop offset="0" stop-color="${C.sunLt}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient></defs>`),
  water: box(`<rect width="48" height="48" fill="url(#pl-wf)" clip-path="url(#r18-tile)"/>
    <g fill="none" stroke="${C.seaLt}">
      <circle cx="24" cy="24" r="19" stroke-width=".8" opacity=".3"/>
      <circle cx="24" cy="24" r="14" stroke-width="1" opacity=".45"/>
      <circle cx="24" cy="24" r="9.4" stroke-width="1.3" opacity=".65"/>
      <circle cx="24" cy="24" r="5.4" stroke-width="1.6" opacity=".85"/></g>
    <circle cx="24" cy="24" r="3" fill="${C.seaLt}"/>
    <circle cx="24" cy="24" r="1.3" fill="${C.cloud}"/>`,
    `<defs><radialGradient id="pl-wf"><stop offset="0" stop-color="#1E6FA8"/><stop offset="1" stop-color="#0A2C4C"/></radialGradient></defs>`),
  earth: box(`<circle cx="24" cy="24" r="17" fill="url(#pl-es)"/>
    <g clip-path="url(#pl-ec)">
      <circle cx="24" cy="24" r="6" fill="${C.cloud}"/>
      <path d="M24 18c5-2 8 1 10 4s-1 7-5 8-8-1-9-5 0-6 4-7z" fill="${C.land}"/>
      <path d="M13 22c3-3 6-2 7 1s-2 6-5 6-5-4-2-7z" fill="${C.land}"/>
      <path d="M22 33c4-1 7 1 7 3s-4 4-7 3-4-5 0-6z" fill="${C.land}"/></g>
    <circle cx="24" cy="24" r="17" fill="url(#pl-et)"/>
    <circle cx="24" cy="24" r="17" fill="none" stroke="${C.seaLt}" stroke-width=".8" opacity=".5"/>`,
    `<defs><clipPath id="pl-ec"><circle cx="24" cy="24" r="17"/></clipPath>
     <radialGradient id="pl-es"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".75" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient>
     <radialGradient id="pl-et"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#00040B" stop-opacity=".55"/></radialGradient></defs>`),
  human: box(`<ellipse cx="24" cy="41" rx="13" ry="4" fill="#000" opacity=".3" filter="url(#r18-soft)"/>
    <path d="M13.6 26.4q10.4-6 20.8 0 1.4 5-1.4 9-9 3.4-18 0-2.8-4-1.4-9z" fill="${C.skin}"/>
    <path d="M9.4 27.6q3.4-3 5.6-1.4l1.6 8q-2.6 1.6-5.4-.6z" fill="${C.skin}"/>
    <path d="M38.6 27.6q-3.4-3-5.6-1.4l-1.6 8q2.6 1.6 5.4-.6z" fill="${C.skin}"/>
    <circle cx="24" cy="23" r="7.6" fill="${C.skinLt}"/>
    <path d="M24 15.4a7.6 7.6 0 0 1 0 15.2z" fill="${C.skinDk}" opacity=".22"/>
    <path d="M18.6 19.6q5.4-3.4 10.8 0" stroke="${C.skinDk}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>`),
  fire: box(`<circle cx="24" cy="24" r="19" fill="url(#pl-fg)"/>
    <g fill="${C.stone}">${Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 10;
      return `<ellipse cx="${(24 + 15.4 * Math.cos(a)).toFixed(1)}" cy="${(24 + 15.4 * Math.sin(a)).toFixed(1)}" rx="3.4" ry="2.8" transform="rotate(${(a * 57.3).toFixed(0)} ${(24 + 15.4 * Math.cos(a)).toFixed(1)} ${(24 + 15.4 * Math.sin(a)).toFixed(1)})"/>`;
    }).join("")}</g>
    <circle cx="24" cy="24" r="10.6" fill="${C.ground}"/>
    <path d="M15 19l18 10M33 19L15 29M24 13.4v21.2" stroke="${C.skinDk}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="6" fill="url(#pl-fc)"/>
    <circle cx="24" cy="24" r="2.6" fill="${C.hot}"/>`,
    `<defs><radialGradient id="pl-fg"><stop offset=".3" stop-color="${C.ember}" stop-opacity=".45"/><stop offset="1" stop-color="${C.ember}" stop-opacity="0"/></radialGradient>
     <radialGradient id="pl-fc"><stop offset="0" stop-color="${C.hot}"/><stop offset=".6" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}"/></radialGradient></defs>`),
  bitcoin: box(`<ellipse cx="24" cy="30" rx="15" ry="4" fill="#000" opacity=".35" filter="url(#r18-soft)"/>
    <g transform="translate(24 24) scale(1 .42) translate(-24 -24)">
      <circle cx="24" cy="24" r="15" fill="url(#pl-bc)"/>
      <circle cx="24" cy="24" r="15" fill="none" stroke="${C.coinDk}" stroke-width="1.4"/>
      <circle cx="24" cy="24" r="10" fill="none" stroke="${C.coinDk}" stroke-width="1" opacity=".7"/></g>
    <g fill="${C.ink}" opacity=".75" transform="translate(24 24) scale(.72 .3) translate(-24 -24)">
      <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
      <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>`,
    `<defs><radialGradient id="pl-bc" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient></defs>`),
};

// =========================================================================================
// 3. SPECIMEN — collected, mounted, catalogued
// The game is a collection of thirty-one things, and this is the only strategy that says so.
// A plinth and a number rather than a frame, because a frame would give every icon the same
// silhouette and that mistake has already been made twice.
// =========================================================================================
const spec = (n, body, defs = "") => box(
  `${body}
   <path d="M14 40h20l2.6 4H11.4z" fill="${C.brass}"/>
   <path d="M14 40h20l.6 1H13.4z" fill="${C.coinLt}" opacity=".5"/>
   <text x="24" y="43.4" text-anchor="middle" font-family="system-ui, sans-serif" font-size="3.2"
     font-weight="700" fill="${C.ink}" opacity=".8">${n}</text>`, defs);
const specimen = {
  star: spec("01", `<circle cx="24" cy="21" r="15" fill="url(#sp-s)"/>
    <circle cx="24" cy="21" r="15" fill="none" stroke="${C.brass}" stroke-width=".8" opacity=".7"/>
    <path d="M24 36v4" stroke="${C.brass}" stroke-width="1.4"/>`,
    `<defs><radialGradient id="sp-s" cx=".36" cy=".3"><stop offset="0" stop-color="${C.hot}"/><stop offset=".55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.sunDk}"/></radialGradient></defs>`),
  water: spec("02", `<path d="M24 5c7.4 9.6 11.4 15.6 11.4 20.6a11.4 11.4 0 0 1-22.8 0C12.6 20.6 16.6 14.6 24 5z" fill="url(#sp-w)"/>
    <ellipse cx="19.8" cy="24.6" rx="2.2" ry="3.8" fill="${C.cloud}" opacity=".6" transform="rotate(-16 19.8 24.6)"/>
    <path d="M24 37v3" stroke="${C.brass}" stroke-width="1.4"/>
    <ellipse cx="24" cy="37" rx="4.4" ry="1.4" fill="none" stroke="${C.brass}" stroke-width="1"/>`,
    `<defs><radialGradient id="sp-w" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${C.seaLt}"/><stop offset=".55" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.seaDk}"/></radialGradient></defs>`),
  earth: spec("03", `<circle cx="24" cy="21" r="14.4" fill="url(#sp-e)"/>
    <g clip-path="url(#sp-ec)">
      <path d="M11 18c4-1.4 6.8.6 9.6 0 2.8-.6 4-2.6 7.2-2 2.4.6 3 2.8 1.2 4.2-2.2 2.2-6 1.4-8.6 2.8-2.6 1.6-2.2 4.4-5.2 4.6-3 .2-5.2-2-5.2-4.8z" fill="${C.land}"/></g>
    <path d="M13 31.6q11 6 22 0" stroke="${C.brass}" stroke-width="1.2" fill="none"/>
    <path d="M24 35.4v4.6" stroke="${C.brass}" stroke-width="1.4"/>`,
    `<defs><clipPath id="sp-ec"><circle cx="24" cy="21" r="14.4"/></clipPath>
     <radialGradient id="sp-e" cx=".34" cy=".3" r=".92"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".7" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.abyss}"/></radialGradient></defs>`),
  human: spec("04", `<path d="M15 39c0-8 4-13 9-13s9 5 9 13z" fill="${C.skin}"/>
    <circle cx="24" cy="16.6" r="7.4" fill="${C.skinLt}"/>
    <path d="M24 9.2a7.4 7.4 0 0 1 0 14.8z" fill="${C.skinDk}" opacity=".25"/>
    <path d="M9 39h30" stroke="${C.brass}" stroke-width=".9" opacity=".8"/>`),
  fire: spec("05", `<path d="M24 7c8.6 8.6 13 14.4 13 19.8a13 13 0 0 1-26 0C11 21.4 15.4 15.6 24 7z" fill="url(#sp-fa)"/>
    <path d="M24 17c5 5 7.6 8.4 7.6 11.2a7.6 7.6 0 0 1-15.2 0c0-2.8 2.6-6.2 7.6-11.2z" fill="url(#sp-fb)"/>
    <path d="M24 26c2 2 3 3.4 3 4.6a3 3 0 0 1-6 0c0-1.2 1-2.6 3-4.6z" fill="#fff" opacity=".9"/>
    <rect x="16" y="36" width="16" height="4" rx="1" fill="none" stroke="${C.brass}" stroke-width="1"/>`,
    `<defs><linearGradient id="sp-fa" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".72"/></linearGradient>
     <linearGradient id="sp-fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.hot}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient></defs>`),
  bitcoin: spec("06", `<circle cx="24" cy="21" r="13" fill="url(#sp-b)"/>
    <g fill="${C.ink}" transform="translate(24 21) scale(.86) translate(-24 -24)">
      <path d="M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7z"/>
      <path d="M20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z"/></g>
    <path d="M18 34.6q6 3 12 0" stroke="${C.brass}" stroke-width="1.2" fill="none"/>
    <path d="M24 36v4" stroke="${C.brass}" stroke-width="1.4"/>`,
    `<defs><radialGradient id="sp-b" cx=".34" cy=".28"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".6" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></radialGradient></defs>`),
};

// =========================================================================================
// 4. MACRO — a characteristic detail at huge magnification
// Never the whole object. The bet is that a fragment of a thing is more particular than the
// thing, and the risk is that a fragment of anything blue is just blue.
// =========================================================================================
const macro = {
  star: box(`<rect width="48" height="48" fill="${C.sunDk}" clip-path="url(#r18-tile)"/>
    <g clip-path="url(#r18-tile)">
      ${Array.from({ length: 22 }, (_, i) => {
        const x = 3 + ((i * 13) % 44), y = 4 + ((i * 29) % 42);
        return `<ellipse cx="${x}" cy="${y}" rx="${4 + (i % 3)}" ry="${3.4 + (i % 2)}" fill="${i % 3 ? C.sun : C.sunLt}" opacity=".85"/>`;
      }).join("")}
      <path d="M-2 34q12-22 26-8t26-4" stroke="${C.hot}" stroke-width="3" fill="none" opacity=".9" filter="url(#r18-soft)"/>
    </g>`),
  water: box(`<g clip-path="url(#r18-tile)">
      <rect width="48" height="48" fill="#0A2C4C"/>
      <path d="M0 26q6-14 18-14t14 10 16-6v32H0z" fill="url(#ma-w)"/>
      <path d="M0 26q6-14 18-14t14 10 16-6" stroke="${C.seaLt}" stroke-width="1.6" fill="none"/>
      <ellipse cx="17" cy="20" rx="5" ry="3.4" fill="${C.cloud}" opacity=".5" transform="rotate(-20 17 20)"/>
      <circle cx="35" cy="34" r="3" fill="${C.seaLt}" opacity=".35"/>
      <circle cx="11" cy="38" r="2" fill="${C.seaLt}" opacity=".3"/></g>`,
    `<defs><linearGradient id="ma-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E9AD8"/><stop offset="1" stop-color="${C.seaDk}"/></linearGradient></defs>`),
  earth: box(`<g clip-path="url(#r18-tile)">
      <rect width="48" height="48" fill="${C.sea}"/>
      <path d="M0 0h20q-2 8 4 12t2 10-8 6-4 10-6 10H0z" fill="${C.land}"/>
      <path d="M20 0q-2 8 4 12t2 10-8 6-4 10-6 10" stroke="${C.cloud}" stroke-width="1.2" fill="none" opacity=".7"/>
      <path d="M22 2q-1.4 7 3.4 10.6" stroke="${C.landDk}" stroke-width="1" fill="none" opacity=".7"/>
      <g fill="${C.cloud}" opacity=".45"><ellipse cx="36" cy="12" rx="8" ry="3"/><ellipse cx="40" cy="30" rx="6" ry="2.4"/></g></g>`),
  human: box(`<g clip-path="url(#r18-tile)">
      <rect width="48" height="48" fill="${C.skinLt}"/>
      <ellipse cx="24" cy="24" rx="26" ry="15" fill="#F7F3EE"/>
      <circle cx="24" cy="24" r="12.6" fill="url(#ma-h)"/>
      ${Array.from({ length: 24 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 24;
        return `<path d="M${(24 + 5.4 * Math.cos(a)).toFixed(1)} ${(24 + 5.4 * Math.sin(a)).toFixed(1)}L${(24 + 12.2 * Math.cos(a)).toFixed(1)} ${(24 + 12.2 * Math.sin(a)).toFixed(1)}" stroke="#3E6B4E" stroke-width=".8" opacity=".55"/>`;
      }).join("")}
      <circle cx="24" cy="24" r="5.4" fill="#17181C"/>
      <circle cx="20.4" cy="20" r="2.6" fill="#fff" opacity=".9"/></g>`,
    `<defs><radialGradient id="ma-h"><stop offset="0" stop-color="#8FBE7A"/><stop offset="1" stop-color="#4A6B3E"/></radialGradient></defs>`),
  fire: box(`<g clip-path="url(#r18-tile)">
      <rect width="48" height="48" fill="#120C10"/>
      <path d="M10 48q2-20 14-30 12 10 14 30z" fill="url(#ma-f)"/>
      <path d="M17 48q1.4-13 7-19 5.6 6 7 19z" fill="#3E7ACC" opacity=".85"/>
      <path d="M20.4 48q1-8 3.6-11.4 2.6 3.4 3.6 11.4z" fill="${C.hot}" opacity=".9"/></g>`,
    `<defs><linearGradient id="ma-f" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.ember}" stop-opacity=".35"/></linearGradient></defs>`),
  bitcoin: box(`<g clip-path="url(#r18-tile)">
      <rect width="48" height="48" fill="${C.coinDk}"/>
      <path d="M0 14h48v20H0z" fill="url(#ma-b)"/>
      ${Array.from({ length: 16 }, (_, i) => `<rect x="${1 + i * 3}" y="14" width="1.5" height="20" fill="${C.coinDk}" opacity=".55"/>`).join("")}
      <path d="M0 14h48M0 34h48" stroke="${C.ink}" stroke-width="1" opacity=".5"/>
      <path d="M0 10h48v4H0z" fill="${C.coin}" opacity=".5"/></g>`,
    `<defs><linearGradient id="ma-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.coinLt}"/><stop offset=".5" stop-color="${C.coin}"/><stop offset="1" stop-color="${C.coinDk}"/></linearGradient></defs>`),
};

export const round18Styles = { scale, plan, specimen, macro };
export const round18Notes = {
  scale: "The thing beside something whose size everyone already knows. Magnitude is the real subject of a game that runs from a particle to a planet, and it is the one thing a picture of an object alone can never say.",
  plan: "Everything seen from directly overhead, one unusual viewpoint held across the whole set. A shared viewpoint is a cheap way to make thirty unrelated things look like one collection, and nobody expects to look down on a person.",
  specimen: "The thing collected, mounted and catalogued. The game is a collection of thirty-one things and this is the only strategy that says so. A plinth and a number rather than a frame, because a frame would give every icon the same silhouette and that mistake has been made twice already.",
  macro: "A characteristic detail at huge magnification, never the whole object. The bet is that a fragment of a thing is more particular than the thing itself. The risk is that a fragment of anything blue is just blue.",
};
export const R18_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
  <clipPath id="r18-tile"><rect x="2" y="2" width="44" height="44" rx="8"/></clipPath>
  <filter id="r18-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.8"/></filter>
</defs></svg>`;

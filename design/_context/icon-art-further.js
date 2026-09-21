// Round 6. Riso and plate are out for being single-ink. Luminous leads paper but is not
// locked, so it is carried forward here as the reference column and three genuinely
// different full-colour directions are put next to it.
//
// The three are not weights of luminous. Glass is hard and specular where luminous is soft.
// Enamel is flat colour held in a metal line, with no light model at all. Airbrush is a
// painted sky with a horizon, closer to a book cover than to an icon.
//
// 48x48 box, same as round 5, so the two sheets can be compared directly.
import { artStyles } from "./icon-art.js";

const A = (body, defs = "") => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${defs}${body}</svg>`;
const STAR = "M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6-2.2-9.8-6.8-14.4-16.6-16.6 9.8-2.2 14.4-6.8 16.6-16.6z";
const DROP = "M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0C11.6 21.4 16 15 24 5z";
const BLOB = "M11 20c0-6.4 7-10.2 12.4-7.6 6-5.6 16.4-1.8 16.4 6.4 4 2.6 3.6 10-2.4 12-3.8 6.2-14 6.4-18.6 2.2-8 .4-11-7.6-7.8-13z";
const burst = (n, rOut, rIn, cx = 24, cy = 24) => {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n, r = i % 2 ? rIn : rOut;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy - r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};

// ---- glass: polished and cut. Hard speculars, a lit rim, a facet seam ------------------
// Light hits a surface here rather than coming out of the object. The seam down each shape
// is what stops it reading as a plastic blob: a cut thing has two faces, not one.
const glass = {
  energy: A(`
    <path d="${burst(8, 21, 6)}" fill="url(#gl-e-b)"/>
    <g clip-path="url(#gl-e-c)"><path d="M24 -4 48 24 24 24z" fill="#FFFFFF" opacity=".28"/></g>
    <circle cx="24" cy="24" r="5.6" fill="url(#gl-e-core)"/>
    <ellipse cx="21" cy="20.6" rx="2.1" ry="1.3" fill="#FFF" opacity=".95" transform="rotate(-35 21 20.6)"/>`,
    `<defs>
      <clipPath id="gl-e-c"><path d="${burst(8, 21, 6)}"/></clipPath>
      <linearGradient id="gl-e-b" x1=".25" y1="0" x2=".75" y2="1"><stop offset="0" stop-color="#FFD98A"/><stop offset=".5" stop-color="#F0932F"/><stop offset="1" stop-color="#8E3B12"/></linearGradient>
      <radialGradient id="gl-e-core" cx=".35" cy=".3"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFD37A"/></radialGradient>
    </defs>`),
  gravity: A(`
    <path d="M3 15c10 0 11.4 5.4 15.2 12.4 2.2 4 3.8 5.6 5.8 5.6s3.6-1.6 5.8-5.6C33.6 20.4 35 15 45 15v5.4c-6.6 0-7.6 4-11 10.4-2.8 5.2-5.6 8-10 8s-7.2-2.8-10-8C10.6 24.8 9.6 20.4 3 20.4z" fill="url(#gl-g-ramp)"/>
    <circle cx="24" cy="38.4" r="6.8" fill="url(#gl-g-ball)"/>
    <ellipse cx="21.4" cy="35.8" rx="2.4" ry="1.5" fill="#FFF" opacity=".95" transform="rotate(-35 21.4 35.8)"/>
    <path d="M17.6 42.6a6.8 6.8 0 0 0 12.8 0" stroke="#FFE7B4" stroke-width="1.2" fill="none" opacity=".65"/>`,
    `<defs>
      <linearGradient id="gl-g-ramp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FC2F5"/><stop offset="1" stop-color="#2A4C86"/></linearGradient>
      <radialGradient id="gl-g-ball" cx=".34" cy=".28"><stop offset="0" stop-color="#FFE9B8"/><stop offset=".6" stop-color="#F0A23A"/><stop offset="1" stop-color="#8A4310"/></radialGradient>
    </defs>`),
  star: A(`
    <path d="${STAR}" fill="url(#gl-s-b)"/>
    <g clip-path="url(#gl-s-c)"><path d="M24 0 52 24 24 48z" fill="#3A1A06" opacity=".38"/></g>
    <path d="${STAR}" stroke="url(#gl-s-rim)" stroke-width="1.1" fill="none"/>
    <ellipse cx="20.4" cy="19" rx="2.6" ry="1.5" fill="#FFF" opacity=".95" transform="rotate(-40 20.4 19)"/>`,
    `<defs>
      <clipPath id="gl-s-c"><path d="${STAR}"/></clipPath>
      <linearGradient id="gl-s-b" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#FFF3D2"/><stop offset=".45" stop-color="#F6B63F"/><stop offset="1" stop-color="#B75C15"/></linearGradient>
      <linearGradient id="gl-s-rim" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FFE7B4" stop-opacity=".9"/><stop offset="1" stop-color="#FFE7B4" stop-opacity="0"/></linearGradient>
    </defs>`),
  nebula: A(`
    <path d="${BLOB}" fill="url(#gl-n-b)"/>
    <g clip-path="url(#gl-n-c)"><path d="M0 30 48 14v34H0z" fill="#1B0E3C" opacity=".45"/></g>
    <path d="${BLOB}" stroke="url(#gl-n-rim)" stroke-width="1.1" fill="none"/>
    <ellipse cx="19.4" cy="19.4" rx="3.4" ry="1.9" fill="#FFF" opacity=".8" transform="rotate(-28 19.4 19.4)"/>
    <circle cx="35" cy="31" r="1.3" fill="#FFF" opacity=".9"/>`,
    `<defs>
      <clipPath id="gl-n-c"><path d="${BLOB}"/></clipPath>
      <linearGradient id="gl-n-b" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#C9A8FF"/><stop offset=".5" stop-color="#7B4FD4"/><stop offset="1" stop-color="#2B1A63"/></linearGradient>
      <linearGradient id="gl-n-rim" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#E3D2FF" stop-opacity=".85"/><stop offset="1" stop-color="#E3D2FF" stop-opacity="0"/></linearGradient>
    </defs>`),
  water: A(`
    <path d="${DROP}" fill="url(#gl-w-b)"/>
    <g clip-path="url(#gl-w-c)"><path d="M26 0h24v48H26z" fill="#07203C" opacity=".35"/></g>
    <path d="${DROP}" stroke="url(#gl-w-rim)" stroke-width="1.2" fill="none"/>
    <ellipse cx="19" cy="28.6" rx="2.8" ry="4.6" fill="#FFF" opacity=".85" transform="rotate(-16 19 28.6)"/>
    <ellipse cx="27" cy="36.4" rx="3.4" ry="1.7" fill="#BFF0FF" opacity=".55"/>`,
    `<defs>
      <clipPath id="gl-w-c"><path d="${DROP}"/></clipPath>
      <linearGradient id="gl-w-b" x1=".25" y1="0" x2=".75" y2="1"><stop offset="0" stop-color="#A8ECFF"/><stop offset=".5" stop-color="#2F90D8"/><stop offset="1" stop-color="#0C2C52"/></linearGradient>
      <linearGradient id="gl-w-rim" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#DFF7FF" stop-opacity=".9"/><stop offset="1" stop-color="#DFF7FF" stop-opacity="0"/></linearGradient>
    </defs>`),
  earth: A(`
    <circle cx="24" cy="24" r="19" fill="url(#gl-t-b)"/>
    <g clip-path="url(#gl-t-c)">
      <path d="M10 18c4.6-1.6 7.8.6 11 0 3.2-.6 4.6-3.2 8.4-2.4 2.8.6 3.6 3.2 1.6 5-2.6 2.6-7 1.6-10 3.4-3.2 1.8-2.6 5-6.4 5.2-3.6.2-5.8-2.4-5.8-5.6z" fill="#3FA377"/>
      <path d="M17 34.4c2.8-1.8 5.8-.4 9-1 2.6-.4 4.2-2 6.4-1 2 .9 1.6 3.4-.6 4.6-3.8 2.2-8.6 3-12.2 1.8-2.6-.8-3.6-3-2.6-4.4z" fill="#3FA377"/>
      <path d="M28 -2h26v52H28z" fill="#04162C" opacity=".42"/>
    </g>
    <circle cx="24" cy="24" r="19" stroke="url(#gl-t-rim)" stroke-width="1.3" fill="none"/>
    <ellipse cx="16.6" cy="15.8" rx="4.6" ry="2.8" fill="#FFF" opacity=".8" transform="rotate(-38 16.6 15.8)"/>`,
    `<defs>
      <clipPath id="gl-t-c"><circle cx="24" cy="24" r="19"/></clipPath>
      <radialGradient id="gl-t-b" cx=".34" cy=".28" r=".95"><stop offset="0" stop-color="#7FD6FF"/><stop offset=".55" stop-color="#1F70B8"/><stop offset="1" stop-color="#06203E"/></radialGradient>
      <linearGradient id="gl-t-rim" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#CFF3FF" stop-opacity=".95"/><stop offset=".6" stop-color="#CFF3FF" stop-opacity="0"/></linearGradient>
    </defs>`),
};

// ---- enamel: flat colour held in a metal line. No light model at all ------------------
// An enamel pin: fields of saturated colour, each one fenced by the same thin gold wire.
// The wire is the whole system — it is what makes thirty items look like one object.
const W = "#E9C87C";           // the wire
const E = (body) => A(`<g stroke="${W}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">${body}</g>`);
const enamel = {
  energy: E(`
    <path d="${burst(8, 21, 6.4)}" fill="#D8541F"/>
    <path d="${burst(8, 13.6, 4.4)}" fill="#F2A72C" transform="rotate(22.5 24 24)"/>
    <circle cx="24" cy="24" r="4.6" fill="#FBE5B0"/>`),
  gravity: E(`
    <path d="M3 15c10 0 11.4 5.4 15.2 12.4 2.2 4 3.8 5.6 5.8 5.6s3.6-1.6 5.8-5.6C33.6 20.4 35 15 45 15v5.4c-6.6 0-7.6 4-11 10.4-2.8 5.2-5.6 8-10 8s-7.2-2.8-10-8C10.6 24.8 9.6 20.4 3 20.4z" fill="#2C4C86"/>
    <circle cx="24" cy="38.2" r="6.6" fill="#F2A72C"/>
    <path d="M24 31.6a6.6 6.6 0 0 0 0 13.2z" fill="#D8541F"/>`),
  star: E(`
    <path d="${STAR}" fill="#F2A72C"/>
    <path d="M24 7.2c2.2 9.8 6.8 14.4 16.6 16.6-9.8 2.2-14.4 6.8-16.6 16.6z" fill="#D8541F"/>
    <circle cx="24" cy="23.8" r="4.2" fill="#FBE5B0"/>`),
  nebula: E(`
    <path d="${BLOB}" fill="#5B3FA8"/>
    <path d="M18.6 22.4c0-4 4.6-6.4 8-4.8 3.8-3.4 10.6-1 10.6 4.2 2.6 1.6 2 6.4-1.8 7.6-2.4 4-9 3.8-12 1.2-5 .2-7-4.8-4.8-8.2z" fill="#B2478F"/>
    <path d="M23.6 24.2c0-2.2 2.6-3.6 4.6-2.6 2.2-1.8 6 .2 5.6 3 1.4 1-.2 3.6-2.2 4-1.4 2.2-5 2-6.6.6-2.8 0-3.6-3.2-1.4-5z" fill="#E7B7D6"/>
    <circle cx="14.4" cy="16.4" r="1.9" fill="#FBE5B0"/><circle cx="37.6" cy="32.6" r="1.6" fill="#FBE5B0"/>`),
  water: E(`
    <path d="${DROP}" fill="#1E6FB6"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-12.4 12.4z" fill="#12406E"/>
    <path d="M18.6 28.6c0-2.8 1.6-6 4-9.6-4.2 4.6-6.8 8.4-6.8 11.6 0 2.8 1.4 5 3.6 6.2-.5-2.6-.8-5.4-.8-8.2z" fill="#8ED4F2"/>`),
  earth: E(`
    <circle cx="24" cy="24" r="19" fill="#1E6FB6"/>
    <path d="M10 18c4.6-1.6 7.8.6 11 0 3.2-.6 4.6-3.2 8.4-2.4 2.8.6 3.6 3.2 1.6 5-2.6 2.6-7 1.6-10 3.4-3.2 1.8-2.6 5-6.4 5.2-3.6.2-5.8-2.4-5.8-5.6z" fill="#2F8F5E"/>
    <path d="M17 34.4c2.8-1.8 5.8-.4 9-1 2.6-.4 4.2-2 6.4-1 2 .9 1.6 3.4-.6 4.6-3.8 2.2-8.6 3-12.2 1.8-2.6-.8-3.6-3-2.6-4.4z" fill="#2F8F5E"/>
    <path d="M24 5v38" fill="none" opacity=".55"/>
    <path d="M6.4 17.4h35.2M6.4 30.6h35.2" fill="none" opacity=".55"/>`),
};

// ---- airbrush: a painted sky with a horizon in it -------------------------------------
// The 1979 paperback cover: a saturated gradient field, one neon rim where the light is
// coming from, and a chrome band. Less an icon than a very small poster.
const airbrush = {
  energy: A(`
    <circle cx="24" cy="24" r="22" fill="url(#ab-e-halo)"/>
    <path d="${burst(6, 22, 3)}" fill="url(#ab-e-ray)"/>
    <circle cx="24" cy="24" r="8.6" fill="url(#ab-e-core)"/>
    <path d="M13 26.6h22M15.6 30.4h16.8M18.6 33.6h10.8" stroke="#FF5DA8" stroke-width="1.5" stroke-linecap="round" opacity=".85"/>`,
    `<defs>
      <radialGradient id="ab-e-halo"><stop offset=".2" stop-color="#FF3D8B" stop-opacity=".45"/><stop offset="1" stop-color="#5B1BA8" stop-opacity="0"/></radialGradient>
      <linearGradient id="ab-e-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE07A"/><stop offset="1" stop-color="#FF3D8B"/></linearGradient>
      <linearGradient id="ab-e-core" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6D8"/><stop offset="1" stop-color="#FF9A4B"/></linearGradient>
    </defs>`),
  gravity: A(`
    <path d="M1 16q11.5 0 17 12.4 3.2 6.8 6 6.8t6-6.8Q35.5 16 47 16" stroke="url(#ab-g-grid)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M1 22q11.5 0 17 13.4 3.2 7.4 6 7.4t6-7.4Q35.5 22 47 22" stroke="#B14BE0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M10 15.4v5.6M18 18v6.6M30 18v6.6M38 15.4v5.6" stroke="#B14BE0" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>
    <circle cx="24" cy="30" r="9.6" fill="url(#ab-g-halo)"/>
    <circle cx="24" cy="30" r="5.4" fill="url(#ab-g-ball)"/>
    <path d="M19 31.6h10M20.6 34h6.8" stroke="#2B0C4A" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`,
    `<defs>
      <linearGradient id="ab-g-grid" x1="0" x2="1"><stop offset="0" stop-color="#4BE0D2" stop-opacity=".2"/><stop offset=".5" stop-color="#4BE0D2"/><stop offset="1" stop-color="#4BE0D2" stop-opacity=".2"/></linearGradient>
      <radialGradient id="ab-g-halo"><stop offset=".35" stop-color="#FF5DA8" stop-opacity=".6"/><stop offset="1" stop-color="#FF5DA8" stop-opacity="0"/></radialGradient>
      <linearGradient id="ab-g-ball" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE07A"/><stop offset=".55" stop-color="#FF7A4B"/><stop offset="1" stop-color="#C62C7E"/></linearGradient>
    </defs>`),
  star: A(`
    <circle cx="24" cy="24" r="22" fill="url(#ab-s-halo)"/>
    <circle cx="24" cy="24" r="13" fill="url(#ab-s-sun)"/>
    <path d="M9.6 25.8h28.8M12 30h24M15.4 33.8h17.2M19.4 37h9.2" stroke="#2B0C4A" stroke-width="1.6" stroke-linecap="round"/>
    <path d="${STAR}" fill="url(#ab-s-flare)" opacity=".55"/>`,
    `<defs>
      <radialGradient id="ab-s-halo"><stop offset=".25" stop-color="#FF3D8B" stop-opacity=".5"/><stop offset="1" stop-color="#3B1080" stop-opacity="0"/></radialGradient>
      <linearGradient id="ab-s-sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".5" stop-color="#FF9A4B"/><stop offset="1" stop-color="#E63C86"/></linearGradient>
      <radialGradient id="ab-s-flare"><stop offset="0" stop-color="#FFF6D8"/><stop offset="1" stop-color="#FFF6D8" stop-opacity="0"/></radialGradient>
    </defs>`),
  nebula: A(`
    <g filter="url(#ab-n-soft)">
      <ellipse cx="19" cy="20" rx="15" ry="11" fill="#B14BE0"/>
      <ellipse cx="30" cy="27" rx="13" ry="10" fill="#FF3D8B" opacity=".8"/>
      <ellipse cx="24" cy="24" rx="9" ry="7" fill="#4BE0D2" opacity=".55"/>
    </g>
    <path d="M6 34q9-4 18 0t18 0" stroke="#4BE0D2" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".75"/>
    <circle cx="13" cy="13" r="1.5" fill="#FFF"/><circle cx="37" cy="16" r="1.1" fill="#FFF" opacity=".85"/>
    <circle cx="34" cy="37" r="1.2" fill="#FFF" opacity=".8"/>`,
    `<defs><filter id="ab-n-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter></defs>`),
  water: A(`
    <path d="${DROP}" fill="url(#ab-w-b)"/>
    <path d="M13.4 30.6q10.6-4.2 21.2 0" stroke="#4BE0D2" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M15.6 35q8.4-3.4 16.8 0" stroke="#FF5DA8" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M24 5c8 10 12.4 16.4 12.4 22a12.4 12.4 0 0 1-24.8 0" stroke="url(#ab-w-rim)" stroke-width="1.4" fill="none"/>`,
    `<defs>
      <linearGradient id="ab-w-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E6BFF"/><stop offset=".5" stop-color="#3B7BE0"/><stop offset="1" stop-color="#1B2A6B"/></linearGradient>
      <linearGradient id="ab-w-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4BE0D2" stop-opacity=".9"/><stop offset="1" stop-color="#FF5DA8" stop-opacity=".5"/></linearGradient>
    </defs>`),
  earth: A(`
    <circle cx="24" cy="24" r="21.5" fill="url(#ab-t-halo)"/>
    <circle cx="24" cy="24" r="18" fill="url(#ab-t-b)"/>
    <g clip-path="url(#ab-t-c)">
      <path d="M8 19c5-2 8.4.6 12 0 3.4-.6 5-3.2 9-2.4 3 .6 3.8 3.4 1.8 5.4-2.8 2.6-7.4 1.6-10.6 3.4-3.4 2-2.8 5.4-6.8 5.6-3.8.2-6.4-2.4-6.4-6z" fill="#2B0C4A" opacity=".55"/>
      <path d="M6 33.6q9-3.6 18 0t18 0" stroke="#4BE0D2" stroke-width="1.4" fill="none" opacity=".7"/>
      <path d="M6 38q9-3 18 0t18 0" stroke="#FF5DA8" stroke-width="1.2" fill="none" opacity=".55"/>
    </g>
    <path d="M6.6 30.6a18 18 0 0 0 34.8 0" stroke="#FF5DA8" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="24" cy="24" rx="25" ry="5.4" stroke="#4BE0D2" stroke-width="1.2" fill="none" opacity=".5" transform="rotate(-16 24 24)"/>`,
    `<defs>
      <clipPath id="ab-t-c"><circle cx="24" cy="24" r="18"/></clipPath>
      <radialGradient id="ab-t-halo"><stop offset=".8" stop-color="#FF3D8B" stop-opacity="0"/><stop offset=".9" stop-color="#FF3D8B" stop-opacity=".5"/><stop offset="1" stop-color="#FF3D8B" stop-opacity="0"/></radialGradient>
      <linearGradient id="ab-t-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A5BE8"/><stop offset=".55" stop-color="#3B3B9E"/><stop offset="1" stop-color="#1A0E3E"/></linearGradient>
    </defs>`),
};

export const furtherStyles = { luminous: artStyles.luminous, glass, enamel, airbrush };
export const furtherNotes = {
  luminous: "Carried forward from the last round, unchanged, so the new three have something real to beat.",
  glass: "Polished and cut. Hard speculars, a lit rim, and a facet seam down each shape, because a cut thing has two faces and a blob has one.",
  enamel: "An enamel pin. Flat fields of saturated colour, each one fenced by the same thin gold wire. No light model at all; the wire is the entire system.",
  airbrush: "The 1979 paperback cover. A saturated field, one neon rim where the light comes from, a chrome band across the middle. Less an icon than a very small poster.",
};
export const furtherSubjects = [
  ["energy", "Energy"], ["gravity", "Gravity"], ["star", "Star"],
  ["nebula", "Nebula"], ["water", "Water"], ["earth", "Earth"],
];

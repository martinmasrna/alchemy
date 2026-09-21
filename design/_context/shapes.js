// The twelve subjects as silhouettes and hues, separated from how they are drawn.
//
// From here on a style is a RENDERER: it receives the same parts and the same expected
// colours and dresses them in its own medium. That keeps a style round honest, because the
// columns then differ only in medium rather than in how hard I happened to try that day.
//
// tone is a role, not a colour: base is the thing, dark is its shadow side, light is where
// the light lands, accent is the one part allowed to disagree.
// 48x48 box throughout.

// Expected colour per subject. A thing is the colour a person already thinks it is.
export const hues = {
  star:     { base: "#F5B93C", dark: "#B85E18", light: "#FFF4D6", accent: "#FF8A2E" },
  water:    { base: "#2E82C6", dark: "#123E68", light: "#A8E6FF", accent: "#5FBEEA" },
  earth:    { base: "#2E82C6", dark: "#0E3358", light: "#F0F6FA", accent: "#4FA368" },
  life:     { base: "#4FA35C", dark: "#255C33", light: "#C8E9A0", accent: "#E8623C" },
  human:    { base: "#C98A5E", dark: "#6E4229", light: "#F2D6B8", accent: "#4A6480" },
  fire:     { base: "#E8762F", dark: "#A32E12", light: "#FFE8A8", accent: "#FFC24B" },
  hunting:  { base: "#8A5A34", dark: "#4A2E18", light: "#E3C08A", accent: "#C4452F" },
  tribe:    { base: "#C98A5E", dark: "#5A3620", light: "#FFD98A", accent: "#E8762F" },
  city:     { base: "#4A6480", dark: "#1E2A3E", light: "#D8E4EE", accent: "#F5B93C" },
  car:      { base: "#C4452F", dark: "#6E2117", light: "#DCE8F0", accent: "#1E1C18" },
  calculus: { base: "#4A7FA8", dark: "#22405C", light: "#CFE4F2", accent: "#C4452F" },
  bitcoin:  { base: "#F7931A", dark: "#8A4E06", light: "#FFE0A8", accent: "#2A1A08" },
};

// Parts, outermost first. tone picks the role; `w` is a stroke width when the part is a line.
export const parts = {
  star: [
    { d: "M24 6c2.4 10.4 7.2 15.2 17.6 17.6C31.2 26 26.4 30.8 24 41.2 21.6 30.8 16.8 26 6.4 23.6 16.8 21.2 21.6 16.4 24 6z", tone: "base" },
    { d: "M24 15c1.2 5.4 3.6 7.8 9 9-5.4 1.2-7.8 3.6-9 9-1.2-5.4-3.6-7.8-9-9 5.4-1.2 7.8-3.6 9-9z", tone: "light" },
  ],
  water: [
    { d: "M24 5c8.2 10.2 12.6 16.8 12.6 22.4a12.6 12.6 0 0 1-25.2 0C11.4 21.8 15.8 15.2 24 5z", tone: "base" },
    { d: "M19 29.4c0-2.8 1.4-6 3.8-9.8-4 4.4-6.4 8-6.4 11.2 0 2.6 1.2 4.8 3.2 6-.4-2.4-.6-4.8-.6-7.4z", tone: "light" },
  ],
  earth: [
    { d: "M24 5.4a18.6 18.6 0 1 1 0 37.2 18.6 18.6 0 0 1 0-37.2z", tone: "base" },
    { d: "M10.6 19c4.4-1.6 7.4.6 10.6 0 3-.6 4.4-3 8-2.2 2.6.6 3.4 3 1.6 4.8-2.6 2.4-6.8 1.6-9.8 3.2-3 1.8-2.4 4.8-6 5-3.4.2-5.6-2.2-5.6-5.4z", tone: "accent" },
    { d: "M17.4 34c2.6-1.8 5.6-.4 8.6-1 2.4-.4 4-2 6-1 1.8.9 1.4 3.2-.6 4.4-3.6 2.2-8.2 3-11.6 1.8-2.4-.8-3.4-2.8-2.4-4.2z", tone: "accent" },
    { d: "M24 7.2a18.6 18.6 0 0 1 13 5.4", tone: "light", w: 2 },
  ],
  life: [
    { d: "M24 43V21", tone: "base", w: 2.6 },
    { d: "M24 26c-8.6 0-13.4-4.8-13.4-10.6C19.2 14 24 18 24 26z", tone: "base" },
    { d: "M24 21c0-7.6 5.6-12.4 13.4-11C37 15.8 32.2 20.4 24 21z", tone: "light" },
    { d: "M24 12.4a3.2 3.2 0 1 1 0-.01z", tone: "accent" },
  ],
  human: [
    { d: "M12.4 44c0-9.6 5.2-15.6 11.6-15.6S35.6 34.4 35.6 44z", tone: "base" },
    { d: "M24 8.4a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6z", tone: "light" },
  ],
  fire: [
    { d: "M24 5c9.6 9.6 14.6 15.8 14.6 21.8a14.6 14.6 0 0 1-29.2 0C9.4 20.8 14.4 14.6 24 5z", tone: "base" },
    { d: "M24 16.6c5.8 5.8 8.8 9.6 8.8 13a8.8 8.8 0 0 1-17.6 0c0-3.4 3-7.2 8.8-13z", tone: "accent" },
    { d: "M24 27c2.4 2.4 3.6 4 3.6 5.4a3.6 3.6 0 0 1-7.2 0c0-1.4 1.2-3 3.6-5.4z", tone: "light" },
  ],
  hunting: [
    { d: "M13 7c8.4 6.4 8.4 27.6 0 34", tone: "base", w: 2.8 },
    { d: "M13 7c-2 8.6-2 25.4 0 34", tone: "dark", w: 1.2 },
    { d: "M15 24h23", tone: "dark", w: 1.8 },
    { d: "M40 24l-6.6-4.2v8.4z", tone: "accent" },
    { d: "M18.6 38.4a2.4 1.6 0 1 1 0-.01zM26 40.4a2.4 1.6 0 1 1 0-.01zM33.4 38a2.4 1.6 0 1 1 0-.01z", tone: "light" },
  ],
  tribe: [
    { d: "M24 23c5.4 5.4 8.2 9 8.2 12.4a8.2 8.2 0 0 1-16.4 0c0-3.4 2.8-7 8.2-12.4z", tone: "accent" },
    { d: "M24 30.4c2.4 2.4 3.6 4 3.6 5.2a3.6 3.6 0 0 1-7.2 0c0-1.2 1.2-2.8 3.6-5.2z", tone: "light" },
    { d: "M9.6 15.4a3.4 3.4 0 1 1 0-.01zM9.6 19.4c-3.2 0-5.4 2.6-5.6 6l1.2 6.4h2l.6-5.4 1.4 5.4h1.2l1.4-5.4.6 5.4h2l1.2-6.4c-.2-3.4-2.4-6-5.6-6z", tone: "base" },
    { d: "M38.4 15.4a3.4 3.4 0 1 1 0-.01zM38.4 19.4c-3.2 0-5.4 2.6-5.6 6l1.2 6.4h2l.6-5.4 1.4 5.4h1.2l1.4-5.4.6 5.4h2l1.2-6.4c-.2-3.4-2.4-6-5.6-6z", tone: "base" },
    { d: "M24 40.4a3 3 0 1 1 0-.01zM24 44c-2.8 0-4.8 2-5 4h10c-.2-2-2.2-4-5-4z", tone: "dark" },
  ],
  city: [
    { d: "M4 44V25h7.4v19zM13.4 44V13h8.8v31zM24.2 44V29h6.4v15zM32.6 44V18h7.6v26zM42.2 44V27H46v17z", tone: "base" },
    { d: "M15.6 18h2v2.6h-2zM18.8 18h2v2.6h-2zM15.6 24.6h2v2.6h-2zM18.8 24.6h2v2.6h-2zM34.6 23h2v2.6h-2zM37.4 23h2v2.6h-2zM34.6 29.6h2v2.6h-2zM6.2 30h2v2.6h-2zM26.4 34h2v2.6h-2z", tone: "accent" },
    { d: "M37.6 8.6a4.6 4.6 0 1 1 0-.01z", tone: "accent" },
  ],
  car: [
    { d: "M7 33.4c0-4.8 2.6-7.8 6.2-7.8h4.4l4.2-5.8h9c2.1 0 3.4 1.7 4.4 5.8l4.2.6c1.9.3 3 1.7 3 3.6v3.6z", tone: "base" },
    { d: "M21.8 25.6h7.4l-2.4-4.2h-5.2z", tone: "light" },
    { d: "M19.8 25.6h-3.4c-1.4 0-2.3 1.4-2.9 4h6.3z", tone: "light" },
    { d: "M15 29.4a4.8 4.8 0 1 1 0-.01zM34 29.4a4.8 4.8 0 1 1 0-.01z", tone: "accent" },
  ],
  calculus: [
    { d: "M9 40h31M11 42V9", tone: "dark", w: 1.5 },
    { d: "M11 40q11-2 14-13T37 9V40z", tone: "base" },
    { d: "M11 40q11-2 14-13T37 9", tone: "accent", w: 2.4 },
  ],
  bitcoin: [
    { d: "M24 9a15 15 0 1 1 0 30 15 15 0 0 1 0-30z", tone: "base" },
    { d: "M19.6 13.8h2.7v20.4h-2.7zM23.9 13.8h2.7v20.4h-2.7zM20 16.9h7c2.9 0 4.8 1.7 4.8 4.2S29.9 25.3 27 25.3h-7zM20 25.1h7.7c3 0 4.9 1.7 4.9 4.2s-1.9 4.2-4.9 4.2H20z", tone: "accent" },
  ],
};

export const subjects = [
  ["star", "Star"], ["water", "Water"], ["earth", "Earth"], ["life", "Life"],
  ["human", "Human"], ["fire", "Fire"], ["hunting", "Hunting"], ["tribe", "Tribe"],
  ["city", "City"], ["car", "Car"], ["calculus", "Calculus"], ["bitcoin", "Bitcoin"],
];

// A small deterministic generator, so texture is stable between renders and I am judging
// the style rather than a different roll of the dice each time.
export const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

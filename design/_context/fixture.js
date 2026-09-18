// Shared mid-game fixture for the mockups. Real content from world 1.
export const world = { name: "In the Beginning", credits: 4, found: 10, total: 27 };
export const goal = { icon: "🌍", name: "Earth", recipe: null };
export const owned = [
  { id: "energy", icon: "✨", name: "Energy" }, { id: "matter", icon: "⚛️", name: "Matter" },
  { id: "space", icon: "⬛", name: "Space" }, { id: "time", icon: "⏳", name: "Time" },
  { id: "particle", icon: "🔹", name: "Particle" }, { id: "light", icon: "💡", name: "Light" },
  { id: "gravity", icon: "🌀", name: "Gravity" }, { id: "hydrogen", icon: "🎈", name: "Hydrogen" },
  { id: "nebula", icon: "🌫️", name: "Nebula" }, { id: "helium", icon: "🎈", name: "Helium" },
  { id: "carbon", icon: "⚫", name: "Carbon" }, { id: "oxygen", icon: "🫧", name: "Oxygen" },
  { id: "water", icon: "💧", name: "Water" }, { id: "blackhole", icon: "🕳️", name: "Black Hole" },
];
// The one canned discovery: Nebula + Gravity. Everything else is a dud.
export const discovery = { id: "star", icon: "⭐", name: "Star", a: "nebula", b: "gravity",
  blurb: "The cloud squeezes until the middle gets so hot that atoms start fusing. It ignites. The dark ages are over." };
export const named = [
  { icon: "🌊", name: "Ocean", recipe: null },
  { icon: "🌬️", name: "Air", recipe: "🌋 Volcano + 🌀 Gravity" },
];
// Things the player could make right now from what they own. A ? square reveals one of these.
export const makeable = [
  { icon: "🌈", name: "Rainbow" },
  { icon: "🧊", name: "Comet" },
];
export const unknownCount = 15;
export const tried = ["energy+energy", "space+time", "gravity+time", "matter+space", "nebula+time", "light+water"];
export const key = (a, b) => [a, b].sort().join("+");
export const state = new URLSearchParams(location.search).get("state"); // null | picked | found | dud

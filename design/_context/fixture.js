// Shared mid-game fixture for the mockups. Real content from world 1.
export const world = { name: "In the Beginning", credits: 4, found: 8, total: 27 };
export const goal = { icon: "🌍", name: "Earth", recipe: null };
export const owned = [
  { id: "energy", icon: "✨", name: "Energy" }, { id: "matter", icon: "⚛️", name: "Matter" },
  { id: "space", icon: "⬛", name: "Space" }, { id: "time", icon: "⏳", name: "Time" },
  { id: "particle", icon: "🔹", name: "Particle" }, { id: "light", icon: "💡", name: "Light" },
  { id: "gravity", icon: "🌀", name: "Gravity" }, { id: "hydrogen", icon: "🎈", name: "Hydrogen" },
  { id: "nebula", icon: "🌫️", name: "Nebula" }, { id: "helium", icon: "🎈", name: "Helium" },
  { id: "carbon", icon: "⚫", name: "Carbon" }, { id: "oxygen", icon: "🫧", name: "Oxygen" },
];
// Everything that can be made in the mockup, in a chain so several discoveries are reachable in a row.
export const recipes = [
  { a: "nebula", b: "gravity", id: "star", icon: "⭐", name: "Star",
    blurb: "The cloud squeezes until the middle gets so hot that atoms start fusing. It ignites. The dark ages are over." },
  { a: "hydrogen", b: "oxygen", id: "water", icon: "💧", name: "Water",
    blurb: "H₂O. The most abundant molecule you can drink. It is everywhere in space, mostly as ice stuck to things." },
  { a: "star", b: "time", id: "supernova", icon: "💥", name: "Supernova",
    blurb: "Big stars die badly. Out of fuel, the core collapses in a second and the rest blows off with the brightness of a whole galaxy. Everything heavier than iron is made in the blast." },
  { a: "supernova", b: "gravity", id: "blackhole", icon: "🕳️", name: "Black Hole",
    blurb: "What is left when a very big star's core collapses and gravity wins outright. Not even light gets out. Nothing useful comes of it, but it is extremely cool." },
  { a: "supernova", b: "space", id: "stardust", icon: "🌠", name: "Stardust",
    blurb: "The explosion flings the star's guts across space: carbon, oxygen, iron, gold. Joni Mitchell was right. You are this." },
  { a: "light", b: "water", id: "rainbow", icon: "🌈", name: "Rainbow",
    blurb: "Light bends going into a drop of water, bounces off the back, bends again coming out, and the colours come apart. Seven of them, allegedly. Nobody agrees on indigo." },
  { a: "water", b: "space", id: "comet", icon: "🧊", name: "Comet",
    blurb: "A dirty snowball on a very long orbit. Possibly delivered a good chunk of Earth's water, possibly not. Astronomers are still arguing." },
];
// Kept for the round 1 pages, which only know one recipe.
export const discovery = recipes[0];
export const named = [
  { icon: "🌊", name: "Ocean", recipe: null },
  { icon: "🌬️", name: "Air", recipe: "🌋 Volcano + 🌀 Gravity" },
];
export const makeable = [{ icon: "🌈", name: "Rainbow" }, { icon: "🧊", name: "Comet" }];
export const unknownCount = 17;
export const tried = ["energy+energy", "space+time", "gravity+time", "matter+space", "nebula+time", "light+water"];
export const key = (a, b) => [a, b].sort().join("+");
export const state = new URLSearchParams(location.search).get("state"); // null | picked | found | dud | <variant>

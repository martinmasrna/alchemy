// World 1 — Big Bang → Earth
// Recipes are always true. The voice is allowed to be funny.
// Every item: id, name, icon, blurb, and either seed: true or recipe: [a, b].
// version changes whenever the table changes; saves from another version start fresh.

export default {
  id: "w1",
  version: 2,
  name: "In the Beginning",
  subtitle: "From nothing to a wet rock with a sky.",
  seeds: ["energy", "matter", "space", "time"],
  summit: "earth",
  items: [
    // ---- seeds ----
    { id: "energy", name: "Energy", icon: "✨", seed: true,
      blurb: "Everything, before it decided what to be." },
    { id: "matter", name: "Matter", icon: "⚛️", seed: true,
      blurb: "Stuff. Not much of it yet, and none of it interesting." },
    { id: "space", name: "Space", icon: "⬛", seed: true,
      blurb: "Room for things to happen in. Currently expanding at an alarming rate." },
    { id: "time", name: "Time", icon: "⏳", seed: true,
      blurb: "The reason things happen one after another instead of all at once." },

    // ---- first light ----
    { id: "particle", name: "Particle", icon: "🔹", recipe: ["energy", "matter"],
      blurb: "The universe cools a little and energy freezes into the first tiny somethings. Quarks, electrons, that lot. Nobody is around to name them." },
    { id: "light", name: "Light", icon: "💡", recipe: ["energy", "space"],
      blurb: "After 380,000 years of fog the universe goes transparent and light gets out. It is still travelling. Some of it is hitting your radio telescopes right now." },
    { id: "gravity", name: "Gravity", icon: "🌀", recipe: ["matter", "matter"],
      blurb: "Stuff likes other stuff. The weakest force in the universe, but the only one that never gives up, which is why it wins in the end." },
    { id: "hydrogen", name: "Hydrogen", icon: "🎈", recipe: ["particle", "particle"],
      blurb: "One proton, one electron. The simplest possible atom, and still three quarters of everything. The universe's default setting." },
    { id: "lightyear", name: "Lightyear", icon: "📏", recipe: ["light", "time"],
      blurb: "How far light gets in a year. About nine and a half trillion kilometres. Not a unit of time, despite every science-fiction film." },

    // ---- stars ----
    { id: "nebula", name: "Nebula", icon: "🌫️", recipe: ["hydrogen", "gravity"],
      blurb: "Hydrogen, left alone with gravity, starts clumping. A cloud light-years across, slowly falling into itself. Very pretty, very cold, doing nothing yet." },
    { id: "star", name: "Star", icon: "⭐", recipe: ["nebula", "gravity"],
      blurb: "The cloud squeezes until the middle gets so hot that atoms start fusing. It ignites. The dark ages are over." },
    { id: "helium", name: "Helium", icon: "🎈", recipe: ["star", "hydrogen"],
      blurb: "Stars run by crushing hydrogen into helium and pocketing the difference as light. Sunshine is a nuclear waste product." },
    { id: "carbon", name: "Carbon", icon: "⚫", recipe: ["star", "helium"],
      blurb: "When hydrogen runs low, a star starts fusing helium into carbon. Every carbon atom in you was made this way, inside a star that no longer exists." },
    { id: "oxygen", name: "Oxygen", icon: "🫧", recipe: ["star", "carbon"],
      blurb: "Bigger stars keep going and make oxygen. Not for breathing. Nothing breathes. It will be several billion years before anything does." },
    { id: "water", name: "Water", icon: "💧", recipe: ["hydrogen", "oxygen"],
      blurb: "H₂O. The most abundant molecule you can drink. It is everywhere in space, mostly as ice stuck to things." },
    { id: "comet", name: "Comet", icon: "🧊", recipe: ["water", "space"],
      blurb: "A dirty snowball on a very long orbit. Possibly delivered a good chunk of Earth's water, possibly not. Astronomers are still arguing." },
    { id: "rainbow", name: "Rainbow", icon: "🌈", recipe: ["light", "water"],
      blurb: "Light bends going into a drop of water, bounces off the back, bends again coming out, and the colours come apart. Seven of them, allegedly. Nobody agrees on indigo." },

    // ---- death of stars ----
    { id: "supernova", name: "Supernova", icon: "💥", recipe: ["star", "time"],
      blurb: "Big stars die badly. Out of fuel, the core collapses in a second and the rest blows off with the brightness of a whole galaxy. Everything heavier than iron is made in the blast." },
    { id: "stardust", name: "Stardust", icon: "🌠", recipe: ["supernova", "space"],
      blurb: "The explosion flings the star's guts across space: carbon, oxygen, iron, gold. Joni Mitchell was right. You are this." },
    { id: "blackhole", name: "Black Hole", icon: "🕳️", recipe: ["supernova", "gravity"],
      blurb: "What is left when a very big star's core collapses and gravity wins outright. Not even light gets out. Nothing useful comes of it, but it is extremely cool." },

    // ---- rocks ----
    { id: "rock", name: "Rock", icon: "🪨", recipe: ["stardust", "time"],
      blurb: "Give dust a few million years and it sticks to other dust. Grains become pebbles, pebbles become boulders. The first solid thing in the universe, and it is a rock." },
    { id: "planet", name: "Planet", icon: "🪐", recipe: ["rock", "gravity"],
      blurb: "Rocks pull on rocks. The biggest ones sweep up everything nearby until only a few are left, each in its own lane. Round, because gravity has no patience for corners." },
    { id: "solarsystem", name: "Solar System", icon: "🔆", recipe: ["star", "planet"],
      blurb: "A star with planets going round it. Ours has eight, a belt of leftovers, and a long-running argument about Pluto." },
    { id: "galaxy", name: "Galaxy", icon: "🌌", recipe: ["solarsystem", "solarsystem"],
      blurb: "A few hundred billion of these, held together by gravity with a black hole in the middle. Yours is called the Milky Way, for reasons that will make sense once there are cows." },
    { id: "moon", name: "Moon", icon: "🌙", recipe: ["planet", "planet"],
      blurb: "A Mars-sized planet slams into a young Earth. The splash cools into a moon. The tides, the months and a fair bit of poetry trace back to this one bad afternoon." },
    { id: "lava", name: "Lava", icon: "🔥", recipe: ["rock", "energy"],
      blurb: "Rock, but hot enough to pour. The inside of every young planet is mostly this, and it wants out." },
    { id: "volcano", name: "Volcano", icon: "🌋", recipe: ["lava", "planet"],
      blurb: "The crust is thin and the inside is molten, so it leaks. Every eruption brings up gas that has been trapped since the rock formed." },
    { id: "air", name: "Air", icon: "🌬️", recipe: ["volcano", "gravity"],
      blurb: "The gas the volcanoes belch would drift off into space. Gravity says no. Not breathable yet: mostly carbon dioxide, steam and worse. Fixing that will be someone else's job." },
    { id: "ocean", name: "Ocean", icon: "🌊", recipe: ["water", "planet"],
      blurb: "Steam from volcanoes, ice from comets, it all rains down for a few million years and pools in the low bits. The planet turns blue." },
    { id: "cloud", name: "Cloud", icon: "☁️", recipe: ["water", "air"],
      blurb: "Water that has left the ocean and is thinking about it. Will come back down. Repeatedly. Forever." },

    // ---- summit ----
    { id: "earth", name: "Earth", icon: "🌍", recipe: ["ocean", "air"],
      blurb: "A rock, wet on the outside, with a sky. Third from the Sun. Nothing lives here yet, but the ingredients are all in place. Give it a moment." },
  ],
};

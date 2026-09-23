// World 2 — a wet rock with a sky → the first life
// Recipes are always true. The voice is allowed to be funny.
// Every item: id, name, icon, blurb, and either seed: true or recipe: [a, b].
// version changes whenever the table changes; saves from another version start fresh.
// The icons are emoji until this world's are drawn.

export default {
  id: "w2",
  version: 1,
  name: "Something Stirs",
  subtitle: "From a wet rock with a sky to something that is alive.",
  seeds: ["sun", "water", "rock", "air"],
  summit: "life",
  items: [
    // ---- seeds ----
    { id: "sun", name: "Sun", icon: "☀️", seed: true,
      blurb: "A perfectly ordinary star, eight light-minutes away. It is going to do most of the work in this chapter." },
    { id: "water", name: "Water", icon: "💧", seed: true,
      blurb: "Rained down for millions of years and has not stopped moving since." },
    { id: "rock", name: "Rock", icon: "🪨", seed: true,
      blurb: "The planet is mostly this. Bare, grey, and nothing growing on it anywhere." },
    { id: "air", name: "Air", icon: "💨", seed: true,
      blurb: "Carbon dioxide, nitrogen, steam. Not a breath of oxygen. You would last about a minute." },

    // ---- weather ----
    { id: "vapour", name: "Vapour", icon: "♨️", recipe: ["sun", "water"],
      blurb: "Sunlight warms the sea and water slips into the air as an invisible gas. The sea loses about a metre a year this way and never notices." },
    { id: "wind", name: "Wind", icon: "🌬️", recipe: ["sun", "air"],
      blurb: "The Sun warms some air more than other air. The warm air rises, cold air rushes in underneath, and that rushing is wind." },
    { id: "cloud", name: "Cloud", icon: "☁️", recipe: ["vapour", "air"],
      blurb: "Vapour rises, the air gets colder, and the gas turns back into tiny drops of water. A billion of them together look white." },
    { id: "rain", name: "Rain", icon: "🌧️", recipe: ["cloud", "cloud"],
      blurb: "Clouds merge, drops bump into drops, and soon they are too heavy to float. What goes up comes down, usually on a weekend." },
    { id: "storm", name: "Storm", icon: "⛈️", recipe: ["rain", "wind"],
      blurb: "Rain, driven sideways, under clouds piled ten kilometres high. Nobody is around to cancel the picnic." },
    { id: "lightning", name: "Lightning", icon: "⚡", recipe: ["storm", "cloud"],
      blurb: "Ice and water rubbing together inside a storm cloud build up a charge until it jumps. Hotter than the surface of the Sun, for a millisecond." },
    { id: "rainbow", name: "Rainbow", icon: "🌈", recipe: ["rain", "sun"],
      blurb: "Sunlight goes into a raindrop white and comes out in colours. The first one in history, and it is wasted on rocks." },
    { id: "hurricane", name: "Hurricane", icon: "🌀", recipe: ["storm", "wind"],
      blurb: "A storm over warm sea gathers more and more wind and starts to spin. Hundreds of kilometres across, with a calm eye in the middle." },

    // ---- land and sea ----
    { id: "sea", name: "Sea", icon: "🌊", recipe: ["water", "water"],
      blurb: "Enough water to cover most of the planet, and it does. Salty, warm, and about to become very important." },
    { id: "bubble", name: "Bubble", icon: "🫧", recipe: ["water", "air"],
      blurb: "A little air wrapped in a skin of water. Pop. Worth remembering, though: a skin round something is a very good idea." },
    { id: "mountain", name: "Mountain", icon: "⛰️", recipe: ["rock", "rock"],
      blurb: "The crust is always shoving itself into heaps. Give it long enough and a heap is eight kilometres high." },
    { id: "salt", name: "Salt", icon: "🧂", recipe: ["sea", "sun"],
      blurb: "Let the Sun dry out a puddle of sea and white crystals are left behind. The sea is salty because rivers have been rinsing rocks into it for ever." },
    { id: "island", name: "Island", icon: "🏝️", recipe: ["sea", "rock"],
      blurb: "Rock with sea all round it. No palm trees yet. No trees at all, in fact." },
    { id: "snow", name: "Snow", icon: "❄️", recipe: ["cloud", "mountain"],
      blurb: "Push a cloud up a mountain and it gets cold enough for the drops to freeze into six-sided crystals. No two alike, supposedly. Nobody has checked." },
    { id: "river", name: "River", icon: "🏞️", recipe: ["rain", "mountain"],
      blurb: "Rain lands on the mountains and runs downhill, finds other rain, and heads for the sea. It will take the mountain with it, one grain at a time." },
    { id: "glacier", name: "Glacier", icon: "🏔️", recipe: ["snow", "mountain"],
      blurb: "Snow piles on snow until the bottom turns to ice and the whole lot starts to slide. A river, but a metre a day." },
    { id: "iceberg", name: "Iceberg", icon: "🧊", recipe: ["glacier", "sea"],
      blurb: "The end of a glacier breaks off into the sea and floats away. Nine tenths of it is underwater, sulking." },
    { id: "sand", name: "Sand", icon: "⏳", recipe: ["river", "rock"],
      blurb: "A river rolls rocks along its bed and grinds them into smaller and smaller rocks. Sand is a mountain on its way to the sea." },
    { id: "desert", name: "Desert", icon: "🏜️", recipe: ["sand", "sun"],
      blurb: "Sand, sun, and not a drop of rain. On a planet where nothing lives yet, the difference from everywhere else is mostly the view." },
    { id: "beach", name: "Beach", icon: "🏖️", recipe: ["sand", "sea"],
      blurb: "Where the sand meets the sea. Waves in, waves out, nobody on it. The quietest beach there will ever be." },

    // ---- the soup ----
    { id: "soup", name: "Primordial Soup", icon: "🥣", recipe: ["sea", "lightning"],
      blurb: "Lightning pounds the sea for millions of years and the water fills up with carbon-based bits and pieces. Warm, brown and full of promise." },
    { id: "amino", name: "Amino Acids", icon: "🔗", recipe: ["soup", "lightning"],
      blurb: "In 1952 two chemists sparked a flask of water and gases for a week and found amino acids at the bottom. The building blocks of life, made by weather." },
    { id: "protein", name: "Protein", icon: "🧶", recipe: ["amino", "amino"],
      blurb: "Amino acids link up into long chains and fold into shapes. The right shape can grab things, cut things, or build more of itself." },
    { id: "cell", name: "Cell", icon: "🧫", recipe: ["protein", "bubble"],
      blurb: "Oily scraps in the soup curl up into tiny bubbles, and some of them trap proteins inside. A skin with work going on inside it. Remember the bubble?" },

    // ---- summit ----
    { id: "life", name: "Life", icon: "🦠", recipe: ["cell", "cell"],
      blurb: "One cell splits into two, and each of them does it again. Something that makes more of itself. Everything alive today descends from this." },
  ],
};

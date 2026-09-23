# world1 — the whole set, drawn

Thirty icons for *In the Beginning*. Martin reviews them one at a time on `review.html`, and his verdicts live in `review.json` beside it, each tied to a hash of the drawing it judged. `index.html` shows the current set at 74px, in the real grid at 34px, and in the pairs that must not collide.

## What the build settled

**Light is drawn as light; everything else is paper.** Shadow box is cut paper, and its no-glow rule was right for a drop, a moon or a volcano. For a star, a nebula, lava, a supernova, energy or space it was wrong, because their substance is glow. The first pass drew them as flat card and every one failed: "I need to FEEL the heat", "doesn't capture the majesty", a nebula ugly next to the luminous ones from earlier rounds. So light sources get real gradients and bloom, and they may spill past the frame, because a glow cropped at the viewBox ends in a hard square edge. Martin passed all eleven paper icons on the first pass (Water, Moon, Volcano, Cloud, Earth, Gravity, Solar System, Time, Particle, Air, Rainbow), and those were exactly the things that reflect light.

**A universal shape, finished to a high standard.** Martin's words: the brain should categorise an icon in half a second, but that does not mean it can look cheap. With the set side by side, the flat-parts icons (Air as three lines, Rainbow as four arcs, Cloud as two shapes) looked like a different, cheaper game than the hand-drawn ones. Matter is now drawn with the light it reflects: shading, highlights, rims, texture, reflections. The shapes did not change. Only Rock, Planet, Matter, Moon and the Solar System's orbits are still built from flat parts, because with enough detail they hold up.

**A piece of world is drawn when the thing is only itself in relation to something else**, not as a rule applied to every icon. Gravity is a ball until the sheet dents. The Moon is a rock until a planet is under it. Rock gets the pebbles it was made from. Ocean gets a low sun and its road of glitter across open sea. Star, Water and Earth keep theirs. Everything else stands alone, because world 1 is the universe before anywhere exists.

**Chemical elements are periodic-table tiles**, Martin's call: symbol and atomic number, which says Hydrogen and not "an atom". Alone that is boring, so the symbol is lit like a discharge tube in the colour that gas really glows: hydrogen pink, helium peach, oxygen lilac, carbon arc white-blue.

**Expected picture, not just expected colour.** A five-pointed star, because every child draws one. Gargantua from Interstellar for the black hole, because it is the picture everyone has. A generic planet needs a colour no famous planet owns, because every one that does names it: a ring was Saturn, rust was Mars, banded tan is Jupiter. It is dusty violet.

## Readings that had to be drawn out, not designed out

Every one of these was found by rendering and looking, never by thinking about it first.

- **A level ellipse with something filled in the middle is an eye.** One is an eye, two is a winking eye, and three is the atom symbol. Concentric rings round a bright middle are an eye too.
- **Three lines to the centre of a hexagon is an isometric cube.**
- **A hard-edged comet tail is an object**: a syringe, then a bone, then a broom. A comet is a fuzzy head with two soft tails.
- **A curve along the bottom of the box reads as ground**, whatever it is meant to be. It ruined one Particle and made the Moon.
- **Ocean is a view, not a thing.** Stacked waves were a pattern, a lens of sea a bowl, a sea running off the frame a block cut square, a round fade a bowl again, and Hokusai's great wave was a wave. What means ocean is open water to a horizon, fading into the card downwards and at both ends. The sun decides the hour: gold on the horizon was a sunset, and high and white it was the Moon, so it is high and yellow.
- **Matter is a clump of protons and neutrons**, red and blue: the textbook picture of what everything is made of, with Particle as one ball of it. Three grey chips were a snowman, three primitive solids were geometry, and the atom symbol said "atom" rather than "stuff".
- **Distance is pale.** The first far horizon was dark and read as a pair of sunglasses; atmosphere lightens what is far away.
- **A paper shadow falls into hollows.** Anything placed in the shadow a shape throws on the card turns black.
- **The light rule applies inside paper subjects too.** The Solar System's sun was a paper disc, the one star in the set that did not glow, and the Volcano's lava was flat orange beside a Lava that glows. Both keep paper bodies with light laid over them.
- **A rounded square is a tile.** Space as a lifted panel read as a fifth element next to the four real ones; it is frameless now and dissolves into the card.
- **Visual weight has to match across the grid.** Particle, Planet and the Moon were half the size of the full-bleed icons, and at 34px Particle was a dot; they are scaled up while their pieces of world stay put.
- **No hard crops.** The Moon's planet was cut straight by the frame, the one place the viewBox showed; it fades out downwards now.
- **Energy cannot be warm and radial**, or it is a second Star. It is electric blue-white, the one light in the set that is not fire-coloured.

## Still open

- The picked state. The app tints the card and brightens the emoji on it. A flat paper icon has nothing to brighten.
- The discovery moment. These have only been judged as stills; the collide animation flies two of them across the screen, and glowing ones may need their bloom kept when they move.
- The named-but-undiscovered chips and the `?` squares, still emoji.
- Light mode, never looked at, and the glowing icons are built for a dark card.
- Paint cost. Blurred shadows on every paper icon plus several bloom layers on every light icon is not free on a phone; the filters may need baking into images.

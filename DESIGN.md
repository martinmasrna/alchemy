# Alchemy — design foundations

A combine-to-discover game in the family of Zed's Alchemy and Little Alchemy, with the arc of a Civilization tech tree. For Martin and a few friends. The motivation is building something good, not shipping. Slop is the failure mode.

## Why these games work
The player already has a rich, implicit model of the domain. The game lets them test it in one-second hypotheses. Correct guesses feel like intelligence, wrong ones feel like information, and each success expands what can be tested. The fun lasts exactly as long as there is a dense supply of plausible-but-untried combinations.

## Roles
Martin owns feel, systems and mechanics. Writing is shared. Code is the agent's entirely.

## A world
Four seeds, one visible summit, everything between is dark. Tap two owned things, get one thing or nothing.
Always two ingredients. Ingredients are never consumed. Exactly one recipe per result.
A world is 25 to 40 discoveries and takes 30 to 60 minutes. It ends when the summit is reached and should leave you wanting the next one.
Hints cost credits and the balance is always visible. Free hints turned into the game itself in the first play; cheap ones let the second play buy the whole planet half. Current tunable: start with 2. Only a guessed discovery earns 1: if its recipe was bought, it earns nothing, so hints cannot fund hints.
Two hints only. Tap an undiscovered ? square twice and it names something you can make right now from what you own, for 1 credit: a puzzle you can solve immediately, never a dead end you cannot reach. "How is it made?" on a named item or the goal costs 5 and shows the recipe. The bottom-up hints ("what does this lead to", "what goes with this") were cut after the second play: they were spammable and did not feel like thinking.
Undiscovered items show as a count of ? marks (no fixed identity). Named ones sit on glass with their name and the recipe hint.
On the shelf: dead ends announcing themselves when found. Try it only if the grind returns in a later log.

## The big game
A diamond of worlds. One root world, fans out into parallel threads, converges into a single final world. Finishing a world unlocks the next ones and seeds them. Slow burn, several worlds open at once.
Prologue, three linear worlds before humans exist: Energy, Matter, Space, Time → Earth. Sun, Water, Rock, Air → Life. Cell, Sun, Water, Time → Human. The diamond broadens from Human.

## Content rules
Recipes are always true. The voice is allowed to be funny (Horrible Histories, not a joke generator). Every discovery gets one or two lines of text.
Every recipe must pass two tests. Forward: would a curious adult plausibly guess these two make this? Backward: seeing the result, do they say "of course"? Anything needing a Wikipedia lookup fails.
What kinds of things belong on the tree is decided by example, not by definition.
The player is never wrong. If the target player did not guess a recipe, the recipe fails, whatever the physics says.
Self-pairs (X + X) only when "many of these" is obvious: Rock + Rock, Planet + Planet, Solar System + Solar System. Star + Star is not.
Seeds earn their keep in the first minutes. Players stop reaching for seeds once they have real things, so late recipes should not depend on a seed (Time is the exception, "give it time" stays intuitive).
Chains with a repeating pattern (Star + Hydrogen, Star + Helium, Star + Carbon) are a highlight, not filler. Keep them.
Fewer dead ends. Eight of 28 was too many when they are indistinguishable from unfinished business.
The grid never shows which pairs were tried or which already made something. A checklist invites brute force; the game should reward thinking. Tried pairs are still recorded for the log.

## The screen
Converged through mockups in `design/` (the folder tree is the decision history, each node has a notes.md). Winner: `design/bench-top/reveal/merge/impact/collide-medium`.
Bench on top: two slots and a result slot pinned above the grid of what you own. Tap a card, tap another (or the same again) to combine. Tap the first slot to put a card back. A dud turns the result slot red and shakes the bench.
Discovery is the highlight and gets a full-screen moment: the two ingredients collide (pull-back, then a 650ms flight), a flash and a ring at contact, a 100ms hit-stop, a 7px kick, sparks, the result lands with overshoot, then the pair, the name, the blurb and the credit rise in. Dismissed by tapping anywhere. Reaching the summit adds a stats line to the same moment.
The grid never shows which pairs were tried or which already made something.
Animation rule from the iOS bug: no CSS variables inside keyframes. Motion that depends on data runs through the Web Animations API with pixel values.
Icons: the emoji are placeholders and the replacement is decided. Every icon is a universal shape the brain places in half a second, finished to a high standard: flat and low-effort is a failure even when it reads. Things that reflect light are matte and modelled, with shading, highlights and a cast shadow, and no tile behind. Things that give off light (stars, nebulae, lava, energy) are drawn as light, with real glow, because matte cannot hold heat or majesty and the first review said so for every one of them. A piece of the world is drawn only when the thing is itself in relation to something else: Gravity's sheet, the Moon's planet, the Rock's pebbles. A thing is the colour a person already expects it to be, and the test is Earth. Chemical elements are periodic-table tiles with the symbol lit in the colour that gas really glows. The decision and its rules are in `design/shortlist/habitat-r/port-spec.md`; the world 1 set and what the drawing taught are in `design/shortlist/habitat-r/world1/`. The game loads them from `icons/world1.js`, baked from the design source by `node tools/export-icons.mjs`.
The look around the icons is Sky, chosen in `design/finish/`: the screen is the night the icons live in, nothing is boxed, and glass is kept for what you act on (the bench, and a thing you know the name of). Progress is a ring round the goal, with the found count under its name. The undiscovered are dim question marks, all alike. The bench's sockets stay dark and carved in; lightened, they read as form fields. The play log and starting over live behind a menu. Type is Outfit.

## Platform
Browser, phone-first, installable to the home screen. No build step, no framework.
Progress must survive closing the tab, clearing history and switching phones. Browser storage alone is not enough for the finished game. The worker already holds every player's latest save, so restoring on another phone is a small step away.

## Process
Martin plays each new world blind. The table stays hidden from him until after the play, because "would I have guessed it" can only be tested once. Then the table is cut and rewritten together.

## Where we are
World 1 (Big Bang to Earth, 26 discoveries) is live at https://martinmasrna.github.io/alchemy/ with the converged screen and the credit economy. Martin has played it twice (logs in `playlogs/`); the planet half has never been played blind, so the next real data point is a friend's log. All 30 of world 1's icons are drawn and locked, and they are in the game with the Sky screen. The next check is a play on a phone: whether the collide moment and the pinned glass bench stay smooth, and whether the icons read at grid size. The whole set is at `design/shortlist/habitat-r/world1/gallery.html`. Lightyear was cut from the table: it was the one unit among things, and a dead end.
Martin's third play of world 1 (2026-09-23) felt unguessable: Nebula and Star took 15 and 32 duds against 1 to 5 in earlier plays, with unchanged recipes. Two suspects: the drawn icons say what a thing is but not what it does (the emoji's 🎈 said gas, 🌀 said pull), and one recipe per result turns every other plausible pairing into a silent dud. World 1 is also abstract (Energy, Matter, Space, Time), where a pair has no single natural result.
World 2, *Something Stirs* (Sun, Water, Rock, Air to Life, 25 discoveries), is built to test that: concrete things, emoji icons, the same rules. Martin plays it blind, so its table stays unread by him until after the play. It opens from the menu, or with `?world=w2`.

## Parked
Hint cost (candidates: earned currency, scarcity per world, slow recharge, a quiz). How a finished world seeds the next ones. What happens at the end of a world.

## Decide by example
Dead ends. Failure feedback on a dud combination (silence vs. near-miss). Which of the slop failure modes matter most.

## Working on it
`python tools/serve.py` in the repo root, open http://127.0.0.1:8765/. It serves the repo like `python -m http.server` and can also write `review.json` files under `design/`, which is what review pages save verdicts into.
`gallery.html` in the same folder shows the set in a grid at 34, 88 or 140px. Icons are reviewed at `design/shortlist/habitat-r/world1/review.html`: Good takes an icon out of the queue, Needs work saves a note. Verdicts go to `review.json` beside it, keyed to a hash of each drawing, so a redrawn icon comes back to the queue with the old note shown next to it.
`node tools/check-world.mjs worlds/world1.js` validates a table: ids, reachability, one recipe per pair, critical path, dead ends.
`node tools/smoke.mjs` plays world 1 to the summit in headless Chrome and checks the app (needs the server running).
Every play uploads itself to a Cloudflare Worker (`worker/`, URL in `config.js`), one stored log per play, so starting over never overwrites an earlier one. First launch asks the player's name. Opening the game with `?nolog` plays without uploading and without asking for a name. `ADMIN_KEY=$(cat worker/.admin-key) node tools/pull-logs.mjs` downloads every play into `playlogs/`; the key file is git-ignored and also stored as the repo secret ADMIN_KEY.
The worker deploys from GitHub Actions (`.github/workflows/deploy-worker.yml`) on any push touching `worker/`, because the work PC's proxy only lets GitHub through. The terminal cannot reach Cloudflare or the deployed game at all; anything that has to talk to them goes through headless Chrome, which is what the smoke and pull tools do.
`node tools/analyze-log.mjs playlogs/<log>.json worlds/<world>.js` turns a play log into the story of the session: timeline, duds before each hit, repeated duds, how each discovery was found.
The table has a `version`. Bump it when recipes change, and bump `VERSION` in `sw.js` on every deploy. A save from another table version starts fresh.

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
Hints cost credits and the balance is always visible. Free hints turned into the game itself in the first play; cheap ones let the second play buy the whole planet half. Current tunable: start with 2. Only a guessed discovery earns 1: if its recipe was bought or a "goes with" hint handed over the pair, it earns nothing, so hints cannot fund hints. "What is it?" (tap an undiscovered square for its name) costs 1, "what does this lead to?" and "what goes with this?" cost 2, "how is it made?" costs 5.
Undiscovered items show as ? squares in a fixed shuffled order, so position leaks nothing. Named ones show their name and offer the recipe hint.
Name hints prefer items on the path to the summit and point at a dead end only when nothing else is left. In the first play a hint named Comet, a dead end, and it ate 20 attempts.
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

## Platform
Browser, phone-first, installable to the home screen. No build step, no framework.
Progress must survive closing the tab, clearing history and switching phones. Browser storage alone is not enough for the finished game. The worker already holds every player's latest save, so restoring on another phone is a small step away.

## Process
Martin plays each new world blind. The table stays hidden from him until after the play, because "would I have guessed it" can only be tested once. Then the table is cut and rewritten together.

## Parked
Hint cost (candidates: earned currency, scarcity per world, slow recharge, a quiz). How a finished world seeds the next ones. What happens at the end of a world.

## Decide by example
Dead ends. Failure feedback on a dud combination (silence vs. near-miss). Which of the slop failure modes matter most.

## Working on it
`python -m http.server 8765` in the repo root, open http://127.0.0.1:8765/.
`node tools/check-world.mjs worlds/world1.js` validates a table: ids, reachability, one recipe per pair, critical path, dead ends.
`node tools/smoke.mjs` plays world 1 to the summit in headless Chrome and checks the app (needs the server running).
Every play uploads itself to a Cloudflare Worker (`worker/`, URL in `config.js`). First launch asks the player's name. `ADMIN_KEY=$(cat worker/.admin-key) node tools/pull-logs.mjs` downloads every play into `playlogs/`; the key file is git-ignored and also stored as the repo secret ADMIN_KEY.
The worker deploys from GitHub Actions (`.github/workflows/deploy-worker.yml`) on any push touching `worker/`, because the work PC's proxy only lets GitHub through. The terminal cannot reach Cloudflare or the deployed game at all; anything that has to talk to them goes through headless Chrome, which is what the smoke and pull tools do.
`node tools/analyze-log.mjs playlogs/<log>.json worlds/world1.js` turns a play log into the story of the session: timeline, duds before each hit, repeated duds, how each discovery was found.
The table has a `version`. Bump it when recipes change, and bump `VERSION` in `sw.js` on every deploy. A save from another table version starts fresh.

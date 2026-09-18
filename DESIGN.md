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
Hints exist and must cost something (a free hint kills the pride of figuring it out). Top-down: name a known target, get its recipe. Bottom-up: name something you own, learn what it leads to or what it pairs with.

## The big game
A diamond of worlds. One root world, fans out into parallel threads, converges into a single final world. Finishing a world unlocks the next ones and seeds them. Slow burn, several worlds open at once.
Prologue, three linear worlds before humans exist: Energy, Matter, Space, Time → Earth. Sun, Water, Rock, Air → Life. Cell, Sun, Water, Time → Human. The diamond broadens from Human.

## Content rules
Recipes are always true. The voice is allowed to be funny (Horrible Histories, not a joke generator). Every discovery gets one or two lines of text.
Every recipe must pass two tests. Forward: would a curious adult plausibly guess these two make this? Backward: seeing the result, do they say "of course"? Anything needing a Wikipedia lookup fails.
What kinds of things belong on the tree is decided by example, not by definition.

## Platform
Browser, phone-first, installable to the home screen. No build step, no framework.
Progress must survive closing the tab, clearing history and switching phones. Browser storage alone is not enough for the finished game.

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

## ERROR — PROOF OF CONCEPT ONLY.

*This repo is currently here for ideas/discussion purposes only.*

The idea is to parse an HTML file (and its stylesheet) into JSDOM. We then recursively walk through the DOM, and cache each node's computed styles.

With your own tests, you'd then take the result of this walkthrough, and snapshot it with Jest.

**So, if the computed styles changed, you get to see if you did it happened as a negative side-effect.**

- This _should_ be faster than visual regression tools (e.g. [PhantomCSS](https://github.com/Huddle/PhantomCSS))
- This _should_ be easier than manually asserting all your computed styles with a tool (e.g. [Hardy](https://github.com/thingsinjars/Hardy))

## Work out how to:

- Show which node it was (with a DOM path?) from the page whose computed styles changed
- Show Sass source maps?!
- If it's fast enough to be running this in the background

**Jest peeps: if you have any advice on this, I'd love to hear from you.**

## How to use demo

+ `yarn`
+ `yarn start`

# RENFT assignment

I assumed support for evergreen browsers. Built with JS modules so needs
to be run from a webserver.

> If you wish to make an apple pie from scratch, you must first invent the universe.
> -- Carl Sagan

The easiest way to work and hopefully to read to code is by sticking to
recognizable patterns. The grunt of the work is being done by a DOM creation
library in `src/lib.js`. This is more or less a DSL mimicking parts JSX.
The `h()` helper is pretty fantastic but also wonky.

## Start me up

Either have python3 or a node version on your system.

```
$ # any of the following will do
$ python -m http.server 8080
$ npx http-server
```

Navigate to [http://localhost:3000](http://localhost:3000).

## Caveats

Event layout system isn't perfect due to flexbox implementation creating layout
issues when flex (grand)children receive `white-space: nowrap`. Should try out a
grid solution before writing a custom renderer.

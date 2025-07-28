# Build a Blog Aggregator in TypeScript project from Boot.dev

Personal solution to the Build a Blog Aggregator in TypeScript project from Boot.dev.

## Lessons learned

- In CommonJS-based projects, the absolute path to a file can easily be obtained using the `__dirname` global variable. When using ES Modules, this variable is unfortunately no longer accessible. Although, it's still possible to generate your own `__dirname` variable using a couple of Node.js built-in modules.
  - [How to get the current folder in Node](https://flaviocopes.com/node-get-current-folder/)
  - [How to fix "__dirname is not defined in ES module scope"](https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/)

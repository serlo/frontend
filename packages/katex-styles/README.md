# serlo-katex-styles

Our custom CSS styles for KaTeX

## Installation

`yarn add @serlo/katex-styles`

## Usage

`import '@serlo/katex-styles/styles.css'`

### Publishing to npm

No Github workflow is setup for this package, so you'll need to publish it manually.

1. Rename the `package.json` name property from `@serlo/workspace-katex-styles` to the actual package name `@serlo/katex-styles`. This differentiation is to not run into naming conflicts where `yarn` upon installation tries to resolve the workspace version, instead of the published version on the npm registry.
2. Bump the version in `package.json`
3. Run `npm login` and make sure you authenticate with an account within the serlo npm organization
4. Run `npm publish --access public`
5. Once you are done with the publish flow, ensure to change the name in the `package.json` back to `@serlo/workspace-katex-styles`

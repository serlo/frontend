# Serlo Editor as a web component

This is an early version of the web component wrapping the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are actively working on both packages and thus there will be breaking changes in minor versions before version 1 is reached. The repository [serlo/block-serlo-editor-with-vue-js](https://github.com/serlo/block-serlo-editor-with-vue-js) shows how this package can be used.

## Releasing a new version to npm

Bump the version number in the package.json and
the github workflow seen inside `editor-web-component.yaml` will take care of the publishing.

## Linking for local development with integrations

In order to avoid publishing the editor to NPM or dealing with tarballs every time you need to test your changes in an integration locally, you can use `yalc` to link the editor web component package to your integration locally.

Prerequisites:

- Yalc: `yarn global add yalc`

Initial steps:

1. From this workspace -> run `yarn yalc:publish`
2. From consumer repo -> run `yalc add @serlo/editor-web-component`

After making some changes in the editor:

1. From this workspace -> run `yarn yalc:publish` (pushes dist, updates version and cache)

To remove the local link to Serlo Editor:

1. From consumer repo -> run `yalc remove @serlo/editor-web-component`

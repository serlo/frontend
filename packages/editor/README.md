# Serlo Editor

This is an early beta version of the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are currently working on this package and thus there will be breaking changes. The repository [serlo/serlo-editor-for-edusharing](https://github.com/serlo/serlo-editor-for-edusharing) shows how this package can be used.

## Current Editor package API

#### 1. `SerloEditor`, `type SerloEditorProps`

- **Why Exported/How Used**: `SerloEditor` is the core component of the `@serlo/editor` package, providing the main editor functionality. It's exported to allow users to embed the editor into their applications, passing in initial state, configuration, and custom render props to tailor the editor's functionality to their needs.
- **Long-Term Support**: Will stay
- **Needs Change?**: Configuration props need restructuring

#### 2. `SerloRenderer`, `type SerloRendererProps`

- **Why Exported/How Used**: `SerloRenderer` is a component provided by the `@serlo/editor` for rendering content in a non-editable format. This is particularly useful for displaying the content to users who are not currently editing or are not allowed to edit.
- **Long-Term Support**: Will stay
- **Needs Change?**: Same changes as `SerloEditor`

#### 3. `type BaseEditor`

- **Why Exported/How Used**: This type describes the `editor` render prop provided by the `SerloEditor` component.
- **Long-Term Support**: Will stay unless a better solution is found
- **Needs Change?**: Unclear

#### 4. Exports from from `@editor/plugin`, `@/components/fa-icon`, `@editor/editor-ui`

- **Why Exported/How Used**: These exports are currently necessary for defining custom Edusharing plugins. We don't plan to support custom plugins in the future.
- **Long-Term Support**: To be deprecated
- **Needs Change?**: No

### `SerloEditor` component props

- **`children`**: When passed in a function as the `children` prop, the `SerloEditor` component provides an `editor` render prop as the argument to the `children` function. This `editor` object provides:

  - `element` - a React node for rendering the editor
  - `i18n` - for customizing translation strings
  - `history` - for persisting, undo, redo
  - `selectRootDocument` - a function for selecting the current state

- **`pluginsConfig` (optional)**: Serlo Editor plugins can be configured to an extent, this configuration is currently done via the `pluginsConfig` prop of the `SerloEditor` component. Each plugin can be configured separately. There are currently two special rules that apply to the Editor in general:

  - `enableTextAreaExercise`: A flag that enables the TextAreaExercise plugin. TextAreaExercise plugin is currently not yet ready for serlo.org, but it is enabled in Edusharing integration. **To be deprecated once more features are added to the TextAreaExercise plugin and it's ready for serlo.org.**
  - `exerciseVisibleInSuggestion`: A flag that defines if Exercise plugin is visible in Text plugin suggestions. **Not necessary for Serlo Editor package, instead used by serlo.org, could be removed.**

- **`customPlugins` (optional)**: An array of custom plugins. **To be deprecated, only used in Edusharing integration**.

- **`initialState` (optional)**: Pass in an `initialState` to the `SerloEditor` component to prevent seeing an empty editor state.

- **`onChange` (optional)**: To receive state changes of the editor and persist the content into your own infrastructure, use the `onChange` callback of the `SerloEditor` component. It's a function with the signature `({ changed, getDocument }) => void` of which you can call `getDocument()` to fetch the latest editor state.

- **`language` (optional)**: The default language is `de`.

## Releasing a new version to npm

Bump the version number in the package.json and
the github workflow seen inside `editor.yaml` will take care of the publishing.

## Linking for local development with integrations

In order to avoid publishing the editor to NPM or dealing with tarballs every time you need to test your changes in an integration locally, you can use `yalc` to link the editor package to your integration locally.

Prerequisites:

- Yalc: `yarn global add yalc`

Initial steps:

1. From this workspace -> run `yarn yalc:publish`
2. From consumer repo -> run `yalc add @serlo/editor`

After making some changes in the editor:

1. From this workspace -> run `yarn yalc:publish` (pushes dist, updates version and cache)

To remove the local link to Serlo Editor:

1. From consumer repo -> run `yalc remove @serlo/editor`

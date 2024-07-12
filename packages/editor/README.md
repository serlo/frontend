# Serlo Editor

This is an early version of the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are actively working on this package and thus there will be breaking changes before v1 is reached. The repository [serlo/serlo-editor-for-edusharing](https://github.com/serlo/serlo-editor-for-edusharing) shows an example of how this package can be used in production.

If you are not using React, consider using the Serlo Editor as a [web component](https://www.npmjs.com/package/@serlo/editor-web-component).

## Using the Serlo Editor

### Installation

In your React project

```bash
yarn add @serlo/editor
```

### Usage

You can see a complete working example of the usage [here](https://github.com/serlo/serlo-editor-for-edusharing/blob/main/src/frontend/editor.tsx#L32).

```tsx
import { SerloEditor, SerloEditorProps } from '@serlo/editor'

type InitialState = SerloEditorProps['initialState']

function MyCustomSerloEditor({ initialState }: { initialState: InitialState }) {
  return (
    <SerloEditor
      initialState={initialState}
      onChange={({ changed, getDocument }) => {
        if (changed){
          console.log(`New state: `, getDocument())
        }
      }}
    >
      {({ editor }) => (
        {/* Optionally configure plugins or i18n strings via the editor object */}
        <div>
          {/* Renders the actual editor content */}
          {editor.element}
        </div>
      )}
    </SerloEditor>
  )
}
```

See below for the current API specification.

## Current Editor package API

### 1. `SerloEditor`, `type SerloEditorProps`

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

#### 5. Style (css) export `@serlo/editor/styles.css`

- **Why Exported/How Used**: Styles the editor with our custom css. Just import `import '@serlo/editor/style.css'` wherever you render the editor. Mostly used in the web component. The css already comes bundled within the JS of the editor package. Therefore, you shouldn't need to import this, unless you plan to render the editor within the Shadow DOM.
- **Long-Term Support**: Yes
- **Needs Change?**: No

### `SerloEditor` component props

- **`children`**: When passed in a function as the `children` prop, the `SerloEditor` component provides an `editor` render prop as the argument to the `children` function. This `editor` object provides:

  - `element` - a React node for rendering the editor
  - `i18n` - for customizing translation strings
  - `history` - for persisting, undo, redo
  - `selectRootDocument` - a function for selecting the current state

- **`pluginsConfig` (optional)**: Serlo Editor plugins can be configured to an extent, this configuration is currently done via the `pluginsConfig` prop of the `SerloEditor` component. Each plugin can be configured separately. There is currently ony one special rule that applies to the Editor in general:

  - `testingSecret`: Required to use Image plugin in testing. A key used by integrations for uploading files into the serlo-editor-testing bucket, while testing the Editor. **To be deprecated once a long term solution is agreed on.**
  - `enableTextAreaExercise`: A flag that enables the TextAreaExercise plugin. TextAreaExercise plugin is currently not yet ready for serlo.org, but it is enabled in Edusharing integration. **To be deprecated once more features are added to the TextAreaExercise plugin and it's ready for serlo.org.**

- **`customPlugins` (optional)**: An array of custom plugins. **To be deprecated, only used in Edusharing integration**.

- **`initialState` (optional)**: Pass in an `initialState` to the `SerloEditor` component to prevent seeing an empty editor state. [Here is the documentation](https://github.com/serlo/documentation/wiki/Serlo-Editor-Initial-State-of-Plugins) for sample initial states of each plugin, in case you want to render the Editor displaying a particular plugin by default.

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

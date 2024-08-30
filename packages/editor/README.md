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
      editorVariant="edusharing"
      onChange={(newState) => {
        console.log(`New state: `, newState)
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

- **Why Exported/How Used**: `SerloEditor` is the core component of the `@serlo/editor` package, providing the main editor functionality. It's exported to allow users to embed the editor into their applications.
- **Long-Term Support**: Will stay
- **Needs Change?**: No

#### 2. `SerloRenderer`, `type SerloRendererProps`

- **Why Exported/How Used**: `SerloRenderer` is a component provided by the `@serlo/editor` for rendering content in a non-editable format. This is particularly useful for displaying the content to users who are not currently editing or are not allowed to edit.
- **Long-Term Support**: Will stay
- **Needs Change?**: No

#### 3. `type BaseEditor`

- **Why Exported/How Used**: This type describes the `editor` render prop provided by the `SerloEditor` component.
- **Long-Term Support**: Will stay unless a better solution is found
- **Needs Change?**: Unclear

#### 4. `EditorPluginType`

- **Why Exported/How Used**: Can be used in the `SerloEditor` prop `plugins` to enable / disable plugins. Currently only used in `serlo-editor-for-edusharing` because we don't use the default plugins there.
- **Long-Term Support**: Might stay. But should be used only in exceptional cases.
- **Needs Change?**: Unclear

#### 5. `type EditorVariant`

- **Why Exported/How Used**: The variant of the Serlo editor. For example `serlo-editor-for-edusharing` or `serlo.org`. The editor adds this information to the `StorageFormat` that will be saved. Might become useful for example if we need to apply a migration only to one variant of the editor.
- **Long-Term Support**: Unsure
- **Needs Change?**: Unsure

#### 6. `defaultPlugins`

- **Why Exported/How Used**: List of plugins that are active per default. Can be used in the `SerloEditor` prop `plugins` to enable / disable plugins. Currently only used in `serlo-editor-for-edusharing` because we modify the default plugins there.
- **Long-Term Support**: Unsure
- **Needs Change?**: Unsure

### `SerloEditor` component props

- **`children`**: When passed in a function as the `children` prop, the `SerloEditor` component provides an `editor` render prop as the argument to the `children` function. This `editor` object provides:

  - `element` - a React node for rendering the editor
  - `i18n` - for customizing translation strings
  - `history` - for persisting, undo, redo
  - `selectRootDocument` - a function for selecting the current state

- **`plugins` (optional)**: List of plugins that should be active. If undefined, list `defaultPlugins` will be used. Only use in exceptional cases.

- **`initialState` (optional)**: Pass in an `initialState` to the `SerloEditor` component to prevent seeing an empty editor state. [Here is the documentation](https://github.com/serlo/documentation/wiki/Serlo-Editor-Initial-State-of-Plugins) for sample initial states of each plugin, in case you want to render the Editor displaying a particular plugin by default.

- **`onChange` (optional)**: To receive state changes of the editor and persist the content into your own infrastructure, use the `onChange` callback of the `SerloEditor` component. It's a function with the signature `(state: StorageFormat) => void`.

- **`language` (optional)**: The default language is `de`.

- **`editorVariant`**: The variant (integration) of the Serlo editor. For example `edusharing` or `serlo-org`. The editor adds this information to the `StorageFormat` that will be saved. Might become useful for example if we need to apply a migration only to one variant of the editor.

- **`_testingSecret` (optional)**: Required to use Image plugin in testing. A key used by integrations for uploading files into the serlo-editor-testing bucket, while testing the Editor. **To be deprecated once a long term solution is agreed on.**

- **`_ltik` (optional)**: Required by the custom plugin `edusharingAsset` only used in `serlo-editor-for-edusharing`. **To be removed once a better solution is found or the plugin is removed.**

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

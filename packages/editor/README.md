# Serlo Editor [![License](https://img.shields.io/badge/License-Apache_2.0-blue)](https://opensource.org/license/apache-2-0) [![npm](https://img.shields.io/npm/v/@serlo/editor.svg)](https://www.npmjs.com/package/@serlo/editor)

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
      {(editor) => (
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

### `SerloEditor`, `type SerloEditorProps`

- **Why Exported/How Used**: `SerloEditor` is the core component of the `@serlo/editor` package, providing the main editor functionality. It's exported to allow users to embed the editor into their applications.
- **Long-Term Support**: Will stay
- **Needs Change?**: No

### `SerloRenderer`, `type SerloRendererProps`

- **Why Exported/How Used**: `SerloRenderer` is a component provided by the `@serlo/editor` for rendering content in a non-editable format. This is particularly useful for displaying the content to users who are not currently editing or are not allowed to edit.
- **Long-Term Support**: Will stay
- **Needs Change?**: No

### `type BaseEditor`

- **Why Exported/How Used**: This type describes the `editor` render prop provided by the `SerloEditor` component.
- **Long-Term Support**: Will stay unless a better solution is found
- **Needs Change?**: Unclear

### `type SupportedLanguage`

- **Why Exported/How Used**: A union type that provides strings for supported languages.
- **Long-Term Support**: Will stay.
- **Needs Change?**: New languages will be added to it in the future.

### `type LearnerEventData`

- **Why Exported/How Used**: This is how the `SerloRenderer` provides the details of a learners interaction to `handleLearnerEvent` (see below).
- **Long-Term Support**: Unsure
- **Needs Change?**: Unsure

### `EditorPluginType`

- **Why Exported/How Used**: Can be used in the `SerloEditor` prop `plugins` to enable / disable plugins.
- **Long-Term Support**: Yes.
- **Needs Change?**: No.

### Plugin menu items and types

- **Why Exported/How Used**: Used to construct a custom plugin menu.
- **Long-Term Support**: Yes.
- **Needs Change?**: No.

### Plugin state helpers and types

- **Why Exported/How Used**: Plugin-specific types and type guards for type safety. Helpers for checking if a plugin is empty. A util for extracting a string from Text plugin document. Plugin constructor types.
- **Long-Term Support**: Yes.
- **Needs Change?**: No.

### `defaultPlugins`

- **Why Exported/How Used**: List of plugins that are active per default. Can be used in the `SerloEditor` prop `plugins` to enable / disable plugins. Currently only used in `serlo-editor-for-edusharing` because we modify the default plugins there.
- **Long-Term Support**: Unsure
- **Needs Change?**: Unsure

### `StaticMath`, `type StaticMathProps`

- **Why Exported/How Used**: StaticMath is a simple component that renders a math formula. It's used in the Editor and is exported here in case you want to render pretty LaTeX without the whole editor. It's relatively big so load it dynamically if you can.
- **Long-Term Support**: Yes
- **Needs Change?**: No

## `SerloEditor` component props (`SerloEditorProps`)

- **`children`**: When passed in a function as the `children` prop, the `SerloEditor` component provides an `editor` render prop as the argument to the `children` function. This `editor` object provides:

  - `element` - a React node for rendering the editor
  - `i18n` - for customizing translation strings
  - `history` - for persisting, undo, redo

- **`plugins` (optional)**: List of plugins that should be active. If undefined, the `defaultPlugins` will be used. Only use this if you need to filter out some plugins. Upon first render, the object will be frozen and you can't dynamically change the plugins anymore! Ensure to do any filtering before you render the Serlo Editor.

- **`initialState` (optional)**: Pass in an `initialState` to the `SerloEditor` component to prevent seeing an empty editor state. [Here is the documentation](https://github.com/serlo/documentation/wiki/Serlo-Editor-Initial-State-of-Plugins) for sample initial states of each plugin, in case you want to render the Editor displaying a particular plugin by default.

- **`onChange` (optional)**: To receive state changes of the editor and persist the content into your own infrastructure, use the `onChange` callback of the `SerloEditor` component. It's a function with the signature `(state: StorageFormat) => void`.

- **`language` (optional)**: The default language is `de`. Currently the only other option is `en`.

- **`editorVariant`**: The variant (integration) of the Serlo editor. For example `edusharing` or `serlo-org`. The editor adds this information to the `StorageFormat` that will be saved. Might become useful for example if we need to apply a migration only to one variant of the editor.

- **`isProductionEnvironment`(optional)**: Tell the editor if it runs in an production environment. In all other environments there will be a warning and experimental features might be active.

- **`showUndoRedoButtons`(optional)**: Set to true to show the default undo/redo buttons. (Defaults to false).

- **`disableMediaUpload` (optional)**: Set to true to disable file upload in all image and video plugins. Plugins are still usable by pasting urls of existing media content.

- **`_ltik` (optional)**: Required by the custom plugin `edusharingAsset` only used in `serlo-editor-for-edusharing`. **To be removed once a better solution is found or the plugin is removed.**

### `SerloRenderer` component props (`SerloRendererProps`)

- For `language`, `state`, `_ltik` and `editorVariant` please see props for `SerloEditor` above.

- **`handleLearnerEvent` (optional)**: Function that receives details about the learners interaction in the form of `LearnerEventData`. Provide if you want to connect the editor to you LRS (Learning Record Store) or similar. [In our wiki you can find more details and a xAPI example](https://github.com/serlo/documentation/wiki/Learner-Events-and-xAPI).

### `pluginMenuEn` / `pluginMenuDe` constant and `Plugin` enum

Exports two records with following structure which you can use to create your own plugin menu in either German or English. This is useful when you for example want to integrate the Serlo Editor as a block / part of another editor.

```TypeScript
[key: Plugin]: {
  title: string
  description: string
  icon: string
  type: Plugin
  initialState: PluginState
}
```

You can iterate over this structure by using `Object.values(plugins)` to get an array, which you can use to sort, filter and modify to your liking. Alternatively you can access an entry as for example `pluginMenuEn[Plugin.SingleChoiceExercise]`.

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

## License

[Apache License, Version 2.0](https://opensource.org/license/apache-2-0)

Copyright (c) 2025-present, Serlo Education

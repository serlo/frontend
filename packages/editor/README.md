# Serlo Editor

This is an early beta version of the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are currently working on this package and thus there will be breaking changes. The repository [serlo/serlo-editor-for-edusharing](https://github.com/serlo/serlo-editor-for-edusharing) shows how this package can be used.

### Current API Documentation

#### 1. `SerloEditor`

- **Why Exported/How Used**:
  - This is the core component of the `@serlo/editor` package, providing the main editor functionality. It's exported to allow users to embed the editor into their applications, passing in initial state, configuration, and custom render props to tailor the editor's functionality to their needs.
- **Long-Term Support**: Will Stay
- **Needs Change?**: Unclear

#### 2. `SerloEditorProps`

- **Why Exported/How Used**:
  - This export provides TypeScript type definitions for the props accepted by the `SerloEditor` component.
- **Long-Term Support**: Will Stay
- **Needs Change?**: - Yes, props can be streamlined [[Props]]

#### 3.`StaticRenderer`

- **Why Exported/How Used**: `StaticRenderer` is a component for rendering a static (non-editable) version of the document, used when the editor is in a read-only mode.
- **Long-Term Support**: Unclear
- **Needs Change?**: Unclear

#### 4. - **`SerloRenderer`, `SerloRendererProps`**

- **Why Exported/How Used**: `SerloRenderer` is a component provided by the `@serlo/editor` for rendering content in a non-editable format. This is particularly useful for displaying the content to users who are not currently editing or are not allowed to edit. The `SerloRendererProps` are used for type safety, ensuring the correct data shape is passed to the renderer.
- **Long-Term Support**: Unclear
- **Needs Change?**: We can probably improve/simplify the props

### Additional Functionality in `SerloEditor` Component

- The `SerloEditor` component conditionally renders either the editable `Editor` or the `SerloRenderer` based on the `mayEdit` prop. This design allows for a single component to handle both viewing and editing states of the document, leveraging the dynamic capabilities of Next.js for loading the appropriate editor component as needed.

- When passed in a function as the `children` prop, the `SerloEditor` component provides an `editor` object as the argument to the `children` function. The `editor` object provides:

  - `element` - a React node for rendering the editor
  - `languageData` - for customizing translation strings
  - `historyData` - for persisting, undo, redo
  - `selectEditorState` - a function for selecting the current state

- The `LtikContext.Provider` is used to provide the `ltik` token to any components that need it, encapsulating the editor or renderer within this context to ensure they have access to authentication tokens if required.

- Serlo Editor plugins can be configured to an extent, this configuration is currently done via the `pluginsConfig` prop of the `SerloEditor` component.

- Pass in an `initialState` to the `SerloEditor` component to prevent seeing an empty editor state.

- To receive state changes of the editor and persist the content into your own infrastructure, use the `onChange` callback of the `SerloEditor` component. It's a function with the signature `({ changed, getDocument }) => void` of which you can call `getDocument()` to fetch the latest editor state.

- Custom plugins are currently supported for the Edusharing integration, but will not be supported in the future.

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

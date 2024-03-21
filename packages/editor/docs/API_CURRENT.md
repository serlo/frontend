### `@serlo/editor` Exports

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

#### 4. - **`editorPlugins`, `editorRenderers`**

- **Why Exported/How Used**: These are utilized for initializing and configuring the editor with custom plugins and renderers. `editorPlugins.init` and `editorRenderers.init` are called to set up the editor's functionality with plugins and renderers defined elsewhere in your application (`createPlugins`, `createRenderers`).
- **Long-Term Support**: Ugly, should be removed as far as possible
- **Needs Change?**: Yes, perhaps one config object passed to the component
- **Details**:
  - Used in `src/frontend/serlo-editor.tsx:38`
    - `editorPlugins.init(createPlugins({ ltik }))`
    - `editorRenderers.init(createRenderers())`
  - Used in `src/frontend/plugins/create-plugins.tsx`

#### 5. - **`SerloRenderer`, `SerloRendererProps`**

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

- Initialization of `editorPlugins` and `editorRenderers` with custom plugins and renderers illustrates an advanced use case of the `@serlo/editor`, enabling the application to extend or customize the editor's functionality beyond the default behavior. (?)

### Conclusion

This document outlines the current exports from the `@serlo/editor` package and their intended usage within applications.

# Text plugin (`TextEditor`)

## Table of contents

- [Text plugin (`TextEditor`)](#text-plugin-texteditor)
  - [Table of contents](#table-of-contents)
  - [Structure](#structure)
  - [Technical decisions](#technical-decisions)
    - [Configuration](#configuration)
    - [Text formatting options](#text-formatting-options)
    - [Suggestions (`serlo-editor` plugins)](#suggestions-serlo-editor-plugins)
    - [Saving state to `Redux` store](#saving-state-to-redux-store) -[Challenges](#challenges)

## Structure

The `./src/index.tsx` file contains and exposes the Text plugin factory function and exposes the public types.

Additionally, there are:

- `components` - React components
- `hooks` - plugable hooks for configuration
- `plugins` - [Slate plugin](https://docs.slatejs.org/concepts/08-plugins) files
- `types` - TypeScript types used across the Text plugin (React component prop types are located in their respective component files)
- `utils` - utility functions used across the Text plugin

## Technical decisions

### Configuration

A `config` argument (of `TextEditorConfig` type) is passed to `createTextPlugin` factory, when creating a new Text plugin instance.

This argument is then passed to the `useTextConfig` hook, where it's merged with the default settings.

The `config` object received from the `useTextConfig` hook is then used as the source of truth for configuration across that instance of the Text plugin.

### Text formatting options

Currently used Slate version only allows Slate plugins to modify the `editor` object. To allow for the same functionality of plugins from the earlier version of `serlo-editor`, a hook approach was used ([as recommended by the creator of Slate](https://github.com/ianstormtaylor/slate/issues/3222#issuecomment-573331151)).

The `useFormattingOptions` (`@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options.tsx`) hook receives a list of formatting options object and exposes:

1. `createTextEditor` - a function that receives a Slate editor instance and wraps it in all the configured Slate plugins
2. `toolbarControls` - the configuration for `PluginToolbar`'s text content controls
3. `textColors` - available text colors for `PluginToolbar`'s text content controls
4. `handleHotkeys` - handler for keyboard shortcut (like 'ctrl+b') for configured formatting options
5. `handleMarkdownShortcuts` - handler for markdown shortcuts (like '#') for configured formatting options
6. `handleListsShortcuts` - handler for lists shortcuts (like '-' and then 'Space'), if lists formatting is allowed

### Suggestions (`serlo-editor` plugins)

In order to easily transform a Text plugin into another `serlo-editor` plugin, the user can simply type `/` into an empty Text plugin, and they will be presented with a list of suggestions. A hook approach was used to make the suggestions easily configurable.

The `useSuggestions` hook receives:

- the `editor` object (Slate instance)
- the `id` of the Text plugin
- `focused` and `editable` flags of the Text plugin

and exposes:

1. `showSuggestions` - a flag controlling if the suggestions box should be shown
2. `suggestionsProps` - props for the `Suggestions` component

### Saving state to `Redux` store

In order to enable global undo/redo behavior, any content changes are saved to the store, and previous values of `Editor`'s `value` and `selection` are saved as refs withing the instance of Text plugin component.

If a portion of the content is selected and then replaced with some text, undo will restore the replaced content and the selection. Slate `Editor`'s `value` prop is used only as an initial value and changing the bound value will not result in a rerender. Therefore, we have to manually assign the value to `editor.children` ([as recommended by the Slate team](https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0)).

Simple selection changes are not saved to the store, because we don't want to undo pure selection changes.

## Challenges

The interaction between focus, cursor, selection and state updates is strongly interlocked. There are a bunch of use cases that should be supported combined with many technical challenges as presented below.

![grafik](https://github.com/serlo/frontend/assets/13507950/8474c514-2983-450f-aa8b-d693cbaa1d87)

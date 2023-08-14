import isHotkey from 'is-hotkey'
import React, { useMemo, useEffect, useCallback } from 'react'
import { createEditor, Node, Transforms, Range, Editor, NodeEntry } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'

import { LinkControls } from './link/link-controls'
import { Suggestions } from './suggestions'
import { TextToolbar } from './text-toolbar'
import { useEditorChange } from '../hooks/use-editor-change'
import { useSlateRenderHandlers } from '../hooks/use-slate-render-handlers'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import type { TextEditorConfig, TextEditorState } from '../types/config'
import { emptyDocumentFactory, mergePlugins } from '../utils/document'
import { insertPlugin } from '../utils/insert-plugin'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { HoverOverlay } from '@/serlo-editor/editor-ui'
import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { isSelectionWithinList } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import type { EditorPluginProps } from '@/serlo-editor/plugin'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import {
  focusNext,
  focusPrevious,
  selectDocument,
  selectMayManipulateSiblings,
  useAppDispatch,
  selectFocusTree,
  store,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

// Regular text editor - used as a standalone plugin
export function TextEditor(props: TextEditorProps) {
  const { state, id, editable, focused, containerRef } = props

  const dispatch = useAppDispatch()
  const textStrings = useEditorStrings().plugins.text

  const config = useTextConfig(props.config)

  const textFormattingOptions = useFormattingOptions(config.formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const suggestions = useSuggestions({ editor, id, editable, focused })
  const { showSuggestions, suggestionsProps } = suggestions

  const { handleRenderElement, handleRenderLeaf } = useSlateRenderHandlers(
    focused,
    config.placeholder
  )
  const { previousSelection, handleEditorChange } = useEditorChange({
    editor,
    state,
  })

  // Workaround for setting selection when adding a new editor:
  useEffect(() => {
    // ReactEditor.focus(editor) does not work without being wrapped in setTimeout
    // See: https://stackoverflow.com/a/61353519
    const timeout = setTimeout(() => {
      // Get the current text value of the editor
      const text = Node.string(editor)

      // If the editor is not focused, remove the suggestions search
      // and exit the useEffect hook
      if (focused === false) {
        if (text.startsWith('/')) {
          editor.deleteBackward('line')
        }
        return
      }

      try {
        ReactEditor.focus(editor) // Focus this text editor
      } catch (error) {
        // Focusing did not work. Happens sometimes. Ignore and skip focusing this time.
        // eslint-disable-next-line no-console
        console.warn(
          'Failed to focus text editor. Continued execution. Details:'
        )
        // eslint-disable-next-line no-console
        console.warn(error)
        return
      }

      // If the first child of the editor is not a paragraph, do nothing
      const isFirstChildParagraph =
        'type' in editor.children[0] && editor.children[0].type === 'p'
      if (!isFirstChildParagraph) return

      // If the editor is empty, set the cursor at the start
      if (text === '') {
        Transforms.select(editor, { offset: 0, path: [0, 0] })
      }

      // If the editor only has a forward slash, set the cursor
      // after it, so that the user can type to filter suggestions
      if (text === '/') {
        Transforms.select(editor, { offset: 1, path: [0, 0] })
      }
    })
    return () => {
      clearTimeout(timeout)
    }
  }, [editor, focused])

  const handleEditableKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // If linebreaks are disabled in the config, prevent any enter key handling
      if (config.noLinebreaks && event.key === 'Enter') {
        event.preventDefault()
      }

      // Handle specific keyboard commands
      // (only if selection is collapsed and suggestions are not shown)
      const { selection } = editor
      if (selection && Range.isCollapsed(selection) && !showSuggestions) {
        const isListActive = isSelectionWithinList(editor)

        // Special handler for links. If you move right and end up at the right edge of a link,
        // this handler unselects the link, so you can write normal text behind it.
        if (isHotkey('right', event)) {
          const { path, offset } = selection.focus
          const node = Node.get(editor, path)
          const parent = Node.parent(editor, path)

          if (node && parent) {
            if (Object.hasOwn(parent, 'type') && parent.type === 'a') {
              if (
                Object.hasOwn(node, 'text') &&
                node.text.length - 1 <= offset
              ) {
                Transforms.move(editor)
                Transforms.move(editor, { unit: 'offset' })
                event.preventDefault()
              }
            }
          }
        }

        // Special handler for links. Handle linebreaks while editing a link text
        if (event.key === 'Enter') {
          const { path, offset } = selection.focus
          const node = Node.get(editor, path)
          const parent = Node.parent(editor, path)

          if (node && parent) {
            if (
              Object.hasOwn(parent, 'type') &&
              parent.type === 'a' &&
              Object.hasOwn(node, 'text')
            ) {
              // cursor is on left of link (but still on link): normal line break
              if (offset === 0) return

              // cursor is right of link(but still on link): line break without continuing link
              // normal text in new line
              event.preventDefault()
              if (node.text.length === offset) Transforms.move(editor)
              // cursor is somewhere inside link: no line break, no action
              else return false
            }
          }
        }

        // Create a new Slate instance on "enter" key
        if (isHotkey(['enter', 'shift+enter'], event) && !isListActive) {
          // prevent two consecutive empty lines
          // wrapped in setTimeout to let slates build in function run first
          setTimeout(() => {
            const { path } = selection.focus
            const node = Node.get(editor, path)
            if (!Node.string(node).length) {
              if (path[0] > 0) {
                const previousNode = Node.get(editor, [path[0] - 1, 0])
                if (!Node.string(previousNode).length)
                  editor.deleteBackward('block')
              } else editor.deleteBackward('block')
            }
          })

          // no newlines in headings and start new block as paragraph instead of heading again
          const fragmentChild = editor.getFragment()[0]
          const isHeading =
            Object.hasOwn(fragmentChild, 'type') && fragmentChild.type === 'h'

          if (isHeading) {
            event.preventDefault()
            Transforms.insertNodes(editor, emptyDocumentFactory().value)
            return
          }
        }

        // Merge with previous Slate instance on "backspace" key,
        // or merge with next Slate instance on "delete" key
        const isBackspaceAtStart =
          isHotkey('backspace', event) && isSelectionAtStart(editor, selection)
        const isDeleteAtEnd =
          isHotkey('delete', event) && isSelectionAtEnd(editor, selection)
        if ((isBackspaceAtStart || isDeleteAtEnd) && !isListActive) {
          event.preventDefault()

          // Get direction of merge
          const direction = isBackspaceAtStart ? 'previous' : 'next'

          // Merge plugins within Slate and get the merge value
          const newValue = mergePlugins(direction, editor, store, id)

          // Update Redux document state with the new value
          if (newValue) {
            state.set({ value: newValue, selection }, ({ value }) => ({
              value,
              selection: previousSelection.current,
            }))
          }
        }

        // Jump to previous/next plugin on pressing "up"/"down" arrow keys at start/end of text block
        const isUpArrowAtStart =
          isHotkey('up', event) && isSelectionAtStart(editor, selection)
        if (isUpArrowAtStart) {
          event.preventDefault()
          const focusTree = selectFocusTree(store.getState())
          dispatch(focusPrevious(focusTree))
        }
        const isDownArrowAtEnd =
          isHotkey('down', event) && isSelectionAtEnd(editor, selection)
        if (isDownArrowAtEnd) {
          event.preventDefault()
          const focusTree = selectFocusTree(store.getState())
          dispatch(focusNext(focusTree))
        }
      }

      textFormattingOptions.handleHotkeys(event, editor)
      textFormattingOptions.handleMarkdownShortcuts(event, editor)
      textFormattingOptions.handleListsShortcuts(event, editor)
    },
    [
      config.noLinebreaks,
      dispatch,
      editor,
      id,
      showSuggestions,
      previousSelection,
      state,
      textFormattingOptions,
    ]
  )

  const handleEditablePaste = useCallback(
    (event: React.ClipboardEvent) => {
      const isListActive = isSelectionWithinList(editor)

      const document = selectDocument(store.getState(), id)
      if (!document) return

      const mayManipulateSiblings = selectMayManipulateSiblings(
        store.getState(),
        id
      )
      if (!mayManipulateSiblings) return

      const files = Array.from(event.clipboardData.files)
      const text = event.clipboardData.getData('text')

      // Handle pasted images or image URLs
      if (files?.length > 0 || text) {
        const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)
        if (!imagePlugin) return

        const imagePluginState =
          imagePlugin.onFiles?.(files) ?? imagePlugin.onText?.(text)

        if (imagePluginState !== undefined) {
          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Image,
            editor,
            store,
            id,
            dispatch,
            state: imagePluginState,
          })
          return
        }
      }

      if (text) {
        // Handle pasted video URLs
        const videoPluginState = editorPlugins
          .getByType(EditorPluginType.Video)
          ?.onText?.(text)
        if (videoPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Video,
            editor,
            store,
            id,
            dispatch,
            state: videoPluginState,
          })
          return
        }

        // Handle pasted geogebra URLs
        const geogebraPluginState = editorPlugins
          .getByType(EditorPluginType.Geogebra)
          ?.onText?.(text)
        if (geogebraPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Geogebra,
            editor,
            store,
            id,
            dispatch,
            state: geogebraPluginState,
          })
          return
        }
      }
    },
    [dispatch, editor, id, textStrings]
  )

  // Show a placeholder on empty lines.
  // https://jkrsp.com/slate-js-placeholder-per-line/
  const decorateEmptyLinesWithPlaceholder = useCallback(
    ([node, path]: NodeEntry) => {
      const { selection } = editor
      if (
        selection === null ||
        Editor.isEditor(node) ||
        !Range.includes(selection, path) ||
        !Range.isCollapsed(selection) ||
        Editor.string(editor, [path[0]]) !== ''
      ) {
        return []
      }
      return [{ ...selection, showPlaceholder: true }]
    },
    [editor]
  )

  return (
    <Slate
      editor={editor}
      initialValue={state.value.value}
      onChange={handleEditorChange}
    >
      {focused && (
        <TextToolbar
          id={id}
          toolbarControls={toolbarControls}
          config={config}
          containerRef={containerRef}
        />
      )}
      <Editable
        readOnly={!editable}
        onKeyDown={handleEditableKeyDown}
        onPaste={handleEditablePaste}
        renderElement={handleRenderElement}
        renderLeaf={handleRenderLeaf}
        decorate={decorateEmptyLinesWithPlaceholder}
        // `[&>[data-slate-node]]:mx-side` fixes placeholder position in safari
        // `outline-none` removes the ugly outline present in Slate v0.94.1
        className="outline-none [&>[data-slate-node]]:mx-side"
        data-qa="plugin-text-editor"
      />
      <LinkControls serloLinkSearch={config.serloLinkSearch} />

      {showSuggestions && (
        <HoverOverlay position="below">
          <Suggestions {...suggestionsProps} />
        </HoverOverlay>
      )}
    </Slate>
  )
}

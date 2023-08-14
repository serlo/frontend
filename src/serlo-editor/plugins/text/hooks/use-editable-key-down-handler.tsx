import isHotkey from 'is-hotkey'
import { useCallback } from 'react'
import {
  Editor as SlateEditor,
  Range,
  Node,
  Transforms,
  BaseRange,
} from 'slate'

import { useTextConfig } from './use-text-config'
import type { TextEditorProps } from '../components/text-editor'
import {
  emptyDocumentFactory,
  mergePlugins,
  sliceNodesAfterSelection,
} from '../utils/document'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'
import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { isSelectionWithinList } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import {
  focusNext,
  focusPrevious,
  insertPluginChildAfter,
  selectDocument,
  selectFocusTree,
  selectMayManipulateSiblings,
  selectParent,
  store,
  useAppDispatch,
} from '@/serlo-editor/store'

interface UseEditorChangeArgs {
  config: ReturnType<typeof useTextConfig>
  editor: SlateEditor
  id: string
  showSuggestions: boolean
  previousSelection: React.MutableRefObject<BaseRange | null>
  state: TextEditorProps['state']
}

export const useEditableKeydownHandler = (args: UseEditorChangeArgs) => {
  const { showSuggestions, config, editor, id, state, previousSelection } = args

  const dispatch = useAppDispatch()
  const textFormattingOptions = useFormattingOptions(config.formattingOptions)

  return useCallback(
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
        if (isHotkey('enter', event) && !isListActive) {
          const document = selectDocument(store.getState(), id)
          if (!document) return

          const mayManipulateSiblings = selectMayManipulateSiblings(
            store.getState(),
            id
          )
          if (!mayManipulateSiblings) return

          const parent = selectParent(store.getState(), id)
          if (!parent) return

          event.preventDefault()

          const slicedNodes = sliceNodesAfterSelection(editor)
          setTimeout(() => {
            dispatch(
              insertPluginChildAfter({
                parent: parent.id,
                sibling: id,
                document: {
                  plugin: document.plugin,
                  state: slicedNodes || emptyDocumentFactory().value,
                },
              })
            )
          })
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
      previousSelection,
      showSuggestions,
      state,
      textFormattingOptions,
    ]
  )
}

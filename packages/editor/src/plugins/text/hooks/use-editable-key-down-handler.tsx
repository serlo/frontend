import { useFormattingOptions } from '@editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import {
  PluginMenuContext,
  PluginMenuActionTypes,
} from '@editor/plugins/rows/contexts/plugin-menu'
import {
  focusNext,
  focusPrevious,
  selectChildTree,
  selectChildTreeOfParent,
  store,
  useAppDispatch,
} from '@editor/store'
import isHotkey from 'is-hotkey'
import { useCallback, useContext } from 'react'
import { Editor as SlateEditor, Range, Node, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { useTextConfig } from './use-text-config'
import type { TextEditorProps } from '../components/text-editor'
import { emptyDocumentFactory, mergePlugins } from '../utils/document'
import { insertPlugin } from '../utils/insert-plugin'
import { instanceStateStore } from '../utils/instance-state-store'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'

interface UseEditableKeydownHandlerArgs {
  config: ReturnType<typeof useTextConfig>
  editor: SlateEditor
  id: string
  state: TextEditorProps['state']
  suggestionsEnabled: React.MutableRefObject<boolean>
}

export const useEditableKeydownHandler = (
  args: UseEditableKeydownHandlerArgs
) => {
  const { config, editor, id, state, suggestionsEnabled } = args

  const dispatch = useAppDispatch()
  const textFormattingOptions = useFormattingOptions(config.formattingOptions)

  const { pluginMenuDispatch } = useContext(PluginMenuContext)

  return useCallback(
    (event: React.KeyboardEvent) => {
      const { selection } = editor

      if (selection === null || !Range.isCollapsed(selection)) return

      const [nextNode] = SlateEditor.next(editor) ?? [null]

      if (nextNode !== null && 'text' in nextNode && nextNode.suggestion) {
        if (event.key === 'Tab') {
          Transforms.select(
            editor,
            SlateEditor.range(editor, ReactEditor.findPath(editor, nextNode))
          )
          SlateEditor.addMark(editor, 'suggestion', false)
          Transforms.collapse(editor, { edge: 'end' })

          event.preventDefault()
          suggestionsEnabled.current = false
        } else {
          if (
            event.key.length === 1 &&
            Node.string(nextNode).startsWith(event.key)
          ) {
            SlateEditor.deleteForward(editor)
            SlateEditor.addMark(editor, 'suggestion', false)
            SlateEditor.insertText(editor, event.key)
            event.preventDefault()
          } else if (!isModifierKey(event.key) && !isFunctionKey(event.key)) {
            Transforms.select(
              editor,
              SlateEditor.range(editor, ReactEditor.findPath(editor, nextNode))
            )
            SlateEditor.deleteFragment(editor)
            SlateEditor.addMark(editor, 'suggestion', false)
            suggestionsEnabled.current = false
          }
        }
      } else if (event.key.length === 1 || event.key === 'Enter') {
        suggestionsEnabled.current = true
      }

      // If linebreaks are disabled in the config, prevent any enter key handling
      if (config.noLinebreaks && event.key === 'Enter') {
        event.preventDefault()
      }

      // Handle specific keyboard commands
      // (only if selection is collapsed)
      if (selection && Range.isCollapsed(selection)) {
        const isListActive = isSelectionWithinList(editor)

        if (event.key === '/' && !isListActive) {
          const { path } = selection.focus
          const node = Node.get(editor, path)

          const parent = selectChildTreeOfParent(store.getState(), id)

          if (Object.hasOwn(node, 'text') && node.text.length === 0 && parent) {
            const currentIndex = parent.children?.findIndex(
              (child) => child.id === id
            )

            const insertIndex =
              currentIndex !== undefined ? currentIndex + 1 : undefined

            pluginMenuDispatch({
              type: PluginMenuActionTypes.OPEN_WITH_SLASH_KEY,
              payload: {
                insertIndex,
                insertCallback: (plugin) => {
                  insertPlugin({
                    pluginType: plugin.plugin,
                    editor,
                    id,
                    dispatch,
                    state: plugin.state,
                  })
                },
              },
            })
            event.preventDefault()
          }
        }

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

        // Special behaviours when creating new lines
        if (isHotkey(['enter', 'shift+enter'], event) && !isListActive) {
          // Prevent newlines in headings. Instead, add a new paragraph as the next block.
          const fragmentChild = editor.getFragment()[0]
          const isHeading =
            Object.hasOwn(fragmentChild, 'type') && fragmentChild.type === 'h'

          if (isHeading) {
            event.preventDefault()
            Transforms.insertNodes(editor, emptyDocumentFactory().value)
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
          const newEditorState = mergePlugins(direction, editor, id)

          // Update Redux document state with the new value
          if (newEditorState) {
            state.set(
              {
                value: newEditorState.value,
                selection: newEditorState.selection,
              },
              ({ value }) => ({
                value,
                selection: instanceStateStore[id].selection,
              })
            )
          }
        }

        // Jump to previous/next plugin on pressing "up"/"down" arrow keys at start/end of text block
        const isUpArrowAtStart =
          isHotkey('up', event) && isSelectionAtStart(editor, selection)
        if (isUpArrowAtStart) {
          event.preventDefault()
          const focusTree = selectChildTree(store.getState())
          dispatch(focusPrevious(focusTree))
        }
        const isDownArrowAtEnd =
          isHotkey('down', event) && isSelectionAtEnd(editor, selection)
        if (isDownArrowAtEnd) {
          event.preventDefault()
          const focusTree = selectChildTree(store.getState())
          dispatch(focusNext(focusTree))
        }
      }

      textFormattingOptions.handleHotkeys(event, editor)
      textFormattingOptions.handleMarkdownShortcuts(event, editor)
      textFormattingOptions.handleListsShortcuts(event, editor)
    },
    [
      config.noLinebreaks,
      editor,
      textFormattingOptions,
      pluginMenuDispatch,
      id,
      state,
      dispatch,
    ]
  )
}

function isModifierKey(key: string): boolean {
  const modifierKeys: string[] = ['Shift', 'Control', 'Alt', 'Meta']
  return modifierKeys.includes(key)
}

function isFunctionKey(key: string): boolean {
  const functionKeys: string[] = [
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
  ]
  return functionKeys.includes(key)
}

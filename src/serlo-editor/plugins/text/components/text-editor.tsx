import isHotkey from 'is-hotkey'
import React, {
  createElement,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { createEditor, Descendant, Node, Transforms, Range } from 'slate'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react'

import { useFormattingOptions } from '../hooks/use-formatting-options'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import { ListElementType, TextEditorConfig, TextEditorState } from '../types'
import {
  emptyDocumentFactory,
  mergePlugins,
  sliceNodesAfterSelection,
} from '../utils/document'
import { isSelectionWithinList } from '../utils/list'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'
import { HoveringToolbar } from './hovering-toolbar'
import { LinkControls } from './link/link-controls'
import { MathElement } from './math-element'
import { Suggestions } from './suggestions'
import { TextLeafRenderer } from './text-leaf-renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { HotKeys } from '@/serlo-editor/core'
import {
  getPluginByType,
  usePlugins,
} from '@/serlo-editor/core/contexts/plugins-context'
import { HoverOverlay } from '@/serlo-editor/editor-ui'
import { EditorPluginProps } from '@/serlo-editor/plugin'
import {
  focusNext,
  focusPrevious,
  selectDocument,
  selectParent,
  insertPluginChildAfter,
  selectMayManipulateSiblings,
  runReplaceDocumentSaga,
  useAppDispatch,
  selectFocusTree,
  store,
} from '@/serlo-editor/store'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

export function TextEditor(props: TextEditorProps) {
  const { state, id, editable, focused } = props

  const [isSelectionChanged, setIsSelectionChanged] = useState(0)
  const dispatch = useAppDispatch()

  const pluginStrings = useEditorStrings().plugins

  const plugins = usePlugins()

  const config = useTextConfig(props.config)

  const textFormattingOptions = useFormattingOptions(config)
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const suggestions = useSuggestions({ editor, id, editable, focused })
  const { showSuggestions, hotKeysProps, suggestionsProps } = suggestions

  const previousValue = useRef(state.value.value)
  const previousSelection = useRef(state.value.selection)

  useMemo(() => {
    const { selection, value } = state.value
    // The selection can only be null when the text plugin is initialized
    // (In this case an update of the slate editor is not necessary)
    if (!selection) return

    Transforms.setSelection(editor, selection)

    if (previousValue.current !== value) {
      previousValue.current = value
      editor.children = value
    }
  }, [editor, state.value])

  // Workaround for setting selection when adding a new editor:
  useEffect(() => {
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

    // ReactEditor.focus(editor) does not work without being wrapped in setTimeout
    // See: https://stackoverflow.com/a/61353519
    const timeout = setTimeout(() => {
      try {
        ReactEditor.focus(editor)
      } catch (error) {
        // Focusing did not work. Continue anyway.
        // eslint-disable-next-line no-console
        console.warn(
          'Failed to focus text editor. Continued execution. Details:'
        )
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    })
    return () => {
      clearTimeout(timeout)
    }
  }, [editor, focused])

  const handleEditorChange = useCallback(
    (newValue: Descendant[]) => {
      const isAstChange = editor.operations.some(
        ({ type }) => type !== 'set_selection'
      )
      if (isAstChange) {
        previousValue.current = newValue
        state.set(
          { value: newValue, selection: editor.selection },
          ({ value }) => ({ value, selection: previousSelection.current })
        )
      }
      setIsSelectionChanged((selection) => selection + 1)
      previousSelection.current = editor.selection
    },
    [editor.operations, editor.selection, state]
  )

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

      suggestions.handleHotkeys(event)
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
      state,
      suggestions,
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

      const parentPluginType = document.plugin

      // Handle pasted images
      const files = Array.from(event.clipboardData.files)
      if (files?.length > 0) {
        const imagePluginState = getPluginByType(
          plugins,
          'image'
        )?.plugin.onFiles?.(files)
        if (imagePluginState !== undefined) {
          if (isListActive) {
            showToastNotice(pluginStrings.image.noImagePasteInLists, 'warning')
            return
          }

          insertPlugin('image', imagePluginState)
          return
        }
      }

      // Handle pasted video URLs
      const text = event.clipboardData.getData('text')
      if (text) {
        const videoPluginState = getPluginByType(
          plugins,
          'video'
        )?.plugin.onText?.(text)
        if (videoPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(pluginStrings.video.noVideoPasteInLists, 'warning')
            return
          }

          insertPlugin('video', videoPluginState)
          return
        }
      }

      function insertPlugin(
        pluginType: string,
        { state }: { state?: unknown }
      ) {
        const isEditorEmpty = Node.string(editor) === ''

        if (mayManipulateSiblings && isEditorEmpty) {
          dispatch(runReplaceDocumentSaga({ id, plugins, pluginType, state }))
          return
        }

        const parent = selectParent(store.getState(), id)
        if (!parent) return

        const slicedNodes = sliceNodesAfterSelection(editor)

        setTimeout(() => {
          if (slicedNodes) {
            dispatch(
              insertPluginChildAfter({
                parent: parent.id,
                sibling: id,
                document: {
                  plugin: parentPluginType,
                  state: slicedNodes,
                },
              })
            )
          }
          dispatch(
            insertPluginChildAfter({
              parent: parent.id,
              sibling: id,
              document: { plugin: pluginType, state },
            })
          )
        })
      }
    },
    [dispatch, editor, id, pluginStrings, plugins]
  )

  const handleRenderElement = useCallback(
    (props: RenderElementProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { element, attributes, children } = props

      if (element.type === 'h') {
        const classNames = ['serlo-h1', 'serlo-h2', 'serlo-h3']
        return createElement(
          `h${element.level}`,
          { ...attributes, className: classNames[element.level - 1] },
          <>{children}</>
        )
      }
      if (element.type === 'a') {
        return (
          <a
            href={element.href}
            className="serlo-link cursor-pointer"
            {...attributes}
          >
            {children}
          </a>
        )
      }
      if (element.type === ListElementType.UNORDERED_LIST) {
        return (
          <ul className="serlo-ul" {...attributes}>
            {children}
          </ul>
        )
      }
      if (element.type === ListElementType.ORDERED_LIST) {
        return (
          <ol className="serlo-ol" {...attributes}>
            {children}
          </ol>
        )
      }
      if (element.type === ListElementType.LIST_ITEM) {
        return <li {...attributes}>{children}</li>
      }
      if (element.type === ListElementType.LIST_ITEM_TEXT) {
        return <div {...attributes}>{children}</div>
      }
      if (element.type === 'math') {
        return (
          <MathElement
            element={element}
            attributes={attributes}
            focused={focused}
          >
            {children}
          </MathElement>
        )
      }
      return <div {...attributes}>{children}</div>
    },
    [focused]
  )

  return (
    <HotKeys {...hotKeysProps}>
      <Slate
        editor={editor}
        value={state.value.value}
        onChange={handleEditorChange}
      >
        <Editable
          readOnly={!editable}
          placeholder={config.placeholder ?? pluginStrings.text.placeholder}
          onKeyDown={handleEditableKeyDown}
          onPaste={handleEditablePaste}
          renderElement={handleRenderElement}
          renderLeaf={(props) => (
            <span {...props.attributes}>
              <TextLeafRenderer {...props} />
            </span>
          )}
          className="[&>[data-slate-node]]:mx-side [&_[data-slate-placeholder]]:top-0" // fixes placeholder position in safari
        />
        {editable && focused && (
          <>
            <LinkControls
              isSelectionChanged={isSelectionChanged}
              editor={editor}
              config={config}
            />
            <HoveringToolbar
              editor={editor}
              config={config}
              controls={toolbarControls}
              focused={focused}
            />
          </>
        )}
      </Slate>

      {showSuggestions && (
        <HoverOverlay position="below">
          <Suggestions {...suggestionsProps} />
        </HoverOverlay>
      )}
    </HotKeys>
  )
}

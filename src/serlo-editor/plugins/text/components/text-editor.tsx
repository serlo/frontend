import { faPlus } from '@fortawesome/free-solid-svg-icons'
import isHotkey from 'is-hotkey'
import React, {
  createElement,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  createEditor,
  Descendant,
  Node,
  Transforms,
  Range,
  Editor,
} from 'slate'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react'

import { HoveringToolbar } from './hovering-toolbar'
import { LinkControls } from './link/link-controls'
import { MathElement } from './math-element'
import { Suggestions } from './suggestions'
import { TextLeafRenderer } from './text-leaf-renderer'
import { useFormattingOptions } from '../hooks/use-formatting-options'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import { ListElementType, TextEditorConfig, TextEditorState } from '../types'
import { mergePlugins, sliceNodesAfterSelection } from '../utils/document'
import { isSelectionWithinList } from '../utils/list'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { HotKeys } from '@/serlo-editor/core'
import {
  getPluginByType,
  usePlugins,
} from '@/serlo-editor/core/contexts/plugins-context'
import { HoverOverlay } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
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
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

export function TextEditor(props: TextEditorProps) {
  const { state, id, editable, focused } = props

  const [isSelectionChanged, setIsSelectionChanged] = useState(0)
  const dispatch = useAppDispatch()

  const textStrings = useEditorStrings().plugins.text

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

    // If the first child of the editor is not a paragraph, do nothing
    const isFirstChildParagraph =
      editor.children[0] &&
      'type' in editor.children[0] &&
      editor.children[0].type === 'p'
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

        // Use soft break when last line in not empty
        if (isHotkey(['enter', 'shift+enter'], event) && !isListActive) {
          const { path, offset } = selection.focus
          const node = Node.get(editor, path)

          const previousLines =
            Object.hasOwn(node, 'text') &&
            node.text.substring(0, offset).split('\n')
          if (
            !previousLines ||
            previousLines[previousLines.length - 1].length !== 0
          ) {
            // soft break
            event.preventDefault()
            editor.insertText('\n')
          } else {
            // native behaviour (adds new paragraph) but remove empty line first
            editor.deleteBackward('character')
          }

          // TODO: test <br/> serializer somehow
          // TODO: test and simplify frontend code
          // TODO: add placeholder (with add element that can split text plugin)

          // TODO: think about what should happen when some text is selected (no blocker)
          // TODO: remove debug border on serlo-p
        }
        /*
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
                plugins,
              })
            )
          })
        }
        */

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
          const newValue = mergePlugins(direction, editor, store, id, plugins)

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
      plugins,
      editor,
      id,
      showSuggestions,
      state,
      suggestions,
      textFormattingOptions,
    ]
  )

  // TODO: put this and other functions into helper files after toolbar and hotkey PR
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

      const files = Array.from(event.clipboardData.files)
      const text = event.clipboardData.getData('text')

      // Handle pasted images or image URLs
      if (files?.length > 0 || text) {
        const imagePlugin = getPluginByType(
          plugins,
          EditorPluginType.Image
        )?.plugin
        if (!imagePlugin) return

        const imagePluginState =
          imagePlugin.onFiles?.(files) ?? imagePlugin.onText?.(text)

        if (imagePluginState !== undefined) {
          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin(EditorPluginType.Image, imagePluginState)
          return
        }
      }

      if (text) {
        // Handle pasted video URLs
        const videoPluginState = getPluginByType(
          plugins,
          EditorPluginType.Video
        )?.plugin.onText?.(text)
        if (videoPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin(EditorPluginType.Video, videoPluginState)
          return
        }

        // Handle pasted geogebra URLs
        const geogebraPluginState = getPluginByType(
          plugins,
          EditorPluginType.Geogebra
        )?.plugin.onText?.(text)

        if (geogebraPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin(EditorPluginType.Geogebra, geogebraPluginState)
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
                plugins,
              })
            )
          }
          dispatch(
            insertPluginChildAfter({
              parent: parent.id,
              sibling: id,
              document: { plugin: pluginType, state },
              plugins,
            })
          )
        })
      }
    },
    [dispatch, editor, id, textStrings, plugins]
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
      return (
        <p {...attributes} className="serlo-p border border-gray-200">
          {children}
        </p>
      )
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
          // placeholder={config.placeholder ?? textStrings.placeholder}
          onKeyDown={handleEditableKeyDown}
          onPaste={handleEditablePaste}
          renderElement={handleRenderElement}
          renderLeaf={(props) => {
            // @ts-expect-error for now
            if (props.leaf.placeholder) {
              return (
                <>
                  <span
                    className="pointer-events-none absolute text-gray-300"
                    contentEditable={false}
                  >
                    {config.placeholder ?? textStrings.placeholder}{' '}
                    <button
                      className="z-80 serlo-button-editor-secondary serlo-tooltip-trigger pointer-events-auto h-8 w-8"
                      onClick={() => {
                        editor.insertText('/')
                        // TODO: focus somehow so the suggestions actually show…
                      }}
                    >
                      <EditorTooltip
                        text="Neuen Block einfügen"
                        hotkeys="/"
                        className="-left-[153%]"
                      />
                      <FaIcon icon={faPlus} />
                    </button>
                  </span>
                  <span {...props.attributes}>
                    <TextLeafRenderer {...props} />
                  </span>
                </>
              )
            }
            return (
              <span {...props.attributes}>
                <TextLeafRenderer {...props} />
              </span>
            )
          }}
          decorate={([node, path]) => {
            const { selection } = editor
            // thanks https://jkrsp.com/slate-js-placeholder-per-line/ 👍
            if (
              selection !== null &&
              !Editor.isEditor(node) &&
              Range.includes(selection, path) &&
              Range.isCollapsed(selection)
            ) {
              if (Editor.string(editor, [path[0]]) === '') {
                return [{ ...selection, placeholder: true }]
              }

              // TODO: this somehow prevents the soft line code above
              // so now only new parapgraphs get the promt for now
              // const previousLines =
              //   Object.hasOwn(node, 'text') &&
              //   node.text.substring(0, selection.focus.offset).split('\n')

              // if (
              //   previousLines &&
              //   previousLines[previousLines.length - 1].length === 0
              // ) {
              //     return [{ ...selection, placeholder: true }]
              // }
            }
            return []
          }}
          // className="[&>[data-slate-node]]:mx-side [&_[data-slate-placeholder]]:top-0" // fixes placeholder position in safari
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

import isHotkey from 'is-hotkey'
import React, {
  createElement,
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { createEditor, Descendant, Node, Transforms, Range } from 'slate'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import { HotKeys, useScopedStore } from '../../core'
import { HoverOverlay } from '../../editor-ui'
import { EditorPluginProps } from '../../plugin'
import { useFormattingOptions } from '../hooks/use-formatting-options'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import {
  TextEditorConfig,
  TextEditorPluginConfig,
  TextEditorState,
} from '../types'
import {
  emptyDocumentFactory,
  mergePlugins,
  sliceNodesAfterSelection,
} from '../utils/document'
import { isOrderedListActive, isUnorderedListActive } from '../utils/list'
import { isSelectionAtEnd, isSelectionAtStart } from '../utils/selection'
import { HoveringToolbar } from './hovering-toolbar'
import { LinkControls } from './link-controls'
import { MathElement } from './math-element'
import { Suggestions } from './suggestions'
import {
  focusNext,
  focusPrevious,
  getDocument,
  getParent,
  getPlugins,
  insertChildAfter,
  mayInsertChild,
  mayRemoveChild,
  replace,
} from '@/serlo-editor-repo/store'

/** @public */
export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

export function TextEditor(props: TextEditorProps) {
  const [hasSelectionChanged, setHasSelectionChanged] = useState(0)
  const [isLinkNewlyCreated, setIsLinkNewlyCreated] = useState(false)

  const store = useScopedStore()
  const { state, id, editable, focused } = props
  const { selection, value } = state.value

  const config = useTextConfig(props.config)

  const textFormattingOptions = useFormattingOptions(
    config,
    setIsLinkNewlyCreated
  )
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const text = Node.string(editor)
  const suggestions = useSuggestions({ text, id, editable, focused })
  const { showSuggestions, hotKeysProps, suggestionsProps } = suggestions

  const previousValue = useRef(value)
  const previousSelection = useRef(selection)

  useMemo(() => {
    // The selection can only be null when the text plugin is initialized
    // (In this case an update of the slate editor is not necessary)
    if (!selection) return

    Transforms.setSelection(editor, selection)

    if (previousValue.current !== value) {
      previousValue.current = value
      editor.children = value
    }
  }, [editor, selection, value])

  useEffect(() => {
    if (focused === false) return

    // ReactEditor.focus(editor) does not work without being wrapped in setTimeout
    // See: https://stackoverflow.com/a/61353519
    let timeout: ReturnType<typeof setTimeout>
    setTimeout(() => {
      ReactEditor.focus(editor)

      // Workaround for adding a new editor on enter key press:
      // If the editor is empty, set the cursor at the start
      const firstChild = editor.children[0]
      if ('type' in firstChild && firstChild.type === 'p' && text === '') {
        Transforms.select(editor, { offset: 0, path: [0, 0] })
      }
    })
    return () => {
      clearTimeout(timeout)
    }
    // No need to re-focus every time `text` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, focused])

  function handleEditorChange(newValue: Descendant[]) {
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
    setHasSelectionChanged((selection) => selection + 1)
    previousSelection.current = editor.selection
  }

  function handleEditableKeyDown(event: React.KeyboardEvent) {
    if (config.noLinebreaks && event.key === 'Enter') {
      event.preventDefault()
    }

    if (editor.selection && Range.isCollapsed(editor.selection)) {
      // Special handler for links. If you move right and end up at the right edge of a link,
      // this handler unselects the link, so you can write normal text behind it.
      if (isHotkey('right', event)) {
        const { path, offset } = editor.selection.focus
        const node = Node.get(editor, path)
        const parent = Node.parent(editor, path)

        if (node && parent) {
          if (Object.hasOwn(parent, 'type') && parent.type === 'a') {
            if (
              Object.hasOwn(node, 'text') &&
              node.text.length - 1 === offset
            ) {
              Transforms.move(editor)
              Transforms.move(editor, { unit: 'offset' })
              event.preventDefault()
            }
          }
        }
      }

      // Create a new Slate instance on "enter" key
      const isListActive =
        isOrderedListActive(editor) || isUnorderedListActive(editor)
      if (isHotkey('enter', event) && !isListActive) {
        const document = getDocument(id)(store.getState())
        if (!document) return

        const mayInsert = mayInsertChild(id)(store.getState())
        if (!mayInsert) return

        const parent = getParent(id)(store.getState())
        if (!parent) return

        event.preventDefault()

        const slicedNodes = sliceNodesAfterSelection(editor)
        setTimeout(() => {
          store.dispatch(
            insertChildAfter({
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
        isHotkey('backspace', event) &&
        isSelectionAtStart(editor, editor.selection)
      const isDeleteAtEnd =
        isHotkey('delete', event) && isSelectionAtEnd(editor, editor.selection)
      if (isBackspaceAtStart || isDeleteAtEnd) {
        event.preventDefault()

        // Get direction of merge
        const direction = isBackspaceAtStart ? 'previous' : 'next'

        // Merge plugins within Slate and get the merge value
        const newValue = mergePlugins(direction, editor, store, id)

        // Update Redux state with the new value
        if (newValue) {
          state.set(
            { value: newValue, selection: editor.selection },
            ({ value }) => ({ value, selection: previousSelection.current })
          )
        }
      }

      // Jump to previous/next plugin on pressing "up"/"down" arrow keys at start/end of text block
      const isUpArrowAtStart =
        isHotkey('up', event) && isSelectionAtStart(editor, editor.selection)
      if (isUpArrowAtStart) {
        event.preventDefault()
        store.dispatch(focusPrevious())
      }
      const isDownArrowAtEnd =
        isHotkey('down', event) && isSelectionAtEnd(editor, editor.selection)
      if (isDownArrowAtEnd) {
        event.preventDefault()
        store.dispatch(focusNext())
      }
    }

    suggestions.handleHotkeys(event)
    textFormattingOptions.handleHotkeys(event, editor)
    textFormattingOptions.handleMarkdownShortcuts(event, editor)
    textFormattingOptions.handleListsShortcuts(event, editor)
  }

  function handleEditablePaste(event: React.ClipboardEvent) {
    const document = getDocument(id)(store.getState())
    if (!document) return

    const mayInsert = mayInsertChild(id)(store.getState())
    if (!mayInsert) return

    const parentPluginName = document.plugin
    const plugins = getPlugins()(store.getState())

    // Handle pasted images
    const files = Array.from(event.clipboardData.files)
    if (files?.length > 0) {
      const imagePluginState = plugins.image?.onFiles?.(files)
      if (imagePluginState !== undefined) {
        insertPlugin('image', imagePluginState)
        return
      }
    }

    // Handle pasted video URLs
    const text = event.clipboardData.getData('text')
    if (text) {
      const videoPluginState = plugins.video?.onText?.(text)
      if (videoPluginState !== undefined) {
        event.preventDefault()
        insertPlugin('video', videoPluginState)
        return
      }
    }

    function insertPlugin(plugin: string, { state }: { state?: unknown }) {
      const pluginAllowsRemovingChild = mayRemoveChild(id)(store.getState())
      const isEditorEmpty = Node.string(editor) === ''
      if (pluginAllowsRemovingChild && isEditorEmpty) {
        store.dispatch(replace({ id, plugin, state }))
        return
      }

      const parent = getParent(id)(store.getState())
      if (!parent) return

      const slicedNodes = sliceNodesAfterSelection(editor)

      setTimeout(() => {
        if (slicedNodes) {
          store.dispatch(
            insertChildAfter({
              parent: parent.id,
              sibling: id,
              document: {
                plugin: parentPluginName,
                state: slicedNodes,
              },
            })
          )
        }
        store.dispatch(
          insertChildAfter({
            parent: parent.id,
            sibling: id,
            document: { plugin, state },
          })
        )
      })
    }
  }

  return (
    <HotKeys {...hotKeysProps}>
      <Slate editor={editor} value={value} onChange={handleEditorChange}>
        {editable && focused && (
          <HoveringToolbar
            editor={editor}
            config={config}
            controls={toolbarControls}
            text={text}
            focused={focused}
          />
        )}

        {editable && focused && (
          <LinkControls
            hasSelectionChanged={hasSelectionChanged}
            editor={editor}
            config={config}
            isLinkNewlyCreated={isLinkNewlyCreated}
            setIsLinkNewlyCreated={setIsLinkNewlyCreated}
          />
        )}

        <Editable
          placeholder={config.placeholder}
          onKeyDown={handleEditableKeyDown}
          onPaste={handleEditablePaste}
          renderElement={renderElementWithEditorContext(config, focused)}
          renderLeaf={renderLeafWithConfig(config)}
        />
      </Slate>

      {showSuggestions && (
        <HoverOverlay position="below">
          <Suggestions config={config} {...suggestionsProps} />
        </HoverOverlay>
      )}
    </HotKeys>
  )
}

function renderElementWithEditorContext(
  config: TextEditorPluginConfig,
  focused: boolean
) {
  return function renderElement(props: RenderElementProps) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { element, attributes, children } = props

    if (element.type === 'h') {
      return createElement(`h${element.level}`, attributes, <>{children}</>)
    }
    if (element.type === 'a') {
      return (
        <a href={element.href} style={{ cursor: 'pointer' }} {...attributes}>
          {children}
        </a>
      )
    }

    if (element.type === 'unordered-list') {
      return <ul {...attributes}>{children}</ul>
    }
    if (element.type === 'ordered-list') {
      return <ol {...attributes}>{children}</ol>
    }
    if (element.type === 'list-item') {
      return <li {...attributes}>{children}</li>
    }
    if (element.type === 'list-item-child') {
      return <div {...attributes}>{children}</div>
    }

    if (element.type === 'math') {
      return (
        <MathElement
          config={config}
          element={element}
          attributes={attributes}
          focused={focused}
        >
          {children}
        </MathElement>
      )
    }

    return <div {...attributes}>{children}</div>
  }
}

function renderLeafWithConfig(config: TextEditorConfig) {
  return function renderLeaf(props: RenderLeafProps) {
    const colors = config?.theme?.formattingOptions?.colors?.colors
    const { attributes, leaf } = props
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let { children } = props

    if (leaf.strong) {
      children = <strong>{children}</strong>
    }
    if (typeof leaf.color === 'number' && Array.isArray(colors)) {
      children = (
        <span style={{ color: colors?.[leaf.color % colors.length] }}>
          {children}
        </span>
      )
    }
    if (leaf.code) {
      children = <code>{children}</code>
    }
    if (leaf.em) {
      children = <em>{children}</em>
    }
    return <span {...attributes}>{children}</span>
  }
}

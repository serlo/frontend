import { onKeyDown as slateListsOnKeyDown } from '@prezly/slate-lists'
import { isKeyHotkey } from 'is-hotkey'
import React, {
  createElement,
  useRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createEditor, Descendant, Node, Transforms, Range } from 'slate'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import { HotKeys, useScopedStore } from '../../core'
import { HoverOverlay } from '../../editor-ui'
import { EditorPluginProps } from '../../plugin'
import { useControls } from '../hooks/use-controls'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import { TextEditorConfig, TextEditorControl, TextEditorState } from '../types'
import { sliceNodesAfterSelection } from '../utils/document'
import { markdownShortcuts } from '../utils/markdown'
import { HoveringToolbar } from './hovering-toolbar'
import { LinkControls } from './link-controls'
import { MathElement } from './math-element'
import { Suggestions } from './suggestions'
import {
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

  const textControls = useControls(config, setIsLinkNewlyCreated)
  const { createTextEditor, toolbarControls } = textControls
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const text = Node.string(editor)
  const suggestions = useSuggestions({ text, id, editable, focused })
  const { showSuggestions, hotKeysProps, suggestionsProps } = suggestions

  const previousValue = useRef(value)
  const previousSelection = useRef(selection)

  useEffect(() => {
    // The selection can only be null when the text plugin is initialized
    // (In this case an update of the slate editor is not necessary)
    if (!selection) return

    Transforms.setSelection(editor, selection)

    if (previousValue.current !== value) {
      previousValue.current = value
      editor.children = value
    }
  }, [editor, selection, value])

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
    /*
      Special handler for links. If you move right and end up at the right edge of a link,
      this handler unselects the link, so you can write normal text behind it.
    */
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      if (isKeyHotkey('right', event.nativeEvent)) {
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
    }

    suggestions.handleHotkeys(event)
    textControls.handleHotkeys(event, editor)
    markdownShortcuts().onKeyDown(event, editor)
    if (config.controls.includes(TextEditorControl.lists)) {
      slateListsOnKeyDown(editor, event)
    }
  }

  function handleEditablePaste(event: React.ClipboardEvent) {
    const document = getDocument(id)(store.getState())
    if (!document) return

    const mayInsert = mayInsertChild(id)(store.getState())
    if (!mayInsert) return

    const parentPluginName = document.plugin
    const plugins = getPlugins()(store.getState())

    // Handle pasted images
    const files = getFilesFromDataTransfer(event.clipboardData)
    const hasFiles = files && files.length > 0
    if (hasFiles) {
      const result = plugins.image?.onFiles?.(files)
      if (result !== undefined) {
        handleResult('image', result)
        return
      }
    }

    // Hande pasted video URLs
    const text = event.clipboardData.getData('text')
    if (text) {
      const result = plugins.video?.onText?.(text)
      if (result !== undefined) {
        handleResult('video', result)
        return
      }
    }

    function getFilesFromDataTransfer(clipboardData: DataTransfer) {
      const items = clipboardData.files
      const files: File[] = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item) continue
        files.push(item)
      }
      return files
    }

    function handleResult(pluginName: string, result: { state?: unknown }) {
      if (mayRemoveChild(id)(store.getState()) && Node.string(editor) === '') {
        store.dispatch(
          replace({
            id,
            plugin: pluginName,
            state: result.state,
          })
        )
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
            document: {
              plugin: pluginName,
              state: result.state,
            },
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
          renderElement={renderElementWithFocused(focused)}
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

function renderElementWithFocused(focused: boolean) {
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
    const colors = config?.theme?.controls?.colors?.colors
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

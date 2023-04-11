import { onKeyDown as slateListsOnKeyDown } from '@prezly/slate-lists'
import React, {
  createElement,
  useRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createEditor,
  Editor as SlateEditor,
  Descendant,
  Node,
  Transforms,
} from 'slate'
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

    const { clipboardData } = event

    const files = getFilesFromDataTransfer(clipboardData)
    const text = clipboardData.getData('text')

    // Currently, only the image plugin has the `onFiles` method
    // which handles the copy/pasting of an image
    // TODO: Maybe replace this loop with a direct call of image plugin's onFiles method
    if (files && files.length > 0) {
      for (const pluginName in plugins) {
        // Check if the current property is the object's own property,
        // and not an inherited property (from the prototype)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#iterating_own_properties
        if (!Object.prototype.hasOwnProperty.call(plugins, pluginName)) continue
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { onFiles } = plugins[pluginName]
        if (typeof onFiles === 'function') {
          const result = onFiles(files)
          if (result !== undefined) {
            handleResult(pluginName, result)
            return
          }
        }
      }
    }

    // Currently, only the video plugin has the `onText` method
    // which handles the copy/pasting of a video URL
    // TODO: Maybe replace this loop with a direct call of video plugin's onText method
    if (text) {
      for (const key in plugins) {
        if (!Object.prototype.hasOwnProperty.call(plugins, key)) continue
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { onText } = plugins[key]
        if (typeof onText === 'function') {
          const result = onText(text)
          if (result !== undefined) {
            handleResult(key, result)
            return
          }
        }
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

      const insertSplitOffNodes = (splitOffNodes?: Node) => {
        if (splitOffNodes) {
          store.dispatch(
            insertChildAfter({
              parent: parent.id,
              sibling: id,
              document: {
                plugin: parentPluginName,
                state: [splitOffNodes],
              },
            })
          )
        }
      }
      const insertPastedData = () => {
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
      }
      splitAndInsertNodeAtSelection(editor, [
        insertSplitOffNodes,
        insertPastedData,
      ])
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

function splitAndInsertNodeAtSelection(
  editor: SlateEditor,
  storeCallbacks: Array<(nextSlateState?: Node) => void>
) {
  // Create a new line at selection
  Transforms.splitNodes(editor)

  // Get all the nodes after selection as an array.
  // The first element in the array is always the NodeEntry of the whole editor object.
  // The middle element is the parent NodeEntry.
  // The last element is the NodeEntry at selection.
  // https://docs.slatejs.org/api/nodes/editor#editor.nodes-less-than-t-extends-node-greater-than-editor-editor-options-greater-than-generator-less
  const nodesArray = Array.from(SlateEditor.nodes(editor))

  // Take the parent NodeEntry
  const parentElement = nodesArray[1]

  // Take only the node object from the parent NodeEntry
  const splitOffNodes = parentElement[0]

  // Remove the nodes after selection
  Transforms.removeNodes(editor)

  // Commit the split-off nodes and the pasted data to the store
  setTimeout(() => {
    storeCallbacks.forEach((callback) => {
      callback(splitOffNodes)
    })
  })
}

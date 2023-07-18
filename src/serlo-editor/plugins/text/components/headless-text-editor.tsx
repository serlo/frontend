import isHotkey from 'is-hotkey'
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Descendant, Node, Transforms, Range, Editor } from 'slate'
import { Editable, ReactEditor, RenderElementProps, Slate } from 'slate-react'

import { LinkControls } from './link/link-controls'
import { MathElement } from './math-element'
import { TextLeafRenderer } from './text-leaf-renderer'
import { useFormattingOptions } from '../hooks/use-formatting-options'
import { useTextConfig } from '../hooks/use-text-config'
import { TextEditorPluginConfig, TextEditorState } from '../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginProps } from '@/serlo-editor/plugin'

export interface HeadlessTextEditorConfig {
  placeholder?: TextEditorPluginConfig['placeholder']
  noLinebreaks?: boolean
  serloLinkSearch: boolean
  controls: {
    editor: Editor
    textFormattingOptions: ReturnType<typeof useFormattingOptions>
  }
}

export type HeadlessTextEditorProps = EditorPluginProps<
  TextEditorState,
  HeadlessTextEditorConfig
>

export function HeadlessTextEditor(props: HeadlessTextEditorProps) {
  const { state, editable, focused } = props

  const [isSelectionChanged, setIsSelectionChanged] = useState(0)

  const pluginStrings = useEditorStrings().plugins

  const config = useTextConfig(props.config) as HeadlessTextEditorConfig

  const { editor, textFormattingOptions } = config.controls

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

      // Handle specific keyboard commands (only if selection is collapsed)
      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
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
      }

      textFormattingOptions.handleHotkeys(event, editor)
      textFormattingOptions.handleMarkdownShortcuts(event, editor)
      textFormattingOptions.handleListsShortcuts(event, editor)
    },
    [config.noLinebreaks, editor, textFormattingOptions]
  )

  const handleRenderElement = useCallback(
    (props: RenderElementProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { element, attributes, children } = props

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
    <Slate
      editor={editor}
      value={state.value.value}
      onChange={handleEditorChange}
    >
      <Editable
        readOnly={!editable}
        placeholder={config.placeholder ?? pluginStrings.text.placeholder}
        onKeyDown={handleEditableKeyDown}
        renderElement={handleRenderElement}
        renderLeaf={(props) => (
          <span {...props.attributes}>
            <TextLeafRenderer {...props} />
          </span>
        )}
        className="[&>[data-slate-node]]:mx-side [&_[data-slate-placeholder]]:top-0" // fixes placeholder position in safari
      />
      {editable && focused && (
        <LinkControls
          isSelectionChanged={isSelectionChanged}
          editor={editor}
          serloLinkSearch={config.serloLinkSearch}
        />
      )}
    </Slate>
  )
}

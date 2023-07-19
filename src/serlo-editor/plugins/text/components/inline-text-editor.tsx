import isHotkey from 'is-hotkey'
import React, { useRef, useMemo, useCallback } from 'react'
import { Descendant, Node, Transforms, Range } from 'slate'
import { Editable, RenderElementProps, Slate } from 'slate-react'

import { LinkControls } from './link/link-controls'
import { MathElement } from './math-element'
import { TextLeafRenderer } from './text-leaf-renderer'
import { useTextConfig } from '../hooks/use-text-config'
import {
  InlineTextEditorControls,
  TextEditorConfig,
  TextEditorState,
} from '../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginProps } from '@/serlo-editor/plugin'

export interface InlineTextEditorConfig {
  placeholder?: TextEditorConfig['placeholder']
  noLinebreaks?: TextEditorConfig['noLinebreaks']
  serloLinkSearch: TextEditorConfig['serloLinkSearch']
  controls: Required<InlineTextEditorControls>
}

export type InlineTextEditorProps = EditorPluginProps<
  TextEditorState,
  InlineTextEditorConfig
>

// Inline text editor - used as a child of other plugins
// (for the caption of the image plugin, for example)
export function InlineTextEditor(props: InlineTextEditorProps) {
  const { state, editable, focused } = props

  const pluginStrings = useEditorStrings().plugins

  const config = useTextConfig(props.config) as InlineTextEditorConfig

  const { editor, textFormattingOptions, isChanged, onChange } = config.controls

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
      onChange((count: number) => count + 1)
      previousSelection.current = editor.selection
    },
    [editor.operations, editor.selection, state, onChange]
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
          isSelectionChanged={isChanged}
          editor={editor}
          serloLinkSearch={config.serloLinkSearch}
        />
      )}
    </Slate>
  )
}

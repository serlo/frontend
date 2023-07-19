import isHotkey from 'is-hotkey'
import React, { useCallback } from 'react'
import { Node, Transforms, Range } from 'slate'
import { Editable, Slate } from 'slate-react'

import { LinkControls } from './link/link-controls'
import { TextLeafRenderer } from './text-leaf-renderer'
import { useEditorChange } from '../hooks/use-editor-change'
import { useRenderElement } from '../hooks/use-render-element'
import { useTextConfig } from '../hooks/use-text-config'
import { InlineTextEditorConfig, TextEditorState } from '../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginProps } from '@/serlo-editor/plugin'

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

  const handleRenderElement = useRenderElement(focused)
  const { handleEditorChange } = useEditorChange({ editor, state, onChange })

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

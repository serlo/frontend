import clsx from 'clsx'
import React, { useMemo, useEffect } from 'react'
import { createEditor, Node, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'

import { LinkControls } from './link/link-controls'
import { Suggestions } from './suggestions'
import { TextLeafRenderer } from './text-leaf-renderer'
import { TextToolbar } from './text-toolbar'
import { useEditableKeydownHandler } from '../hooks/use-editable-key-down-handler'
import { useEditablePasteHandler } from '../hooks/use-editable-paste-handler'
import { useEditorChange } from '../hooks/use-editor-change'
import { useRenderElement } from '../hooks/use-render-element'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import type { TextEditorConfig, TextEditorState } from '../types/config'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { HoverOverlay } from '@/serlo-editor/editor-ui'
import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import type { EditorPluginProps } from '@/serlo-editor/plugin'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

// Regular text editor - used as a standalone plugin
export function TextEditor(props: TextEditorProps) {
  const { state, id, editable, focused, containerRef } = props

  const textStrings = useEditorStrings().plugins.text

  const config = useTextConfig(props.config)

  const textFormattingOptions = useFormattingOptions(config.formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions
  const editor = useMemo(
    () => createTextEditor(withReact(createEditor())),
    [createTextEditor]
  )

  const suggestions = useSuggestions({ editor, id, editable, focused })
  const { showSuggestions, suggestionsProps } = suggestions

  const handleRenderElement = useRenderElement(focused)
  const { previousSelection, handleEditorChange } = useEditorChange({
    editor,
    state,
  })
  const handleEditableKeyDown = useEditableKeydownHandler({
    config,
    editor,
    id,
    showSuggestions,
    previousSelection,
    state,
  })
  const handleEditablePaste = useEditablePasteHandler({
    editor,
    id,
  })

  // Workaround for setting selection when adding a new editor:
  useEffect(() => {
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

  return (
    <Slate
      editor={editor}
      initialValue={state.value.value}
      onChange={handleEditorChange}
    >
      {focused && (
        <TextToolbar
          id={id}
          toolbarControls={toolbarControls}
          config={config}
          containerRef={containerRef}
        />
      )}
      <Editable
        readOnly={!editable}
        placeholder={
          editable ? config.placeholder ?? textStrings.placeholder : undefined
        }
        onKeyDown={handleEditableKeyDown}
        onPaste={handleEditablePaste}
        renderElement={handleRenderElement}
        renderLeaf={(props) => (
          <span {...props.attributes}>
            <TextLeafRenderer {...props} />
          </span>
        )}
        className={clsx([
          '[&>[data-slate-node]]:mx-side [&_[data-slate-placeholder]]:top-0', // fixes placeholder position in safari
          'outline-none', // removes the ugly outline present in Slate v0.94.1, maybe it can be removed in some later version
        ])}
        data-qa="plugin-text-editor"
      />
      <LinkControls serloLinkSearch={config.serloLinkSearch} />

      {showSuggestions && (
        <HoverOverlay position="below">
          <Suggestions {...suggestionsProps} />
        </HoverOverlay>
      )}
    </Slate>
  )
}

import { useFormattingOptions } from '@editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import type { EditorPluginProps } from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useMemo, useEffect } from 'react'
import { createEditor, Node, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { v4 } from 'uuid'

import { LinkControls } from './link/link-controls'
import { TextToolbar } from './text-toolbar'
import { useEditableKeydownHandler } from '../hooks/use-editable-key-down-handler'
import { useEditablePasteHandler } from '../hooks/use-editable-paste-handler'
import { useEditorChange } from '../hooks/use-editor-change'
import { useSlateRenderHandlers } from '../hooks/use-slate-render-handlers'
import { useTextConfig } from '../hooks/use-text-config'
import { withEmptyLinesRestriction } from '../plugins'
import { withCorrectVoidBehavior } from '../plugins/with-correct-void-behavior'
import type { TextEditorConfig, TextEditorState } from '../types/config'
import { instanceStateStore } from '../utils/instance-state-store'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

// Regular text editor - used as a standalone plugin
export function TextEditor(props: TextEditorProps) {
  const { state, id, focused, containerRef } = props

  const textStrings = useEditorStrings().plugins.text
  const config = useTextConfig(props.config)

  const textFormattingOptions = useFormattingOptions(config.formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions

  const { editor, editorKey } = useMemo(() => {
    return {
      editor: createTextEditor(
        withReact(
          withEmptyLinesRestriction(withCorrectVoidBehavior(createEditor()))
        )
      ),
      // Fast Refresh will rerun useMemo and create a new editor instance,
      // but <Slate /> is confused by it
      // Generate a unique key per editor instance and set it on the component
      // to synchronize rerendering
      editorKey: v4(),
    }
  }, [createTextEditor])

  const { handleRenderElement, handleRenderLeaf } = useSlateRenderHandlers({
    focused,
  })
  const handleEditorChange = useEditorChange({
    editor,
    state,
    id,
    focused,
  })
  const handleEditableKeyDown = useEditableKeydownHandler({
    config,
    editor,
    id,
    state,
  })
  const handleEditablePaste = useEditablePasteHandler({
    editor,
    id,
  })

  // Workaround for setting selection when adding a new editor:
  useEffect(() => {
    // Get the current text value of the editor
    const text = Node.string(editor)

    // If the first child of the editor is not a paragraph, do nothing
    const isFirstChildParagraph =
      'type' in editor.children[0] && editor.children[0].type === 'p'
    if (!isFirstChildParagraph) return

    // If the editor is empty, set the cursor at the start
    if (text === '') {
      Transforms.select(editor, { offset: 0, path: [0, 0] })
      instanceStateStore[id].selection = editor.selection
    }

    if (focused) {
      ReactEditor.focus(editor)
    }
  }, [editor, focused, id])

  return (
    <Slate
      editor={editor}
      initialValue={instanceStateStore[id].value}
      onChange={handleEditorChange}
      key={editorKey}
    >
      {focused ? (
        <TextToolbar
          id={id}
          toolbarControls={toolbarControls}
          config={config}
          containerRef={containerRef}
        />
      ) : null}

      <Editable
        readOnly={false}
        onKeyDown={handleEditableKeyDown}
        onPaste={handleEditablePaste}
        onBlur={handleBlur}
        renderElement={handleRenderElement}
        renderLeaf={handleRenderLeaf}
        placeholder={config.placeholder ?? textStrings.placeholder}
        // `[&>[data-slate-node]]:mx-side` fixes placeholder position in safari
        // `outline-none` removes the ugly outline present in Slate v0.94.1
        className="outline-none focus:outline-none [&>[data-slate-node]]:mx-side"
        data-qa="plugin-text-editor"
      />

      {focused ? <LinkControls /> : null}
    </Slate>
  )

  function handleBlur() {
    // @ts-expect-error custom operation to do special normalization only on blur.
    editor.normalize({ force: true, operation: { type: 'blur_container' } })
  }
}

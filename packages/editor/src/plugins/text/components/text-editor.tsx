import { useFormattingOptions } from '@editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import type { EditorPluginProps } from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useMemo, useEffect } from 'react'
import { createEditor, Node, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { v4 } from 'uuid'

import { LinkControls } from './link/link-controls'
import { Suggestions } from './suggestions'
import { TextToolbar } from './text-toolbar'
import { useDynamicPlacehoder } from '../hooks/use-dynamic-placeholder'
import { useEditableKeydownHandler } from '../hooks/use-editable-key-down-handler'
import { useEditablePasteHandler } from '../hooks/use-editable-paste-handler'
import { useEditorChange } from '../hooks/use-editor-change'
import { useSlateRenderHandlers } from '../hooks/use-slate-render-handlers'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import { withEmptyLinesRestriction } from '../plugins'
import { withCorrectVoidBehavior } from '../plugins/with-correct-void-behavior'
import type { TextEditorConfig, TextEditorState } from '../types/config'
import { instanceStateStore } from '../utils/instance-state-store'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

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
  const { showSuggestions, setShowSuggestions, suggestionsProps } =
    useSuggestions({
      editor,
      id,
      focused,
      isInlineChildEditor: config.isInlineChildEditor,
      refocus: () => setTimeout(() => ReactEditor.focus(editor), 10),
    })
  const { handleRenderElement, handleRenderLeaf } = useSlateRenderHandlers({
    editor,
    focused,
    placeholder: config.placeholder,
    id,
    setShowSuggestions,
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
    showSuggestions,
    state,
  })
  const handleEditablePaste = useEditablePasteHandler({
    editor,
    id,
  })
  const dynamicPlaceholder = useDynamicPlacehoder({
    id,
    editor,
    focused,
    containerRef,
    staticPlaceholder: config.placeholder,
    noLinebreaks: config.noLinebreaks,
  })

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
      instanceStateStore[id].selection = editor.selection
    }

    // If the editor only has a forward slash, set the cursor
    // after it, so that the user can type to filter suggestions
    if (text === '/') {
      Transforms.select(editor, { offset: 1, path: [0, 0] })
      instanceStateStore[id].selection = editor.selection
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
        onKeyDown={(e) => {
          if (e.key === '/') {
            const text = Node.string(editor)
            // "Show suggestions when the user types '/' and the editor is empty"
            //todo: fix this for "/" entered on new line
            if (text.length === 0) {
              setShowSuggestions(true)
              e.preventDefault()
            }
          }
          handleEditableKeyDown(e)
        }}
        onPaste={handleEditablePaste}
        renderElement={handleRenderElement}
        renderLeaf={handleRenderLeaf}
        decorate={
          dynamicPlaceholder.shouldShow
            ? dynamicPlaceholder.decorateEmptyLines
            : undefined
        }
        placeholder={
          dynamicPlaceholder.shouldShow
            ? undefined
            : config.placeholder ?? textStrings.placeholder
        }
        // `[&>[data-slate-node]]:mx-side` fixes placeholder position in safari
        // `outline-none` removes the ugly outline present in Slate v0.94.1
        className="outline-none focus:outline-none [&>[data-slate-node]]:mx-side"
        data-qa="plugin-text-editor"
      />

      {focused ? <LinkControls /> : null}

      <ModalWithCloseButton
        className="top-8 max-h-[90vh] w-auto min-w-[700px] translate-y-0 overflow-y-scroll pt-0"
        isOpen={showSuggestions}
        setIsOpen={setShowSuggestions}
        title=""
      >
        <Suggestions {...suggestionsProps} />
      </ModalWithCloseButton>
    </Slate>
  )
}

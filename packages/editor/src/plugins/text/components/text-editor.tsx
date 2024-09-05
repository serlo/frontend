import { useFormattingOptions } from '@editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import type { EditorPluginProps } from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useMutation } from '@tanstack/react-query'
import React, { useMemo, useEffect } from 'react'
import { createEditor, Node, Transforms, Range, Editor, Point } from 'slate'
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
  const waitTimeForSuggestion = 400
  const controller = React.useRef<AbortController | null>(null)
  const lastChange = React.useRef<number>(Date.now())
  const suggestionsEnabled = React.useRef<boolean>(true)

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
    suggestionsEnabled,
  })
  const handleEditablePaste = useEditablePasteHandler({
    editor,
    id,
  })

  const fetchSuggestion = useMutation({
    mutationFn: async ({
      suffix,
    }: {
      suffix: string
      lastChangeOfThisCall: number
    }) => {
      controller.current = new AbortController()

      const url = new URL(
        '/api/experimental/complete-text',
        window.location.href
      )

      url.searchParams.append('suffix', suffix)

      const response = await fetch(url.toString(), {
        signal: controller.current.signal,
        method: 'POST',
      })

      if (!response.ok) {
        console.error('Failed to fetch suggestion', await response.text())
        throw new Error('Failed to fetch suggestion')
      }

      return (await response.json()) as {
        suggestion: string
      }
    },
    onSuccess: ({ suggestion }, { lastChangeOfThisCall }) => {
      const { selection } = editor

      if (selection === null || !Range.isCollapsed(selection)) return

      if (lastChange.current === lastChangeOfThisCall) {
        Transforms.insertNodes(editor, {
          text: suggestion,
          suggestion: true,
        })
        editor.setSelection(selection)
      }
    },
  })

  const onChange = React.useCallback(() => {
    const lastChangeOfThisCall = Date.now()
    lastChange.current = lastChangeOfThisCall

    if (controller.current) {
      controller.current.abort()
      controller.current = null
    }

    const { selection } = editor

    if (selection === null || !Range.isCollapsed(selection)) return

    const [nextNode] = Editor.next(editor) ?? [null]

    if (nextNode !== null && 'text' in nextNode && nextNode.suggestion) return

    // Check that the selection is at the end of the line
    const { anchor } = selection
    const [block] = Editor.nodes(editor, {
      match: (n) => 'type' in n && n.type === 'p',
    })

    if (!block) {
      return false
    }

    const [, path] = block
    const end = Editor.end(editor, path)

    if (!Point.equals(anchor, end)) return

    const start = Editor.start(editor, [])
    const suffix = Editor.string(editor, {
      anchor: start,
      focus: anchor,
    })

    setTimeout(() => {
      if (
        lastChange.current === lastChangeOfThisCall &&
        !fetchSuggestion.isPending &&
        suggestionsEnabled.current &&
        suffix.trim().length > 0
      ) {
        fetchSuggestion.mutate({ suffix, lastChangeOfThisCall })
      }
    }, waitTimeForSuggestion)
  }, [editor, fetchSuggestion, waitTimeForSuggestion])

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
      onChange={(newValue) => {
        onChange()
        handleEditorChange(newValue)
      }}
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

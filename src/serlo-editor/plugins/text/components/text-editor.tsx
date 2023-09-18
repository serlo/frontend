import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import {
  createEditor,
  Transforms,
  Range,
  Editor,
  NodeEntry,
  Element,
  withoutNormalizing,
  Descendant,
  Node,
} from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { v4 } from 'uuid'

import { LinkControls } from './link/link-controls'
import { Suggestions } from './suggestions'
import { TextToolbar } from './text-toolbar'
import { useEditableKeydownHandler } from '../hooks/use-editable-key-down-handler'
import { useEditablePasteHandler } from '../hooks/use-editable-paste-handler'
import { useSlateRenderHandlers } from '../hooks/use-slate-render-handlers'
import { useSuggestions } from '../hooks/use-suggestions'
import { useTextConfig } from '../hooks/use-text-config'
import { withEmptyLinesRestriction } from '../plugins'
import { withCorrectVoidBehavior } from '../plugins/with-correct-void-behavior'
import type { TextEditorConfig, TextEditorState } from '../types/config'
// import { instanceStateStore } from '../utils/instance-state-store'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { SlateHoverOverlay } from '@/serlo-editor/editor-ui/slate-hover-overlay'
import type { EditorPluginProps } from '@/serlo-editor/plugin'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

export type TextEditorRenderingState =
  | 'init'
  | 'updateValue'
  | 'focus'
  | 'synchronized'
  | 'resetCursor'

// Regular text editor - used as a standalone plugin
export function TextEditor(props: TextEditorProps) {
  const { state, id, editable, focused, containerRef } = props

  const textStrings = useEditorStrings().plugins.text
  const config = useTextConfig(props.config)

  const textEditorRenderingState = useRef<TextEditorRenderingState>('init')
  const [, triggerRender] = useState(0)

  const textFormattingOptions = useFormattingOptions(config.formattingOptions)
  const { createTextEditor, toolbarControls } = textFormattingOptions

  const { editor, editorKey } = useMemo(() => {
    textEditorRenderingState.current = 'init'
    return {
      editor: createTextEditor(
        withReact(
          withEmptyLinesRestriction(withCorrectVoidBehavior(createEditor()))
        )
      ),
      // Fast Refresh will rerun useMemo and create a new editor instance,
      // but <Slate /> is confused by it
      // Generate a unique key per editor instance and set it on the component
      // to syncronize rerendering
      editorKey: v4(),
    }
  }, [createTextEditor])

  checkRenderingState()
  console.log(
    id,
    'render text editor',
    textEditorRenderingState.current.toUpperCase(),
    JSON.stringify(editor.selection)
  )

  const handleEditorChange = (newValue: Descendant[]) => {
    console.log(id, 'change', JSON.stringify(editor.operations))
    const isAstChange = editor.operations.some(
      ({ type }) => type !== 'set_selection'
    )
    //const storeEntry = instanceStateStore[id]

    if (isAstChange) {
      // storeEntry.value = newValue
      state.set(
        { value: newValue, selection: editor.selection },
        ({ value }) => ({ value, selection: editor.selection })
      )
    }
    /*if (textEditorRenderingState.current === 'captureChange') {
      console.log(id, 'change captured')
      textEditorRenderingState.current = 'init'
      triggerRender((val) => val + 1)
    }*/

    // storeEntry.selection = editor.selection
  }

  useEffect(() => {
    if (textEditorRenderingState.current === 'focus') {
      console.log(id, 'focus')
      ReactEditor.focus(editor)
      triggerRender((val) => val + 1)
    }
  })

  // const [, rerenderForSuggestions] = useState(0)
  const suggestions = useSuggestions({ editor, id, editable, focused })
  const { showSuggestions, suggestionsProps } = suggestions

  const { handleRenderElement, handleRenderLeaf } = useSlateRenderHandlers({
    editor,
    focused,
    placeholder: config.placeholder,
    id,
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

  // Workaround for setting selection when adding a new editor:
  useEffect(() => {
    if (textEditorRenderingState.current === 'synchronized') {
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
        // instanceStateStore[id].selection = editor.selection
      }

      // If the editor only has a forward slash, set the cursor
      // after it, so that the user can type to filter suggestions
      if (text === '/') {
        setTimeout(() => {
          Transforms.select(editor, { offset: 1, path: [0, 0] })
        })
        // instanceStateStore[id].selection = editor.selection
        // rerenderForSuggestions((val) => val + 1)
      }
    }
  }, [editor, focused, id])

  // Workaround for removing double empty lines on editor blur.
  // Normalization is forced on blur and handled in
  // `withEmptyLinesRestriction` plugin.
  // `useEffect` and event delegation are used because `<Editable`
  // `onBlur` doesn't work when custom-empty-line-placeholder is
  // shown before bluring the editor. More info on event delegation:
  // https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
  useEffect(() => {
    const handleBlur = () => {
      // @ts-expect-error custom operation to do special normalization only on blur.
      editor.normalize({ force: true, operation: { type: 'blur_container' } })
    }
    const container = containerRef?.current
    container?.addEventListener('blur', handleBlur, true)
    return () => {
      container?.removeEventListener('blur', handleBlur, true)
    }
  }, [containerRef, editor, id])

  // Show a placeholder on empty lines.
  // https://jkrsp.com/slate-js-placeholder-per-line/
  const decorateEmptyLinesWithPlaceholder = useCallback(
    ([node, path]: NodeEntry) => {
      const { selection } = editor

      const isEmptyElement =
        Element.isElement(node) && Editor.isEmpty(editor, node)

      const isFirstLine = path[0] === 0
      if (
        (!focused && !isFirstLine) ||
        !editable ||
        selection === null ||
        Editor.isEditor(node) ||
        !Range.includes(selection, path) ||
        !Range.isCollapsed(selection) ||
        Editor.string(editor, [path[0]]) !== '' ||
        !isEmptyElement
      ) {
        return []
      }
      return [{ ...selection, showPlaceholder: true }]
    },
    [editable, editor, focused]
  )

  // fallback to static placeholder when:
  // - for inline text plugins
  // - we define a custom placeholder text
  // - when the editor was newly created and never had a selection
  //   (e.g.on a new box plugin) to make sure the text plugin never just an empty line
  //   decorator unfortunately does not work when there is no selection.
  const shouldShowStaticPlaceholder =
    config.noLinebreaks || config.placeholder || !editor.selection

  return (
    <Slate
      editor={editor}
      initialValue={editor.children}
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
        readOnly={!editable}
        onKeyDown={handleEditableKeyDown}
        onPaste={handleEditablePaste}
        renderElement={handleRenderElement}
        renderLeaf={handleRenderLeaf}
        decorate={
          shouldShowStaticPlaceholder
            ? undefined
            : decorateEmptyLinesWithPlaceholder
        }
        placeholder={
          editable && shouldShowStaticPlaceholder
            ? config.placeholder ?? textStrings.placeholder
            : undefined
        }
        // `[&>[data-slate-node]]:mx-side` fixes placeholder position in safari
        // `outline-none` removes the ugly outline present in Slate v0.94.1
        className="outline-none [&>[data-slate-node]]:mx-side"
        data-qa="plugin-text-editor"
        onClick={() => {
          console.log(id, 'on click')
          textEditorRenderingState.current = 'init'

          // triggerRender((val) => val + 1)
        }}
        onFocus={() => {
          console.log(id, 'on focus')
          //ReactEditor.focus(editor)
          textEditorRenderingState.current = 'resetCursor'
        }}
      />

      {focused ? (
        <LinkControls serloLinkSearch={config.serloLinkSearch} />
      ) : null}

      {showSuggestions ? (
        <SlateHoverOverlay position="below">
          <Suggestions {...suggestionsProps} />
        </SlateHoverOverlay>
      ) : null}
    </Slate>
  )

  function checkRenderingState() {
    if (textEditorRenderingState.current === 'resetCursor') {
      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, Editor.start(editor, []))
      })
      textEditorRenderingState.current = 'updateValue'
      triggerRender((val) => val + 1)
      return
    }

    if (editor.children !== state.value.value) {
      const { value, selection } = state.value
      textEditorRenderingState.current = 'updateValue'
      triggerRender((val) => val + 1)

      // copy state into editor
      console.log(id, 'copy into editor')
      editor.children = value
      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection ?? Editor.start(editor, []))
      })
      return
    }

    if (focused) {
      if (ReactEditor.isFocused(editor)) {
        textEditorRenderingState.current = 'synchronized'
        return
      } else {
        textEditorRenderingState.current = 'focus'
        return
      }
    }
  }
}

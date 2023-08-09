import { useState } from 'react'

import type { HighlightProps } from '.'
import { HighlightToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function HighlightEditor(props: HighlightProps) {
  const { config, state, focused, editable } = props
  const { Renderer } = config

  const edit = focused && editable
  const [throttledEdit, setEditThrottled] = useState(edit)

  const editorStrings = useEditorStrings()

  if (edit !== throttledEdit) {
    if (edit) {
      setEditThrottled(true)
    } else {
      setTimeout(() => setEditThrottled(false), 100)
    }
  }

  const numberOflines = state.code.value.split(/\r\n|\r|\n/).length

  return throttledEdit || edit ? (
    <>
      {focused && <HighlightToolbar {...props} />}
      <textarea
        value={state.code.value}
        name="text"
        placeholder={editorStrings.plugins.highlight.enterHere}
        spellCheck={false}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          state.code.set(e.target.value)
        }}
        // make sure editor does not create new plugin on enter etc
        onKeyDown={(e) => e.stopPropagation()}
        className="m-auto h-32 w-full border-none p-side font-mono shadow-menu"
        style={{ height: `${40 + numberOflines * 24}px` }} // simple autogrow
      >
        {state.code.value}
      </textarea>
    </>
  ) : (
    <Renderer
      language={state.language.value}
      showLineNumbers={state.showLineNumbers.value}
      code={state.code.value}
    />
  )
}

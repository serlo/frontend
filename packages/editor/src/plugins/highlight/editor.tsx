import { useEffect, useRef, useState } from 'react'

import type { HighlightProps } from '.'
import { HighlightToolbar } from './toolbar'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/tailwind/helper/cn'

export function HighlightEditor(props: HighlightProps) {
  const { config, state, focused } = props
  const { Renderer } = config

  const [throttledEdit, setEditThrottled] = useState(focused)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const editorStrings = useEditorStrings()

  useEffect(() => {
    if (focused) {
      setTimeout(() => {
        textAreaRef.current?.focus()
      })
    }
  }, [focused])

  if (focused !== throttledEdit) {
    if (focused) {
      setEditThrottled(true)
    } else {
      setTimeout(() => setEditThrottled(false), 100)
    }
  }

  const numberOflines = state.code.value.split(/\r\n|\r|\n/).length

  if (!throttledEdit && !focused) {
    return (
      <Renderer
        language={state.language.value}
        showLineNumbers={state.showLineNumbers.value}
        code={state.code.value}
      />
    )
  }

  return (
    <div className="mx-side">
      {focused && <HighlightToolbar {...props} />}
      <textarea
        value={state.code.value}
        name="text"
        placeholder={editorStrings.plugins.highlight.enterHere}
        spellCheck={false}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          state.code.set(e.target.value)
        }}
        ref={textAreaRef}
        // make sure editor does not create new plugin on enter etc
        onKeyDown={(e) => e.stopPropagation()}
        className={cn(`
            m-auto w-full items-center rounded-xl border-3 border-editor-primary-200 p-side
            pt-6 font-mono
            focus-within:border-editor-primary-200 focus-within:outline-none
        `)}
        style={{ height: `${50 + numberOflines * 26}px` }} // simple autogrow
      >
        {state.code.value}
      </textarea>
    </div>
  )
}

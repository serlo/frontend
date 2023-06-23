import { useState } from 'react'

import { HighlightProps } from '.'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const languages = ['text', 'c', 'javascript', 'jsx', 'markup', 'java', 'python']

export function HighlightEditor(props: HighlightProps) {
  const { config, state, focused, editable } = props
  const { Renderer } = config

  const edit = focused && editable
  const [throttledEdit, setEditThrottled] = useState(edit)

  const editorStrings = useEditorStrings()

  if (edit !== throttledEdit) {
    if (!edit) {
      setTimeout(() => {
        setEditThrottled(false)
      }, 100)
    } else {
      setEditThrottled(true)
    }
  }

  const numberOflines = state.code.value.split(/\r\n|\r|\n/).length

  return throttledEdit || edit ? (
    <>
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
      {renderSettings()}
    </>
  ) : (
    <Renderer
      language={state.language.value}
      showLineNumbers={state.showLineNumbers.value}
      code={state.code.value}
    />
  )

  function renderSettings() {
    return (
      <div className="mt-2 flex justify-between">
        <label>
          Language:{' '}
          <select
            onChange={(e) => state.language.set(e.target.value)}
            className="cursor-pointer"
            value={state.language.value}
          >
            {languages.map((language) => {
              return (
                <option key={language} value={language}>
                  {language}
                </option>
              )
            })}
          </select>
        </label>
        <label className="cursor-pointer">
          {editorStrings.plugins.highlight.showLineNumbers}:{' '}
          <input
            type="checkbox"
            onChange={() => {
              state.showLineNumbers.set(!state.showLineNumbers.value)
            }}
            checked={state.showLineNumbers.value}
          />
        </label>
      </div>
    )
  }
}

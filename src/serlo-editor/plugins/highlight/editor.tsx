import { useState } from 'react'

import { HighlightProps } from '.'

const languages = ['text', 'c', 'javascript', 'jsx', 'markup', 'java', 'python']

export function HighlightEditor(props: HighlightProps) {
  const { config, state, focused, editable } = props
  const { i18n, Renderer } = config

  const edit = focused && editable
  const [throttledEdit, setEditThrottled] = useState(edit)
  if (edit !== throttledEdit) {
    if (!edit) {
      setTimeout(() => {
        setEditThrottled(false)
      }, 100)
    } else {
      setEditThrottled(true)
    }
  }

  return throttledEdit || edit ? (
    <>
      <textarea
        value={state.code.value}
        name="text"
        placeholder={i18n.code.placeholder}
        spellCheck={false}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          state.code.set(e.target.value)
        }}
        // make sure editor does not create new plugin on enter etc
        onKeyDown={(e) => e.stopPropagation()}
        className="m-auto h-32 w-full resize-y border-none p-side font-mono shadow-menu"
      >
        {state.code.value}
      </textarea>
      {renderSettings()}
    </>
  ) : (
    <Renderer
      config={config}
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
          {i18n.showLineNumbers.label}:{' '}
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

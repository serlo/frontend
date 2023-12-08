import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, KeyboardEvent, ClipboardEvent } from 'react'

import { getCleanUrl } from '../../../utils/link'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

export function EditModeInput({
  query,
  setQuery,
  shouldFocus,
  value,
  onKeyDown,
  placeholder,
}: {
  query: string
  setQuery: (query: string) => void
  shouldFocus: boolean
  value: string
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  placeholder: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { lang } = useInstanceData()

  useEffect(() => {
    if (!shouldFocus) return

    const timeout = setTimeout(() => {
      if (shouldFocus && inputRef.current) inputRef.current.focus()
    })

    return () => {
      timeout && clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    // cleanup pasted links
    setTimeout(() => {
      const inputUrl = (e.target as HTMLInputElement).value
      const cleanUrl = getCleanUrl(inputUrl, lang)
      if (cleanUrl !== inputUrl) setQuery(cleanUrl)
    })
  }

  return (
    <>
      <input
        type="text"
        className="align-end mx-side mt-2 h-12 w-[25rem] rounded-xl border-3 border-editor-primary-50 bg-editor-primary-100 pl-3 pr-12 outline-none hover:border-editor-primary-100 focus:border-editor-primary-200"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        spellCheck={false}
      />
      {query ? (
        <div
          className="serlo-button-editor-secondary absolute right-6 top-4 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-700"
          onClick={() => {
            setQuery('')
            setTimeout(() => {
              inputRef.current?.focus()
            })
          }}
        >
          <FaIcon icon={faXmark} />
        </div>
      ) : null}
    </>
  )
}

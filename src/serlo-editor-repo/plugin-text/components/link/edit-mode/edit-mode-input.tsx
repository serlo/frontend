import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, KeyboardEvent } from 'react'

import { FaIcon } from '@/components/fa-icon'

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
      />
      {query ? (
        <div
          className="serlo-button-editor-secondary absolute top-4 right-6 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-700"
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

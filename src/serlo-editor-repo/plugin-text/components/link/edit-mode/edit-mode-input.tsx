import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, KeyboardEvent } from 'react'

import { FaIcon } from '@/components/fa-icon'

// TODO: quickbar data only available in de.serlo.org! how should we handle other instances?
// TODO: quickbar data does not have type for icon

// based on Quickbar, duplicates some code

export function EditModeInput({
  query,
  setQuery,
  shouldFocus,
  value,
  onKeyDown,
}: {
  query: string
  setQuery: (query: string) => void
  shouldFocus: boolean
  value: string
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  // setHref: (href: string) => void
  // removeLink: () => void
  // shouldFocus: boolean
  // quickbarData: QuickbarData | null
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
        className="mx-side w-[25rem] border-3 border-editor-primary-50 bg-editor-primary-100 rounded-xl mt-2 pl-3 pr-12 h-12 align-end hover:border-editor-primary-100 focus:border-editor-primary-200 outline-none"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder="Stichwort oder Link"
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
      {query ? (
        <div
          className="absolute top-4 right-6 flex items-center justify-center w-8 h-8 serlo-button-editor-secondary cursor-pointer text-gray-700"
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

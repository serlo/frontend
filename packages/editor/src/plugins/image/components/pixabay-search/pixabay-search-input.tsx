import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useRef } from 'react'

interface PixabaySearchInputProps {
  query: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onClearButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function PixabaySearchInput(props: PixabaySearchInputProps) {
  const { query, onChange, onKeyDown, onClearButtonClick } = props
  const imageStrings = useEditStrings().plugins.image
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative ml-10 w-[90%]">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={onChange}
        placeholder={imageStrings.search}
        onKeyDown={onKeyDown}
        className="w-full rounded-lg border-0 bg-yellow-100 py-2 pl-4 pr-10 text-gray-600"
      />
      {query ? (
        <button
          className="absolute right-0 items-center p-2 text-gray-400 hover:text-black"
          onClick={onClearButtonClick}
        >
          <FaIcon icon={faXmarkCircle} />
        </button>
      ) : null}
    </div>
  )
}

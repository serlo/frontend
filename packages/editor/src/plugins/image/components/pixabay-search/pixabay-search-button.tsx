import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface PixabaySearchButtonProps {
  onClick: () => void
  onFocus: () => void
  onBlur: () => void
}

export const PixabaySearchButton = (props: PixabaySearchButtonProps) => {
  const { onClick, onFocus, onBlur } = props
  const imageStrings = useEditStrings().plugins.image

  return (
    <button
      data-qa="plugin-image-pixabay-search-button"
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      className="serlo-button-edit-primary mb-4 min-w-full rounded-lg px-1 py-2 font-semibold"
    >
      <span className="mr-2 inline-block">
        <FaIcon icon={faMagnifyingGlass} />
      </span>
      {imageStrings.searchOnline}
    </button>
  )
}

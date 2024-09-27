import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'

export function EditModeResultEntry({
  selectedIndex,
  chooseEntry,
  title,
  index,
  pathHeader,
  isCustomLink,
}: {
  selectedIndex: number
  chooseEntry: (index: number) => void
  title: string
  index: number
  pathHeader?: string
  isCustomLink?: boolean
}) {
  return (
    <a
      key={index}
      className={cn(
        'serlo-link flex cursor-pointer bg-white px-side py-2',
        'hover:!bg-editor-primary-100 hover:!no-underline',
        index === selectedIndex && '!bg-editor-primary-100'
      )}
      data-qa={`link-suggestion-${index}`}
      role="option"
      aria-selected={index === selectedIndex}
      onClick={() => {
        chooseEntry(index)
      }}
    >
      {isCustomLink ? (
        <span className="mr-3 block h-12 w-12 bg-editor-primary-50 pt-3 text-center text-gray-800">
          <FaIcon icon={faExternalLink} />
        </span>
      ) : null}

      <p className="whitespace-normal text-lg leading-cozy">
        <span className="text-gray-700">{pathHeader}</span>
        <span
          className={cn(
            'block font-bold',
            isCustomLink ? 'text-gray-800' : 'text-brand-800'
          )}
        >
          {title}
        </span>
      </p>
    </a>
  )
}

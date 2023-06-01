import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

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
      className={clsx(
        'serlo-link flex cursor-pointer bg-white px-side py-2',
        index === selectedIndex && 'bg-editor-primary-100 group-hover:bg-white',
        'hover:!bg-editor-primary-100 hover:!no-underline'
      )}
      onClick={() => {
        chooseEntry(index)
      }}
    >
      {isCustomLink ? (
        <span className="block h-12 w-12 bg-editor-primary-50 pt-3 text-center text-gray-800">
          <FaIcon icon={faExternalLink} />
        </span>
      ) : null}

      <p className="ml-3 whitespace-normal text-lg leading-cozy">
        <span className="text-gray-700">{pathHeader}</span>
        <span
          className={clsx(
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

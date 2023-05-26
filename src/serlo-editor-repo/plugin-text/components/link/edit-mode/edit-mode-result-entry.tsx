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
        'serlo-link cursor-pointer flex px-side py-2 bg-white',
        index === selectedIndex && 'bg-editor-primary-100 group-hover:bg-white',
        'hover:!no-underline hover:!bg-editor-primary-100'
      )}
      onClick={() => {
        chooseEntry(index)
      }}
    >
      {isCustomLink ? (
        <span className="block w-12 h-12 bg-editor-primary-50 text-center pt-3 text-gray-800">
          <FaIcon icon={faExternalLink} />
        </span>
      ) : null}

      <p className="text-lg leading-cozy ml-3 whitespace-normal">
        <span className="text-gray-700">{pathHeader}</span>
        <span
          className={clsx(
            'font-bold block',
            isCustomLink ? 'text-gray-800' : 'text-brand-800'
          )}
        >
          {title}
        </span>
      </p>
    </a>
  )
}

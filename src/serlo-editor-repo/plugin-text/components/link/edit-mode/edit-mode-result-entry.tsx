import { faExternalLink, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

export function EditModeResultEntry({
  selectedIndex,
  chooseEntry,
  title,
  index,
  href,
  pathHeader,
  isCustomLink,
}: {
  selectedIndex: number
  chooseEntry: (index: number) => void
  title: string
  index: number
  href: string
  pathHeader?: string
  isCustomLink?: boolean
}) {
  return (
    <a
      key={index}
      className={clsx(
        'serlo-link cursor-pointer flex px-side py-2 bg-white',
        {
          'bg-editor-primary-100 group-hover:bg-white': index === selectedIndex,
        },
        'hover:!no-underline hover:!bg-editor-primary-100'
      )}
      onClick={(e) => {
        e.preventDefault()
        chooseEntry(index)
      }}
      href={href}
    >
      <span
        className={clsx(
          'block w-12 h-12 bg-editor-primary-50 text-center pt-3',
          isCustomLink ? 'text-gray-800' : 'text-brand-800'
        )}
      >
        <FaIcon icon={isCustomLink ? faExternalLink : faNewspaper} />
      </span>

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

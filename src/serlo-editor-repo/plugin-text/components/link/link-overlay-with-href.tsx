import {
  faExternalLink,
  faNewspaper,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { checkSerloIdHref } from './utils'
import { FaIcon } from '@/components/fa-icon'
import { QuickbarData } from '@/components/navigation/quickbar'

export function LinkOverlayWithHref({
  value,
  removeLink,
  setIsEditMode,
  quickbarData,
}: {
  value: string
  removeLink: () => void
  setIsEditMode: (mode: boolean) => void
  quickbarData: QuickbarData | null
}) {
  const serloId = checkSerloIdHref(value) ? value.slice(1) : undefined
  const entry = quickbarData?.find((entry) => entry.id === serloId)
  const isCustomLink = !serloId && !value.includes('serlo.org/')

  return (
    <div className="flex items-center px-side py-2">
      <a
        href={value}
        target="_blank"
        className={clsx(
          'serlo-link font-bold whitespace-normal max-w-[27rem]',
          isCustomLink ? '!text-gray-800' : 'text-brand'
        )}
        rel="noreferrer"
      >
        <FaIcon
          icon={isCustomLink ? faExternalLink : faNewspaper}
          className="mr-2"
        />
        {entry ? `${entry.title} (${value})` : value}
      </a>
      <button
        onClick={() => setIsEditMode(true)}
        className="serlo-button-editor-secondary w-10 h-10 ml-4"
      >
        <FaIcon icon={faPencilAlt} />
        <span className="sr-only">Edit</span>
      </button>
      <button
        onClick={removeLink}
        className="serlo-button-editor-secondary w-10 h-10 ml-2"
      >
        <FaIcon icon={faTrashAlt} />
        <span className="sr-only">Remove Link</span>
      </button>
    </div>
  )
}

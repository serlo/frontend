import {
  faExternalLink,
  faNewspaper,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { TextEditorPluginConfig } from '../../types'
import { FaIcon } from '@/components/fa-icon'
import { QuickbarData } from '@/components/navigation/quickbar'
import { EditorTooltip } from '@/serlo-editor-repo/editor-ui/editor-tooltip'

export function LinkOverlayWithHref({
  config,
  value,
  removeLink,
  setIsEditMode,
  quickbarData,
}: {
  config: TextEditorPluginConfig
  value: string
  removeLink: () => void
  setIsEditMode: (mode: boolean) => void
  quickbarData: QuickbarData | null
}) {
  const serloId =
    value.startsWith('/') && value.slice(1).match(/^\d+$/)
      ? value.slice(1)
      : undefined
  const entry = quickbarData?.find((entry) => entry.id === serloId)
  const isCustomLink = !serloId && !value.includes('serlo.org/')

  return (
    <div className="flex content-between items-center px-side py-2">
      <a
        href={value}
        target="_blank"
        className={clsx(
          'serlo-link serlo-tooltip-trigger mr-auto max-w-[27rem] whitespace-normal font-bold outline-none focus:underline',
          isCustomLink ? '!text-gray-800' : 'text-brand'
        )}
        rel="noreferrer"
      >
        <FaIcon
          icon={isCustomLink ? faExternalLink : faNewspaper}
          className="mr-2"
        />
        {entry ? `${entry.title} (${value})` : value}
        <EditorTooltip
          text={config.i18n.link.openInNewTabTitle}
          className="!-ml-1 !pb-2"
        />
      </a>
      <button
        onClick={() => setIsEditMode(true)}
        className="serlo-button-editor-secondary serlo-tooltip-trigger ml-4 h-10 w-10"
      >
        <FaIcon icon={faPencilAlt} />
        <EditorTooltip text={config.i18n.link.edit} className="!-ml-2 !pb-2" />
      </button>
      <button
        onClick={removeLink}
        className="serlo-button-editor-secondary serlo-tooltip-trigger ml-2 h-10 w-10"
      >
        <FaIcon icon={faTrashAlt} />
        <span className="sr-only">{config.i18n.link.remove}</span>
        <EditorTooltip
          text={config.i18n.link.remove}
          className="!-ml-2 !pb-2"
        />
      </button>
    </div>
  )
}

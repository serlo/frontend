import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  faExternalLink,
  faNewspaper,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { QuickbarData } from '@serlo/frontend/src/components/navigation/quickbar'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

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
  const serloId =
    value.startsWith('/') && value.slice(1).match(/^\d+$/)
      ? value.slice(1)
      : undefined
  const entry = quickbarData?.find((entry) => entry.id === serloId)
  const isCustomLink = !serloId && !value.includes('serlo.org/')
  const textStrings = useEditorStrings().plugins.text

  return (
    <div className="flex content-between items-center px-side py-2">
      <a
        href={value}
        target="_blank"
        className={cn(
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
          text={textStrings.openInNewTab}
          className="!-ml-1 !pb-2"
        />
      </a>
      <button
        onClick={() => setIsEditMode(true)}
        className="serlo-button-editor-secondary serlo-tooltip-trigger ml-4 h-10 w-10"
        data-qa="edit-link-button"
      >
        <FaIcon icon={faPencilAlt} />
        <EditorTooltip
          text={textStrings.linkOverlay.edit}
          className="!-ml-2 !pb-2"
        />
      </button>
      <button
        onClick={removeLink}
        className="serlo-button-editor-secondary serlo-tooltip-trigger ml-2 h-10 w-10"
        data-qa="remove-link-button"
      >
        <FaIcon icon={faTrashAlt} />
        <span className="sr-only">{textStrings.linkOverlay.remove}</span>
        <EditorTooltip
          text={textStrings.linkOverlay.remove}
          className="!-ml-2 !pb-2"
        />
      </button>
    </div>
  )
}

import { useSerloQuickbarData } from '@editor/core/hooks/use-serlo-quickbar-data'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import {
  faExternalLink,
  faNewspaper,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

export function LinkOverlayWithHref({
  value,
  removeLink,
  setIsEditMode,
  noAutocomplete,
}: {
  value: string
  removeLink: () => void
  setIsEditMode?: (mode: boolean) => void
  noAutocomplete?: boolean
}) {
  const { quickbarData } = useSerloQuickbarData(noAutocomplete)

  const serloId =
    value.startsWith('/') && value.slice(1).match(/^\d+$/)
      ? value.slice(1)
      : undefined
  const entry = quickbarData?.find((entry) => entry.id === serloId)
  const isCustomLink = !serloId && !value.includes('serlo.org/')
  const textStrings = useEditStrings().plugins.text

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
      {setIsEditMode ? (
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
      ) : null}
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

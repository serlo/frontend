import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'

export function PreviewButton({
  previewActive,
  setPreviewActive,
}: {
  previewActive: boolean
  setPreviewActive: (value: boolean) => void
}) {
  const exStrings = useEditStrings().plugins.exercise

  return (
    <button
      onClick={() => setPreviewActive(!previewActive)}
      className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
      data-qa="plugin-exercise-preview-button"
    >
      <EditorTooltip
        text={
          previewActive
            ? exStrings.previewIsActiveHint
            : exStrings.previewIsDeactiveHint
        }
        className="-ml-5 !pb-1"
      />
      {exStrings.previewMode}{' '}
      <FaIcon icon={previewActive ? faCheckCircle : faCircle} />
    </button>
  )
}

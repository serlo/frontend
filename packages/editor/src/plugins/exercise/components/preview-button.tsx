import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
      className="mr-2 rounded-md bg-editor-primary-200 px-1.5 py-0.5 text-sm transition-colors hover:bg-editor-primary-300 focus-visible:bg-editor-primary-300"
      data-qa="plugin-exercise-preview-button"
    >
      {previewActive ? exStrings.toEditView : exStrings.toLearnersView}{' '}
      <FaIcon icon={previewActive ? faPencilAlt : faEye} />
    </button>
  )
}

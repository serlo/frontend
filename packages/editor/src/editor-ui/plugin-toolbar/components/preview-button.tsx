import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface PreviewButtonProps {
  previewActive: boolean
  setPreviewActive: (value: boolean) => void
}

export function PreviewButton(props: PreviewButtonProps) {
  const { previewActive, setPreviewActive } = props
  const scMcStrings = useEditorStrings().templatePlugins.scMcExercise

  return (
    <button
      onClick={() => setPreviewActive(!previewActive)}
      className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
    >
      <EditorTooltip
        text={
          previewActive
            ? scMcStrings.previewIsActiveHint
            : scMcStrings.previewIsDeactiveHint
        }
        className="-ml-5 !pb-1"
      />
      {scMcStrings.previewMode}{' '}
      <FaIcon icon={previewActive ? faCheckCircle : faCircle} />
    </button>
  )
}

import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface AnswerZoneEmptyProps {
  answerZoneId: string
  onClickSettingsButton: (id: string) => void
  onClickPlusButton: (id: string) => void
}

export const AnswerZoneEmpty = (props: AnswerZoneEmptyProps) => {
  const { answerZoneId, onClickSettingsButton, onClickPlusButton } = props

  const dropzoneImageStrings = useEditorStrings().plugins.dropzoneImage

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        className="serlo-tooltip-trigger absolute right-[2%] top-[4%] rounded bg-orange-100 px-1 pb-0 pt-1"
        onClick={() => onClickSettingsButton(answerZoneId)}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.settings}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faCog} />
      </button>
      <button
        className="serlo-tooltip-trigger rounded bg-orange-100 px-3 pb-1 pt-2"
        onClick={() => onClickPlusButton(answerZoneId)}
        data-qa={`answer-zone-${answerZoneId}-add-answer-button`}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.add}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faPlus} />
      </button>
    </div>
  )
}

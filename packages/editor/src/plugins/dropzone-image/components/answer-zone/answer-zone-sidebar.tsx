import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface AnswerZoneSidebarProps {
  answerZoneId: string
  onClickSettingsButton: (id: string) => void
  onClickPlusButton: (id: string) => void
}

export const AnswerZoneSidebar = (props: AnswerZoneSidebarProps) => {
  const { answerZoneId, onClickSettingsButton, onClickPlusButton } = props

  const dropzoneImageStrings = useEditorStrings().plugins.dropzoneImage

  return (
    <>
      <button
        className={cn(`
          serlo-tooltip-trigger absolute right-[3%] top-[5%] z-10 aspect-square
          w-[10%] min-w-5 max-w-12 rounded bg-orange-100 p-1 text-[0.5rem]
        `)}
        onClick={() => onClickPlusButton(answerZoneId)}
        data-qa={`answer-zone-${answerZoneId}-add-another-answer-button`}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.add}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faPlus} className="h-[90%] w-[90%]" />
      </button>
      <button
        className={cn(`
          serlo-tooltip-trigger absolute bottom-[5%] right-[3%] z-10 hidden aspect-square
          w-[10%] min-w-5 max-w-12 rounded bg-orange-100 p-1 text-[0.5rem] group-hover:block
        `)}
        onClick={() => onClickSettingsButton(answerZoneId)}
        data-qa={`answer-zone-${answerZoneId}-settings-button`}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.settings}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faCog} className="h-[90%] w-[90%]" />
      </button>
    </>
  )
}

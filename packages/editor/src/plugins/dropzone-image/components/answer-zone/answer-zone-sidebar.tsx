import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

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
          serlo-tooltip-trigger absolute right-2 top-1 z-10
          rounded bg-orange-100 p-1 text-[0.5rem]
        `)}
        onClick={() => onClickPlusButton(answerZoneId)}
        data-qa={`answer-zone-${answerZoneId}-add-another-answer-button`}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.add}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faPlus} />
      </button>
      <button
        className={cn(`
          serlo-tooltip-trigger absolute bottom-1 right-2 z-10 hidden
          rounded bg-orange-100 p-1  text-[0.5rem] group-hover:block
        `)}
        onClick={() => onClickSettingsButton(answerZoneId)}
        data-qa={`answer-zone-${answerZoneId}-settings-button`}
      >
        <EditorTooltip
          text={dropzoneImageStrings.answers.settings}
          className="-ml-5 !pb-1"
        />
        <FaIcon icon={faCog} />
      </button>
    </>
  )
}

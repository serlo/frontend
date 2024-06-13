import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

export interface AnswerZoneSidebarProps {
  answerZoneId: string
  onClickSettingsButton: (id: string) => void
  onClickPlusButton: (id: string) => void
}

export const AnswerZoneSidebar = (props: AnswerZoneSidebarProps) => {
  const { answerZoneId, onClickSettingsButton, onClickPlusButton } = props

  return (
    <>
      <button
        data-qa={`answer-zone-${answerZoneId}-add-another-answer-button`}
        className="absolute right-2 top-1 z-20 rounded bg-orange-100 p-1 text-[0.5rem]"
        onClick={() => onClickPlusButton(answerZoneId)}
      >
        <FaIcon icon={faPlus} />
      </button>
      <button
        data-qa={`answer-zone-${answerZoneId}-settings-button`}
        className="absolute bottom-1 right-2 z-20 hidden rounded bg-orange-100 p-1  text-[0.5rem] group-hover:block"
        onClick={() => onClickSettingsButton(answerZoneId)}
      >
        <FaIcon icon={faCog} />
      </button>
    </>
  )
}

import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

export interface AnswerZoneEmptyProps {
  answerZoneId: string
  onClickSettingsButton: (id: string) => void
  onClickPlusButton: (id: string) => void
}

export const AnswerZoneEmpty = (props: AnswerZoneEmptyProps) => {
  const { answerZoneId, onClickSettingsButton, onClickPlusButton } = props

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        className="absolute right-2 top-2 z-10 rounded bg-orange-100 p-1"
        onClick={() => onClickSettingsButton(answerZoneId)}
      >
        <FaIcon icon={faCog} />
      </button>
      <button
        data-qa={`answer-zone-${answerZoneId}-add-answer-button`}
        className="rounded bg-orange-100 p-3"
        onClick={() => onClickPlusButton(answerZoneId)}
      >
        <FaIcon icon={faPlus} />
      </button>
    </div>
  )
}

import { useContext } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'

interface AnswerRendererProps {
  answerType: AnswerType
  answerIndex: number
  onSave?: () => void
  isWrongAnswer?: boolean
  zoneId?: string
}

export function AnswerRenderer({
  answerType,
  answerIndex,
  onSave,
  isWrongAnswer = false,
  zoneId,
}: AnswerRendererProps): JSX.Element {
  const { zones, extraDraggableAnswers } = useContext(AnswerZonesContext) || {}

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : zones?.find((z) => z.id.get() === zoneId)?.answers

  if (!answersList || answerIndex >= answersList.length) return <></>

  const answer = answersList[answerIndex]

  const renderText = <div>{answer.text.render()}</div>

  const renderImage = (
    <div>
      {answer.image.render()}
      {onSave && (
        <div>
          <button
            className="mt-2 flex rounded bg-orange-100 px-2 py-1"
            onClick={onSave}
          >
            + Ablageobject hinzufügen
          </button>
        </div>
      )}
    </div>
  )

  return answerType === 'text' ? renderText : renderImage
}

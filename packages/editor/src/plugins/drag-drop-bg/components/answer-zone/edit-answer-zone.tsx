import { AnswerRenderer } from './answer-renderer'
import { AnswerType } from '../../types'

interface EditAnswerZoneProps {
  zoneId: string
  answerType: AnswerType
  answerIndex: number
  onSave: () => void
}

export function EditAnswerZone({
  zoneId,
  answerType,
  answerIndex,
  onSave,
}: EditAnswerZoneProps): JSX.Element {
  return (
    <AnswerRenderer
      answerType={
        answerType === AnswerType.Text ? AnswerType.Text : AnswerType.Text
      }
      answerIndex={answerIndex}
      zoneId={zoneId}
      onSave={onSave}
    />
  )
}

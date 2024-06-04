import { useContext } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'

interface NewAnswerZoneFlowProps {
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
}: NewAnswerZoneFlowProps): JSX.Element {
  const { zones } = useContext(AnswerZonesContext) || {}
  const answerZone = zones?.find((z) => z.id.get() === zoneId)

  const Text = <div>{answerZone?.answers[answerIndex]?.text.render()}</div>

  const Image = (
    <div>
      {answerZone?.answers[answerIndex]?.image.render()}
      <div>
        <button
          className="mt-2 flex rounded bg-orange-100 px-2 py-1"
          onClick={onSave}
        >
          + Ablageobject hinzufügen
        </button>
      </div>
    </div>
  )

  return answerType === AnswerType.Text ? Text : Image
}

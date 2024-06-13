import { focus, useAppDispatch } from '@editor/store'
import { useContext, useEffect } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AnswerRendererProps {
  answerType: AnswerType
  answerIndex: number
  onSave: () => void
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
  const dispatch = useAppDispatch()
  const { answerZones, extraDraggableAnswers } =
    useContext(AnswerZonesContext) || {}

  useEffect(() => {
    if (isAnswerTypeText) {
      dispatch(focus(answer.text.get()))
    }
  })

  const pluginStrings = useEditorStrings().plugins.dropzoneImage

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : answerZones?.find(({ id }) => id.get() === zoneId)?.answers

  if (!answersList || answerIndex >= answersList.length) return <></>

  const answer = answersList[answerIndex]

  const isAnswerTypeText = answerType === AnswerType.Text

  return (
    <div>
      {isAnswerTypeText ? answer.text.render() : answer.image.render()}
      <div>
        <button
          className="mt-2 flex rounded bg-orange-100 px-2 py-1"
          onClick={onSave}
        >
          + {pluginStrings.insertDropZone}
        </button>
      </div>
    </div>
  )
}

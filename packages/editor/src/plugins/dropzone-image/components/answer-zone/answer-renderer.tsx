import { focus, useAppDispatch } from '@editor/store'
import { useContext, useEffect } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'

interface AnswerRendererProps {
  answerType: AnswerType
  answerIndex: number
  isWrongAnswer?: boolean
  zoneId?: string
}

export function AnswerRenderer({
  answerType,
  answerIndex,
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

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : answerZones?.find(({ id }) => id.get() === zoneId)?.answers

  if (!answersList || answerIndex >= answersList.length) return <></>

  const answer = answersList[answerIndex]

  const isAnswerTypeText = answerType === AnswerType.Text

  return (
    <div>{isAnswerTypeText ? answer.text.render() : answer.image.render()}</div>
  )
}

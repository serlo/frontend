import { focus, useAppDispatch } from '@editor/store'
import { useContext, useEffect } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AnswerRendererProps {
  answerType: AnswerType
  answerIndex: number
  isWrongAnswer?: boolean
  zoneId?: string
  onSave: () => void
}

export function AnswerRenderer({
  answerType,
  answerIndex,
  isWrongAnswer = false,
  zoneId,
  onSave,
}: AnswerRendererProps): JSX.Element {
  const dropzoneImageStrings = useEditorStrings().plugins.dropzoneImage

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
    <>
      <div className="[&_textarea]:w-[430px] [&_textarea]:max-w-[100%]">
        {isAnswerTypeText ? answer.text.render() : answer.image.render()}
      </div>
      <button className="serlo-button-editor-primary mt-4" onClick={onSave}>
        {dropzoneImageStrings.modal.save}
      </button>
    </>
  )
}

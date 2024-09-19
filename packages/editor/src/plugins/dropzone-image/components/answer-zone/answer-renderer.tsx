import { focus, useAppDispatch } from '@editor/store'
import { useEffect } from 'react'

import type { DropzoneImageProps } from '../..'
import { AnswerType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AnswerRendererProps {
  answerType: AnswerType
  answerIndex: number
  isWrongAnswer?: boolean
  zoneId?: string
  onSave: () => void
  answerZones: DropzoneImageProps['state']['answerZones']
  extraDraggableAnswers: DropzoneImageProps['state']['extraDraggableAnswers']
}

export function AnswerRenderer({
  answerType,
  answerIndex,
  isWrongAnswer = false,
  zoneId,
  onSave,
  answerZones,
  extraDraggableAnswers,
}: AnswerRendererProps): JSX.Element {
  const editorStrings = useEditorStrings().edtrIo

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isAnswerTypeText) return
    dispatch(focus(answer.text.id))
  })

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : answerZones?.find(({ id }) => id.value === zoneId)?.answers

  if (!answersList || answerIndex >= answersList.length) return <></>

  const answer = answersList[answerIndex]

  const isAnswerTypeText = answerType === AnswerType.Text

  return (
    <>
      <div className="[&_textarea]:w-[430px] [&_textarea]:max-w-[100%]">
        {isAnswerTypeText ? answer.text.render() : answer.image.render()}
      </div>
      <button className="serlo-button-editor-primary mt-4" onClick={onSave}>
        {editorStrings.save}
      </button>
    </>
  )
}

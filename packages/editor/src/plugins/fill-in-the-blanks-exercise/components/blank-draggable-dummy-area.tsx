import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import type { MouseEventHandler, ReactNode } from 'react'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface BlankDraggableDummyAreaProps {
  children: ReactNode
  onAddDummyAnswerButtonClick: MouseEventHandler
}

export function BlankDraggableDummyArea(props: BlankDraggableDummyAreaProps) {
  const { children, onAddDummyAnswerButtonClick } = props

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  return (
    <div className="mt-8 px-4">
      {blanksExerciseStrings.dummyAnswers}:
      <div className="flex min-h-8 flex-wrap items-stretch">{children}</div>
      <button
        onMouseDown={onAddDummyAnswerButtonClick}
        className="serlo-button-editor-secondary mt-3"
      >
        <FaIcon icon={faPlus} /> {blanksExerciseStrings.addDummyAnswer}
      </button>
    </div>
  )
}

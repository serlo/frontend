import { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
import { EditorInputExerciseDocument } from '@editor/types/editor-plugins'
import { useContext } from 'react'

import { RevisionViewContext } from '@/contexts/revision-view-context'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function InputSerloStaticRenderer(props: EditorInputExerciseDocument) {
  const isRevisionView = useContext(RevisionViewContext)

  return (
    <>
      <InputExerciseStaticRenderer {...props} />
      {isRevisionView ? renderRevisionExtra() : null}
    </>
  )

  function renderRevisionExtra() {
    return props.state.answers.map((answer) => (
      <div
        key={answer.value}
        className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
      >
        <span className="mx-side text-sm font-bold">
          {answer.isCorrect && `[✅]`}:
        </span>
        {answer.value}
        <EditorRenderer document={answer.feedback} />
      </div>
    ))
  }
}

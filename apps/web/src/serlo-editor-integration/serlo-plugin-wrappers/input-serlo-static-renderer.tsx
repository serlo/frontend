import {
  EditorPluginType,
  type EditorTextDocument,
  InputExerciseStaticRenderer,
  TextStaticRenderer,
  type EditorInputExerciseDocument,
} from '@editor/package'
import { useContext } from 'react'

import { RevisionViewContext } from '@/contexts/revision-view-context'

export function InputSerloStaticRenderer(props: EditorInputExerciseDocument) {
  const isRevisionView = useContext(RevisionViewContext)

  return (
    <>
      <InputExerciseStaticRenderer {...props} />
      {isRevisionView ? renderRevisionExtra() : null}
    </>
  )

  function renderRevisionExtra() {
    return props.state.answers.map((answer) => {
      return (
        <div
          key={answer.value}
          className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
        >
          <span className="mx-side text-sm font-bold">
            {answer.isCorrect && `[✅]`}:
          </span>
          {answer.value}
          <TextStaticRenderer
            plugin={EditorPluginType.Text}
            state={(answer.feedback as EditorTextDocument).state}
          />
        </div>
      )
    })
  }
}

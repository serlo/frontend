import { useRouter } from 'next/router'

import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { InputExerciseStaticRenderer } from '@/serlo-editor/plugins/input-exercise/static'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorInputExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function InputSerloStaticRenderer(props: EditorInputExerciseDocument) {
  const entityId = useEntityId()
  const revisionId = useRevisionId()
  const exStrings = useInstanceData().strings.content.exercises
  const { asPath } = useRouter()
  const ab = useAB()

  return (
    <>
      <InputExerciseStaticRenderer {...props} onEvaluate={onEvaluate} />
      {renderRevisionExtra()}
    </>
  )

  function onEvaluate(correct: boolean, val: string) {
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type: 'input',
      },
      ab
    )
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: val.substring(0, 200),
        type: 'ival',
      },
      ab
    )
  }

  function renderRevisionExtra() {
    return props.state.answers.map((answer) => (
      <div
        key={answer.value}
        className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
      >
        <span className="mx-side text-sm font-bold">
          {exStrings.answer} {answer.isCorrect && `[${exStrings.correct}]`}:
        </span>
        {answer.value}{' '}
        <span className="ml-4 inline-block text-gray-500">
          [{props.state.type}]
        </span>
        <StaticRenderer document={answer.feedback} />
      </div>
    ))
  }
}

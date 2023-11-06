import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function ExerciseStaticRenderer({
  state,
  solution,
}: EditorExerciseDocument) {
  const { content, interactive, solution: stateSolution } = state
  if (!content) return null

  // TODO: will be replaced by https://github.com/serlo/frontend/pull/3044
  const tmpSolution = solution ?? stateSolution

  return (
    <>
      <StaticRenderer document={content} />
      <StaticRenderer document={interactive} />
      <StaticRenderer document={tmpSolution} />
    </>
  )
}

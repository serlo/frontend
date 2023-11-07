import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import {
  EditorExerciseDocument,
  EditorSolutionDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

export function ExerciseStaticRenderer({
  state,
  solution,
  serloContext,
}: EditorExerciseDocument) {
  const { content, interactive, solution: stateSolution } = state
  if (!content) return null

  // TODO: will be replaced by https://github.com/serlo/frontend/pull/3044
  const tmpSolution =
    solution ??
    ({
      ...stateSolution,
      serloContext: { uuid: serloContext?.uuid },
    } as EditorSolutionDocument)

  return (
    <>
      <StaticRenderer document={content} />
      <StaticRenderer document={interactive} />
      <StaticRenderer document={tmpSolution} />
    </>
  )
}

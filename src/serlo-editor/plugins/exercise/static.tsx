import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function ExerciseStaticRenderer({
  state,
  solution,
}: EditorExerciseDocument) {
  const { content, interactive } = state
  if (!content) return null

  return (
    <>
      <StaticRenderer document={content} />
      <StaticRenderer document={interactive} />
      <StaticRenderer document={solution} />
    </>
  )
}

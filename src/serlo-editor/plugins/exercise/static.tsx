import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorExercisePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function ExerciseStaticRenderer({ state }: EditorExercisePlugin) {
  const { content, interactive } = state
  if (!content) return null

  return (
    <>
      <StaticRenderer state={content} />
      <StaticRenderer state={interactive} />
    </>
  )
}

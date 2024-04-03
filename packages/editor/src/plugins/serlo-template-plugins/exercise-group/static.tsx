import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorExerciseGroupDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'

import { triggerSentry } from '@/helper/trigger-sentry'

export function TextExerciseGroupTypeStaticRenderer(
  props: EditorTemplateExerciseGroupDocument
) {
  const { state, serloContext: context } = props
  const { content } = state

  if (content.plugin !== EditorPluginType.ExerciseGroup) {
    triggerSentry({ message: 'invalid exercise group state' })
    return null
  }

  return (
    <StaticRenderer
      document={
        {
          ...(content as EditorExerciseGroupDocument),
          serloContext: context,
        } as EditorExerciseGroupDocument
      }
    />
  )
}

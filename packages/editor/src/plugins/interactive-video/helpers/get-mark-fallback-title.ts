import type { EditStrings } from '@editor/types/language-data'
import { isExerciseDocument } from '@editor/types/plugin-type-guards'

export function getMarkFallbackTitle(
  staticChild: {
    plugin: string
    state?: unknown
    id?: string | undefined
  },
  pluginsStrings: EditStrings['plugins']
) {
  if (!isExerciseDocument(staticChild)) return '---'
  if (!staticChild.state.interactive) return pluginsStrings.exercise.title
  return pluginsStrings[staticChild.state.interactive.plugin].title
}

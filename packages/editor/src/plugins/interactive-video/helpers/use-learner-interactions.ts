import {
  type LearnerEventData,
  editorLearnerEventName,
} from '@editor/plugin/helpers/editor-learner-event'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { isExerciseDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'

export type LearnerInteractions = Map<
  string,
  {
    solved: boolean
    attempts: number
  }
>
/*
 * This hook listens to learner events and tracks the number of attempts and if the exercise was solved.
 */
export function useLearnerInteractions() {
  const empty = new Map()
  const [interactions, setInteractions] = useState<LearnerInteractions>(empty)

  useEffect(() => {
    function handleExerciseEvents(e: Event) {
      const { verb, pluginId, correct } = (e as CustomEvent<LearnerEventData>)
        .detail
      if (verb !== 'answered' || !pluginId) return

      const entry = interactions.get(pluginId) ?? { solved: false, attempts: 0 }
      entry.attempts++
      if (correct) entry.solved = true

      const updated = new Map(interactions)
      updated.set(pluginId, entry)
      setInteractions(updated)
    }
    document.addEventListener(editorLearnerEventName, handleExerciseEvents)
    return () => {
      document.removeEventListener(editorLearnerEventName, handleExerciseEvents)
    }
    // only change on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return interactions
}

export function getMarkInteractions(
  mark: EditorInteractiveVideoDocument['state']['marks'][number] | null,
  learnerInteractions: LearnerInteractions
) {
  const empty = { attempts: 0, solved: false }
  if (!mark?.child || !isExerciseDocument(mark.child)) return empty
  const interactiveId = mark.child.state.interactive?.id
  if (!interactiveId) return empty

  const activeMarkInteraction = learnerInteractions.get(interactiveId)
  const attempts = activeMarkInteraction?.attempts ?? 0
  const solved = activeMarkInteraction?.solved ?? false
  return { attempts, solved }
}

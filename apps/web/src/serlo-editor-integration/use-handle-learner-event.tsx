import type { LearnerEventData } from '@editor/package'

export function useSerloHandleLearnerEvent() {
  function handleLearnerEvent(data: LearnerEventData) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return handleLearnerEvent
}

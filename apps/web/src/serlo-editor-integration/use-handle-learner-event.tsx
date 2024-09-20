import { LearnerEvent } from '@editor/plugin/helpers/editor-learner-event'

export function useSerloHandleLearnerEvent() {
  function handleLearnerEvent(data: LearnerEvent) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return handleLearnerEvent
}

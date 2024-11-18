import { LearnerEventData } from '@editor/plugin/helpers/editor-learner-event'

export function useSerloHandleLearnerEvent() {
  function handleLearnerEvent(data: LearnerEventData) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return handleLearnerEvent
}

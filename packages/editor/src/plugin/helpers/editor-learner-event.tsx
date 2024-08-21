export interface LearnerEvent {
  contentType:
    | 'input-exercise'
    | 'sc-exercise'
    | 'mc-exercise'
    | 'blanks-exercise'
    | 'h5p-exercise'
    | 'spoiler'
    | 'solution'
  correct?: boolean
  value?: object | string | number
}
type Trigger = (data: LearnerEvent) => void

export const editorLearnerEvent = (function (): {
  init: (triggerIn: Trigger) => void
  trigger: Trigger | null
} {
  let learnerEventTrigger: Trigger | null = null

  // simple way to provide integrations to adapt to their xAPI needs
  function init(triggerIn: Trigger) {
    if (learnerEventTrigger) return // only initialize once

    learnerEventTrigger = triggerIn
    // Ensure the highest integrity level that JS provides
    Object.freeze(learnerEventTrigger)
  }

  function trigger(data: LearnerEvent) {
    learnerEventTrigger?.(data)
  }

  return { init, trigger }
})()

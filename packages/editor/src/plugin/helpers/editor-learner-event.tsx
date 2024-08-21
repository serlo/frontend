export interface LearnerEvent {
  verb: 'opened' | 'attempted' | 'interacted' | 'answered'
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
  let triggerLearnerEvent: Trigger | null = null

  // simple way to provide integrations to adapt to their xAPI needs
  function init(triggerIn: Trigger) {
    if (triggerLearnerEvent) return // only initialize once

    triggerLearnerEvent = triggerIn
    // Ensure the highest integrity level that JS provides
    Object.freeze(triggerLearnerEvent)
  }

  function trigger(data: LearnerEvent) {
    triggerLearnerEvent?.(data)
  }

  return { init, trigger }
})()

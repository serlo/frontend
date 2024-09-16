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
  let handleLearnerEvent: Trigger | null = null

  // simple way to provide integrations to adapt to their learner tracking or xAPI needs
  function init(handler: Trigger) {
    if (handleLearnerEvent) return // only initialize once

    handleLearnerEvent = handler
    // Ensure the highest integrity level that JS provides
    Object.freeze(handleLearnerEvent)
  }

  function trigger(data: LearnerEvent) {
    handleLearnerEvent?.(data)
  }

  return { init, trigger }
})()

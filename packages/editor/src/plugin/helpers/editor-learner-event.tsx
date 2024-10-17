export interface LearnerEventData {
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
  pluginId?: string // editor id of the plugin that triggered the event
}
type Trigger = (data: LearnerEventData) => void

export const editorLearnerEventName = 'editorLearnerEvent'

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

  function trigger(data: LearnerEventData) {
    handleLearnerEvent?.(data)

    // also trigger as custom js event so other editor plugins can listen to it
    const customEvent = new CustomEvent(editorLearnerEventName, {
      detail: { ...data },
    })

    document.dispatchEvent(customEvent)
  }

  return { init, trigger }
})()

import { SerloRenderer } from '@editor/package'

import { useSerloHandleLearnerEvent } from './use-handle-learner-event'

export function EditorRenderer({
  document,
}: {
  document: unknown
}): JSX.Element {
  const handleLearnerEvent = useSerloHandleLearnerEvent()

  return (
    <div className="serlo-content-with-spacing-fixes">
      <SerloRenderer
        state={document}
        editorVariant="serlo-org"
        handleLearnerEvent={handleLearnerEvent}
      />
    </div>
  )
}

import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { PlayerTools } from './editor/player-tools'
import { createCues } from './helpers/create-cues'
import { useLearnerInteractions } from './helpers/use-learner-interactions'
import { usePreventSeeking } from './helpers/use-prevent-seeking'
import { InteractiveVideoRenderer } from './renderer'
import { MarkOverlay } from './static/mark-overlay'
import { useInstanceData } from '@/contexts/instance-context'

export function InteractiveVideoStaticRenderer({
  state,
}: EditorInteractiveVideoDocument) {
  const { marks } = state

  const exerciseString = useInstanceData().strings.entities.exercise

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  const learnerInteractions = useLearnerInteractions()

  const preventSeeking = usePreventSeeking({ marks, learnerInteractions })

  const cues = createCues(marks, exerciseString)

  function openOverlayByStartTime(startTime: number) {
    const index = marks.findIndex((mark) => mark.startTime === startTime)
    if (index === -1) return
    setShowOverlayContentIndex(index)
  }

  return (
    <>
      <InteractiveVideoRenderer
        chapterContent={{ cues }}
        tools={
          <>
            <PlayerTools openOverlayByStartTime={openOverlayByStartTime} />
            <MarkOverlay
              showOverlayContentIndex={showOverlayContentIndex}
              marks={marks}
              learnerInteractions={learnerInteractions}
              openOverlayByStartTime={openOverlayByStartTime}
              close={() => setShowOverlayContentIndex(null)}
            />
          </>
        }
        onMediaSeekRequest={preventSeeking}
      />
    </>
  )
}

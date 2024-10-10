import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { isVideoDocument } from '@editor/types/plugin-type-guards'
import { useState } from 'react'

import { MarkOverlay } from './mark-overlay'
import { useCheckSeekAndPlay } from '../helpers/use-check-seek-and-play'
import { useLearnerInteractions } from '../helpers/use-learner-interactions'
import { InteractiveVideoRenderer } from '../renderer/renderer'

export function InteractiveVideoStaticRenderer({
  state,
}: EditorInteractiveVideoDocument) {
  const { marks, video } = state

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  const learnerInteractions = useLearnerInteractions()

  const checkSeekAndPlay = useCheckSeekAndPlay({ marks, learnerInteractions })

  function openOverlayByStartTime(startTime: number) {
    const index = marks.findIndex((mark) => mark.startTime === startTime)
    if (index === -1) return
    setShowOverlayContentIndex(index)
  }

  const videoSrc = isVideoDocument(video) ? video.state.src : ''

  return (
    <InteractiveVideoRenderer
      videoSrc={videoSrc}
      marks={marks}
      tools={
        <MarkOverlay
          showOverlayContentIndex={showOverlayContentIndex}
          marks={marks}
          learnerInteractions={learnerInteractions}
          openOverlayByStartTime={openOverlayByStartTime}
          close={() => setShowOverlayContentIndex(null)}
        />
      }
      checkSeekAndPlay={checkSeekAndPlay}
    />
  )
}

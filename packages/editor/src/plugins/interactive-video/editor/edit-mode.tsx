import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { MarksList } from './marks-list'
import { OverlayContentModal } from './overlay-content-modal'
import { PlayerTools } from './player-tools'
import { type InteractiveVideoProps } from '..'
import { addOverlayContent } from '../helpers/add-overlay-content'
import { InteractiveVideoRenderer } from '../renderer/renderer'

export function EditMode({
  state,
  staticMarks,
  videoSrc,
}: {
  state: InteractiveVideoProps['state']
  staticMarks: EditorInteractiveVideoDocument['state']['marks']
  videoSrc: string
}) {
  const { marks } = state

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  function openOverlayByStartTime(startTime: number) {
    const index = marks.findIndex((mark) => mark.startTime.value === startTime)
    if (index === -1) return
    setShowOverlayContentIndex(index)
  }

  return (
    <>
      <InteractiveVideoRenderer
        videoSrc={videoSrc}
        marks={staticMarks}
        tools={
          <PlayerTools
            addOverlayContent={(time: number) =>
              addOverlayContent(time, marks, setShowOverlayContentIndex)
            }
            openOverlayByStartTime={openOverlayByStartTime}
          />
        }
      />

      {showOverlayContentIndex === null ? null : (
        <OverlayContentModal
          onClose={() => setShowOverlayContentIndex(null)}
          mark={marks[showOverlayContentIndex]}
        />
      )}
      <div className="h-6" />
      <MarksList
        marks={marks}
        staticMarks={staticMarks}
        onMarkClick={setShowOverlayContentIndex}
      />
    </>
  )
}

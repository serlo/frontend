import { focus, useAppDispatch } from '@editor/store'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { type InteractiveVideoProps } from '..'
import { MarksList } from './marks-list'
import { OverlayContentModal } from './overlay-content-modal'
import { PlayerTools } from './player-tools'
import { addOverlayContent } from '../helpers/add-overlay-content'
import { useCheckSeekAndPlay } from '../helpers/use-check-seek-and-play'
import { useLearnerInteractions } from '../helpers/use-learner-interactions'
import { InteractiveVideoRenderer } from '../renderer/renderer'
import { MarkOverlay } from '../static/mark-overlay'

export function EditMode({
  id,
  focused,
  state,
  staticMarks,
  videoSrc,
  previewActive,
}: InteractiveVideoProps & {
  staticMarks: EditorInteractiveVideoDocument['state']['marks']
  videoSrc: string
  previewActive: boolean
}) {
  const { marks } = state
  const dispatch = useAppDispatch()

  const learnerInteractions = useLearnerInteractions()
  const checkSeekAndPlay = useCheckSeekAndPlay({
    marks: staticMarks,
    learnerInteractions,
  })

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
        isEditMode
        videoSrc={videoSrc}
        marks={staticMarks}
        learnerInteractions={previewActive ? learnerInteractions : undefined}
        checkSeekAndPlay={previewActive ? checkSeekAndPlay : undefined}
        tools={
          previewActive ? (
            <MarkOverlay
              showOverlayContentIndex={showOverlayContentIndex}
              marks={staticMarks}
              learnerInteractions={learnerInteractions}
              openOverlayByStartTime={openOverlayByStartTime}
              close={() => setShowOverlayContentIndex(null)}
            />
          ) : (
            <PlayerTools
              addOverlayContent={(time: number) =>
                addOverlayContent(time, marks, setShowOverlayContentIndex)
              }
              openOverlayByStartTime={openOverlayByStartTime}
            />
          )
        }
      />
      {showOverlayContentIndex === null || previewActive ? null : (
        <OverlayContentModal
          onClose={() => {
            setShowOverlayContentIndex(null)
            dispatch(focus(id))
          }}
          mark={marks[showOverlayContentIndex]}
        />
      )}
      <div className="h-6" />
      {focused && !previewActive ? (
        <MarksList
          marks={marks}
          staticMarks={staticMarks}
          onMarkClick={setShowOverlayContentIndex}
        />
      ) : null}
    </>
  )
}

import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { PlayerTools } from './editor/player-tools'
import { createCues } from './helpers/create-cues'
import { InteractiveVideoRenderer } from './renderer'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'

export function InteractiveVideoStaticRenderer({
  state,
}: EditorInteractiveVideoDocument) {
  const exerciseString = useInstanceData().strings.entities.exercise

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  const { marks } = state

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
          <PlayerTools
            openOverlayByStartTime={openOverlayByStartTime}
            marks={marks}
          />
        }
        onMediaSeekRequest={(time, nativeEvent) => {
          const isForbidden = marks.some((mark) => {
            const forbidden = mark.mandatory && time > mark.startTime + 5
            // TODO: check if it was successfully solved or if it was tried enough times
            return forbidden
          })

          if (isForbidden) {
            nativeEvent.preventDefault()
          }

          // const activeMark = marks.find((mark) => {
          //   return time >= mark.startTime && time <= mark.startTime + 5
          // })
          // if (activeMark) {
          //   setShowOverlayContentIndex(index)
          // }
        }}
      />
      {showOverlayContentIndex === null ? null : (
        <ModalWithCloseButton
          isOpen={showOverlayContentIndex !== null}
          setIsOpen={() => setShowOverlayContentIndex(null)}
          className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
          title={marks[showOverlayContentIndex].title}
          extraTitleClassName="serlo-h2"
        >
          <div className="h-6" />
          <StaticRenderer document={marks[showOverlayContentIndex].child} />
        </ModalWithCloseButton>
      )}
    </>
  )
}

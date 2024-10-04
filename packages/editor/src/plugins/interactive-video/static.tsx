import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { PlayerTools } from './editor/player-tools'
import { createCues } from './helpers/create-cues'
import { usePreventSeeking } from './helpers/use-prevent-seeking'
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
  const preventSeeking = usePreventSeeking(marks)

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
        onMediaSeekRequest={preventSeeking}
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

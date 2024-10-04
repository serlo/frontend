import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faBackward, faPlay, faTasks } from '@fortawesome/free-solid-svg-icons'
import {
  useActiveTextCues,
  useActiveTextTrack,
  useMediaPlayer,
} from '@vidstack/react'
import { useEffect, useRef } from 'react'

import { markDuration } from '../const'
import {
  getMarkInteractions,
  type LearnerInteractions,
} from '../helpers/use-learner-interactions'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function MarkOverlay({
  showOverlayContentIndex,
  marks,
  learnerInteractions,
  close,
  openOverlayByStartTime,
}: {
  showOverlayContentIndex: number | null
  marks: EditorInteractiveVideoDocument['state']['marks']
  learnerInteractions: LearnerInteractions
  close: () => void
  openOverlayByStartTime: (startTime: number) => void
}) {
  const player = useMediaPlayer()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const textTrack = useActiveTextTrack('chapters')
  const activeCue = useActiveTextCues(textTrack)[0]

  const activeMark =
    showOverlayContentIndex !== null ? marks[showOverlayContentIndex] : null

  const { attempts, solved } = getMarkInteractions(
    activeMark,
    learnerInteractions
  )

  function closeOverlay() {
    if (!player) return
    // TODO: try to stop player from starting immediately if player was clicked to close overlay
    close()
    setTimeout(() => player.$el?.focus())
  }

  // auto open overlay when mark is mandatory
  useEffect(() => {
    if (!player || player.paused) return
    const mark = marks.find((mark) => mark.startTime === activeCue?.startTime)
    if (!mark) return

    const { solved } = getMarkInteractions(mark, learnerInteractions)

    if (activeCue && !solved) {
      void player.pause()
      setTimeout(() => {
        buttonRef.current?.classList.add('triggered')
      }, 150)
      setTimeout(() => {
        openOverlayByStartTime(mark.startTime)
        buttonRef.current?.classList.add('triggered')
      }, 1650)
    }
  }, [activeCue, learnerInteractions, marks, openOverlayByStartTime, player])

  if (!player) return null
  return (
    <>
      <div className="absolute top-2 flex w-full sm:justify-center">
        {activeCue?.text ? (
          <button
            ref={buttonRef}
            className="serlo-button-blue animate-in slide-in-from-bottom-4 [&.triggered]:animate-bounce"
            onClick={() => {
              openOverlayByStartTime(activeCue.startTime)
              void player.pause()
            }}
          >
            <FaIcon icon={faTasks} /> {activeCue.text}
          </button>
        ) : null}
      </div>
      <ModalWithCloseButton
        isOpen={!!activeMark}
        setIsOpen={() => closeOverlay()}
        className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
        title={activeMark?.title ?? ''}
        extraTitleClassName="serlo-h2"
        appElementOverride={player?.$el ?? undefined}
      >
        {renderContent()}
      </ModalWithCloseButton>
    </>
  )

  function renderContent() {
    if (!activeMark || showOverlayContentIndex === null) return null
    return (
      <>
        <div className="h-6" />
        <StaticRenderer document={activeMark.child} />
        {attempts > 0 && solved ? (
          <p className="mx-side my-4">
            {/* TODO: i18n */}
            <i>Gut gemacht! Jetzt geht&apos;s weiter .</i>
            <br />
            <button
              className="serlo-button-editor-primary mt-1"
              onClick={() => {
                closeOverlay()
                void player?.play()
              }}
            >
              <FaIcon icon={faPlay} /> Abspielen {/* TODO: i18n */}
            </button>
          </p>
        ) : null}
        {attempts > 0 && !solved ? (
          <p className="mx-side my-4">
            <i>
              {/* TODO: i18n */}
              Schau dir doch noch mal den Teil des Videos vor der Aufgabe an:
            </i>
            <br />
            <button
              className="serlo-button-editor-primary mt-1"
              onClick={() => {
                closeOverlay()
                if (!player) return

                const time =
                  showOverlayContentIndex === 0
                    ? 0
                    : marks[showOverlayContentIndex - 1].startTime +
                      markDuration

                player.currentTime = time
                void player.play()
              }}
            >
              {/* TODO: i18n */}
              <FaIcon icon={faBackward} /> Zurückspulen
            </button>
          </p>
        ) : null}
      </>
    )
  }
}

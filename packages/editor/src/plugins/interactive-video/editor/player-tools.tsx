import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import {
  useActiveTextCues,
  useActiveTextTrack,
  useMediaPlayer,
} from '@vidstack/react'
import { useEffect } from 'react'

import { FaIcon } from '@/components/fa-icon'

// currently used by static renderer and editor, maybe split later
export function PlayerTools({
  addOverlayContent,
  openOverlayByStartTime,
  marks,
}: {
  addOverlayContent?: (startTime: number) => void
  openOverlayByStartTime: (startTime: number) => void
  marks?: EditorInteractiveVideoDocument['state']['marks']
}) {
  const isEditMode = addOverlayContent !== undefined

  const activeCues = useActiveTextCues(useActiveTextTrack('chapters'))

  const activeCue = activeCues[0]

  const player = useMediaPlayer()

  useEffect(() => {
    if (isEditMode || !marks || !player || player.paused) return
    const mark = marks.find(
      (mark) =>
        mark.startTime === activeCue?.startTime ||
        mark.startTime + 5 === activeCue?.startTime
    )
    const isFiller = !mark?.title

    if (!isFiller && activeCue) {
      openOverlayByStartTime(mark.startTime)

      // edge case if player is about to leave mandatory mark
      if (mark.startTime + 5 === activeCue?.startTime) {
        player.currentTime = mark.startTime + 0.01
      }
      void player.pause()
    }
  }, [activeCue, isEditMode, marks, openOverlayByStartTime, player])

  if (!player) return null

  return (
    <div className="absolute top-2 flex w-full sm:justify-center">
      {activeCue?.text ? (
        <button
          className="serlo-button-blue"
          onClick={() => {
            openOverlayByStartTime(activeCue.startTime)
            void player.pause()
          }}
        >
          <FaIcon icon={faTasks} /> {activeCue.text}
        </button>
      ) : addOverlayContent ? (
        <button
          className="rounded-lg bg-gray-800 bg-opacity-20 px-2 py-1 transition-all hover:bg-opacity-100"
          onClick={() => {
            addOverlayContent(player.currentTime)
            void player.pause()
            // update player ui
            // player.currentTime = player.currentTime + 0.1
            // player.currentTime = player.currentTime - 0.1
          }}
        >
          + Inhalt einfügen
        </button>
      ) : null}
    </div>
  )
}

import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import {
  useActiveTextCues,
  useActiveTextTrack,
  useMediaPlayer,
} from '@vidstack/react'
import { useEffect } from 'react'

import { longerThanVideoDuration, markDuration } from '../const'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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
  const pluginStrings = useEditorStrings().plugins.interactiveVideo
  const isEditMode = addOverlayContent !== undefined

  const textTrack = useActiveTextTrack('chapters')
  const activeCues = useActiveTextCues(textTrack)

  const activeCue = activeCues[0]
  const activeCueLength = activeCue
    ? activeCue.endTime - activeCue.startTime
    : longerThanVideoDuration

  const player = useMediaPlayer()

  useEffect(() => {
    if (isEditMode || !marks || !player || player.paused) return
    const mark = marks.find(
      (mark) => mark.startTime === activeCue?.startTime
      // || mark.startTime + defaultMarkTime === activeCue?.startTime
    )
    const isFiller = !mark?.title

    if (!isFiller && activeCue) {
      openOverlayByStartTime(mark.startTime)

      void player.pause()
    }
  }, [activeCue, isEditMode, marks, openOverlayByStartTime, player])

  if (!player) return null

  const isFillLongEnough = activeCueLength > markDuration

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
      ) : addOverlayContent && isFillLongEnough ? (
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
          + {pluginStrings.addOverlayContent}
        </button>
      ) : null}
    </div>
  )
}

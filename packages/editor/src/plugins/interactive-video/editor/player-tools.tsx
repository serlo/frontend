import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import {
  useActiveTextCues,
  useActiveTextTrack,
  useMediaPlayer,
} from '@vidstack/react'

import { longerThanVideoDuration, markDuration } from '../const'
import { FaIcon } from '@/components/fa-icon'

// editor player tools (currently just the hovering button)
export function PlayerTools({
  addOverlayContent,
  openOverlayByStartTime,
}: {
  addOverlayContent?: (startTime: number) => void
  openOverlayByStartTime: (startTime: number) => void
}) {
  const pluginStrings = useEditStrings().plugins.interactiveVideo

  const textTrack = useActiveTextTrack('chapters')
  const activeCues = useActiveTextCues(textTrack)

  const activeCue = activeCues[0]
  const activeCueLength = activeCue
    ? activeCue.endTime - activeCue.startTime
    : longerThanVideoDuration

  const player = useMediaPlayer()

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

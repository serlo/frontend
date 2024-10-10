import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faPlusCircle, faTasks } from '@fortawesome/free-solid-svg-icons'
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
    <div className="pointer-events-none absolute top-3 flex w-full sm:justify-center">
      {activeCue?.text ? (
        <button
          className="serlo-button-blue pointer-events-auto"
          onClick={() => {
            openOverlayByStartTime(activeCue.startTime)
            void player.pause()
          }}
        >
          <FaIcon icon={faTasks} /> {activeCue.text}
        </button>
      ) : addOverlayContent && isFillLongEnough ? (
        <button
          className="serlo-button-editor-primary pointer-events-auto"
          onClick={() => {
            addOverlayContent(player.currentTime)
            void player.pause()
          }}
        >
          <FaIcon icon={faPlusCircle} /> {pluginStrings.addOverlayContent}
        </button>
      ) : null}
    </div>
  )
}

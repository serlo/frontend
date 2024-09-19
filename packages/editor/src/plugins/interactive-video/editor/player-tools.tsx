import { FaIcon } from '@/components/fa-icon'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import {
  useActiveTextCues,
  useActiveTextTrack,
  useChapterTitle,
  useMediaPlayer,
  useTextCues,
} from '@vidstack/react'

export function PlayerTools({
  addOverlayContent,
  openOverlayByStartTime,
}: {
  addOverlayContent: (startTime: number) => void
  openOverlayByStartTime: (startTime: number) => void
}) {
  const track = useActiveTextTrack('chapters')
  const activeCues = useActiveTextCues(track)

  const activeCue = activeCues[0]

  const player = useMediaPlayer()

  if (!player) return null

  return (
    <div className="absolute top-2 flex w-full sm:justify-center">
      {activeCue ? (
        <button
          className="serlo-button-blue"
          onClick={() => {
            openOverlayByStartTime(activeCue.startTime)
            player.pause()
          }}
        >
          <FaIcon icon={faTasks} /> {activeCue.text}
        </button>
      ) : (
        <button
          className="rounded-lg bg-gray-800 bg-opacity-20 px-2 py-1 transition-all hover:bg-opacity-100"
          onClick={() => {
            addOverlayContent(player.currentTime)
            player.pause()
            // update player ui
            // player.currentTime = player.currentTime + 0.1
            // player.currentTime = player.currentTime - 0.1
          }}
        >
          + Inhalt einfügen
        </button>
      )}
    </div>
  )
}

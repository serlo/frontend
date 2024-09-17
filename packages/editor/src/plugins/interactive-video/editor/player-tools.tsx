import { useMediaPlayer } from '@vidstack/react'

export function PlayerTools({
  addOverlayContent,
}: {
  addOverlayContent: (startTime: number) => void
}) {
  //  const track = useActiveTextTrack('chapters')
  //  const cues = useTextCues(track)

  //  const title = useChapterTitle()
  const player = useMediaPlayer()

  if (!player) return null

  return (
    <button
      className="serlo-button-editor-primary absolute top-1"
      onClick={() => addOverlayContent(player.currentTime ?? 0)}
    >
      + Aufgabe an aktueller Stelle hinzufügen
    </button>
  )
}

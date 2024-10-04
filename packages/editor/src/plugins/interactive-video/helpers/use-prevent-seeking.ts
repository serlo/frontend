import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { type MediaSeekRequestEvent, useMediaRemote } from '@vidstack/react'

import { markDuration } from '../const'

export function usePreventSeeking(
  marks: EditorInteractiveVideoDocument['state']['marks']
) {
  const remote = useMediaRemote()

  return function (time: number, nativeEvent: MediaSeekRequestEvent) {
    let isInside = false
    const mandatoryMark = marks.find((mark) => {
      if (!mark.mandatory) return false
      const isAfter = time > mark.startTime + markDuration
      isInside = !isAfter && time > mark.startTime
      // TODO: check if it was successfully solved or if it was tried enough times
      return isAfter || isInside
    })
    // skip ahead my friend
    if (!mandatoryMark) return

    nativeEvent.preventDefault()

    const player = remote.getPlayer(nativeEvent.target)
    if (!player) return

    // jump directly to exercise
    if (isInside) {
      player.currentTime = mandatoryMark.startTime - 0.001
      void player.play()
      return
    }

    // TODO: i18n after refactorings are merged
    showToastNotice('Du musst erst die nächste Aufgabe lösen.')

    // hack to solve refresh TimeSlider
    // see upstream issue https://github.com/vidstack/player/issues/1443
    if (player && player.paused) {
      void player.play().then(() => player.pause())
    }
  }
}

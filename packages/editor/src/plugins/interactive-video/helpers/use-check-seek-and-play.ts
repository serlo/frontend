import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useMediaRemote } from '@vidstack/react'

import {
  getMarkInteractions,
  type LearnerInteractions,
} from './use-learner-interactions'
import { markDuration } from '../const'
/**
 * Here we check if the learner is allowed to seek to a certain time in the video.
 * Or play at the current time.
 */
export function useCheckSeekAndPlay({
  marks,
  learnerInteractions,
}: {
  marks: EditorInteractiveVideoDocument['state']['marks']
  learnerInteractions: LearnerInteractions
}) {
  const remote = useMediaRemote()
  const staticPluginStrings = useStaticStrings().plugins.interactiveVideo

  return function (target?: EventTarget | null, seekTime?: number) {
    const player = remote.getPlayer(target)
    if (!player) return false

    const time = seekTime ?? player.currentTime

    let isInside = false
    const blockingMark = marks.find((mark) => {
      if (!mark.mandatory) return false
      const isAfter = time > mark.startTime + markDuration
      isInside = !isAfter && time > mark.startTime

      const { solved } = getMarkInteractions(mark, learnerInteractions)
      if (solved) return false

      return isAfter || isInside
    })

    // skip ahead my friend
    if (!blockingMark) return true

    // if not seeking, learner tries to play which is not allowed
    // and we are done here
    if (seekTime === undefined) return false

    // for seeking we have some side effects:

    // jump directly to exercise and let overlay open
    if (isInside) {
      player.currentTime = blockingMark.startTime - 0.0001
      void player.play()
      return false
    }
    showToastNotice(staticPluginStrings.mandatoryWarning)

    // when seeking outside of blocked mark:
    // hack to solve refresh TimeSlider
    // see upstream issue https://github.com/vidstack/player/issues/1443
    if (player && player.paused) {
      void player.play().then(() => player.pause())
    }
  }
}

import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { type InteractiveVideoProps } from '..'
import { markDuration } from '../const'

export function addOverlayContent(
  startTimeWish: number,
  marks: InteractiveVideoProps['state']['marks'],
  setShowOverlayContentIndex: (index: number) => void
) {
  const startTime = findFreeStartTime(startTimeWish, marks)

  const previousIndex = marks.findIndex(
    (mark) => startTime > mark.startTime.value
  )
  // make sure marks are always sorted by startTime
  const index = previousIndex > -1 ? previousIndex+1 : 0

  marks.insert(index, {
    title: '',
    child: { plugin: EditorPluginType.Exercise },
    startTime,
    autoOpen: true,
    mandatory: false,
    forceRewatch: false,
  })
  setTimeout(() => setShowOverlayContentIndex(index))
}

function findFreeStartTime(
  startTimeWish: number,
  marks: InteractiveVideoProps['state']['marks']
) {
  // only checks for ends, because ui does not allow to start marks in the middle of existing marks
  const endTimeWish = startTimeWish + markDuration

  const conflictingMark = marks.find((mark) => {
    const isOverlapping =
      startTimeWish < mark.startTime.value && // starts before mark
      endTimeWish > mark.startTime.value // ends after start of mark
    return isOverlapping
  })

  return conflictingMark
    ? conflictingMark.startTime.value - markDuration
    : startTimeWish
}

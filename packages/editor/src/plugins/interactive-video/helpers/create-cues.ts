import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'

import { longerThanVideoDuration, markDuration } from '../const'

export function createCues(
  marks: EditorInteractiveVideoDocument['state']['marks'],
  exerciseString: string
) {
  if (marks.length === 0) return []

  const sortedMarks = marks.sort((a, b) => a.startTime - b.startTime)

  const cues: { startTime: number; endTime: number; text: string }[] = []

  // first filler
  if (sortedMarks[0].startTime !== 0) {
    cues.push({ startTime: 0, endTime: marks[0].startTime, text: '' })
  }

  marks.forEach((mark, index) => {
    // before filler
    if (index > 0) {
      const beforeMark = sortedMarks[index - 1]
      const beforeEndTime = beforeMark.startTime + markDuration
      if (beforeEndTime < mark.startTime) {
        cues.push({
          startTime: beforeEndTime,
          endTime: mark.startTime,
          text: '',
        })
      }
    }

    cues.push({
      startTime: mark.startTime,
      endTime: mark.startTime + markDuration,
      text: mark.title || exerciseString,
    })
  })

  // last filler
  const lastMark = sortedMarks[sortedMarks.length - 1]
  cues.push({
    startTime: lastMark.startTime + markDuration,
    endTime: longerThanVideoDuration, // make sure it reaches the end of the video
    text: '',
  })

  return cues
}

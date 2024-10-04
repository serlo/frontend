import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'

import { markDuration } from '../const'

export function createCues(
  marks: EditorInteractiveVideoDocument['state']['marks'],
  exerciseString: string
) {
  return marks
    .sort((a, b) => a.startTime - b.startTime)
    .map((mark) => ({
      startTime: mark.startTime,
      endTime: mark.startTime + markDuration,
      text: mark.title || exerciseString,
    }))
}

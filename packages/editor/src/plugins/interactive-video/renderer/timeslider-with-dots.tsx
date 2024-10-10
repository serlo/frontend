import { type EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { TimeSlider } from '@vidstack/react'

import {
  getMarkInteractions,
  type LearnerInteractions,
} from '../helpers/use-learner-interactions'
import { cn } from '@/helper/cn'

export function TimeSliderWithDots({
  marks,
  learnerInteractions,
}: {
  marks: EditorInteractiveVideoDocument['state']['marks']
  learnerInteractions?: LearnerInteractions
}) {
  return (
    <TimeSlider.Root className="vds-time-slider vds-slider">
      <TimeSlider.Chapters className="vds-slider-chapters">
        {(cues, forwardRef) =>
          cues.map((cue) => {
            const mark = marks.find((mark) => cue.startTime === mark.startTime)

            const solved = learnerInteractions
              ? getMarkInteractions(mark ?? null, learnerInteractions).solved
              : false

            return (
              <div
                className="vds-slider-chapter relative mr-0 transform-none"
                key={cue.startTime}
                ref={forwardRef}
              >
                {mark ? (
                  <div
                    className={cn(
                      'z-30 h-[17px] w-[17px] rounded-full border-2',
                      mark.mandatory ? 'bg-orange-400' : 'bg-gray-500',
                      solved && '!bg-brandgreen-500'
                    )}
                  />
                ) : null}
                <TimeSlider.Track className="vds-slider-track">
                  <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                  <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
                </TimeSlider.Track>
              </div>
            )
          })
        }
      </TimeSlider.Chapters>

      <TimeSlider.Preview className="vds-slider-preview">
        <TimeSlider.ChapterTitle className="vds-slider-chapter-title" />
        <TimeSlider.Value className="vds-slider-value" />
      </TimeSlider.Preview>

      <TimeSlider.Thumb className="vds-slider-thumb" />
    </TimeSlider.Root>
  )
}

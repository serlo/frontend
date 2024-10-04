import { TimeSlider } from '@vidstack/react'

export function TimeSliderWithDots() {
  return (
    <TimeSlider.Root className="vds-time-slider vds-slider">
      <TimeSlider.Chapters className="vds-slider-chapters">
        {(cues, forwardRef) =>
          cues.map((cue) => {
            const isFiller = cue.text === ''
            return (
              <div
                className="vds-slider-chapter relative mr-0 transform-none"
                key={cue.startTime}
                ref={forwardRef}
              >
                {isFiller ? null : (
                  <div className="z-30 h-5 w-5 rounded-full border-3 bg-brand opacity-90" />
                )}
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

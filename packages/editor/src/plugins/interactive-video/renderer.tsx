// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/theme.css'
// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/layouts/video.css'

import {
  MediaPlayer,
  MediaProvider,
  Track,
  type VTTContent,
  type MediaPlayEvent,
  type MediaSeekRequestEvent,
  // TimeSlider,
} from '@vidstack/react'
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'

/*

.vds-time-slider {
  --media-slider-chapter-hover-transform: none;
  --media-slider-track-border-radius: 0;
}

.vds-slider-chapter {
  margin-right: 0;
}

.vds-slider-chapter::after {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 5px;
  background-color: red;
  z-index: 10;
}
*/

export function InteractiveVideoRenderer({
  chapterContent,
  tools,
  onMediaSeekRequest,
}: {
  chapterContent: VTTContent
  tools?: JSX.Element
  onMediaSeekRequest?: (
    time: number,
    nativeEvent: MediaSeekRequestEvent
  ) => void
  onPlay?: (nativeEvent: MediaPlayEvent) => void
}) {
  const content = {
    cues: chapterContent.cues?.sort((a, b) => a.startTime - b.startTime),
  }
  return (
    <MediaPlayer
      title="Pine Tree Timelapse"
      src="https://www.youtube.com/watch?v=a4kr4SxMNnA"
      playsInline
      muted
      hideControlsOnMouseLeave={false}
      controlsDelay={60000}
      // load="play"
      aspectRatio="16:9"
      onMediaSeekRequest={onMediaSeekRequest}
      // onMediaSeekingRequest={onMediaSeekRequest}
      // onSeeked
      // onSeeking
      // onPlay={}
    >
      <MediaProvider>
        <Track
          id="chapters"
          content={content}
          kind="chapters"
          language="de-DE"
          default
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          beforeSettingsMenu: tools,
          // timeSlider: (
          //   <TimeSlider.Root className="vds-time-slider vds-slider">
          //     <TimeSlider.Chapters className="vds-slider-chapters">
          //       {(cues, forwardRef) =>
          //         cues.map((cue) => (
          //           <div
          //             className="vds-slider-chapter"
          //             key={cue.startTime}
          //             ref={forwardRef}
          //           >
          //             <TimeSlider.Track className="vds-slider-track">
          //               <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
          //               <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
          //             </TimeSlider.Track>
          //           </div>
          //         ))
          //       }
          //     </TimeSlider.Chapters>

          //     <TimeSlider.Preview className="vds-slider-preview">
          //       <TimeSlider.ChapterTitle className="vds-slider-chapter-title" />
          //       <TimeSlider.Value className="vds-slider-value" />
          //     </TimeSlider.Preview>

          //     <TimeSlider.Thumb className="vds-slider-thumb" />
          //   </TimeSlider.Root>
          // ),
        }}
      />
      {/* <Poster
        className="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      /> */}
    </MediaPlayer>
  )
}

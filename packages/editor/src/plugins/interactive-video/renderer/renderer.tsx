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
} from '@vidstack/react'
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'

import { TimeSliderWithDots } from './timeslider-with-dots'

export function InteractiveVideoRenderer({
  chapterContent,
  tools,
  checkSeekAndPlay,
}: {
  chapterContent: VTTContent
  tools?: JSX.Element
  checkSeekAndPlay?: (target: EventTarget | null, seekTime?: number) => void
  onPlay?: (nativeEvent: MediaPlayEvent) => void
}) {
  const content = { cues: chapterContent.cues }

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
      onMediaPlayRequest={(nativeEvent) => {
        const allowed = checkSeekAndPlay?.(nativeEvent.target)
        if (checkSeekAndPlay && !allowed) nativeEvent.preventDefault()
      }}
      onMediaSeekRequest={(time, nativeEvent) => {
        const allowed = checkSeekAndPlay?.(nativeEvent.target, time)
        if (checkSeekAndPlay && !allowed) nativeEvent.preventDefault()
      }}
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
          timeSlider: <TimeSliderWithDots />,
        }}
      />
      {/* <Poster
        className="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
      /> */}
    </MediaPlayer>
  )
}

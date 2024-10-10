// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/theme.css'
// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/layouts/video.css'

import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import {
  MediaPlayer,
  MediaProvider,
  Track,
  type MediaPlayEvent,
} from '@vidstack/react'
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'

import { TimeSliderWithDots } from './timeslider-with-dots'
import { createCues } from '../helpers/create-cues'
import { useInstanceData } from '@/contexts/instance-context'

export function InteractiveVideoRenderer({
  marks,
  tools,
  checkSeekAndPlay,
}: {
  marks: EditorInteractiveVideoDocument['state']['marks']
  tools?: JSX.Element
  checkSeekAndPlay?: (target: EventTarget | null, seekTime?: number) => void
  onPlay?: (nativeEvent: MediaPlayEvent) => void
}) {
  const exerciseString = useInstanceData().strings.entities.exercise
  const cues = createCues(marks, exerciseString)

  return (
    <MediaPlayer
      title="Pine Tree Timelapse"
      src="https://www.youtube.com/watch?v=a4kr4SxMNnA"
      playsInline
      className="[&_.vds-chapter-title]:opacity-0"
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
          content={{ cues }}
          kind="chapters"
          language="de-DE"
          default
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          beforeSettingsMenu: tools,
          timeSlider: <TimeSliderWithDots marks={marks} />,
        }}
      />
      {/* <Poster
        className="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
      /> */}
    </MediaPlayer>
  )
}

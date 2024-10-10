// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/theme.css'
// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/layouts/video.css'

import { useStaticStrings } from '@editor/i18n/static-strings-provider'
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
import { type LearnerInteractions } from '../helpers/use-learner-interactions'

export function InteractiveVideoRenderer({
  videoSrc,
  marks,
  tools,
  checkSeekAndPlay,
  learnerInteractions,
}: {
  videoSrc: string
  marks: EditorInteractiveVideoDocument['state']['marks']
  tools?: JSX.Element
  checkSeekAndPlay?: (target: EventTarget | null, seekTime?: number) => void
  onPlay?: (nativeEvent: MediaPlayEvent) => void
  learnerInteractions?: LearnerInteractions
}) {
  const exerciseString = useStaticStrings().plugins.exercise.title
  const cues = createCues(marks, exerciseString)

  return (
    <div className="mx-side">
      <MediaPlayer
        title="Interactive Video"
        src={videoSrc}
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
            timeSlider: (
              <TimeSliderWithDots
                marks={marks}
                learnerInteractions={learnerInteractions}
              />
            ),
          }}
        />
        {/* <Poster
        className="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
      /> */}
      </MediaPlayer>
    </div>
  )
}

// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/theme.css'
// eslint-disable-next-line import/no-unassigned-import
import '@vidstack/react/player/styles/default/layouts/video.css'

import {
  MediaPlayer,
  MediaProvider,
  Track,
  type VTTContent,
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
}: {
  chapterContent: VTTContent
  tools?: JSX.Element
}) {
  return (
    <MediaPlayer
      title="Sprite Fight"
      src="youtube/_cMxraX_5RE"
      playsInline
      // load="play"
      aspectRatio="16:9"
    >
      <MediaProvider>
        <Track
          id="chapters"
          content={chapterContent}
          kind="chapters"
          language="de-DE"
          default
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          afterSettingsMenu: tools,
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

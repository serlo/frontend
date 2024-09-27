import { EmbedWrapper } from '@editor/editor-ui/embed-wrapper'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { VideoProps } from '.'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { VideoToolbar } from './toolbar'

export type SettingsModalState = 'url' | 'description' | false

export const VideoEditor = (props: VideoProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] =
    useState<SettingsModalState>(false)
  const [iframeSrc, type] = parseVideoUrl(state.src.value)
  const couldBeValid = type !== undefined

  return (
    <>
      {focused && (
        <VideoToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {couldBeValid ? (
        <EmbedWrapper
          type="video"
          provider={type}
          embedUrl={iframeSrc}
          className={focused ? '' : 'pointer-events-none'}
        >
          <VideoRenderer src={iframeSrc} type={type} />
        </EmbedWrapper>
      ) : (
        <div
          className="mx-side cursor-pointer rounded-lg bg-editor-primary-50 py-32 text-center"
          data-qa="plugin-video-placeholder"
          onClick={() => setShowSettingsModal('url')}
        >
          <FaIcon
            icon={faPlayCircle}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )
}

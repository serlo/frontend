import { EmbedWrapper } from '@editor/editor-ui/embed-wrapper'
import { isTempFile } from '@editor/plugin'
import { useRef, useState } from 'react'

import type { VideoProps } from '.'
import { VideoSelectionScreen } from './components/video-selection-screen'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { VideoToolbar } from './toolbar'

export type SettingsModalState = 'url' | 'description' | false

export const VideoEditor = (props: VideoProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] =
    useState<SettingsModalState>(false)

  const [iframeSrc, type] = parseVideoUrl(
    isTempFile(state.src.value) ? '' : state.src.value
  )
  const couldBeValid = type !== undefined

  const urlInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      {focused && (
        <VideoToolbar
          {...props}
          showSettingsButtons={couldBeValid}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
          onChangeVideoButtonClick={() => state.src.set('')}
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
        <VideoSelectionScreen state={state} urlInputRef={urlInputRef} />
      )}
    </>
  )
}

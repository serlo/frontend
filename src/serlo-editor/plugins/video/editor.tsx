import { useState } from 'react'

import { VideoProps } from '.'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { VideoToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { EmbedWrapper } from '@/serlo-editor/editor-ui/embed-wrapper'

export const VideoEditor = (props: VideoProps) => {
  const { domFocusWithin, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [iframeSrc, type] = parseVideoUrl(state.src.value)
  const couldBeValid = type !== undefined

  return (
    <>
      {domFocusWithin && (
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
          className={domFocusWithin ? '' : 'pointer-events-none'}
        >
          <VideoRenderer src={iframeSrc} type={type} />
        </EmbedWrapper>
      ) : (
        <div
          className="mx-side cursor-pointer rounded-lg bg-editor-primary-50 py-32 text-center"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaIcon
            icon={entityIconMapping['video']}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )
}

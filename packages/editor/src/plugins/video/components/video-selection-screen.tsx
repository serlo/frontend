import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { useContext, type RefObject } from 'react'

import type { VideoProps } from '..'
import { UploadButton } from './upload-button'
import { VideoUrlInput } from './video-url-input'

interface VideoSelectionScreenProps {
  state: VideoProps['state']
  urlInputRef: RefObject<HTMLInputElement>
  pluginId: string
}

export function VideoSelectionScreen({
  state,
  urlInputRef,
  pluginId,
}: VideoSelectionScreenProps) {
  const disableMediaUpload = useContext(EditorMetaContext).disableMediaUpload
  return (
    <div
      className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <div className="mx-auto my-8 w-[60%]">
        <VideoUrlInput
          src={state.src}
          pluginId={pluginId}
          urlInputRef={urlInputRef}
        />

        {disableMediaUpload ? null : <UploadButton src={state.src} />}
      </div>
    </div>
  )
}

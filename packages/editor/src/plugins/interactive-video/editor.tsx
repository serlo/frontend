import { useAppSelector, selectStaticDocument } from '@editor/store'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { isVideoDocument } from '@editor/types/plugin-type-guards'
import { useState } from 'react'

import { type InteractiveVideoProps } from '.'
import { EditMode } from './editor/edit-mode'
import { SelectVideoMode } from './editor/select-video-mode'
import { InteractiveVideoToolbar } from './toolbar'

export function InteractiveVideoEditor(props: InteractiveVideoProps) {
  const { focused, state, id } = props
  const [previewActive, setPreviewActive] = useState(false)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorInteractiveVideoDocument
  )
  const staticMarks = staticDocument.state.marks

  const videoSrc = isVideoDocument(staticDocument.state.video)
    ? staticDocument.state.video.state.src
    : ''

  const hasVideo = videoSrc.length > 0

  return (
    <>
      {focused && (
        <InteractiveVideoToolbar
          {...props}
          hasVideo={hasVideo}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      )}
      {hasVideo ? (
        <EditMode
          previewActive={previewActive}
          {...props}
          videoSrc={videoSrc}
          staticMarks={staticMarks}
        />
      ) : (
        <SelectVideoMode videoId={state.video.id} staticVideoSrc={videoSrc} />
      )}
    </>
  )
}

import { useAppSelector, selectStaticDocument } from '@editor/store'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { isVideoDocument } from '@editor/types/plugin-type-guards'
import { useState } from 'react'

import { type InteractiveVideoProps } from '.'
import { EditMode } from './editor/edit-mode'
import { SelectVideoMode } from './editor/select-video-mode'
import { InteractiveVideoStaticRenderer } from './static'
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

  return (
    <>
      {focused && (
        <InteractiveVideoToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      )}
      {previewActive && videoSrc.length ? (
        <InteractiveVideoStaticRenderer {...staticDocument} />
      ) : videoSrc ? (
        <EditMode
          focused={focused}
          videoSrc={videoSrc}
          state={state}
          staticMarks={staticMarks}
        />
      ) : (
        <SelectVideoMode videoId={state.video.id} staticVideoSrc={videoSrc} />
      )}
    </>
  )
}

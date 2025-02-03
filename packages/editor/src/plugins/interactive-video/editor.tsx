import { isTempFile } from '@editor/plugin/upload'
import { useAppSelector, selectStaticDocument, focus } from '@editor/store'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { isVideoDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { type InteractiveVideoProps } from '.'
import { EditMode } from './editor/edit-mode'
import { InteractiveVideoToolbar } from './toolbar'
import { isValidVideoUrl } from '../video/utils/is-valid-video-url'

export function InteractiveVideoEditor(props: InteractiveVideoProps) {
  const { focused, state, id } = props
  const [previewActive, setPreviewActive] = useState(false)

  const mounted = useRef(false)
  const dispatch = useDispatch()

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorInteractiveVideoDocument
  )
  const staticMarks = staticDocument.state.marks

  const videoSrc = isVideoDocument(staticDocument.state.video)
    ? staticDocument.state.video.state.src
    : ''

  const hasVideo = !isTempFile(videoSrc) && isValidVideoUrl(videoSrc)

  // refocus after adding a video (but not on first mount)
  useEffect(() => {
    if (!mounted.current) {
      if (!hasVideo) mounted.current = true
      return
    }
    if (!hasVideo) return
    dispatch(focus(id))
  }, [hasVideo, dispatch, id])

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
        state.video.render()
      )}
    </>
  )
}

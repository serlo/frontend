import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { parseVideoUrl } from '@editor/plugins/video/renderer'
import { runChangeDocumentSaga } from '@editor/store'
import { cn } from '@editor/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

/**
 * input for video src, should use (`video.render()`) in the future
 * but for now UX is better this way
 */
export function SelectVideoMode({
  videoId,
  staticVideoSrc,
}: {
  videoId: string
  staticVideoSrc: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const pluginsStrings = useEditStrings().plugins
  const dispatch = useDispatch()
  const [videoSrc, setVideoSrc] = useState(staticVideoSrc)

  useEffect(() => {
    const [parsedUrl, type] = parseVideoUrl(videoSrc)
    if (type === undefined) return

    dispatch(
      runChangeDocumentSaga({
        id: videoId,
        state: { initial: (curr) => ({ ...(curr as object), src: parsedUrl }) },
      })
    )
  }, [videoSrc, videoId, dispatch])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="rounded-lg bg-editor-primary-50 py-32 text-center">
      <label>
        <span className="block pb-3 text-gray-500">
          {pluginsStrings.interactiveVideo.addVideo}:
        </span>
        <input
          ref={inputRef}
          value={videoSrc}
          onChange={(e) => setVideoSrc(e.target.value)}
          className={cn(`
            mx-auto w-80 rounded-xl border-2 border-editor-primary-100
            bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none
          `)}
          placeholder="https://youtube.com/watch?v=…"
        />
      </label>
    </div>
  )
}

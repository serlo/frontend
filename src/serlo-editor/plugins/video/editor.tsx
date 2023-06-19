import { VideoProps } from '.'
import { OverlayInput } from '../../core'
import { EditorInput } from '../../editor-ui'
import { VideoRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const VideoEditor = (props: VideoProps) => {
  const { editable, focused, state } = props

  const editorStrings = useEditorStrings()

  if (!editable) return <VideoRenderer {...props} />

  return (
    <>
      <VideoRenderer {...props} disableCursorEvents={editable} />
      {props.renderIntoSettings(
        <>
          <OverlayInput
            label={editorStrings.video.videoUrl}
            value={state.src.value}
            onChange={(e) => {
              state.src.set(e.target.value)
            }}
          />
          <OverlayInput
            label={editorStrings.video.description}
            value={state.alt.value}
            onChange={(e) => {
              state.alt.set(e.target.value)
            }}
          />
        </>
      )}
      {focused ? (
        <div className="mt-4">
          <EditorInput
            label={editorStrings.video.videoUrl}
            value={state.src.value}
            onChange={(e) => {
              state.src.set(e.target.value)
            }}
            width="80%"
            inputWidth="100%"
            ref={props.autofocusRef}
          />
        </div>
      ) : null}
    </>
  )
}

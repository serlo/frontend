import { VideoProps } from '.'
import { OverlayInput } from '../../core'
import { EditorInput, EditorInlineSettings } from '../../editor-ui'
import { VideoRenderer } from './renderer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const VideoEditor = (props: VideoProps) => {
  const { editable, focused, state } = props

  const editorStrings = useLoggedInData()!.strings.editor

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
        <EditorInlineSettings>
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
        </EditorInlineSettings>
      ) : null}
    </>
  )
}

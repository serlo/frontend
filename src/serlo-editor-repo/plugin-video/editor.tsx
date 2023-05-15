import { VideoProps } from '.'
import { OverlayInput } from '../core'
import { EditorInput, EditorInlineSettings } from '../editor-ui'
import { useVideoConfig } from './config'
import { VideoRenderer } from './renderer'

export const VideoEditor = (props: VideoProps) => {
  const { editable, focused, state } = props
  const config = useVideoConfig(props.config)

  if (!editable) return <VideoRenderer {...props} />

  return (
    <>
      <VideoRenderer {...props} disableCursorEvents={editable} />
      {props.renderIntoSettings(
        <>
          <OverlayInput
            label={config.i18n.src.label}
            value={state.src.value}
            onChange={(e) => {
              state.src.set(e.target.value)
            }}
          />
          <OverlayInput
            label={config.i18n.alt.label}
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
            label={config.i18n.src.label}
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

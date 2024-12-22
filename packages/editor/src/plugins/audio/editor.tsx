import type { AudioProps } from '.'
import { AudioRecorder } from './audio-recorder'
import { AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const source = state.source.value

  // Can this ever be false here? I doubt we add a preview to the audio plugin
  // toolbar, therefore I think we can safely remove this!
  const editable = true

  return (
    <>
      {focused && <AudioToolbar {...props} audioUrl={source as string} />}
      {source && !editable ? (
        <div>
          <AudioRenderer source={source} />
        </div>
      ) : (
        // In edit mode, we render the recorder which will also render the audio
        // player. Maybe we can find a better name for the component.
        <AudioRecorder
          source={source}
          setSource={(value) => state.source.set(value)}
        />
      )}
    </>
  )
}

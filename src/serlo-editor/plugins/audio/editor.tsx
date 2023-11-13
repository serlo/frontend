import type { AudioProps } from '.'
import { AudioRecorder } from './audio-recorder'
import { AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'
// import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state, editable } = props
  const source = state.source.value

  console.log('AudioEditor rendered with source value (should be a url)', {
    source,
  })
  // const audioStrings = useEditorStrings().plugins.audio

  return (
    <>
      {focused && <AudioToolbar {...props} audioUrl={source as string} />}
      {source && !editable ? (
        <div>
          <AudioRenderer source={source} />
        </div>
      ) : (
        // In edit mode, we render the recorder which will also render the audio
        // player
        <AudioRecorder
          source={source}
          setSource={(value) => state.source.set(value)}
        />
      )}
    </>
  )
}

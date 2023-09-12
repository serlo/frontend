import type { AudioProps } from '.'
import { AudioRecorder } from './audio-recorder'
import { AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'
// import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state, editable } = props
  const src = state.src.value

  console.log('AudioEditor rendered with src value (should be a url)', { src })
  // const audioStrings = useEditorStrings().plugins.audio

  return (
    <>
      {focused && <AudioToolbar {...props} audioUrl={src as string} />}
      {src && !editable ? (
        <div>
          <AudioRenderer src={src} />
        </div>
      ) : (
        // In edit mode, we render the recorder which will also render the audio
        // player
        <AudioRecorder
          base64AudioRecording=""
          setBase64AudioRecording={() => void undefined}
        />
      )}
    </>
  )
}

import { useRef, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record'

import { RecordingStatus } from './audio-recording-status'

// We could consolidate all the recording logic here and just use wavesurfer.
// For now, we are using the library just for visualization waves during
// recording and are handling the recording within the audio-recorder ourselves.
export const useAudioSurfer = ({ status }: { status: RecordingStatus }) => {
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!waveformRef.current) {
      return
    }

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#404040',
      progressColor: '#404040',
      height: 'auto',
    })

    const record = wavesurferRef.current?.registerPlugin(RecordPlugin.create())

    // start the visualization while recording!
    if (status === RecordingStatus.RECORDING) {
      record
        .startRecording()
        // eslint-disable-next-line no-console
        .catch((err) => void console.error('Error occurred', err))
    }

    return () => {
      record?.stopRecording()
      wavesurferRef?.current?.destroy()
    }
  }, [status])

  return waveformRef
}

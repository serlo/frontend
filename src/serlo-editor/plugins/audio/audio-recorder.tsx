import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useRef } from 'react'

import { AudioPlayer } from './audio-player'
import { RecordingStatus } from './audio-recording-status'
import { useAudioSurfer } from './audio-recording-visualization'
import { formatTime } from './format-time'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { FileState } from '@/serlo-editor/plugin/upload'

const getCurrentDateFormatted = (): string => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return `${dd}_${mm}_${yyyy}`
}

interface AudioRecorderProps {
  source: FileState<string>
  setSource: (value: FileState<string>) => void
}

export function AudioRecorder({ source, setSource }: AudioRecorderProps) {
  const [status, setStatus] = useState<RecordingStatus>(RecordingStatus.IDLE)

  // TODO get rid of this and just replace with source and setSource
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recordTime, setRecordTime] = useState(0)
  const audioStrings = useEditorStrings().plugins.audio
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const recordedChunks = useRef<BlobPart[]>([])

  const waveformRef = useAudioSurfer({ status })

  const canTrashAudio =
    status === RecordingStatus.UPLOADING || status === RecordingStatus.UPLOADED

  useEffect(() => {
    if (source) {
      setStatus(RecordingStatus.UPLOADED)
    }
  }, [source])

  useEffect(() => {
    if (status === RecordingStatus.RECORDING) {
      const timer = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(recordedChunks.current, {
          type: 'audio/wav',
        })
        // blobToBase64(audioBlob)

        const url = URL.createObjectURL(audioBlob)

        console.log('Audio url:', url)
        setAudioURL(url)
        setSource(url)
        setStatus(RecordingStatus.UPLOADED)
      }

      mediaRecorderRef.current.start()
      setStatus(RecordingStatus.RECORDING)
    } catch (err: unknown) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err.message)
        setError(err.message)
      } else {
        // eslint-disable-next-line no-console
        console.error(err)
        showToastNotice(audioStrings.unexpectedErrorWhileRecording, 'warning')
        setError(
          'Unexpected error while recording audio. Make sure you give Serlo permission to use your mic!'
        )
      }
    }
  }

  // const blobToBase64 = (blob: Blob) => {
  //   const reader = new FileReader()
  //   const loadEndHandler = function () {
  //     const base64data = reader.result
  //     setBase64AudioRecording(base64data as string)

  //     showToastNotice(audioStrings.recordingSuccessfullyUploaded, 'success')
  //     reader.removeEventListener('loadend', loadEndHandler)
  //   }
  //   reader.addEventListener('loadend', loadEndHandler)
  //   reader.readAsDataURL(blob)
  // }

  const deleteAudio = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null
    }

    recordedChunks.current = []
    if (audioURL) {
      URL.revokeObjectURL(audioURL)
    }

    setAudioURL(null)
    setRecordTime(0)
    setStatus(RecordingStatus.IDLE)
    // setBase64AudioRecording('')
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setStatus(RecordingStatus.UPLOADING)

      // should trigger mediaRecorderRef.current.onstop event handler which will
      // handle the upload
      mediaRecorderRef.current.stop()
    }
  }

  return (
    <>
      <div className="flex flex-row items-center rounded border border-editor-primary-500 bg-editor-primary-500">
        {status === RecordingStatus.UPLOADED && audioURL && (
          <AudioPlayer audioFile={audioURL} />
        )}

        {status === RecordingStatus.IDLE && (
          // Record button: small circle
          <button
            className="flex items-center rounded border border-editor-primary-400 bg-editor-primary-400 p-4 "
            onClick={startRecording}
          >
            <div className=" h-4 w-4 rounded-full bg-red-200"></div>
          </button>
        )}
        {status === RecordingStatus.RECORDING && (
          // Stop recording button: small square
          <>
            <button
              onClick={stopRecording}
              className="flex items-center rounded border border-editor-primary-400 bg-editor-primary-400 p-4 "
            >
              <div className="h-4 w-4 rounded border border-red-200 bg-red-200"></div>
            </button>
            {/* Renders wave as the user is speaking */}
            <div
              className="bg-grey-700 ml-4 max-h-[50px] w-full transition-all duration-200 ease-linear"
              ref={waveformRef}
            />
          </>
        )}

        {canTrashAudio ? (
          <button
            onClick={deleteAudio}
            className="serlo-button ml-4 ml-auto flex items-center rounded border border-editor-primary-400 bg-red-200 p-4 transition"
          >
            <FaIcon
              icon={faTrash}
              className="cursor-pointer text-base text-gray-700"
            />
          </button>
        ) : (
          <div className="ml-auto mr-8">
            <p className="text-bg-grey-700 ml-4">
              {/* When not recording, we want to yield --:-- instead of 00:00 */}
              {formatTime(recordTime, status !== RecordingStatus.RECORDING)}
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </>
  )
}

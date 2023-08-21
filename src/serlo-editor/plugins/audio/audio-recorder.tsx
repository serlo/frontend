import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

const getCurrentDateFormatted = (): string => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return `${dd}_${mm}_${yyyy}`
}

interface AudioRecorderProps {
  base64AudioRecording: string
  setBase64AudioRecording: (base64AudioRecording: string) => void
}

enum RecordingStatus {
  IDLE = 'idle',
  RECORDING = 'recording',
  UPLOADING = 'uploading',
  UPLOADED = 'uploaded',
}

export function AudioRecorder({
  setBase64AudioRecording,
  base64AudioRecording,
}: AudioRecorderProps) {
  const [status, setStatus] = useState<RecordingStatus>(RecordingStatus.IDLE)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recordTime, setRecordTime] = useState(0)
  const audioStrings = useEditorStrings().plugins.audio
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const recordedChunks: BlobPart[] = []
  const canTrashAudio =
    status === RecordingStatus.UPLOADING || status === RecordingStatus.UPLOADED

  useEffect(() => {
    if (base64AudioRecording) {
      setStatus(RecordingStatus.UPLOADED)
    }
  }, [base64AudioRecording])

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
          recordedChunks.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' })
        blobToBase64(audioBlob)

        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
        setStatus(RecordingStatus.UPLOADED)
      }

      mediaRecorderRef.current.start()
      setStatus(RecordingStatus.RECORDING)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message)
      } else {
        console.error(err)
        showToastNotice(audioStrings.unexpectedErrorWhileRecording, 'warning')
        setError(
          'Unexpected error while recording audio. Make sure you give Serlo permission to use your mic!'
        )
      }
    }
  }

  const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader()
    const loadEndHandler = function () {
      const base64data = reader.result
      setBase64AudioRecording(base64data as string)

      showToastNotice(audioStrings.recordingSuccessfullyUploaded, 'success')
      reader.removeEventListener('loadend', loadEndHandler)
    }
    reader.addEventListener('loadend', loadEndHandler)
    reader.readAsDataURL(blob)
  }

  const deleteAudio = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null
    }
    setAudioURL(null)
    setStatus(RecordingStatus.IDLE)
    setBase64AudioRecording('')
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
    <div className="flex flex-col items-center p-4">
      {status === RecordingStatus.RECORDING ? (
        <>
          <button
            onClick={stopRecording}
            className="serlo-button serlo-button-editor-secondary rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:cursor-default disabled:bg-gray-300"
          >
            Stop Recording
          </button>
          <div className="mt-2 text-gray-700">
            Recording: {recordTime} seconds
          </div>{' '}
        </>
      ) : (
        <div className="flex items-center p-4">
          <button
            disabled={status === RecordingStatus.UPLOADING}
            onClick={startRecording}
            className={`serlo-button rounded-lg ${
              canTrashAudio ? 'rounded-r-none' : ''
            } bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-default disabled:bg-gray-300`}
          >
            {status === RecordingStatus.UPLOADED
              ? 'Record again'
              : 'Start Recording'}
          </button>

          {canTrashAudio && (
            <button
              onClick={deleteAudio}
              className="serlo-button rounded rounded-l-none bg-red-300 p-2 transition"
            >
              <FaIcon icon={faTrash} className="cursor-pointer" />
            </button>
          )}
        </div>
      )}

      {audioURL && (
        <div className="mt-4">
          <a
            href={audioURL}
            download={`serlo_audio_${getCurrentDateFormatted()}.wav`}
            className="serlo-button-editor-secondary font-semibold text-blue-600 underline hover:text-blue-700"
          >
            Download recorded audio
          </a>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}

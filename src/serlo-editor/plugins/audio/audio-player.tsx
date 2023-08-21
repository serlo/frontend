import React, { useRef } from 'react'

type AudioUrl = string

type AudioData = Blob

interface AudioPlayerProps {
  audioFile: AudioData | AudioUrl
}

export function AudioPlayer({ audioFile }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // If the provided audioFile is a Blob, we need to create an object URL for
  // it. Otherwise, we can just use the URL directly.
  const audioURL =
    audioFile instanceof Blob ? URL.createObjectURL(audioFile) : audioFile

  return (
    <div className="mb-4 mt-4">
      <audio ref={audioRef} controls src={audioURL} className="w-full"></audio>
    </div>
  )
}

import React, { useState, useRef, useEffect } from 'react'

import { formatTime } from './format-time'

type AudioUrl = string
type AudioData = Blob

interface AudioPlayerProps {
  audioFile: AudioData | AudioUrl
}

export function AudioPlayer({ audioFile }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTimePlaying, setCurrentTimePlaying] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const audioURL =
    audioFile instanceof Blob ? URL.createObjectURL(audioFile) : audioFile

  useEffect(() => {
    const audioElement = audioRef.current

    if (!audioElement) {
      return
    }

    // const handleCanPlayThrough = () => {
    //   console.log('HandleCanPlayThrough called')
    //   setCorrectDuration()
    // }

    const handleMetadataLoad = () => {
      setCorrectDuration()
    }

    /**
     * Sometimes the duration of the audio is not defined yet and shows
     * Infinity. This seems to be a browser problem (see
     * https://bugs.chromium.org/p/chromium/issues/detail?id=642012). In those
     * cases (100% of the time in Chrome..), we need to skip to the end of the
     * audio file so that we can get an accurate duration.
     */
    const setCorrectDuration = () => {
      if (audioElement.duration === Infinity) {
        // Set the current time to the end of the audio file
        audioElement.currentTime = 1e101

        // On the next tick, set the current time back to 0 and update the duration
        setTimeout(() => {
          audioElement.currentTime = 0
          setDuration(audioElement.duration)
          // A timeout of one ms was actually not enough to make this work
        }, 100)
      } else {
        setDuration(audioElement.duration)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTimePlaying(audioElement.currentTime)
    }

    const handleDurationChange = () => {
      if (audioElement.duration === Infinity || isNaN(audioElement.duration)) {
        setDuration(0)
      } else {
        setDuration(audioElement.duration)
      }
    }

    audioElement.addEventListener('loadedmetadata', handleMetadataLoad)
    // Adding canplaythrough as a fallback to loadedmetadata which should
    // calculate the correct duration right after recording
    // audioElement.addEventListener('canplaythrough', handleCanPlayThrough)
    audioElement.addEventListener('durationchange', handleDurationChange)
    audioElement.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      console.log(
        'Cleanup of event handlers called. May want to clean up the old url too!'
      )
      audioElement.removeEventListener('loadedmetadata', handleMetadataLoad)
      // audioElement.removeEventListener('canplaythrough', handleCanPlayThrough)
      audioElement.removeEventListener('durationchange', handleDurationChange)
      audioElement.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    // Reset states when the audio file changes
    setDuration(0)
    setCurrentTimePlaying(0)

    setIsPlaying(false)

    // I think this is not needed as we should only be dealing
    // with urls now. Leaving it here for reference until having updated the
    // prop types. If it's a Blob object, we need to release the object URL created for the
    // previous Blob. We are now handling this when recording a new audio.
    // if (audioFile instanceof Blob && typeof audioURL === 'string') {
    //   URL.revokeObjectURL(audioURL)
    // }
  }, [audioFile])

  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return

    const handleAudioEnd = () => {
      // Once the audio has finished playing, we wait another 500ms and then
      // jump to the start. If we jump to the start immediately, the progress
      // bar may not have finished updating all the way to the end and it'll
      // look like there is a tiny bit of audio left to play.
      setTimeout(() => {
        setCurrentTimePlaying(0)
        setIsPlaying(false)
      }, 500)
    }

    audioElement.addEventListener('ended', handleAudioEnd)

    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current
        .play()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Playing audio!')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error occurred when trying to play audio', error)
        })
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex w-full items-center">
      <button
        onClick={togglePlay}
        className="border-editor-primary-400 bg-editor-primary-400 flex items-center rounded border p-4 "
      >
        {/* Pause button (2 vertical, parallel rectangles) */}
        {isPlaying ? (
          <div className="flex space-x-1">
            <div className="h-4 w-2 bg-gray-700"></div>
            <div className="h-4 w-2 bg-gray-700"></div>
          </div>
        ) : (
          // Play button (triangle with the tip pointing to the right)
          <div
            className="h-4 w-4 bg-gray-700"
            style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}
          />
        )}
      </button>
      <div className="bg-editor-primary-500 relative mr-2 flex h-12 w-full items-center rounded-r-lg px-2">
        <audio ref={audioRef} src={audioURL} className="w-full" />
        <div className="relative w-full px-2">
          {/* Background track */}
          <div className="absolute h-1 w-full bg-gray-300"></div>
          {/* Progress indicator */}
          <div
            className="absolute h-1 bg-gray-700"
            style={{ width: `${(currentTimePlaying / duration) * 100}%` }}
          />
          {/* Draggable thumb. TODO Should make this interactive */}
          <div
            className="absolute h-3 w-3 -translate-y-1/3 transform rounded-full bg-gray-700"
            style={{
              left: `${(currentTimePlaying / duration) * 100}%`,
            }}
          />
          {/* Time indicators */}
          <div className="absolute -bottom-6 left-0 text-xs">
            {formatTime(Math.round(currentTimePlaying))}
          </div>
          <div className="absolute -bottom-6 right-0 text-xs">
            {!Number.isNaN(duration) &&
              duration !== Infinity &&
              formatTime(Math.round(duration), false)}
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  faXmark,
  faMicrophone,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { AudioProps } from '.'
import { AudioRecorder } from './audio-recorder'
import { parseAudioUrl, AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const [showRecorder, setShowRecorder] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [srcOrBase64, type] = parseAudioUrl(
    state.src.value || state.base64AudioRecording.value
  )
  const couldBeValid = type !== undefined

  return (
    <>
      {focused && (
        <AudioToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {couldBeValid && (
        <div>
          <AudioRenderer srcOrBase64={srcOrBase64} type={type} />
        </div>
      )}

      <div className="pb-8 pt-8">
        {showRecorder ? (
          <div className="relative">
            <AudioRecorder
              base64AudioRecording={state.base64AudioRecording.value}
              setBase64AudioRecording={(base64AudioRecording: string) => {
                // as there can only be a src/url or recording, we are resetting
                // the url
                state.src.set('')
                state.base64AudioRecording.set(base64AudioRecording)
              }}
            />
            <button
              onClick={() => setShowRecorder(false)}
              className="serlo-button absolute right-1 top-1 text-sm font-bold text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
              aria-label="Close audio recorder"
              data-qa="plugin-audio-close-recorder"
            >
              <FaIcon icon={faXmark} />
            </button>
          </div>
        ) : (
          <>
            {focused && (
              <div className="flex justify-around space-x-4">
                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => setShowSettingsModal(true)}
                >
                  <FaIcon icon={faLink} className="text-2xl" />
                  <span className="mt-2">Enter audio URL</span>
                </div>
                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => setShowRecorder(true)}
                >
                  <FaIcon icon={faMicrophone} className="text-2xl" />
                  <span className="mt-2">Record audio</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

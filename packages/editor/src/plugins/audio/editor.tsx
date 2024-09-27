import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { useState } from 'react'

import type { AudioProps } from '.'
import { parseAudioUrl, AudioRenderer } from './renderer'
import { ShowAudioSettingsButton } from './show-audio-settings-button'
import { AudioToolbar } from './toolbar'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [src, type] = parseAudioUrl(state.src.value)
  const couldBeValid = type !== undefined
  const audioStrings = useEditStrings().plugins.audio

  return (
    <>
      {focused && (
        <AudioToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {couldBeValid ? (
        <div>
          <AudioRenderer src={src} type={type} />
        </div>
      ) : (
        <div className="pb-8 pt-8">
          <ShowAudioSettingsButton
            openSettings={() => setShowSettingsModal(true)}
          >
            {audioStrings.audioUrl}
          </ShowAudioSettingsButton>
        </div>
      )}
    </>
  )
}

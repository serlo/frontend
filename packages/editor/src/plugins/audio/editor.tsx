import { useState } from 'react'

import type { AudioProps } from '.'
import { parseAudioUrl, AudioRenderer } from './renderer'
import { ShowAudioSettingsButton } from './show-audio-settings-button'
import { AudioToolbar } from './toolbar'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [src, type] = parseAudioUrl(state.src.value)
  const couldBeValid = type !== undefined
  const audioStrings = useEditorStrings().plugins.audio

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

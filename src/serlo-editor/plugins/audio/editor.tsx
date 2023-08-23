import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { AudioProps } from '.'
import { parseAudioUrl, AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [src, type] = parseAudioUrl(state.src.value)
  const couldBeValid = type !== undefined
  // i18n string
  const { audioUrl } = useEditorStrings().plugins.audio

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
            {audioUrl}
          </ShowAudioSettingsButton>
        </div>
      )}
    </>
  )
}

interface ShowAudioSettingsButtonProps {
  openSettings: () => void
  children: JSX.Element | string
}

export function ShowAudioSettingsButton({
  openSettings,
  children,
}: ShowAudioSettingsButtonProps) {
  return (
    <div className="flex justify-around space-x-4">
      <button
        className="flex cursor-pointer flex-col items-center border-none bg-transparent p-0"
        onClick={openSettings}
      >
        <FaIcon icon={faLink} className="text-2xl" />
        <span className="mt-2">{children}</span>
      </button>
    </div>
  )
}

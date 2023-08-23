import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { AudioProps } from '.'
import { parseAudioUrl, AudioRenderer } from './renderer'
import { AudioToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'

export const AudioEditor = (props: AudioProps) => {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [src, type] = parseAudioUrl(state.src.value)
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
      {couldBeValid ? (
        <div>
          <AudioRenderer src={src} type={type} />
        </div>
      ) : (
        <div className="pb-8 pt-8">
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
              </div>
            )}
          </>
        </div>
      )}
    </>
  )
}

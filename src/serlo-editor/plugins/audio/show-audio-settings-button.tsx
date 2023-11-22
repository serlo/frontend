import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/serlo-editor'

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

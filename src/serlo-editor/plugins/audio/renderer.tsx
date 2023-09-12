import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { AudioPlayer } from './audio-player'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { FileState } from '@/serlo-editor/plugin/upload'

interface AudioRendererProps {
  src: string | File | FileState<Blob>
}

export function AudioRenderer({ src }: AudioRendererProps) {
  const { strings } = useInstanceData()

  if (!src) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {strings.content.loadingAudioFailed}
        </p>
      </div>
    )
  }

  return <AudioPlayer audioFile={src as Blob} />
}

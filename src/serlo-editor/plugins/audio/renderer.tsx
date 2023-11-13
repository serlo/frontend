import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { AudioPlayer } from './audio-player'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { FileState } from '@/serlo-editor/plugin/upload'

interface AudioRendererProps {
  source: string | File | FileState<Blob>
}

export function AudioRenderer({ source }: AudioRendererProps) {
  const { strings } = useInstanceData()

  if (!source) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">
          {strings.content.loadingAudioFailed}
        </p>
      </div>
    )
  }

  return <AudioPlayer audioFile={source as Blob} />
}

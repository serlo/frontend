import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

import { AudioPlayer } from './audio-player'
import { FaIcon } from '../../editor-ui/fa-icon'
import { FileState } from '../../plugin/upload'

interface AudioRendererProps {
  source: string | File | FileState<Blob>
}

export function AudioRenderer({ source }: AudioRendererProps) {
  const { failed: failedString } = useStaticStrings().plugins.audio

  // I guess we can render null here too if the source is missing! This is more
  // in line how we treat empty image plugins.
  if (!source) {
    return (
      <div className="mx-side text-center print:hidden">
        <FaIcon icon={faFilm} className="h-16" />
        <p className="serlo-p text-almost-black">{failedString}</p>
      </div>
    )
  }

  return <AudioPlayer audioFile={source as Blob} />
}

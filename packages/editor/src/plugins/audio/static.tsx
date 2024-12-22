import { EditorAudioDocument } from '@editor/types/editor-plugins'

import { AudioRenderer } from './renderer'

export function AudioStaticRenderer({ state }: EditorAudioDocument) {
  return <AudioRenderer source={state.source} />
}

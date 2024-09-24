import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'

import { InteractiveVideoRenderer } from './renderer'

export function InteractiveVideoStaticRenderer({
  state,
}: EditorInteractiveVideoDocument) {
  return <InteractiveVideoRenderer chapterContent={{}} />
}

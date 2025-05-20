import { EditorInjectionDocument } from '@editor/types/editor-plugins'

import { SerloInjectionRenderer } from './renderer'

export function SerloInjectionStaticRenderer(props: EditorInjectionDocument) {
  return <SerloInjectionRenderer contentId={props.state} />
}

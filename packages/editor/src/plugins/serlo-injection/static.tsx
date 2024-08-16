import { EditorInjectionDocument } from '@editor/types/editor-plugins'

import { SerloInjectionRenderer } from './renderer'

export function SerloInjectionStaticRenderer(props: EditorInjectionDocument) {
  const contentId = props.state

  return <SerloInjectionRenderer contentId={contentId} />
}

import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorTemplateGenericContentDocument } from '@editor/types/editor-plugins'

import { GenericContentTypeRenderer } from './renderer'

export function GenericContentTypeStaticRenderer({
  state,
}: EditorTemplateGenericContentDocument) {
  return (
    <GenericContentTypeRenderer
      content={<StaticRenderer document={state.content} />}
    />
  )
}

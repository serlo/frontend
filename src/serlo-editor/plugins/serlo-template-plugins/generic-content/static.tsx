import { GenericContentTypeRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorTemplateGenericContentDocument } from '@/serlo-editor/types/editor-plugins'

export function GenericContentTypeStaticRenderer({
  state,
}: EditorTemplateGenericContentDocument) {
  return (
    <GenericContentTypeRenderer
      content={<StaticRenderer document={state.content} />}
    />
  )
}

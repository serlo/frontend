import { H5pRenderer } from './renderer'
import { EditorH5PPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function H5pStaticRenderer({ state: url }: EditorH5PPlugin) {
  return (
    <H5pRenderer
      url={url}
      // TODO: pass ids from frontend
      context={{ entityId: -1, revisionId: -1 }}
    />
  )
}

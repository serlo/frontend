import { H5pRenderer } from './renderer'
import { EditorH5PDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function H5pStaticRenderer({ state: url }: EditorH5PDocument) {
  return <H5pRenderer url={url} />
}

import { EditorH5PDocument } from '.'
import { H5pRenderer } from './renderer'

export function H5pStaticRenderer({ state: url }: EditorH5PDocument) {
  return <H5pRenderer url={url} />
}

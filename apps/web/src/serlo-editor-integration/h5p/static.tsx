import { EditorH5PDocument } from '@editor/types/editor-plugins'

import { H5pRenderer } from './renderer.jsx'

export function H5pStaticRenderer({ state: url }: EditorH5PDocument) {
  return <H5pRenderer url={url} />
}

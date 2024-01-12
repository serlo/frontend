import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorRootWithOptionalsDocument } from '@editor/types/editor-plugins'

import { RootWithOptionalsRenderer } from './renderer'

export function RootWithOptionalsStaticRenderer({
  state,
}: EditorRootWithOptionalsDocument) {
  return (
    <RootWithOptionalsRenderer
      content={<StaticRenderer document={state.content} />}
    />
  )
}

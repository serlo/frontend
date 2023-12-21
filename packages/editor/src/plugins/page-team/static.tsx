import type { EditorPageTeamDocument } from '@editor/types/editor-plugins'

import { PageTeamRenderer } from './renderer'

export function PageTeamStaticRenderer({ state }: EditorPageTeamDocument) {
  return <PageTeamRenderer data={state.data} />
}

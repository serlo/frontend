import { PageTeamRenderer } from './renderer'
import type { EditorPageTeamDocument } from '@/serlo-editor/types/editor-plugins'

export function PageTeamStaticRenderer({ state }: EditorPageTeamDocument) {
  return <PageTeamRenderer data={state.data} />
}

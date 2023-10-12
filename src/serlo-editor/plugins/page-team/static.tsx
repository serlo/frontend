import { PageTeamRenderer } from './renderer'
import type { EditorPageTeamDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function PageTeamStaticRenderer({ state }: EditorPageTeamDocument) {
  return <PageTeamRenderer data={state.data} />
}

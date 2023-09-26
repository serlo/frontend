import { PageTeamRenderer } from './renderer'
import { EditorPageTeamPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function PageTeamStaticRenderer({ state }: EditorPageTeamPlugin) {
  return <PageTeamRenderer data={state.data} />
}

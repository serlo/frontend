import { PageTeamRenderer } from './renderer'
import type { FrontendPageTeamNode } from '@/frontend-node-types'

export function PageTeamAdapter({ data }: FrontendPageTeamNode) {
  return <PageTeamRenderer data={data} />
}

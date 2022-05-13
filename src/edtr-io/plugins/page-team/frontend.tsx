import { PageTeamRenderer } from './renderer'
import type { FrontendPageTeamNode } from '@/data-types'

export function PageTeamAdapter({ data }: FrontendPageTeamNode) {
  return <PageTeamRenderer data={data} />
}

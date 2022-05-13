import { PageTeamRenderer } from './renderer'
import type { FrontendPageTeamNode } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export function PageTeamAdapter({
  data,
}: FrontendPageTeamNode & {
  renderNested: RenderNestedFunction
}) {
  return <PageTeamRenderer data={data} />
}

import { PageSpecialContentRenderer } from './renderer'
import type { FrontendPageSpecialContentNode } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export function PageSpecialContentAdapter({
  type,
  data,
}: FrontendPageSpecialContentNode & {
  renderNested: RenderNestedFunction
}) {
  return <PageSpecialContentRenderer type={type} data={data} />
}

import { PageLayoutRenderer } from './renderer'
import type { FrontendPageLayoutNode } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export function PageLayoutAdapter({
  column1,
  column2,
  widthPercent,
  renderNested,
}: FrontendPageLayoutNode & {
  renderNested: RenderNestedFunction
}) {
  return (
    <PageLayoutRenderer
      widthPercent={widthPercent}
      column1={<>{renderNested(column1, 'pageLayoutColumn')}</>}
      column2={<>{renderNested(column2, 'pageLayoutColumn')}</>}
    />
  )
}

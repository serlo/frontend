import { FrontendBoxNode } from '@/frontend-node-types'
import { RenderNestedFunction } from '@/schema/article-renderer'
import { BoxRenderer } from '@/serlo-editor/plugins/box/renderer'

type BoxProps = FrontendBoxNode & { renderNested: RenderNestedFunction }

export function Box({
  boxType,
  title,
  anchorId,
  children,
  renderNested,
}: BoxProps) {
  if (!children || !children.length || !boxType) return null

  const content = renderNested(children, 'children')
  const unwrappedTitle = title?.[0].children

  return (
    <BoxRenderer
      boxType={boxType}
      title={
        unwrappedTitle ? (
          <b>{renderNested(unwrappedTitle, 'title')}</b>
        ) : undefined
      }
      anchorId={anchorId}
    >
      <>{content}</>
    </BoxRenderer>
  )
}

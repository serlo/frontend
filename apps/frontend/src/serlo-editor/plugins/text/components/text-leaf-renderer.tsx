import { ReactNode, CSSProperties } from 'react'
import { RenderLeafProps } from 'slate-react'

import { textColors } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/const'

export interface TextLeafRendererProps {
  children: ReactNode
  leaf: RenderLeafProps['text']
  text?: RenderLeafProps['text']
  attributes?: { 'data-slate-leaf': true }
}

export function TextLeafRenderer({
  attributes,
  leaf,
  children,
}: TextLeafRendererProps) {
  const colors = textColors.map(({ value }) => value)
  const styles: CSSProperties = {}

  if (leaf.color !== undefined) styles.color = colors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'
  const styleCount = Object.keys(styles).length

  const LeafTag = leaf.strong
    ? 'b'
    : leaf.em
    ? 'i'
    : leaf.code
    ? 'code'
    : 'span'

  if (styleCount === 0 && LeafTag === 'span') return <>{children}</>

  const outputExtraStyles = styleCount > 1 || LeafTag === 'span'

  return (
    <LeafTag
      style={outputExtraStyles ? styles : {}}
      {...attributes}
      className={
        leaf.code
          ? 'rounded-sm bg-brand-100 p-1 text-base text-brand'
          : undefined
      }
    >
      {children}
    </LeafTag>
  )
}

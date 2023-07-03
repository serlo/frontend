import CSS from 'csstype'
import { ReactNode } from 'react-markdown'
import { RenderLeafProps } from 'slate-react'

import { textColors } from '../hooks/use-text-config'
import { TextEditorConfig, TextEditorState } from '../types'
import { EditorPluginProps } from '@/serlo-editor/plugin'

export type TextEditorProps = EditorPluginProps<
  TextEditorState,
  TextEditorConfig
>

export interface TextLeafRendererProps {
  children: any
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
  const leafChildren = children as ReactNode

  const styles: CSS.Properties = {}

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

  if (styleCount === 0 && LeafTag === 'span') return <>{leafChildren}</>

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
      {leafChildren}
    </LeafTag>
  )
}

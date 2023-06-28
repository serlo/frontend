import CSS from 'csstype'
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

export function TextLeafRenderer(props: TextLeafRendererProps) {
  const colors = textColors.map(({ value }) => value)
  const { attributes, leaf } = props
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { children } = props

  const styles: CSS.Properties = {}

  if (leaf.code) {
    return (
      <code className="rounded-sm bg-brand-100 p-1 text-base text-brand">
        {children}
      </code>
    )
  }

  if (leaf.color) styles.color = colors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'

  if (Object.keys(styles).length === 0) return <>{children}</>

  const LeafTag = leaf.strong ? 'b' : leaf.em ? 'i' : 'span'
  const outputStyles = !(Object.keys(styles).length === 1 && LeafTag !== 'span')

  return (
    <LeafTag style={outputStyles ? styles : {}} {...attributes}>
      {children}
    </LeafTag>
  )

  // if (leaf.strong) {
  //   children = <strong>{children}</strong>
  // }

  // if (typeof leaf.color === 'number' && Array.isArray(colors)) {
  //   children = (
  //     <span style={{ color: colors?.[leaf.color % colors.length] }}>
  //       {children}
  //     </span>
  //   )
  // }

  // if (leaf.code) {
  //   children = <code>{children}</code>
  // }
  // if (leaf.em) {
  //   children = <em>{children}</em>
  // }
  // return <span {...attributes}>{children}</span>
}

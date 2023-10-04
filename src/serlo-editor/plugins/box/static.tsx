import { Element } from 'slate'

import { isEmptyRowsPlugin } from '../rows/utils/static-is-empty'
import { StaticSlate } from '../text/static-slate'
import { BoxRenderer, BoxType } from '@/serlo-editor/plugins/box/renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorBoxPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: check if we still need this:
// get rid of wrapping p and inline math in title
// const convertedTitle = convert(
//   node.state.title as SupportedEditorPlugin
// )[0] as FrontendTextNode | FrontendMathNode | undefined
// const title = convertedTitle
//   ? ((convertedTitle.type === FrontendNodeType.Math
//     ? [{ ...convertedTitle, type: FrontendNodeType.InlineMath }]
//     : convertedTitle.children) as unknown as FrontendContentNode[])
//   : ([{ type: FrontendNodeType.Text, text: '' }] as FrontendTextNode[])

export function BoxStaticRenderer({ state }: EditorBoxPlugin) {
  const { type: boxType, title, anchorId, content } = state
  if (!content || !boxType || isEmptyRowsPlugin(content)) return null

  // get rid of wrapping p
  const unwrappedTitle = (title.state as Element[])?.[0].children[0]

  const boldTitle = unwrappedTitle ? (
    <b>
      <StaticSlate element={unwrappedTitle} />
    </b>
  ) : undefined

  return (
    <BoxRenderer
      boxType={boxType as BoxType}
      title={boldTitle}
      anchorId={anchorId}
    >
      <StaticRenderer state={content} />
    </BoxRenderer>
  )
}

import { Element } from 'slate'

import { StaticSlate } from '../text/static-slate'
import { BoxRenderer, BoxType } from '@/serlo-editor/plugins/box/renderer'
import {
  AnyEditorPlugin,
  StaticRenderer,
} from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorBoxPlugin,
  EditorRowsPlugin,
  EditorTextPlugin,
  SupportedEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

//compat

// TODO: return null if content is empty

// TODO: check math / inline math in title
// honestly I'm not sure what this does
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
  if (!content || !boxType) return null

  console.log(content)

  isEmptyRowsPlugin(content)

  // get rid of wrapping p
  const unwrappedTitle = (title.state as Element[])[0].children[0]

  return (
    <BoxRenderer
      boxType={boxType as BoxType}
      title={
        unwrappedTitle ? (
          <b>
            <StaticSlate element={unwrappedTitle} />
          </b>
        ) : undefined
      }
      anchorId={anchorId}
    >
      <StaticRenderer state={content} />
    </BoxRenderer>
  )
}

function isEmptyRowsPlugin(content: AnyEditorPlugin) {
  const stringified = JSON.stringify(content)
  console.log(stringified)

  if (stringified.length > 300) return false

  const regex = new RegExp('"text":".+"', 'g')

  const hasText = regex.test(stringified)

  console.log(hasText)
  // if (stringified.includes('"text":""') && )
  //   const test = '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"8b219220-b7b1-44e3-98a9-f63b68ab77d6"}],"id":"0b903c04-830d-4633-ab90-b87653757ad9"}
  // '
}

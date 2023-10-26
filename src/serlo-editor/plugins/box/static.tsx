import { Element } from 'slate'

import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'
import { StaticSlate } from '../text/static-components/static-slate'
import { BoxRenderer, BoxType } from '@/serlo-editor/plugins/box/renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorBoxDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function BoxStaticRenderer({ state }: EditorBoxDocument) {
  const { type: boxType, title, anchorId, content } = state
  if (!content || !boxType || isEmptyRowsDocument(content)) return null

  // get rid of wrapping p
  const unwrappedTitle = (title.state as Element[])?.[0].children

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
      <StaticRenderer document={content} />
    </BoxRenderer>
  )
}

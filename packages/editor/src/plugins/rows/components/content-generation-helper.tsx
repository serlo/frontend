import { extractTextAndLatexFromAnyDocument } from '@editor/plugins/text/utils/static-extract-text'
import { DocumentState, store } from '@editor/store'
import { getStaticDocument } from '@editor/store/documents/helpers'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

// TODO move this file into an appropriate folder once we have one for the
// content generation

export function getBeforeAndAfterText({
  insertionIndex,
  id,
}: {
  insertionIndex: number | undefined
  id: string
}) {
  const document = getStaticDocument({
    id,
    documents: store.getState().documents,
  }) as { plugin: EditorPluginType.Rows; state: DocumentState[] }

  const beforeDocument = {
    plugin: EditorPluginType.Rows,
    state: document.state.slice(0, insertionIndex),
  }

  const afterDocument = {
    plugin: EditorPluginType.Rows,
    state: document.state.slice(insertionIndex),
  }

  const beforeText = extractTextAndLatexFromAnyDocument(beforeDocument)

  const afterText = extractTextAndLatexFromAnyDocument(afterDocument)

  return { before: beforeText, after: afterText }
}

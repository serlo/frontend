import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'

export function EditorRenderer({
  document,
}: {
  document: unknown
}): JSX.Element {
  return (
    <SerloOnlyFeaturesContext.Provider value={{ isSerlo: true }}>
      <div className="serlo-content-with-spacing-fixes">
        <StaticRenderer document={document as AnyEditorDocument} />
      </div>
    </SerloOnlyFeaturesContext.Provider>
  )
}

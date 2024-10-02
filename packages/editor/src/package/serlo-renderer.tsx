import { createRenderers } from '@editor/editor-integration/create-renderers'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { StaticStringsProvider } from '@editor/i18n/static-strings-provider'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { LtikContext } from '@editor/plugins/edusharing-asset/ltik-context'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { SupportedLanguage } from '@editor/types/language-data'

import { defaultSerloEditorProps } from './config'
import { editorData } from './editor-data'
import { migrate, EditorVariant } from './storage-format'

export interface SerloRendererProps {
  language?: SupportedLanguage
  state: unknown
  _ltik?: string
  editorVariant: EditorVariant
}

export function SerloRenderer(props: SerloRendererProps) {
  const { language, _ltik, state, editorVariant } = {
    ...defaultSerloEditorProps,
    ...props,
  }

  // Side note: Migrated state will not be persisted since we cannot save in
  // static renderer view
  const { migratedState } = migrate(state, editorVariant)

  // if we load the editStrings here as well, we might as well merge them
  const { staticStrings, editStrings } = editorData[language]

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <StaticStringsProvider value={staticStrings}>
      <EditStringsProvider value={editStrings}>
        <LtikContext.Provider value={_ltik}>
          <div className="serlo-editor-hacks">
            <StaticRenderer document={migratedState.document} />
          </div>
        </LtikContext.Provider>
      </EditStringsProvider>
    </StaticStringsProvider>
  )
}

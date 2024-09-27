import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { LtikContext } from '@editor/plugins/edusharing-asset/ltik-context'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { SupportedLanguage } from '@editor/types/language-data'
import { InstanceDataProvider } from '@serlo/frontend/src/contexts/instance-context'
import { LoggedInDataProvider } from '@serlo/frontend/src/contexts/logged-in-data-context'

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

  const { instanceData, loggedInData } = editorData[language]

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <LtikContext.Provider value={_ltik}>
          <div className="serlo-editor-hacks">
            <StaticRenderer document={migratedState.document} />
          </div>
        </LtikContext.Provider>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

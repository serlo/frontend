import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { SupportedLanguage } from '@editor/types/language-data'

import { defaultSerloEditorProps } from './config'
import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { LtikContext } from '@editor/plugins/edusharing-asset/static'

export interface SerloRendererProps {
  language?: SupportedLanguage
  document?: AnyEditorDocument | AnyEditorDocument[]
  _ltik?: string
}

export function SerloRenderer(props: SerloRendererProps) {
  const { language, _ltik } = {
    ...defaultSerloEditorProps,
    ...props,
  }

  const { instanceData, loggedInData } = editorData[language]

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        {/* TODO: Find solution to get ltik into static renderer without context */}
        <LtikContext.Provider value={_ltik}>
          <div className="serlo-editor-hacks">
            <StaticRenderer {...props} />
          </div>
        </LtikContext.Provider>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

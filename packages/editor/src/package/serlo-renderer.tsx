import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { SupportedLanguage } from '@editor/types/language-data'
import { mergeDeepRight } from 'ramda'

import {
  type PluginsConfig,
  defaultSerloEditorProps,
  type CustomPlugin,
} from './config'
import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { LtikContext } from '@editor/plugins/edusharing-asset/static'

export interface SerloRendererProps {
  customPlugins?: CustomPlugin[]
  language?: SupportedLanguage
  document?: AnyEditorDocument | AnyEditorDocument[]
  pluginsConfig?: PluginsConfig
}

export function SerloRenderer(props: SerloRendererProps) {
  const { customPlugins, language, pluginsConfig } = mergeDeepRight(
    defaultSerloEditorProps,
    props
  )

  const { instanceData, loggedInData } = editorData[language]

  const basicRenderers = createRenderers(customPlugins)
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        {/* TODO: Find solution to get ltik into static renderer without context */}
        <LtikContext.Provider value={pluginsConfig?.edusharingAsset?.ltik}>
          <div className="serlo-editor-hacks">
            <StaticRenderer {...props} />
          </div>
        </LtikContext.Provider>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

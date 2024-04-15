import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { SupportedLanguage } from '@editor/types/language-data'

import {
  type PluginsConfig,
  defaultPluginsConfig,
  defaultSerloEditorProps,
} from './config'
import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

export interface SerloRendererProps {
  pluginsConfig?: PluginsConfig
  language?: SupportedLanguage
  document?: AnyEditorDocument | AnyEditorDocument[]
}

export function SerloRenderer(props: SerloRendererProps) {
  const { pluginsConfig, language } = { ...defaultSerloEditorProps, ...props }
  const { customPlugins } = { ...defaultPluginsConfig, ...pluginsConfig }

  const { instanceData, loggedInData } = editorData[language]

  const basicRenderers = createRenderers(customPlugins)
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks">
          <StaticRenderer {...props} />
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

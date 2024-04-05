import { Editor, type EditorProps } from '@editor/core'
import {
  type CreateBasicPluginsConfig,
  createBasicPlugins,
  defaultPluginConfig,
} from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import {
  editorPlugins,
  type PluginWithData,
} from '@editor/plugin/helpers/editor-plugins'
import {
  editorRenderers,
  type PluginStaticRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

// Custom plugins and renderers are an Edusharing specific feature,
// and will not be supported in the future
export interface PluginsConfig {
  basicPluginsConfig?: CreateBasicPluginsConfig
  customPlugins?: Array<PluginWithData & PluginStaticRenderer>
}

export interface SerloEditorProps {
  children: EditorProps['children']
  pluginsConfig?: PluginsConfig
  initialState?: EditorProps['initialState']
  language?: SupportedLanguage
}

const emptyState = {
  plugin: EditorPluginType.Rows,
  state: [
    {
      plugin: EditorPluginType.Text,
      state: [],
    },
  ],
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const { children, pluginsConfig, initialState, language = 'de' } = props
  const { basicPluginsConfig, customPlugins = [] } = pluginsConfig || {
    basicPluginsConfig: defaultPluginConfig,
  }
  const { instanceData, loggedInData } = editorData[language]

  const basicPlugins = createBasicPlugins(basicPluginsConfig)
  editorPlugins.init([...basicPlugins, ...customPlugins])

  const basicRenderers = createRenderers(customPlugins)
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks">
          <Editor initialState={initialState ?? emptyState}>{children}</Editor>
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

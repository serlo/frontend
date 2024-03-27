import { Editor, type EditorProps } from '@editor/core'
import {
  type CreateBasicPluginsConfig,
  createBasicPlugins,
} from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import {
  type PluginsWithData,
  editorPlugins,
} from '@editor/plugin/helpers/editor-plugins'
import {
  type InitRenderersArgs,
  editorRenderers,
} from '@editor/plugin/helpers/editor-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  initialState?: EditorProps['initialState']
  basicPluginsConfig: CreateBasicPluginsConfig
  // Custom plugins are an Edusharing specific feature, and will not be supported in the future
  customPlugins: PluginsWithData
  // Custom renderers are an Edusharing specific feature, and will not be supported in the future
  customRenderers: Partial<
    Pick<InitRenderersArgs, 'mathRenderer' | 'linkRenderer'>
  >
  // Custom plugins renderers are an Edusharing specific feature, and will not be supported in the future
  customPluginsRenderers: InitRenderersArgs['pluginRenderers']
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
export function SerloEditor({
  children,
  initialState,
  basicPluginsConfig,
  customPlugins,
  customRenderers,
  customPluginsRenderers,
  language = 'de',
}: SerloEditorProps) {
  const { instanceData, loggedInData } = editorData[language]

  const basicPlugins = createBasicPlugins(basicPluginsConfig)
  editorPlugins.init([...basicPlugins, ...customPlugins])

  const basicRenderers = createRenderers(customPluginsRenderers)
  editorRenderers.init({ ...basicRenderers, ...customRenderers })

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

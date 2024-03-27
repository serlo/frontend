import { Editor, type EditorProps } from '@editor/core'
import {
  type CreateBasicPluginsConfig,
  createBasicPlugins,
} from '@editor/editor-integration/create-basic-plugins'
import {
  type PluginsWithData,
  editorPlugins,
} from '@editor/plugin/helpers/editor-plugins'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import { editorData } from './editor-data'
import { EditorPluginType } from '../types/editor-plugin-type'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  initialState?: EditorProps['initialState']
  basicPluginsConfig: CreateBasicPluginsConfig
  customPlugins: PluginsWithData
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
  language = 'de',
}: SerloEditorProps) {
  const { instanceData, loggedInData } = editorData[language]

  const basicPlugins = createBasicPlugins(basicPluginsConfig)
  editorPlugins.init([...basicPlugins, ...customPlugins])

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

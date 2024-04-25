import { Editor, type EditorProps } from '@editor/core'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import {
  type PluginsConfig,
  defaultSerloEditorProps,
  type CustomPlugin,
} from './config.js'
import { editorData } from './editor-data.js'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  pluginsConfig?: PluginsConfig
  customPlugins?: CustomPlugin[]
  initialState?: EditorProps['initialState']
  onChange?: EditorProps['onChange']
  language?: SupportedLanguage
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const { children, customPlugins, initialState, onChange, language } = {
    ...defaultSerloEditorProps,
    ...props,
  }
  const pluginsConfig = {
    ...defaultSerloEditorProps.pluginsConfig,
    ...props.pluginsConfig,
  }

  const { instanceData, loggedInData } = editorData[language]

  const basicPlugins = createBasicPlugins(pluginsConfig)
  editorPlugins.init([...basicPlugins, ...customPlugins])

  const basicRenderers = createRenderers(customPlugins)
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks">
          <Editor initialState={initialState} onChange={onChange}>
            {children}
          </Editor>
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

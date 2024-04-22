import { Editor, type EditorProps } from '@editor/core'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import {
  defaultPluginsConfig,
  defaultBasicPluginConfig,
  type PluginsConfig,
  defaultSerloEditorProps,
} from './config.js'
import { editorData } from './editor-data.js'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  children: EditorProps['children']
  pluginsConfig?: PluginsConfig
  initialState?: EditorProps['initialState']
  onChange?: EditorProps['onChange']
  language?: SupportedLanguage
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const { children, pluginsConfig, initialState, language, onChange } = {
    ...defaultSerloEditorProps,
    ...props,
  }
  const { basicPluginsConfig, customPlugins } = {
    ...defaultPluginsConfig,
    ...pluginsConfig,
  }
  const {
    allowedChildPlugins,
    allowImageInTableCells,
    enableTextAreaExercise,
    exerciseVisibleInSuggestion,
    multimediaConfig,
  } = {
    ...defaultBasicPluginConfig,
    ...basicPluginsConfig,
  }

  const { instanceData, loggedInData } = editorData[language]

  const basicPlugins = createBasicPlugins({
    allowedChildPlugins,
    allowImageInTableCells,
    enableTextAreaExercise,
    exerciseVisibleInSuggestion,
    language,
    multimediaConfig,
  })
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

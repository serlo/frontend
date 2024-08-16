import { Editor, type EditorProps } from '@editor/core'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { SupportedLanguage } from '@editor/types/language-data'
import { TemplatePluginType } from '@editor/types/template-plugin-type.js'
import { LtikContext } from '@editor/plugins/edusharing-asset/static.jsx'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import '@/assets-webkit/styles/serlo-tailwind.css'
import React from 'react'

import { defaultSerloEditorProps } from './config.js'
import { editorData } from './editor-data.js'
import { EditorPluginType } from './index.js'

export interface SerloEditorProps {
  children: EditorProps['children']
  plugins?: (EditorPluginType | TemplatePluginType)[]
  initialState?: EditorProps['initialState']
  onChange?: EditorProps['onChange']
  language?: SupportedLanguage
  _testingSecret?: string
  _ltik?: string
}

/** For exporting the editor */
export function SerloEditor(props: SerloEditorProps) {
  const {
    children,
    initialState,
    onChange,
    language,
    plugins,
    _testingSecret,
    _ltik,
  } = {
    ...defaultSerloEditorProps,
    ...props,
  }

  const { instanceData, loggedInData } = editorData[language]

  const allPlugins = createBasicPlugins(plugins, _testingSecret)
  editorPlugins.init(allPlugins)

  const basicRenderers = createRenderers()
  editorRenderers.init(basicRenderers)

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        {/* TODO: Find solution to get ltik into static renderer without context */}
        <LtikContext.Provider value={_ltik}>
          <div className="serlo-editor-hacks">
            <Editor initialState={initialState} onChange={onChange}>
              {children}
            </Editor>
          </div>
        </LtikContext.Provider>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

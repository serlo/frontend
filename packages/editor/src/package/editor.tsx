import { Editor, type EditorProps } from '@editor/core'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { createRenderers } from '@editor/editor-integration/create-renderers'
import ImageIcon from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { createImagePlugin } from '@editor/plugins/image'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
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
  _enableImagePlugin?: boolean // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
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
  let allPlugins = [...basicPlugins, ...customPlugins]
  // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
  if (props._enableImagePlugin) {
    const imagePluginNoFileUpload = createImagePlugin({
      disableFileUpload: true,
      upload: (_) => {
        return new Promise<string>((resolve, _) => {
          resolve('')
        })
      },
      validate: (_) => {
        return { valid: false, errors: [] }
      },
    })
    allPlugins = [
      ...allPlugins,
      {
        type: 'image',
        plugin: imagePluginNoFileUpload,
        renderer: ImageStaticRenderer,
        visibleInSuggestions: true,
        icon: <ImageIcon />,
      },
    ]
  }
  editorPlugins.init(allPlugins)

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

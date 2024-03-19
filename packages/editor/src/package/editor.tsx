import { Editor, type EditorProps } from '@editor/core'
import { SupportedLanguage } from '@editor/types/language-data'
import React from 'react'

import { editorData } from './editor-data'
import { EditorPluginType } from '../types/editor-plugin-type'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

import '@/assets-webkit/styles/serlo-tailwind.css'

export interface SerloEditorProps {
  language?: SupportedLanguage
  initialState?: EditorProps['initialState']
  children: EditorProps['children']
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
  language = 'de',
  initialState,
  ...props
}: SerloEditorProps) {
  const { instanceData, loggedInData } = editorData[language]

  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks">
          <Editor initialState={initialState ?? emptyState} {...props} />
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

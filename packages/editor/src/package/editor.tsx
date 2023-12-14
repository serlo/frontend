import { Editor, type EditorProps } from '@editor/core'
import React from 'react'

import { EditorPluginType } from '../types/editor-plugin-type'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import type { InstanceData, LoggedInData } from '@/data-types'

export interface SerloEditorProps {
  instanceData: InstanceData
  loggedInData: LoggedInData
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
  instanceData,
  loggedInData,
  initialState,
  ...props
}: SerloEditorProps) {
  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks mb-24 max-w-[816px] px-2">
          <Editor initialState={initialState ?? emptyState} {...props} />
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

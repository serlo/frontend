import React from 'react'

import { EditorPluginType } from '../types/editor-plugin-type'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import type { InstanceData, LoggedInData } from '@/data-types'
import { Editor, type EditorProps } from '@/serlo-editor/core'

export interface SerloEditorProps {
  instanceData: InstanceData
  loggedInData: LoggedInData
  initialState?: EditorProps['initialState']
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
}: SerloEditorProps) {
  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks mb-24 max-w-[816px] px-2">
          <Editor initialState={initialState ?? emptyState} />
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}

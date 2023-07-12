import { ReactElement } from 'react'

import { PluginToolbarDropdownMenu } from './plugin-toolbar-dropdown-menu'
import { selectDocument, selectParent, store } from '@/serlo-editor/store'

// TODO: use enum from https://github.com/serlo/frontend/pull/2564 when that is merged
export enum PluginType {
  TEXT = 'Text',
}

interface PluginToolbarProps {
  pluginId: string
  pluginType: PluginType
  contentControls: ReactElement
  pluginControls: ReactElement
}

export function PluginToolbar({
  pluginId,
  pluginType,
  contentControls,
  pluginControls,
}: PluginToolbarProps) {
  const state = store.getState()
  const parent = selectParent(state, pluginId)
  const parentType = parent ? selectDocument(state, parent.id)?.plugin : null

  return (
    <div className="absolute -top-8 left-0 right-0 z-50 flex h-8 w-full items-center justify-between bg-editor-primary-100">
      {/* Content controls */}
      <div>{contentControls}</div>

      <div className="flex flex-grow items-center justify-end">
        {/* Plugin type indicator */}
        <div className="mx-4 text-sm font-bold">{pluginType}</div>

        {/* Separator */}
        <div className="h-6 w-[2px] bg-gray-300"></div>

        {/* Plugin controls dropdown menu */}
        <PluginToolbarDropdownMenu pluginControls={pluginControls} />
      </div>

      {/* Plugin ancestry indicator */}
      <div className="absolute -top-6 right-0 h-6 rounded-t-md bg-gray-200 px-2 pt-0.5 text-sm font-bold capitalize">
        {parentType}
      </div>
    </div>
  )
}

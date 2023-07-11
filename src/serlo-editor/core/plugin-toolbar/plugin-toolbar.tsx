import { ReactElement } from 'react'

import { PluginToolbarDropdownMenu } from './plugin-toolbar-dropdown-menu'

export enum PluginType {
  TEXT = 'Text',
}

interface PluginToolbarProps {
  pluginType: PluginType
  contentControls: ReactElement
  pluginControls: ReactElement
}

export function PluginToolbar({
  pluginType,
  contentControls,
  pluginControls,
}: PluginToolbarProps) {
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
      <div className="absolute -top-5 right-0 h-5 bg-editor-primary-100 px-1 text-sm">
        Parent plugin type
      </div>
    </div>
  )
}

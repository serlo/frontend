import { ReactElement } from 'react'

import { PluginToolMenu } from './plugin-tool-menu/plugin-tool-menu'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { getPluginTitle } from '@/serlo-editor/plugin/helpers/get-plugin-title'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

interface PluginToolbarProps {
  pluginType: EditorPluginType | string
  contentControls?: ReactElement
  pluginSettings?: ReactElement
  pluginControls?: ReactElement
  className?: string
}

export function PluginToolbar({
  pluginType,
  contentControls,
  pluginSettings,
  pluginControls,
  className,
}: PluginToolbarProps) {
  const pluginStrings = useEditorStrings().plugins

  return (
    <div
      className={cn(
        `
        plugin-toolbar absolute -top-[2.6rem] left-[5px] right-0 z-[21] flex
        h-9 items-center justify-between rounded-t-lg bg-editor-primary-100 pl-2
        before:pointer-events-none before:absolute before:-top-7
        before:left-0 before:block before:h-7 before:w-full
        before:bg-gradient-to-t before:from-[rgba(255,255,255,0.95)] before:via-[rgba(255,255,255,0.7)] before:to-transparent
      `,
        className
      )}
    >
      {/* Content controls */}
      <div>
        {contentControls}
        <div className="toolbar-controls-target inline-block" />
      </div>

      <div className="flex flex-grow items-center justify-end">
        {/* Plugin type indicator */}
        <div className="mx-4 text-sm font-bold">
          {getPluginTitle(pluginStrings, pluginType)}
        </div>

        {pluginSettings ? (
          <>
            {/* Separator */}
            <div className="mr-2 h-6 w-[2px] bg-gray-300"></div>
            {pluginSettings}
          </>
        ) : null}

        {pluginControls ? (
          <>
            {/* Separator */}
            <div className="h-6 w-[2px] bg-gray-300"></div>
            {/* Plugin controls dropdown menu */}
            <PluginToolMenu pluginControls={pluginControls} />
          </>
        ) : null}
      </div>
    </div>
  )
}

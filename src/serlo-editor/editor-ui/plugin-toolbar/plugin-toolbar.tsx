import clsx from 'clsx'
import { ReactElement } from 'react'

import { PluginToolMenu } from './plugin-tool-menu/plugin-tool-menu'
import { tw } from '@/helper/tw'
// import { selectAncestorPluginTypes, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface PluginToolbarProps {
  pluginId: string
  pluginType: EditorPluginType | string
  contentControls?: ReactElement
  pluginSettings?: ReactElement
  pluginControls?: ReactElement
  className?: string
}

export function PluginToolbar({
  // pluginId,
  pluginType,
  contentControls,
  pluginSettings,
  pluginControls,
  className,
}: PluginToolbarProps) {
  return (
    <div
      className={clsx(
        tw`
        plugin-toolbar absolute -top-[2.6rem] left-0 right-0 z-20 flex h-9 w-full
        items-center justify-between rounded-t-lg bg-editor-primary-100
        before:pointer-events-none before:absolute before:-top-7
        before:block before:h-7 before:w-full
        before:bg-gradient-to-t before:from-[rgba(255,255,255,0.95)] before:via-[rgba(255,255,255,0.7)] before:to-transparent
      `,
        className
      )}
    >
      {/* Content controls */}
      <div>
        <div className="toolbar-controls-target" />
        {contentControls}
      </div>

      <div className="flex flex-grow items-center justify-end">
        {/* Plugin type indicator */}
        <div className="mx-4 text-sm font-bold capitalize">{pluginType}</div>

        {pluginSettings ? (
          <>
            {/* Separator */}
            <div className="mr-2 h-6 w-[2px] bg-gray-300"></div>
            {pluginSettings}
          </>
        ) : null}

        {/* Separator */}
        <div className="h-6 w-[2px] bg-gray-300"></div>

        {/* Plugin controls dropdown menu */}
        {pluginControls ? (
          <PluginToolMenu pluginControls={pluginControls} />
        ) : null}
      </div>
    </div>
  )
}

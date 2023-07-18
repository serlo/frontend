import { ReactElement, useMemo } from 'react'

import { PluginToolbarDropdownMenu } from './plugin-toolbar-dropdown-menu'
import { tw } from '@/helper/tw'
import { selectAncestorPluginTypes, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface PluginToolbarProps {
  pluginId: string
  pluginType: EditorPluginType | string
  contentControls?: ReactElement | null
  pluginSettings?: ReactElement
  pluginControls: ReactElement
}

const ancestorsToDisplay = [
  EditorPluginType.Box,
  EditorPluginType.Spoiler,
  EditorPluginType.Table,
  EditorPluginType.Multimedia,
]

export function PluginToolbar({
  pluginId,
  pluginType,
  contentControls,
  pluginSettings,
  pluginControls,
}: PluginToolbarProps) {
  const pluginTypesOfAncestors = useAppSelector((state) =>
    selectAncestorPluginTypes(state, pluginId)
  )
  const parentType = useMemo(() => {
    // If there are no ancestors, don't display the indicator
    if (!pluginTypesOfAncestors) return null

    // Starting from the end, check the ancestors list for
    // a displayable ancestor, and if found, display it
    for (let i = pluginTypesOfAncestors.length - 1; i >= 0; i--) {
      const currentAncestor = pluginTypesOfAncestors[i] as EditorPluginType
      if (ancestorsToDisplay.includes(currentAncestor)) return currentAncestor
    }

    // If no ancestor to display has been found, don't display the indicator
    return null
  }, [pluginTypesOfAncestors])

  return (
    <div
      className={tw`
        absolute -top-10 left-0 right-0 z-50 flex h-9 w-full
        items-center justify-between rounded-tl-md bg-editor-primary-100 pl-2
      `}
    >
      {/* Content controls */}
      <div>{contentControls}</div>

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
        <PluginToolbarDropdownMenu pluginControls={pluginControls} />
      </div>

      {/* Plugin ancestry indicator */}
      {parentType && (
        <div
          className={tw`
            absolute -top-6 right-0 h-6 rounded-t-md bg-gray-200 px-2 pt-0.5
            text-sm font-bold capitalize
          `}
        >
          {parentType}
        </div>
      )}
    </div>
  )
}

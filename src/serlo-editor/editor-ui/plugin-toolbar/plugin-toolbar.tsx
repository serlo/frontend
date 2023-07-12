import { ReactNode } from 'react'

import { PluginToolbarDropdownMenu } from './dropdown-menu'
import { tw } from '@/helper/tw'
import {
  selectAncestorPluginTypes,
  selectDocument,
  store,
  useAppSelector,
} from '@/serlo-editor/store'

interface PluginToolbarProps {
  pluginId: string
  //   contentControls: ReactElement
  //   pluginControls: ReactElement
  settings: ReactNode
}

export function PluginToolbar({
  pluginId,
  settings,
}: //   contentControls,
//   pluginControls,
PluginToolbarProps) {
  const pluginType = selectDocument(store.getState(), pluginId)?.plugin

  const ancestorTypes = useAppSelector((state) =>
    selectAncestorPluginTypes(state, pluginId)
  )

  if (!ancestorTypes) return null
  // TODO: use enum from https://github.com/serlo/frontend/pull/2564 when that is merged
  const displayAnsestorTypes = ancestorTypes.filter(
    (ancestor) =>
      !(ancestor.startsWith('type-') || ['rows', 'article'].includes(ancestor))
  )

  const displayParentType =
    displayAnsestorTypes.length > 0
      ? displayAnsestorTypes[displayAnsestorTypes.length - 1]
      : null

  return (
    <div
      className={tw`
        absolute -top-10 left-0 right-0 z-50 flex h-9 w-full
        items-center justify-between rounded-tl-md bg-editor-primary-100 pl-2
    `}
    >
      {/* Content controls */}
      {/* <div>{contentControls}</div> */}

      <div className="flex flex-grow items-center justify-end">
        {/* Plugin type indicator */}
        <div className="mx-4 text-sm font-bold capitalize">{pluginType}</div>

        {/* Separator */}
        <div className="h-6 w-[2px] bg-gray-300"></div>

        {/* Plugin controls dropdown menu */}
        <PluginToolbarDropdownMenu
          pluginId={pluginId}
          pluginControls={settings}
        />
      </div>
      {/* Plugin ancestry indicator */}
      {displayParentType ? (
        <div className="absolute -top-6 right-0 h-6 rounded-t-md bg-gray-200 px-2 pt-0.5 text-sm font-bold capitalize">
          {displayParentType}
        </div>
      ) : null}
    </div>
  )
}

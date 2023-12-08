import { getPluginTitle } from '@editor/plugin/helpers/get-plugin-title'
import {
  selectDocument,
  selectStaticDocument,
  store,
  useAppSelector,
} from '@editor/store'
import { Dispatch, SetStateAction } from 'react'

import type { MultimediaProps } from '..'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

interface MultimediaTypeSelectProps {
  allowedPlugins: MultimediaProps['config']['allowedPlugins']
  state: MultimediaProps['state']['multimedia']
  stateCache: Record<string, unknown>
  setStateCache: Dispatch<SetStateAction<Record<string, unknown>>>
}

export const MultimediaTypeSelect = ({
  allowedPlugins,
  state,
  stateCache,
  setStateCache,
}: MultimediaTypeSelectProps) => {
  const pluginStrings = useEditorStrings().plugins
  const currentPluginType = useAppSelector((storeState) =>
    selectDocument(storeState, state.id)
  )?.plugin

  return (
    <div className="mb-8 mt-3">
      <strong>{pluginStrings.multimedia.changeType}</strong>
      <span className="mr-4">:</span>
      <select
        value={currentPluginType ?? allowedPlugins[0]}
        onChange={(e) => handlePluginTypeChange(e.target.value)}
        className={cn(`
          mr-2 cursor-pointer rounded-md !border border-gray-500
        bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
        hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
        `)}
        data-qa="plugin-multimedia-type-select"
      >
        {allowedPlugins.map((type) => (
          <option key={type} value={type}>
            {getPluginTitle(pluginStrings, type)}
          </option>
        ))}
      </select>
    </div>
  )

  function handlePluginTypeChange(newPluginType: string) {
    // store old multimedia state before replacing
    setStateCache((current) => {
      const oldStaticDocument = selectStaticDocument(store.getState(), state.id)
      return oldStaticDocument
        ? {
            ...current,
            [oldStaticDocument.plugin]: oldStaticDocument.state as unknown,
          }
        : current
    })

    // replace with new type and undefined or stored state
    state.replace(newPluginType, stateCache[newPluginType])
  }
}

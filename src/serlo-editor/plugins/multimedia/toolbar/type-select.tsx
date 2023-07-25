import { useState } from 'react'

import { MultimediaProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { getPluginTitle } from '@/serlo-editor/plugin/helpers/get-plugin-title'
import {
  selectDocument,
  selectSerializedDocument,
  store,
  useAppSelector,
} from '@/serlo-editor/store'

interface MultimediaTypeSelectProps {
  allowedPlugins: MultimediaProps['config']['allowedPlugins']
  state: MultimediaProps['state']['multimedia']
}

export const MultimediaTypeSelect = ({
  allowedPlugins,
  state,
}: MultimediaTypeSelectProps) => {
  const [stateCache, setStateCache] = useState<Record<string, unknown>>({})
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
        className={tw`
          mr-2 cursor-pointer rounded-md !border border-gray-500
        bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
        hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
        `}
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
      const oldDocumentSerialized = selectSerializedDocument(
        store.getState(),
        state.id
      )
      return oldDocumentSerialized
        ? {
            ...current,
            [oldDocumentSerialized.plugin]:
              oldDocumentSerialized.state as unknown,
          }
        : current
    })

    // replace with new type and undefined or stored state
    state.replace(newPluginType, stateCache[newPluginType])
  }
}

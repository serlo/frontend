import { useState } from 'react'

import type { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { getStyleHacks } from './style-hacks'
import { MultimediaSizeSelect } from './toolbar/size-select'
import { MultimediaToolbar } from './toolbar/toolbar'
import { MultimediaTypeSelect } from './toolbar/type-select'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { AreImagesDisabledInTableContext } from '@/serlo-editor/plugins/serlo-table/contexts/are-images-disabled-in-table-context'
import {
  selectAncestorPluginTypes,
  selectHasFocusedDescendant,
  selectIsFocused,
  useAppSelector,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function MultimediaEditor(props: MultimediaProps) {
  const [stateCache, setStateCache] = useState<Record<string, unknown>>({})
  const { config, state, editable, focused } = props
  const { explanation, multimedia, width } = state

  const multimediaStrings = useEditorStrings().plugins.multimedia

  const isMediaChildFocused = useAppSelector((state) =>
    selectIsFocused(state, multimedia.id)
  )
  const isMediaChildFocusedWithin = useAppSelector((state) =>
    selectHasFocusedDescendant(state, multimedia.id)
  )

  // inside of box plugin don't allow video and geogebra as multimedia children
  const typesOfAncestors = useAppSelector((state) =>
    selectAncestorPluginTypes(state, props.id)
  )
  const hasBoxAnchestor = typesOfAncestors?.includes(EditorPluginType.Box)
  const filteredPlugins = hasBoxAnchestor
    ? config.allowedPlugins.filter(
        (plugin) =>
          ![EditorPluginType.Video, EditorPluginType.Geogebra].includes(
            plugin as EditorPluginType
          )
      )
    : config.allowedPlugins

  const pluginToolbarAndStyleHacks = getStyleHacks(
    focused,
    isMediaChildFocused,
    isMediaChildFocusedWithin
  )

  return (
    <div className="group/multimedia" data-qa="plugin-multimedia-wrapper">
      {editable && focused ? (
        <MultimediaToolbar id={props.id}>
          <MultimediaSizeSelect
            state={state.width}
            title={multimediaStrings.chooseSize}
          />
          {filteredPlugins.length > 1 && (
            <MultimediaTypeSelect
              allowedPlugins={filteredPlugins}
              state={state.multimedia}
              stateCache={stateCache}
              setStateCache={setStateCache}
            />
          )}
        </MultimediaToolbar>
      ) : null}
      {editable && !focused ? (
        <button
          className={tw`
            absolute right-side top-[-56px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/multimedia:block
          `}
          data-qa="plugin-multimedia-parent-button"
        >
          {multimediaStrings.title}
        </button>
      ) : null}
      <div className={pluginToolbarAndStyleHacks}>
        <AreImagesDisabledInTableContext.Provider value>
          <MultimediaRenderer
            media={<>{multimedia.render()}</>}
            explanation={<>{explanation.render()}</>}
            mediaWidth={width.value}
          />
        </AreImagesDisabledInTableContext.Provider>
      </div>
    </div>
  )
}

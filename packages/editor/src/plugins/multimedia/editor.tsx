import { AreImagesDisabledInTableContext } from '@editor/plugins/serlo-table/contexts/are-images-disabled-in-table-context'
import {
  selectAncestorPluginTypes,
  selectIsFocused,
  selectStaticDocument,
  store,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorImageDocument } from '@editor/types/editor-plugins'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/tailwind/helper/cn'
import { useMemo, useState } from 'react'

import type { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { getStyleHacks } from './style-hacks'
import { MultimediaSizeSelect } from './toolbar/size-select'
import { MultimediaToolbar } from './toolbar/toolbar'
import { MultimediaTypeSelect } from './toolbar/type-select'

export function MultimediaEditor(props: MultimediaProps) {
  const [stateCache, setStateCache] = useState<Record<string, unknown>>({})
  const { config, state, focused } = props
  const { explanation, multimedia, width } = state

  const multimediaStrings = useEditorStrings().plugins.multimedia

  const isMediaChildFocused = useAppSelector((storeState) =>
    selectIsFocused(storeState, multimedia.id)
  )

  const isMediaChildFocusedWithin = useAppSelector((storeState) => {
    const staticDocument = selectStaticDocument(storeState, state.multimedia.id)
    const mediaFocused = selectIsFocused(storeState, state.multimedia.id)
    if (staticDocument.plugin !== EditorPluginType.Image) return mediaFocused
    const captionId = (staticDocument as EditorImageDocument).state.caption?.id
    const captionFocused = captionId
      ? selectIsFocused(storeState, captionId)
      : false
    return mediaFocused || captionFocused
  })

  // we memoize this so we don't need to calculate the ancestors on every render
  // the values should only be calculated when we create it or move the plugin (and that also triggers a remount)
  const allowedPlugins = useMemo(() => {
    // inside of box plugin don't allow video and geogebra as multimedia children
    const typesOfAncestors = selectAncestorPluginTypes(
      store.getState(),
      props.id
    )
    const forbiddenInBox = [EditorPluginType.Video, EditorPluginType.Geogebra]
    const hasBoxAnchestor = typesOfAncestors?.includes(EditorPluginType.Box)
    return hasBoxAnchestor
      ? config.allowedPlugins.filter(
          (plugin) => !forbiddenInBox.includes(plugin as EditorPluginType)
        )
      : config.allowedPlugins
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pluginToolbarAndStyleHacks = getStyleHacks(
    focused,
    isMediaChildFocused,
    isMediaChildFocusedWithin
  )

  return (
    <div className="group/multimedia" data-qa="plugin-multimedia-wrapper">
      {focused ? (
        <MultimediaToolbar id={props.id}>
          <MultimediaSizeSelect
            state={state.width}
            title={multimediaStrings.chooseSize}
          />
          {allowedPlugins.length > 1 && (
            <MultimediaTypeSelect
              allowedPlugins={allowedPlugins}
              state={state.multimedia}
              stateCache={stateCache}
              setStateCache={setStateCache}
            />
          )}
        </MultimediaToolbar>
      ) : (
        <button
          className={cn(`
            absolute right-0 top-[-65px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/multimedia:block
          `)}
          data-qa="plugin-multimedia-parent-button"
        >
          {multimediaStrings.title}
        </button>
      )}
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

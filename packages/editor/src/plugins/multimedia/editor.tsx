import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import {
  selectAncestorPluginTypes,
  selectIsFocused,
  selectStaticDocument,
  useStore,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorImageDocument } from '@editor/types/editor-plugins'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { cn } from '@editor/utils/cn'
import { useMemo, useState } from 'react'

import type { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { getStyleHacks } from './style-hacks'
import { MultimediaSizeSelect } from './toolbar/size-select'
import { MultimediaToolbar } from './toolbar/toolbar'
import { MultimediaTypeSelect } from './toolbar/type-select'

export function MultimediaEditor(props: MultimediaProps) {
  const [stateCache, setStateCache] = useState<Record<string, unknown>>({})
  const { state, focused } = props
  const { explanation, multimedia, width } = state
  const store = useStore()

  const { lang, plugins: pluginsStrings } = useEditStrings()
  const multimediaStrings = pluginsStrings.multimedia

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
  const { hasBoxAncestor, isArticleIntroduction, contentConfig } =
    useMemo(() => {
      // inside of box plugin don't allow video and geogebra as multimedia children
      const typesOfAncestors = selectAncestorPluginTypes(
        store.getState(),
        props.id
      )
      const hasBoxAncestor = typesOfAncestors?.includes(EditorPluginType.Box)

      const isArticleIntroduction =
        typesOfAncestors?.length === 2 &&
        typesOfAncestors[0] === TemplatePluginType.Article &&
        typesOfAncestors[1] === EditorPluginType.Article

      const contentConfig = isArticleIntroduction
        ? {
            placeholder:
              lang === 'de'
                ? 'Fasse das Thema des Artikels kurz zusammen'
                : 'Write a short introduction',
          }
        : {}
      return { hasBoxAncestor, isArticleIntroduction, contentConfig }
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
          {/* overlay content */}
          <MultimediaSizeSelect
            state={state.width}
            title={multimediaStrings.chooseSize}
          />
          {isArticleIntroduction ? null : (
            <MultimediaTypeSelect
              hasBoxAncestor={hasBoxAncestor}
              state={state.multimedia}
              stateCache={stateCache}
              setStateCache={setStateCache}
            />
          )}
        </MultimediaToolbar>
      ) : (
        <button
          className={cn(`
            absolute right-0 top-[-64px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/multimedia:block
          `)}
          data-qa="plugin-multimedia-parent-button"
        >
          {multimediaStrings.title}
        </button>
      )}
      <div className={pluginToolbarAndStyleHacks}>
        <MultimediaRenderer
          media={multimedia.render()}
          explanation={explanation.render({ config: contentConfig })}
          mediaWidth={width.value}
        />
      </div>
    </div>
  )
}

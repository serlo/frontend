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
  selectHasFocusedDescendant,
  selectIsFocused,
  useAppSelector,
} from '@/serlo-editor/store'

export function MultimediaEditor(props: MultimediaProps) {
  const { config, state, editable, focused } = props
  const { explanation, multimedia, width } = state

  const multimediaStrings = useEditorStrings().plugins.multimedia

  const isMediaChildFocused = useAppSelector((state) =>
    selectIsFocused(state, multimedia.id)
  )
  const isMediaChildFocusedWithin = useAppSelector((state) =>
    selectHasFocusedDescendant(state, multimedia.id)
  )

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
          {config.allowedPlugins.length > 1 && (
            <MultimediaTypeSelect
              allowedPlugins={config.allowedPlugins}
              state={state.multimedia}
            />
          )}
        </MultimediaToolbar>
      ) : null}
      {editable && !focused ? (
        <button
          className={tw`
            absolute right-side top-[-59px] z-50 hidden h-6 rounded-t-md bg-gray-100
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

import clsx from 'clsx'

import { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { MultimediaSizeSelect } from './toolbar/size-select'
import { MultimediaToolbar } from './toolbar/toolbar'
import { MultimediaTypeSelect } from './toolbar/type-select'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { AreImagesDisabledInTableContext } from '@/serlo-editor/plugins/serlo-table/contexts/are-images-disabled-in-table-context'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

export function MultimediaEditor(props: MultimediaProps) {
  const { id, config, state, domFocusWithin, containerRef } = props
  const { explanation, multimedia, width } = state

  // TODO: make work with domFocus instead
  const focused = useAppSelector((state) => selectIsFocused(state, id))

  const multimediaStrings = useEditorStrings().plugins.multimedia

  const pluginToolbarAndStyleHacks = clsx(
    domFocusWithin &&
      '[&>div]:border-editor-primary-100 [&>div]:rounded-t-none',

    // fix add button position
    '[&_.add-trigger]:relative [&_.add-trigger]:-left-1/4',

    // Improve toolbars for multimedia children.
    // hacky but this way the complexity is contained in the parent plugin

    '[&_.explanation-wrapper]:mt-4',
    '[&_.media-wrapper]:mt-4',

    '[&_.explanation-wrapper_.plugin-toolbar]:ml-[1px]',

    // make media-child's toolbar full width of multimedia plugin
    // also media-wrapper needs to be relative to be clickable (is float:right)
    // but needs to be static to not restrict toolbar width
    domFocusWithin &&
      '[&_.media-wrapper_.plugin-wrapper-container]:!static [&_.media-wrapper]:!static',

    // margin and size improvement
    tw`
    [&_.media-wrapper_.plugin-toolbar]:!left-auto [&_.media-wrapper_.plugin-toolbar]:!top-0
    [&_.media-wrapper_.plugin-toolbar]:mx-side [&_.media-wrapper_.plugin-toolbar]:w-[calc(100%-37px)]
    `,

    // first explanation toolbar: small position tweak
    tw`
    [&_.explanation-wrapper_.rows-child.first_.plugin-toolbar]:!-top-[44px]
    [&_.explanation-wrapper_.rows-child.first_.plugin-toolbar]:w-[calc(100%+2px)]
    `,

    // in case there is no rows plugin (article introduction)
    tw`
    [&_.explanation-wrapper>div>div>.plugin-wrapper-container_.plugin-toolbar]:!-top-[35px]
    [&_.explanation-wrapper>div>div>.plugin-wrapper-container_.plugin-toolbar]:w-[calc(100%+2px)]
    `
  )

  return (
    <div className="group/multimedia">
      {focused ? (
        <MultimediaToolbar id={props.id} containerRef={containerRef}>
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
      ) : (
        <button
          className={tw`
            absolute -top-6 right-8 z-50 hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/multimedia:block
          `}
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

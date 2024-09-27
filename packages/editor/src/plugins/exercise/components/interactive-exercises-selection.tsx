import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import {
  getPluginMenuItems,
  type PluginMenuItem,
} from '@editor/package/plugin-menu'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { isExerciseDocument } from '@editor/types/plugin-type-guards'
import { useMemo } from 'react'

import { type ExerciseProps } from '..'
import { type InteractivePluginType } from '../interactive-plugin-types'

export function InteractiveExercisesSelection({
  interactive,
}: {
  interactive: ExerciseProps['state']['interactive']
}) {
  const editorStrings = useEditStrings()
  const exStrings = editorStrings.plugins.exercise

  // Initial state of interactive plugin menu items are wrapped with an exercise plugin
  // but for this component we need the interactive plugin directly
  // so we just unwrap them here:
  const unwrappedMenuItems = useMemo<PluginMenuItem[]>(() => {
    return getPluginMenuItems(editorStrings)
      .map((menuItem) => {
        if (!isExerciseDocument(menuItem.initialState)) return false
        const interactive = menuItem.initialState.state.interactive
        if (!interactive || !editorPlugins.isSupported(interactive.plugin)) {
          return false
        }
        const pluginMenuItem = {
          ...menuItem,
          initialState: interactive,
        }
        return pluginMenuItem
      })
      .filter(Boolean) as unknown as PluginMenuItem[]
  }, [editorStrings])

  function getTooltipClass(index: number) {
    const isLastInLine = index % 4 === 3
    const isFirstInLine = index % 4 === 0
    return isFirstInLine ? 'left-0' : isLastInLine ? 'right-0' : '-left-24'
  }

  function handleOnClick(initialState: PluginMenuItem['initialState']) {
    if (interactive.defined) return

    interactive.create({
      plugin: initialState.plugin as InteractivePluginType,
      state: initialState.state,
    })
  }

  return (
    <>
      <p className="mb-2 text-gray-400">{exStrings.addOptionalInteractiveEx}</p>
      <div className="grid grid-cols-4 items-start gap-2 pb-10">
        {unwrappedMenuItems.map(
          ({ type, title, icon, description, initialState }, index) => (
            <button
              key={type}
              data-qa={`add-exercise-${initialState.plugin}`}
              onClick={() => handleOnClick(initialState)}
              className="serlo-tooltip-trigger w-32 rounded-md p-1 hover:shadow-xl focus:shadow-xl"
            >
              <EditorTooltip
                className={getTooltipClass(index)}
                text={description}
              />
              {typeof icon !== 'string' ? icon() : <IconFallback />}
              <b className="mt-2 block text-sm">{title}</b>
            </button>
          )
        )}
      </div>
    </>
  )
}

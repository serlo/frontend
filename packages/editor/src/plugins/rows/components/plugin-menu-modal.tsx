import { EditorInput } from '@editor/editor-ui/editor-input'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '@editor/plugins/rows/contexts/plugin-menu'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import { selectAncestorPluginTypes, store } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorStrings,
  useEditorStrings,
} from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Key } from 'ts-key-enum'

import { PluginMenuItem } from './plugin-menu-item'
import type { PluginMenuItemType } from '../contexts/plugin-menu/types'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

interface PluginMenuModalProps {
  onInsertPlugin: (pluginType: EditorPluginType) => void
}

export function PluginMenuModal({ onInsertPlugin }: PluginMenuModalProps) {
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const allWithData = editorPlugins.getAllWithData()
  const allowedPlugins = useMemo(() => {
    const allVisible = allWithData
      .filter(
        ({ type, visibleInSuggestions }) =>
          visibleInSuggestions ||
          interactivePluginTypes.has(type as EditorPluginType)
      )
      .map(({ type }) => type)

    const allowedByContext = pluginMenuState.allowedChildPlugins ?? allVisible
    // Filter out plugins which can't be nested inside of the current plugin or ancestor plugins
    const typesOfAncestors = selectAncestorPluginTypes(store.getState(), ROOT)

    return typesOfAncestors
      ? allowedByContext.filter((plugin) =>
          checkIsAllowedNesting(plugin, typesOfAncestors)
        )
      : allowedByContext
  }, [allWithData, pluginMenuState.allowedChildPlugins])

  const allOptions = allowedPlugins.map((type) =>
    createOption(type as EditorPluginType, pluginsStrings)
  )
  const basicOptions = allOptions.filter(
    (option) => !interactivePluginTypes.has(option.pluginType)
  )

  const interactiveOptions = allOptions.filter((option) =>
    interactivePluginTypes.has(option.pluginType)
  )

  const handleItemFocus = (index: number) => {
    setCurrentlyFocusedItem(index)
  }

  const handleItemBlur = () => {
    setCurrentlyFocusedItem(-1)
  }

  const getTooltipPosition = (index: number): 'right' | 'left' | undefined => {
    return index % 5 === 0 ? 'right' : index % 5 === 4 ? 'left' : undefined
  }

  const handleModalClose = (isOpen: boolean) => {
    if (isOpen === false) {
      pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
    }
  }

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      pluginMenuState.searchInputRef?.current?.focus()
    }, 0)
    return () => clearTimeout(focusTimeout)
  }, [pluginMenuState.searchInputRef])

  return (
    <ModalWithCloseButton
      className="top-8 max-h-[90vh] w-auto min-w-[700px] translate-y-0 overflow-y-scroll pt-0"
      extraTitleClassName="sr-only"
      title="Add Plugin Modal"
      isOpen={pluginMenuState.showPluginMenu}
      setIsOpen={handleModalClose}
    >
      <div className="sticky top-0 z-10 bg-white pb-3 pl-6 pt-7 shadow-stickysearch">
        <EditorInput
          ref={pluginMenuState?.searchInputRef}
          autoFocus
          placeholder={editorStrings.addPluginsModal.searchInputPlaceholder}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === Key.ArrowDown) {
              setCurrentlyFocusedItem(0)
              e.preventDefault()
            }
          }}
          inputWidth="50%"
          width="60%"
          className="ml-8 block"
        />
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.addPluginsModal.basicPluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderPluginItems(basicOptions)}
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.addPluginsModal.interactivePluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderPluginItems(interactiveOptions, basicOptions.length)}
      </div>
    </ModalWithCloseButton>
  )

  function renderPluginItems(
    options: PluginMenuItemType[],
    offset: number = 0
  ) {
    return options.map((item, index) => {
      const currentIndex = index + offset
      return (
        <PluginMenuItem
          key={currentIndex}
          ref={(el) => (itemRefs.current[currentIndex] = el)}
          option={item}
          selected={currentIndex === currentlyFocusedItem}
          tooltipPosition={getTooltipPosition(index)}
          onInsertPlugin={onInsertPlugin}
          onFocus={() => handleItemFocus(currentIndex)}
          onBlur={handleItemBlur}
          onMouseEnter={() => handleItemFocus(currentIndex)}
          onMouseLeave={() => {
            handleItemBlur()
            itemRefs.current[currentIndex]?.blur()
          }}
        />
      )
    })
  }
}

interface PluginStrings {
  title?: string
  description?: string
}
function createOption(
  pluginType: EditorPluginType,
  allPluginStrings: EditorStrings['plugins']
): PluginMenuItemType {
  const pluginData = editorPlugins
    .getAllWithData()
    .find((plugin) => plugin.type === pluginType)

  if (!pluginData) {
    return { pluginType, title: pluginType }
  }

  const pluginStrings = allPluginStrings[
    pluginType as keyof typeof allPluginStrings
  ] as PluginStrings

  const title =
    pluginStrings?.title ?? pluginData.plugin.defaultTitle ?? pluginType

  const description =
    pluginStrings?.description ?? pluginData.plugin.defaultDescription

  const icon = pluginData.icon

  return {
    pluginType,
    title,
    description,
    icon,
  }
}

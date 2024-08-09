import {
  PluginSelectionMenuContext,
  interactivePluginTypes,
} from '@editor/core/contexts/plugins-context'
import { EditorInput } from '@editor/editor-ui/editor-input'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { AllowedChildPlugins } from '@editor/plugins/rows/allowed-child-plugins-context'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import { selectAncestorPluginTypes, store } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorStrings,
  useEditorStrings,
} from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { Key } from 'ts-key-enum'

import { PluginMenuItem } from './plugin-menu-item'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export interface PluginMenuItemType {
  pluginType: EditorPluginType
  title: string
  description?: string
  icon?: JSX.Element
}

export function AddPluginModal() {
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins

  const searchInputRef = useRef<HTMLInputElement>(null)

  const pContext = useContext(PluginSelectionMenuContext)

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const allowedContextPlugins = useContext(AllowedChildPlugins)

  const id = ROOT

  const allWithData = editorPlugins.getAllWithData()
  const allowedPlugins = useMemo(() => {
    const allVisible = allWithData
      .filter(({ visibleInSuggestions }) => visibleInSuggestions)
      .map(({ type }) => type)

    // return allVisible
    const allowedByContext = allowedContextPlugins ?? allVisible
    // Filter out plugins which can't be nested inside of the current plugin or ancestor plugins
    const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)

    return typesOfAncestors
      ? allowedByContext.filter((plugin) =>
          checkIsAllowedNesting(plugin, typesOfAncestors)
        )
      : allowedByContext
  }, [allWithData, allowedContextPlugins, id])

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

  const renderSuggestions = (
    options: PluginMenuItemType[],
    offset: number = 0
  ) => {
    return options.map((item, index) => {
      const currentIndex = index + offset
      return (
        <PluginMenuItem
          key={currentIndex}
          option={item}
          selected={currentIndex === currentlyFocusedItem}
          ref={(el) => (itemRefs.current[currentIndex] = el)}
          onFocus={() => handleItemFocus(currentIndex)}
          onBlur={handleItemBlur}
          onMouseEnter={() => handleItemFocus(currentIndex)}
          onMouseLeave={() => {
            handleItemBlur()
            itemRefs.current[currentIndex]?.blur()
          }}
          tooltipPosition={getTooltipPosition(index)}
        />
      )
    })
  }
  return (
    <ModalWithCloseButton
      className="top-8 max-h-[90vh] w-auto min-w-[700px] translate-y-0 overflow-y-scroll pt-0"
      extraTitleClassName="sr-only"
      title="Add Plugin Modal"
      isOpen={pContext.showPluginModal}
      setIsOpen={pContext.setShowPluginModal}
    >
      <div className="sticky top-0 z-10 bg-white pb-3 pl-6 pt-7 shadow-stickysearch">
        <EditorInput
          ref={searchInputRef}
          autoFocus
          placeholder="editorStrings.addPluginsModal.searchInputPlaceholder"
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
        {renderSuggestions(basicOptions)}
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.addPluginsModal.interactivePluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderSuggestions(interactiveOptions, basicOptions.length)}
      </div>
    </ModalWithCloseButton>
  )
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

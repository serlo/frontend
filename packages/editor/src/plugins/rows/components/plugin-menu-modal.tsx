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
import { useHotkeys } from 'react-hotkeys-hook'
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

const hotkeyConfig = {
  enableOnContentEditable: true,
  scopes: ['global'],
}

export function PluginMenuModal({ onInsertPlugin }: PluginMenuModalProps) {
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const searchInputRef = useRef<HTMLInputElement | null>(null)

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

  const { basicOptions, interactiveOptions } = useMemo(() => {
    const allOptions = allowedPlugins.map((type) => {
      return createOption(type as EditorPluginType, pluginsStrings)
    })
    const allowed = filterOptions(allOptions, searchString)

    return {
      basicOptions: allowed.filter(
        (option) => !interactivePluginTypes.has(option.pluginType)
      ),
      interactiveOptions: allowed.filter((option) =>
        interactivePluginTypes.has(option.pluginType)
      ),
    }
  }, [allowedPlugins, pluginsStrings, searchString])

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
      searchInputRef?.current?.focus()
    }, 0)
    return () => clearTimeout(focusTimeout)
  }, [searchInputRef])

  const focusSearchInput = () => {
    searchInputRef?.current?.focus()
  }

  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const totalItems = basicOptions.length + interactiveOptions.length
    const basicPluginsCount = basicOptions.length
    const interactivePluginsStartIndex = basicPluginsCount
    const columns = 5

    const isInBasicGrid = currentlyFocusedItem < interactivePluginsStartIndex
    const isInInteractiveGrid =
      currentlyFocusedItem >= interactivePluginsStartIndex

    const fullBasicRowsCount = Math.floor(basicPluginsCount / columns)
    const lastBasicRowItemCount = basicPluginsCount % columns
    const isInLastFullRowOfBasic =
      currentlyFocusedItem >= (fullBasicRowsCount - 1) * columns &&
      currentlyFocusedItem < fullBasicRowsCount * columns

    const isInFirstRowOfBasic = currentlyFocusedItem < columns
    const isInLastRowOfBasic =
      currentlyFocusedItem >= fullBasicRowsCount * columns &&
      currentlyFocusedItem < basicPluginsCount
    const isInFirstRowOfInteractive =
      currentlyFocusedItem >= interactivePluginsStartIndex &&
      currentlyFocusedItem < interactivePluginsStartIndex + columns

    switch (event.key) {
      case Key.ArrowDown:
        if (isInBasicGrid) {
          if (isInLastRowOfBasic) {
            const indexInFirstInteractiveRow = currentlyFocusedItem % columns
            setCurrentlyFocusedItem(
              interactivePluginsStartIndex + indexInFirstInteractiveRow
            )
          } else if (
            isInLastFullRowOfBasic &&
            currentlyFocusedItem % columns >= lastBasicRowItemCount
          ) {
            setCurrentlyFocusedItem(fullBasicRowsCount * columns)
          } else {
            setCurrentlyFocusedItem((prev) =>
              Math.min(prev + columns, totalItems - 1)
            )
          }
        } else if (isInInteractiveGrid) {
          setCurrentlyFocusedItem((prev) =>
            Math.min(prev + columns, totalItems - 1)
          )
        }
        break

      case Key.ArrowUp:
        if (isInInteractiveGrid) {
          if (isInFirstRowOfInteractive) {
            const indexInLastRowOfBasic =
              (currentlyFocusedItem - interactivePluginsStartIndex) % columns
            if (indexInLastRowOfBasic < lastBasicRowItemCount) {
              setCurrentlyFocusedItem(
                fullBasicRowsCount * columns + indexInLastRowOfBasic
              )
            } else {
              setCurrentlyFocusedItem(
                fullBasicRowsCount * columns + lastBasicRowItemCount - 1
              )
            }
          } else {
            setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
          }
        } else if (isInBasicGrid) {
          if (isInFirstRowOfBasic) {
            focusSearchInput()
          } else {
            setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
          }
        }
        break

      case Key.ArrowLeft:
        setCurrentlyFocusedItem((prev) => Math.max(prev - 1, 0))
        break

      case Key.ArrowRight:
        setCurrentlyFocusedItem((prev) => Math.min(prev + 1, totalItems - 1))
        break

      default:
        break
    }

    event.preventDefault()
  }
  useHotkeys(
    [Key.ArrowUp, Key.ArrowDown, Key.ArrowLeft, Key.ArrowRight],
    handleArrowKeyPress,
    hotkeyConfig
  )

  useEffect(() => {
    if (itemRefs.current[currentlyFocusedItem]) {
      itemRefs.current[currentlyFocusedItem]?.focus()
    }
  }, [currentlyFocusedItem])

  useEffect(() => {
    if (pluginMenuState.showPluginMenu) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0)
    }
  }, [pluginMenuState.showPluginMenu, searchInputRef])

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
          ref={searchInputRef}
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

function filterOptions(option: PluginMenuItemType[], text: string) {
  const search = text.replace('/', '').toLowerCase()
  if (!search.length) return option

  const filterResults = new Set<PluginMenuItemType>()

  // title or pluginType start with search string
  option.forEach((entry) => {
    if (
      entry.title.toLowerCase().startsWith(search) ||
      entry.pluginType.startsWith(search)
    ) {
      filterResults.add(entry)
    }
  })

  // title includes search string
  option.forEach((entry) => {
    if (entry.title.toLowerCase().includes(search)) {
      filterResults.add(entry)
    }
  })

  return [...filterResults]
}

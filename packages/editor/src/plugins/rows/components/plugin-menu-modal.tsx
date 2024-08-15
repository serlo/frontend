import IconEmptyPluginsModal from '@editor/editor-ui/assets/plugin-icons/icon-question-mark.svg'
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
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Key } from 'ts-key-enum'

import { PluginMenuItem } from './plugin-menu-item'
import type { PluginMenuItemType } from '../contexts/plugin-menu/types'
import { usePluginMenuKeyboardHandler } from '../hooks/use-plugin-menu-keyboard-handler'
import {
  createOption,
  filterOptions,
  isInteractivePluginType,
} from '../utils/plugin-menu'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

interface PluginMenuModalProps {
  onInsertPlugin: (pluginType: EditorPluginType) => void
}

export function PluginMenuModal({ onInsertPlugin }: PluginMenuModalProps) {
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  const [searchString, setSearchString] = useState('')
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const allWithData = editorPlugins.getAllWithData()
  const allowedPlugins = useMemo(() => {
    const allVisible = allWithData
      .filter(
        ({ type, visibleInSuggestions }) =>
          visibleInSuggestions ||
          isInteractivePluginType(type as EditorPluginType)
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

  const { basicOptions, interactiveOptions, isEmpty } = useMemo(() => {
    const allOptions = allowedPlugins.map((type) => {
      return createOption(type as EditorPluginType, pluginsStrings)
    })
    const allowed = filterOptions(allOptions, searchString)

    const basicOptions = allowed.filter(
      (option) => !isInteractivePluginType(option.pluginType)
    )

    const interactiveOptions = allowed.filter((option) =>
      isInteractivePluginType(option.pluginType)
    )

    return {
      basicOptions,
      interactiveOptions,
      isEmpty: basicOptions.length === 0 && interactiveOptions.length === 0,
    }
  }, [allowedPlugins, pluginsStrings, searchString])

  const handleItemFocus = (index: number) => {
    setFocusedItemIndex(index)
  }

  const handleItemBlur = () => {
    setFocusedItemIndex(-1)
  }

  const getTooltipPosition = (index: number): 'right' | 'left' | undefined => {
    return index % 5 === 0 ? 'right' : index % 5 === 4 ? 'left' : undefined
  }

  const handleModalClose = (isOpen: boolean) => {
    if (isOpen === false) {
      pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
    }
    setSearchString('')
  }

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      searchInputRef?.current?.focus()
    }, 0)
    return () => clearTimeout(focusTimeout)
  }, [searchInputRef])

  usePluginMenuKeyboardHandler({
    enabled: pluginMenuState.showPluginMenu,
    focusedItemIndex,
    setFocusedItemIndex,
    basicItemsLength: basicOptions.length,
    intearctiveItemsLength: interactiveOptions.length,
    columns: 5,
    searchInputRef,
  })

  useEffect(() => {
    if (focusedItemIndex !== null && itemRefs.current[focusedItemIndex]) {
      itemRefs.current[focusedItemIndex]?.focus()
    }
  }, [focusedItemIndex])

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
      data-qa="plugin-menu-modal"
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
              setFocusedItemIndex(0)
              e.preventDefault()
            }
          }}
          inputWidth="50%"
          width="60%"
          className="ml-8 block"
        />
      </div>
      {isEmpty && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-2 p-10 pt-4 text-center">
          <IconEmptyPluginsModal className="mb-4" />
          <div>
            <h3 className="pb-4 text-lg font-bold">
              {editorStrings.addPluginsModal.noPluginsFoundTitle}
            </h3>
            <p>{editorStrings.addPluginsModal.noPluginsFoundDescription}</p>
          </div>
        </div>
      )}
      {basicOptions.length > 0 && (
        <>
          <h1 className="pl-6 pt-4 text-lg font-bold">
            {editorStrings.addPluginsModal.basicPluginsTitle}
          </h1>
          <div className="grid grid-cols-5 gap-4 p-4">
            {renderPluginItems(basicOptions)}
          </div>
        </>
      )}

      {interactiveOptions.length > 0 && (
        <>
          <h1 className="pl-6 pt-1 text-lg font-bold">
            {editorStrings.addPluginsModal.interactivePluginsTitle}
          </h1>
          <div className="grid grid-cols-5 gap-4 p-4">
            {renderPluginItems(interactiveOptions, basicOptions.length)}
          </div>
        </>
      )}
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
          item={item}
          selected={currentIndex === focusedItemIndex}
          tooltipPosition={getTooltipPosition(index)}
          onInsertPlugin={(type: EditorPluginType) => {
            onInsertPlugin(type)
            setSearchString('')
          }}
          onFocus={() => handleItemFocus(currentIndex)}
          onBlur={handleItemBlur}
          onMouseMove={() => handleItemFocus(currentIndex)}
          onMouseLeave={() => {
            handleItemBlur()
            itemRefs.current[currentIndex]?.blur()
          }}
        />
      )
    })
  }
}

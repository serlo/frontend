import IconEmptyPluginsModal from '@editor/editor-ui/assets/plugin-icons/icon-question-mark.svg'
import { EditorInput } from '@editor/editor-ui/editor-input'
import { EditorModal } from '@editor/editor-ui/editor-modal'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '@editor/plugins/rows/contexts/plugin-menu'
import { selectAncestorPluginTypes, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { isExerciseDocument } from '@editor/types/plugin-type-guards'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Key } from 'ts-key-enum'

import { PluginMenuItems } from './plugin-menu-items'
import { usePluginMenuKeyboardHandler } from '../hooks/use-plugin-menu-keyboard-handler'
import { checkIsAllowedNesting } from '../utils/check-is-allowed-nesting'
import {
  type PluginMenuItem,
  getPluginMenuItems,
  filterPluginMenuItemsBySearchString,
} from '../utils/plugin-menu'

interface PluginMenuModalProps {
  onInsertPlugin: (pluginMenuItem: PluginMenuItem) => void
}

export function PluginMenuModal({ onInsertPlugin }: PluginMenuModalProps) {
  const editorStrings = useEditStrings()
  const pluginsStrings = editorStrings.plugins

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  const [searchString, setSearchString] = useState('')
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const menuItems = getPluginMenuItems(editorStrings)

  const allowedPlugins = useMemo(() => {
    const allPluginsWithDuplicates = menuItems.map(
      (menuItem) => menuItem.initialState.plugin
    )
    const allPlugins = Array.from(new Set(allPluginsWithDuplicates))
    const allowedByContext = pluginMenuState.allowedChildPlugins ?? allPlugins
    const allowedAndSupported = allowedByContext.filter((plugin) =>
      editorPlugins.isSupported(plugin)
    )

    const typesOfAncestors = selectAncestorPluginTypes(
      store.getState(),
      pluginMenuState.parentPluginId
    )

    return typesOfAncestors?.length
      ? allowedAndSupported.filter((plugin) =>
          checkIsAllowedNesting(plugin, typesOfAncestors)
        )
      : allowedAndSupported
  }, [
    menuItems,
    pluginMenuState.allowedChildPlugins,
    pluginMenuState.parentPluginId,
  ])

  const allowedMenuItems = useMemo(() => {
    return menuItems.filter(({ initialState }) => {
      const isPluginAllowed = allowedPlugins.includes(initialState.plugin)
      if (!isExerciseDocument(initialState)) return isPluginAllowed
      // extra check for wrapped interactive exercise plugins
      const interactive = initialState.state.interactive?.plugin
      return interactive
        ? editorPlugins.isSupported(interactive)
        : isPluginAllowed
    })
  }, [allowedPlugins, menuItems])

  const { basicOptions, interactiveOptions, firstOption, isEmpty } =
    useMemo(() => {
      const filteredBySearchString = filterPluginMenuItemsBySearchString(
        allowedMenuItems,
        searchString
      )

      const basicOptions = filteredBySearchString.filter(
        ({ initialState }) => initialState.plugin !== EditorPluginType.Exercise
      )

      const interactiveOptions = filteredBySearchString.filter(
        ({ initialState }) => initialState.plugin === EditorPluginType.Exercise
      )

      const firstOption = basicOptions.at(0) ?? interactiveOptions.at(0)
      const isEmpty = firstOption === undefined

      return { basicOptions, interactiveOptions, firstOption, isEmpty }
    }, [allowedMenuItems, searchString])

  const handleModalClose = (isOpen: boolean) => {
    if (isOpen === false) {
      pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
    }
  }

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
    if (!pluginMenuState.showPluginMenu) return
    setTimeout(() => searchInputRef.current?.focus(), 10)
  }, [pluginMenuState.showPluginMenu, searchInputRef])

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === Key.ArrowDown) {
      setFocusedItemIndex(0)
      e.preventDefault()
    }
    if (e.key === Key.Enter) {
      if (!firstOption) return
      onInsertPlugin(firstOption)
      e.preventDefault()
    }
  }

  useEffect(() => {
    setSearchString('')
  }, [pluginMenuState.showPluginMenu])

  return (
    <EditorModal
      className="top-8 max-h-[90vh] w-auto min-w-[700px] translate-y-0 overflow-y-scroll pt-0"
      extraTitleClassName="sr-only"
      title={pluginsStrings.rows.addAnElement}
      isOpen={pluginMenuState.showPluginMenu}
      setIsOpen={handleModalClose}
      data-qa="plugin-menu-modal"
      onEscapeKeyDown={(e) => {
        if (searchString.length === 0) return
        e.preventDefault()
      }}
      onKeyDown={(e) => {
        // make sure filtering works even when focus was somewhere else
        if (e.altKey || e.ctrlKey || e.metaKey) return
        const isSingleLetter = e.key.length === 1 && e.key.match(/\p{L}/u)
        if (!isSingleLetter && e.key !== 'Backspace' && e.key !== 'Delete')
          return
        searchInputRef.current?.focus()
        setFocusedItemIndex(null)
      }}
    >
      <div className="sticky top-0 z-10 bg-white pb-3 pl-6 pt-7 shadow-stickysearch">
        <EditorInput
          data-qa="plugin-menu-search-input"
          ref={searchInputRef}
          autoFocus
          placeholder={editorStrings.addPluginsModal.searchInputPlaceholder}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={onKeyDownHandler}
          inputWidth="50%"
          className="ml-8 block"
        />
      </div>
      {isEmpty ? (
        <div className="mt-4 flex flex-col items-center justify-center space-y-2 p-10 pt-4 text-center">
          <IconEmptyPluginsModal className="mb-4" />
          <div>
            <h3 className="pb-4 text-lg font-bold text-almost-black">
              {editorStrings.addPluginsModal.noPluginsFoundTitle}
            </h3>
            <p>{editorStrings.addPluginsModal.noPluginsFoundDescription}</p>
          </div>
        </div>
      ) : (
        <PluginMenuItems
          basicOptions={basicOptions}
          interactiveOptions={interactiveOptions}
          focusedItemIndex={focusedItemIndex}
          setFocusedItemIndex={setFocusedItemIndex}
          itemRefs={itemRefs}
          onInsertPlugin={onInsertPlugin}
        />
      )}
    </EditorModal>
  )
}

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

import { PluginMenuItems } from './plugin-menu-items'
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

  const { basicOptions, interactiveOptions, firstOption, isEmpty } =
    useMemo(() => {
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

      const firstOption = basicOptions.at(0) ?? interactiveOptions.at(0)

      // Hack to add the AI generated content option in the menu
      basicOptions.unshift({
        pluginType: EditorPluginType.AiGeneratedContent,
        title: 'Inhalt per AI generieren',
      })

      return {
        basicOptions,
        interactiveOptions,
        firstOption,
        isEmpty: firstOption === undefined,
      }
    }, [allowedPlugins, pluginsStrings, searchString])

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
      onInsertPlugin(firstOption.pluginType)
      e.preventDefault()
    }
  }

  useEffect(() => {
    setSearchString('')
  }, [pluginMenuState.showPluginMenu])

  return (
    <ModalWithCloseButton
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
    </ModalWithCloseButton>
  )
}

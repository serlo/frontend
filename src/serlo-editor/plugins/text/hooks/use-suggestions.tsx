import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Editor as SlateEditor, Node } from 'slate'
import { Key } from 'ts-key-enum'

import { AllowedChildPlugins } from '../../rows'
import {
  EditorStrings,
  useEditorStrings,
} from '@/contexts/logged-in-data-context'
import {
  PluginsContext,
  PluginsContextPlugins,
  getPluginByType,
  usePlugins,
} from '@/serlo-editor/core/contexts/plugins-context'
import { runReplaceDocumentSaga, useAppDispatch } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface useSuggestionsArgs {
  editor: SlateEditor
  id: string
  editable: boolean
  focused: boolean
}

export interface SuggestionOption {
  pluginType: string
  title: string
  description?: string
  icon?: JSX.Element
}

export const useSuggestions = (args: useSuggestionsArgs) => {
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const { editor, id, editable, focused } = args
  const pluginsStrings = useEditorStrings().plugins
  const text = Node.string(editor)

  const plugins = usePlugins()
  const allPlugins = useContext(PluginsContext)
    .filter(({ visible }) => visible)
    .map(({ type }) => type)
  const allowed = useContext(AllowedChildPlugins)
  const pluginsData = usePlugins()

  const allOptions = (allowed ?? allPlugins).map((type) =>
    createOption(type, pluginsStrings, pluginsData)
  )

  const filteredOptions = filterPlugins(allOptions, text)
  const showSuggestions =
    editable && focused && text.startsWith('/') && filteredOptions.length > 0

  const options = showSuggestions ? filteredOptions : []

  const closure = useRef({
    showSuggestions,
    selected,
    options,
  })
  closure.current = {
    showSuggestions,
    selected,
    options,
  }

  /**
   * We need to attach the ref to the consumer of the hook, or else the scoping
   * doesn't work properly and the root event handler for ArrowUp and ArrowDown
   * will be called.
   */
  const hotkeyRef = useHotkeys<HTMLDivElement>(
    [Key.ArrowUp, Key.ArrowDown],
    (event) => {
      console.log('ArrowKey or ArrowUp called in useSuggestions', {
        enabled: closure.current.showSuggestions,
      })
      event.preventDefault()
      event.stopPropagation()
      if (event.key === Key.ArrowUp) {
        handleSelectionChange('up')
      } else if (event.key === Key.ArrowDown) {
        handleSelectionChange('down')
      }
    },
    {
      enableOnContentEditable: true,
      enabled: closure.current.showSuggestions,
    }
  )

  useHotkeys(
    'enter',
    (event) => {
      console.log('Enter called in useSuggestions', {
        enabled: closure.current.showSuggestions,
      })

      if (closure.current.showSuggestions) {
        event.preventDefault()
        handleSuggestionInsert()
      }
    },
    { enableOnContentEditable: true, enabled: closure.current.showSuggestions },
    [closure.current.showSuggestions]
  )

  useEffect(() => {
    if (options.length < selected) {
      setSelected(0)
    }
  }, [options.length, selected])

  function handleHotkeys(event: React.KeyboardEvent) {
    if (closure.current.showSuggestions) {
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
        event.preventDefault()
        return
      }
    }
  }

  function handleSelectionChange(direction: 'up' | 'down') {
    if (closure.current.showSuggestions) {
      setSelected((currentSelected) => {
        const optionsCount = closure.current.options.length
        if (optionsCount === 0) return 0

        const isFirstAndUpPressed = direction === 'up' && currentSelected === 0
        const isLastAndDownPressed =
          direction === 'down' && currentSelected === optionsCount - 1
        if (isFirstAndUpPressed || isLastAndDownPressed) return currentSelected

        const value = direction === 'up' ? -1 : 1
        const selectedElementIndex = currentSelected + value

        scrollSuggestionIntoView(selectedElementIndex)

        return selectedElementIndex
      })
    }
  }

  function scrollSuggestionIntoView(index: number) {
    const suggestionElements = suggestionsRef?.current?.children
    const selectedElement = suggestionElements?.item(index)
    selectedElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  function handleSuggestionInsert() {
    const option = closure.current.options[closure.current.selected]
    if (!option) return
    setTimeout(() => {
      insertPlugin(option.pluginType)
    })
  }

  function insertPlugin(pluginType: EditorPluginType | string) {
    // If the text plugin is selected from the suggestions list,
    // just clear the editor
    if (pluginType === EditorPluginType.Text) {
      editor.deleteBackward('line')
      // in browsers other than chrome the cursor is sometimes in front of the `/` so to make sure:
      editor.deleteForward('line')
      return
    }

    // Otherwise, replace the text plugin with the selected plugin
    dispatch(runReplaceDocumentSaga({ id, plugins, pluginType }))
  }

  return {
    showSuggestions,
    suggestionsProps: {
      options,
      suggestionsRef,
      selected,
      onMouseDown: insertPlugin,
      onMouseMove: setSelected,
    },
    handleHotkeys,
    hotkeyRef,
  }
}

function createOption(
  pluginType: string,
  allPluginStrings: EditorStrings['plugins'],
  allPluginsData: PluginsContextPlugins
): SuggestionOption {
  const pluginData = getPluginByType(allPluginsData, pluginType)

  if (!pluginData) return { pluginType, title: pluginType }

  const pluginStrings = Object.hasOwn(allPluginStrings, pluginType)
    ? allPluginStrings[pluginType as keyof typeof allPluginStrings]
    : undefined

  const title =
    pluginStrings && Object.hasOwn(pluginStrings, 'title')
      ? pluginStrings.title
      : pluginData.plugin.defaultTitle ?? pluginType
  const description =
    pluginStrings && Object.hasOwn(pluginStrings, 'description')
      ? pluginStrings.description
      : pluginData.plugin.defaultDescription
  const { icon } = pluginData

  return { pluginType, title, description, icon }
}

function filterPlugins(plugins: SuggestionOption[], text: string) {
  const search = text.replace('/', '').toLowerCase()

  if (!search.length) return plugins

  const startingWithSearchString = plugins.filter(({ title }) => {
    return title.toLowerCase()?.startsWith(search)
  })
  const containingSearchString = plugins.filter(({ title }) => {
    const value = title?.toLowerCase()
    return value?.includes(search) && !value?.startsWith(search)
  })

  return [...startingWithSearchString, ...containingSearchString]
}

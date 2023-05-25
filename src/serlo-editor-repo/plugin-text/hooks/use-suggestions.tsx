import React, { useContext, useState, useEffect, useRef } from 'react'
import { Editor as SlateEditor, Node } from 'slate'

import { RegistryContext, Registry } from '../../plugin-rows'
import { runReplaceDocumentSaga, useAppDispatch } from '../../store'

interface useSuggestionsArgs {
  editor: SlateEditor
  id: string
  editable: boolean
  focused: boolean
}

const hotKeysMap = {
  SELECT_UP: 'up',
  SELECT_DOWN: 'down',
  INSERT: 'enter',
}

export const useSuggestions = (args: useSuggestionsArgs) => {
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const { editor, id, editable, focused } = args

  const text = Node.string(editor)
  const plugins = useContext(RegistryContext)
  const filteredOptions = filterPlugins(plugins, text)
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

  const handleSelectionChange = (direction: 'up' | 'down') => () => {
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
    if (closure.current.showSuggestions) {
      const option = closure.current.options[closure.current.selected]
      if (!option) return
      setTimeout(() => {
        insertPlugin(option.name)
      })
    }
  }

  function insertPlugin(pluginName: string) {
    // If the text plugin is selected from the suggestions list,
    // just clear the editor
    if (pluginName === 'text') {
      editor.deleteBackward('line')
      return
    }

    // Otherwise, replace the text plugin with the selected plugin
    dispatch(runReplaceDocumentSaga({ id, plugin: pluginName }))
  }

  const hotKeysHandlers = {
    SELECT_UP: handleSelectionChange('up'),
    SELECT_DOWN: handleSelectionChange('down'),
    INSERT: handleSuggestionInsert,
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
    hotKeysProps: {
      keyMap: hotKeysMap,
      handlers: hotKeysHandlers,
    },
    handleHotkeys,
  }
}

function filterPlugins(registry: Registry, text: string) {
  const search = text.replace('/', '').toLowerCase()

  if (!search.length) return registry

  const startingWithSearchString = registry.filter(({ title }) => {
    return title?.toLowerCase()?.startsWith(search)
  })
  const containingSearchString = registry.filter(({ title }) => {
    const value = title?.toLowerCase()
    return value?.includes(search) && !value?.startsWith(search)
  })

  return [...startingWithSearchString, ...containingSearchString]
}

import { useContext, useState, useEffect, useRef, useMemo } from 'react'
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
import { Editor as SlateEditor, Node } from 'slate'
import { Key } from 'ts-key-enum'

import { insertPlugin } from '../utils/insert-plugin'
import {
  EditorStrings,
  useEditorStrings,
} from '@/contexts/logged-in-data-context'
import { useHotkeysScope } from '@/serlo-editor/core/contexts/hotkeys-scope-context'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { AllowedChildPlugins } from '@/serlo-editor/plugins/rows'
import { checkIsAllowedNesting } from '@/serlo-editor/plugins/rows/utils/check-is-allowed-nesting'
import {
  selectAncestorPluginTypes,
  store,
  useAppDispatch,
} from '@/serlo-editor/store'
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

const hotkeyConfig = {
  enableOnContentEditable: true,
  scopes: ['global'],
}

export const useSuggestions = (args: useSuggestionsArgs) => {
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const { editor, id, editable, focused } = args
  const pluginsStrings = useEditorStrings().plugins

  const { selection } = editor
  const node = selection ? Node.get(editor, selection.focus.path) : undefined
  const text = Node.string(node ?? editor)

  const allPlugins = editorPlugins
    .getAllWithData()
    .filter(({ visibleInSuggestions }) => visibleInSuggestions)
    .map(({ type }) => type)
  const allowedPlugins = useContext(AllowedChildPlugins)

  const allOptions = useMemo(() => {
    return (allowedPlugins ?? allPlugins).map((type) => {
      return createOption(type, pluginsStrings)
    })
    // Should only update when allowed plugins change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedPlugins])

  const filteredOptions = useMemo(() => {
    return filterPlugins(allOptions, text, id)
  }, [allOptions, id, text])

  const showSuggestions =
    editable && focused && text.startsWith('/') && filteredOptions.length > 0

  const scope = useHotkeysScope()
  scope.rootUpDownEnter = !showSuggestions

  const { enableScope, disableScope } = useHotkeysContext()

  useEffect(() => {
    /*if (showSuggestions) {
      disableScope('root-up-down-enter')
    } else {
      enableScope('root-up-down-enter')
    }*/
  }, [enableScope, disableScope, showSuggestions])

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

  useHotkeys([Key.ArrowUp, Key.ArrowDown], handleSelectionChange, hotkeyConfig)
  useHotkeys(Key.Enter, handleSuggestionInsert, hotkeyConfig)
  useHotkeys(Key.Escape, handleSuggestionsMenuClose, hotkeyConfig)

  function handleSelectionChange(event: KeyboardEvent) {
    if (!closure.current.showSuggestions) return

    event.preventDefault()
    event.stopPropagation()

    setSelected((currentSelected) => {
      const optionsCount = closure.current.options.length
      if (optionsCount === 0) return 0

      const isFirstAndUpPressed =
        event.key === Key.ArrowUp && currentSelected === 0
      const isLastAndDownPressed =
        event.key === Key.ArrowDown && currentSelected === optionsCount - 1
      if (isFirstAndUpPressed || isLastAndDownPressed) return currentSelected

      const value = event.key === Key.ArrowUp ? -1 : 1
      const selectedElementIndex = currentSelected + value

      scrollSuggestionIntoView(selectedElementIndex)

      return selectedElementIndex
    })
  }

  function scrollSuggestionIntoView(index: number) {
    const suggestionElements = suggestionsRef?.current?.children
    const selectedElement = suggestionElements?.item(index)
    selectedElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  function handleSuggestionInsert(event: KeyboardEvent) {
    if (!closure.current.showSuggestions) return

    event.preventDefault()

    const option = closure.current.options[closure.current.selected]

    if (!option) return

    setTimeout(() => {
      insertSelectedPlugin(option.pluginType)
    })
  }

  function insertSelectedPlugin(pluginType: EditorPluginType | string) {
    editor.deleteBackward('line')

    // If the text plugin is selected from the suggestions list, clear the editor
    if (pluginType === EditorPluginType.Text) {
      // In browsers other than chrome, the cursor is sometimes in front of the `/`
      editor.deleteForward('line')
      return
    }

    editor.deleteBackward('block')

    // split the text-plugin and insert selected new plugin
    setTimeout(() => {
      insertPlugin({ pluginType, editor, id, dispatch })
    })
  }

  function handleSuggestionsMenuClose(event: KeyboardEvent) {
    if (!closure.current.showSuggestions) return

    event.preventDefault()

    editor.deleteBackward('line')
  }

  return {
    showSuggestions,
    suggestionsProps: {
      options,
      suggestionsRef,
      selected,
      onMouseDown: insertSelectedPlugin,
      onMouseMove: setSelected,
    },
  }
}

function createOption(
  pluginType: string,
  allPluginStrings: EditorStrings['plugins']
): SuggestionOption {
  const pluginData = editorPlugins
    .getAllWithData()
    .find((plugin) => plugin.type === pluginType)

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

function filterPlugins(
  allPlugins: SuggestionOption[],
  text: string,
  id: string
) {
  // Filter out plugins which can't be nested inside of the current plugin
  const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)
  let plugins = []
  if (typesOfAncestors === null) {
    plugins = allPlugins
  } else {
    plugins = allPlugins.filter((plugin) =>
      checkIsAllowedNesting(plugin.pluginType, typesOfAncestors)
    )
  }

  const search = text.replace('/', '').toLowerCase()
  if (!search.length) return plugins

  const filterResults = new Set<SuggestionOption>()

  // title or pluginType start with search string
  plugins.forEach((entry) => {
    if (
      entry.title.toLowerCase().startsWith(search) ||
      entry.pluginType.startsWith(search)
    ) {
      filterResults.add(entry)
    }
  })

  // title includes search string
  plugins.forEach((entry) => {
    if (entry.title.toLowerCase().includes(search)) {
      filterResults.add(entry)
    }
  })

  return [...filterResults]
}

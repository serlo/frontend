import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { AllowedChildPlugins } from '@editor/plugins/rows'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import { selectAncestorPluginTypes, store, useAppDispatch } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorStrings,
  useEditorStrings,
} from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useState, useEffect, useRef, useMemo, useContext } from 'react'
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
import { Editor as SlateEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { Key } from 'ts-key-enum'

import { insertPlugin } from '../utils/insert-plugin'

interface useSuggestionsArgs {
  editor: SlateEditor
  id: string
  focused: boolean
  isInlineChildEditor?: boolean
}

export interface SuggestionOption {
  pluginType: EditorPluginType
  title: string
  description?: string
  icon?: JSX.Element
}

const hotkeyConfig = {
  enableOnContentEditable: true,
  scopes: ['global'],
}

const interactivePluginTypes = new Set([
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.Solution,
  EditorPluginType.DropzoneImage,
])

export const useSuggestions = ({
  editor,
  id,
  focused,
  isInlineChildEditor,
}: useSuggestionsArgs) => {
  const dispatch = useAppDispatch()
  const pluginsStrings = useEditorStrings().plugins
  const { selection } = editor

  const searchInputRef = useRef<HTMLInputElement>(null)

  const focusSearchInput = () => {
    searchInputRef.current?.focus()
  }

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const allowedContextPlugins = useContext(AllowedChildPlugins)

  const allowedPlugins = useMemo(() => {
    const allWithData = editorPlugins.getAllWithData()
    const allVisible = allWithData
      .filter(({ visibleInSuggestions }) => visibleInSuggestions)
      .map(({ type }) => type)

    const allowedByContext = allowedContextPlugins ?? allVisible
    // Filter out plugins which can't be nested inside of the current plugin or ancestor plugins
    const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)

    return typesOfAncestors
      ? allowedByContext.filter((plugin) =>
          checkIsAllowedNesting(plugin, typesOfAncestors)
        )
      : allowedByContext
  }, [allowedContextPlugins, id])

  const filteredOptions = useMemo(() => {
    const allOptions = allowedPlugins
      .filter((plugin) => plugin !== 'exercise' && plugin !== 'exerciseGroup')
      .map((type) => createOption(type as EditorPluginType, pluginsStrings))

    return filterOptions(allOptions, searchString)
  }, [allowedPlugins, pluginsStrings, searchString])

  const [showSuggestions, setShowSuggestions] = useState(
    !isInlineChildEditor &&
      focused &&
      filteredOptions.length > 0 &&
      !isSelectionWithinList(editor)
  )

  const { enableScope, disableScope } = useHotkeysContext()

  useEffect(() => {
    if (showSuggestions) {
      disableScope('root-up-down-enter')
    } else {
      enableScope('root-up-down-enter')
    }
  }, [enableScope, disableScope, showSuggestions])

  const options = showSuggestions ? filteredOptions : []

  const basicOptions = options.filter(
    (option) => !interactivePluginTypes.has(option.pluginType)
  )

  const interactiveOptions = options.filter((option) =>
    interactivePluginTypes.has(option.pluginType)
  )

  useEffect(() => {
    if (options.length < currentlyFocusedItem) {
      setCurrentlyFocusedItem(0)
    }
  }, [options.length, currentlyFocusedItem])

  useEffect(() => {
    if (itemRefs.current[currentlyFocusedItem]) {
      itemRefs.current[currentlyFocusedItem]?.focus()
    }
  }, [currentlyFocusedItem])

  const handleArrowKeyPress = (event: KeyboardEvent) => {
    // itemRefs.current[currentlyFocusedItem]?.blur()
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

  useHotkeys([Key.Enter, ' '], (event) => {
    if (options[currentlyFocusedItem]) {
      insertSelectedPlugin(options[currentlyFocusedItem].pluginType)
    }
    event.preventDefault()
  })

  function insertSelectedPlugin(pluginType: EditorPluginType | string) {
    editor.deleteBackward('line')

    if (pluginType === EditorPluginType.Text) {
      editor.deleteForward('line')
      setShowSuggestions(false)
      refocus(editor)
      return
    }

    setTimeout(() => {
      insertPlugin({ pluginType, editor, id, dispatch })

      if (selection && editor.children[selection.anchor.path[0]]) {
        editor.deleteBackward('block')
      }
    })
    setShowSuggestions(false)
  }

  return {
    showSuggestions,
    setShowSuggestions,
    suggestionsProps: {
      basicOptions,
      interactiveOptions,
      itemRefs,
      searchInputRef,
      focusSearchInput,
      searchString,
      setSearchString,
      currentlyFocusedItem,
      setCurrentlyFocusedItem,
      insertSelectedPlugin,
    },
  }
}

interface PluginStrings {
  title?: string
  description?: string
}

function createOption(
  pluginType: EditorPluginType,
  allPluginStrings: EditorStrings['plugins']
): SuggestionOption {
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

  return { pluginType, title, description, icon }
}

function filterOptions(option: SuggestionOption[], text: string) {
  // TODO: remove logic relating to '/' character everywhere
  const search = text.replace('/', '').toLowerCase()
  if (!search.length) return option

  const filterResults = new Set<SuggestionOption>()

  option.forEach((entry) => {
    if (
      entry.title.toLowerCase().startsWith(search) ||
      entry.pluginType.startsWith(search)
    ) {
      filterResults.add(entry)
    }
  })

  option.forEach((entry) => {
    if (entry.title.toLowerCase().includes(search)) {
      filterResults.add(entry)
    }
  })

  return [...filterResults]
}

const refocus = (editor: SlateEditor) =>
  setTimeout(() => ReactEditor.focus(editor), 10)

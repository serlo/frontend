import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import {
  PluginWithData,
  editorPlugins,
} from '@editor/plugin/helpers/editor-plugins'
import { AllowedChildPlugins } from '@editor/plugins/rows'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import { selectAncestorPluginTypes, store, useAppDispatch } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorStrings,
  useEditorStrings,
} from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useContext, useState, useEffect, useRef, useMemo } from 'react'
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
import { Editor as SlateEditor } from 'slate'
import { Key } from 'ts-key-enum'

import { insertPlugin } from '../utils/insert-plugin'
import { cn } from '@/helper/cn'

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

export const useSuggestions = (args: useSuggestionsArgs) => {
  const { editor, id, focused, isInlineChildEditor } = args
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const editorStrings = useEditorStrings()
  const { plugins: pluginsStrings } = editorStrings
  const { selection } = editor

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const allowedContextPlugins = useContext(AllowedChildPlugins)

  useEffect(() => {
    if (itemRefs.current[currentlyFocusedItem]) {
      itemRefs.current[currentlyFocusedItem]?.focus()
    }
  }, [currentlyFocusedItem])

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

  const interactivePluginTypes = new Set([
    EditorPluginType.TextAreaExercise,
    EditorPluginType.ScMcExercise,
    EditorPluginType.H5p,
    EditorPluginType.BlanksExercise,
    EditorPluginType.InputExercise,
    EditorPluginType.Solution,
    EditorPluginType.DropzoneImage,
  ])

  const basicOptions = options.filter(
    (option) => !interactivePluginTypes.has(option.pluginType)
  )

  const interactiveOptions = options.filter((option) =>
    interactivePluginTypes.has(option.pluginType)
  )

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

  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const totalItems = basicOptions.length + interactiveOptions.length
    const basicPluginsCount = basicOptions.length
    const interactivePluginsStartIndex = basicPluginsCount
    const columns = 5 // assuming 5 columns in the grid
    const fullRows = Math.floor(basicPluginsCount / columns)
    const lastRowItemCount = basicPluginsCount % columns

    const isInLastFullRow = currentlyFocusedItem >= (fullRows - 1) * columns
    const isInLastRowOfBasic =
      currentlyFocusedItem >= fullRows * columns &&
      currentlyFocusedItem < basicPluginsCount

    const isInFirstRowOfInteractive =
      currentlyFocusedItem < interactivePluginsStartIndex + columns &&
      currentlyFocusedItem >= interactivePluginsStartIndex
    switch (event.key) {
      case Key.ArrowDown:
        if (isInLastRowOfBasic) {
          const indexInFirstInteractiveRow = currentlyFocusedItem % columns
          // Move focus to the first item in   interactive plugins
          setCurrentlyFocusedItem(
            interactivePluginsStartIndex + indexInFirstInteractiveRow
          )
        } else if (
          isInLastFullRow &&
          currentlyFocusedItem % columns >= lastRowItemCount
        ) {
          // Jump to the first item of the last row if down arrow is pressed from incomplete row
          setCurrentlyFocusedItem(fullRows * columns)
        } else {
          setCurrentlyFocusedItem((prev) =>
            Math.min(prev + columns, totalItems - 1)
          )
        }
        break
      case Key.ArrowUp:
        if (isInFirstRowOfInteractive) {
          const rowIndex = currentlyFocusedItem - interactivePluginsStartIndex
          setCurrentlyFocusedItem(
            (prev) => prev - Math.max(lastRowItemCount, rowIndex + 1)
          )
        } else {
          setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
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

  const renderPluginItem = (
    { pluginType, title, icon }: SuggestionOption,
    index: number,
    pluginCategory: string
  ) => {
    const selectableIndex =
      pluginCategory === 'basic' ? index : index + basicOptions.length
    return (
      <button
        key={index}
        data-qa={`plugin-suggestion-${pluginType}`}
        data-active={index === selected}
        ref={(el) => (itemRefs.current[selectableIndex] = el)}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault()
          insertSelectedPlugin(pluginType)
        }}
        onMouseMove={() => {
          setSelected(index)
        }}
        onFocus={() => {
          setCurrentlyFocusedItem(selectableIndex)
        }}
        className={cn(`
          group/suggestion flex cursor-pointer flex-col items-center rounded-md
          border border-2 border-transparent p-2 pb-0
          hover:shadow-suggestions
        `)}
      >
        <div
          className={cn(`
           mb-2 flex w-full items-center justify-center rounded-md
          `)}
        >
          {icon ?? <IconFallback className="h-full w-full" />}
        </div>
        <h5 className="text-center text-sm font-bold">{title}</h5>
      </button>
    )
  }

  function insertSelectedPlugin(pluginType: EditorPluginType | string) {
    editor.deleteBackward('line')

    // If the text plugin is selected from the suggestions list, clear the editor
    if (pluginType === EditorPluginType.Text) {
      // In browsers other than chrome, the cursor is sometimes in front of the `/`
      editor.deleteForward('line')
      return
    }

    setTimeout(() => {
      // Split the text-plugin and insert selected new plugin
      insertPlugin({ pluginType, editor, id, dispatch })

      // If there is an empty line on the initial selection point, remove it
      if (selection && editor.children[selection.anchor.path[0]]) {
        editor.deleteBackward('block')
      }
    })
  }

  const renderedBasicPlugins = basicOptions.map((basicItem, index) => {
    return renderPluginItem(basicItem, index, 'basic')
  })

  const renderedInteractivePlugins = interactiveOptions.map((item, index) => {
    return renderPluginItem(item, index, 'interactive')
  })

  return {
    showSuggestions,
    setShowSuggestions,
    suggestionsProps: {
      options,
      suggestionsRef,
      renderedBasicPlugins,
      renderedInteractivePlugins,
      searchString,
      setSearchString,
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
  const pluginData: PluginWithData | undefined = editorPlugins
    .getAllWithData()
    .find((plugin) => plugin.type === pluginType)

  if (!pluginData) {
    return { pluginType, title: pluginType }
  }

  const pluginStrings: PluginStrings | undefined = allPluginStrings[
    pluginType as keyof typeof allPluginStrings
  ] as PluginStrings

  const title: string =
    pluginStrings?.title ?? pluginData.plugin.defaultTitle ?? pluginType
  const description: string | undefined =
    pluginStrings?.description ?? pluginData.plugin.defaultDescription
  const icon: JSX.Element | undefined = pluginData.icon

  return { pluginType, title, description, icon }
}

function filterOptions(option: SuggestionOption[], text: string) {
  const search = text.replace('/', '').toLowerCase()
  if (!search.length) return option

  const filterResults = new Set<SuggestionOption>()

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

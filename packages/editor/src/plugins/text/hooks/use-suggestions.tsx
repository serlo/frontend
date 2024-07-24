import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import IconFillGaps from '@editor/editor-ui/assets/plugin-icons/icon-fill-the-gap.svg'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg'
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
  pluginType: string
  title: string
  description?: string
  icon?: JSX.Element
}

const hotkeyConfig = {
  enableOnContentEditable: true,
  scopes: ['global'],
}

const allInteractiveExerciseTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.H5p,
  EditorPluginType.TextAreaExercise,
  EditorPluginType.BlanksExercise,
  EditorPluginType.DropzoneImage,
] as const

const exerciseIcons = {
  [EditorPluginType.DropzoneImage]: <IconDropzones />,
  [EditorPluginType.H5p]: <IconH5p />,
  [EditorPluginType.BlanksExercise]: <IconFillGaps />,
  [EditorPluginType.InputExercise]: <IconTextArea />,
  [EditorPluginType.ScMcExercise]: <IconScMcExercise />,
  [EditorPluginType.TextAreaExercise]: <IconTextArea />,
}

export const useSuggestions = (args: useSuggestionsArgs) => {
  const { editor, id, focused, isInlineChildEditor } = args

  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(0)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins
  const exerciseTemplateStrings = editorStrings.templatePlugins.exercise
  const { selection } = editor

  const [searchString, setSearchString] = useState('')
  const [currentlyFocusedItem, setCurrentlyFocusedItem] = useState(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (itemRefs.current[currentlyFocusedItem]) {
      itemRefs.current[currentlyFocusedItem]?.focus()
    }
  }, [currentlyFocusedItem])
  const allowedContextPlugins = useContext(AllowedChildPlugins)

  const allowedPlugins = useMemo(() => {
    const allVisible = editorPlugins
      .getAllWithData()
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

  const interactiveExerciseTypes = allInteractiveExerciseTypes.filter((type) =>
    editorPlugins.getAllWithData().some((plugin) => plugin.type === type)
  )

  const interactivePlugins = interactiveExerciseTypes.map((exerciseType) => {
    return {
      pluginType: 'exercise',
      title: exerciseTemplateStrings[exerciseType],
      icon: exerciseIcons[exerciseType],
    }
  })
  const filteredOptions = useMemo(() => {
    const allOptions = allowedPlugins
      .filter((plugin) => plugin !== 'exercise' && plugin !== 'exerciseGroup')
      .map((type) => {
        return createOption(type, pluginsStrings)
      })
    return filterOptions(allOptions, searchString)
  }, [allowedPlugins, pluginsStrings, searchString])

  const showSuggestions =
    !isInlineChildEditor &&
    focused &&
    filteredOptions.length > 0 &&
    !isSelectionWithinList(editor)

  const { enableScope, disableScope } = useHotkeysContext()

  useEffect(() => {
    if (showSuggestions) {
      disableScope('root-up-down-enter')
    } else {
      enableScope('root-up-down-enter')
    }
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

  useHotkeys(Key.Escape, handleSuggestionsMenuClose, hotkeyConfig)

  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const basicPlugins = options
    const totalItems = basicPlugins.length + interactivePlugins.length
    const basicPluginsCount = basicPlugins.length
    const interactivePluginsStartIndex = basicPluginsCount
    const columns = 5 // assuming 5 columns in the grid
    const fullRows = Math.floor(basicPluginsCount / columns)
    const lastRowItemCount = basicPluginsCount % columns

    const isInLastFullRow = currentlyFocusedItem >= (fullRows - 1) * columns
    const isInLastRowOfBasic =
      currentlyFocusedItem >= fullRows * columns &&
      currentlyFocusedItem < basicPluginsCount

    switch (event.key) {
      case Key.ArrowDown:
        if (isInLastRowOfBasic) {
          // Move focus to the first item in interactive plugins
          setCurrentlyFocusedItem(interactivePluginsStartIndex)
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
        setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
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

  useHotkeys([Key.Enter, ' '], () => {
    if (options[currentlyFocusedItem])
      insertSelectedPlugin(options[currentlyFocusedItem].pluginType)
  })

  const renderPluginItem = (
    { pluginType, title, icon }: SuggestionOption,
    index: number,
    pluginCategory: string
  ) => {
    const selectableIndex =
      pluginCategory === 'basic' ? index : index + options.length
    return (
      <button
        key={index}
        data-qa={`plugin-suggestion-${pluginType}`}
        data-active={index === selected}
        ref={(el) => (itemRefs.current[selectableIndex] = el)}
        onMouseDown={(event: React.MouseEvent) => {
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

  function handleSuggestionsMenuClose(event: KeyboardEvent) {
    if (!closure.current.showSuggestions) return

    event.preventDefault()

    editor.deleteBackward('line')
  }

  const renderedBasicPlugins = options.map((basicItem, index) => {
    return <> {renderPluginItem(basicItem, index, 'basic')}</>
  })

  const renderedInteractivePlugins = interactivePlugins.map((item, index) => {
    return <> {renderPluginItem(item, index, 'interactive')}</>
  })
  return {
    showSuggestions,
    suggestionsProps: {
      options,
      interactivePlugins,
      suggestionsRef,
      selected,
      onMouseDown: insertSelectedPlugin,
      onMouseMove: setSelected,
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
  pluginType: string,
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

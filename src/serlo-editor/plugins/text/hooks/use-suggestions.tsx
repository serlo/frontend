import React, { useContext, useState, useEffect, useRef } from 'react'
import { Editor as SlateEditor, Node, Range, BaseSelection } from 'slate'

import { AllowedChildPlugins } from '../../rows'
import { Paragraph } from '../types'
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
import {
  insertPluginChildAfter,
  insertPluginChildBefore,
  removePluginChild,
  selectDocument,
  selectMayManipulateSiblings,
  selectParent,
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
  const pluginsStrings = useEditorStrings().plugins

  const plugins = usePlugins()
  const allPlugins = useContext(PluginsContext)
    .filter(({ visible }) => visible)
    .map(({ type }) => type)
  const allowed = useContext(AllowedChildPlugins)
  const pluginsData = usePlugins()

  const allOptions = (allowed ?? allPlugins).map((type) =>
    createOption(type, pluginsStrings, pluginsData)
  )
  const { selection } = editor

  const node =
    selection &&
    Range.isCollapsed(selection) &&
    Node.get(editor, selection.focus.path)

  const nodeText = node && Object.hasOwn(node, 'text') ? node.text : ''
  const hasSlash = nodeText.startsWith('/')

  const filteredOptions = filterPlugins(allOptions, nodeText)

  const showSuggestions =
    editable && focused && hasSlash && filteredOptions.length > 0
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
        insertPlugin(option.pluginType)
      })
    }
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

    // split the text-plugin and insert new plugin

    const storeState = store.getState() as unknown

    const document = selectDocument(storeState, id)
    if (!document) return

    const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
    if (!mayManipulateSiblings) return

    const parent = selectParent(storeState, id)
    if (!parent) return

    const allParagraphs = document.state as {
      selection: BaseSelection
      value: Paragraph[]
    }
    const currentParapgraphIndex = allParagraphs.selection?.anchor.path[0] ?? 0

    // replace current text plugin with text plugin and the previous paragraphs

    // TODO: replacing would keep id, slightly preferable but it somehow does not work
    // dispatch(
    //   runReplaceDocumentSaga({
    //     id,
    //     plugin: EditorPluginType.Text,
    //     state: allParagraphs.value.slice(0, currentParapgraphIndex),
    //   })
    // )

    // text plugin and the previous paragraphs
    const prevParagrapphs = allParagraphs.value.slice(0, currentParapgraphIndex)
    if (prevParagrapphs.length)
      dispatch(
        insertPluginChildBefore({
          parent: parent.id,
          sibling: id,
          document: {
            plugin: EditorPluginType.Text,
            state: prevParagrapphs,
          },
          plugins,
        })
      )

    // insert text plugin and the paragraphs that came after
    const afterParagrapphs = allParagraphs.value.slice(
      currentParapgraphIndex + 1
    )
    if (afterParagrapphs.length)
      dispatch(
        insertPluginChildAfter({
          parent: parent.id,
          sibling: id,
          document: {
            plugin: EditorPluginType.Text,
            state: afterParagrapphs,
          },
          plugins,
        })
      )

    // insert empty new plugin
    dispatch(
      insertPluginChildAfter({
        parent: parent.id,
        sibling: id,
        document: { plugin: pluginType },
        plugins,
      })
    )

    // remove (instead of replacing…)
    dispatch(removePluginChild({ parent: parent.id, child: id, plugins }))
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

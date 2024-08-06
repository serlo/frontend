import { EditorInput } from '@editor/editor-ui/editor-input'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useEffect, useRef } from 'react'
import { Key } from 'ts-key-enum'

import { SuggestionItem } from './suggestion-item'
import { SuggestionOption } from '../hooks/use-suggestions'

interface SuggestionsProps {
  basicOptions: SuggestionOption[]
  interactiveOptions: SuggestionOption[]
  searchString: string
  setSearchString: (searchString: string) => void
  itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  currentlyFocusedItem: number
  setCurrentlyFocusedItem: (index: number) => void
  insertSelectedPlugin: (pluginType: EditorPluginType | string) => void
}

export function Suggestions(props: SuggestionsProps) {
  const {
    basicOptions,
    interactiveOptions,
    searchString,
    setSearchString,
    itemRefs,
    currentlyFocusedItem,
    setCurrentlyFocusedItem,
    insertSelectedPlugin,
  } = props

  const editorStrings = useEditorStrings()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
    return () => clearTimeout(focusTimeout)
  }, [])

  const getTooltipPosition = (index: number): 'right' | 'left' | undefined => {
    return index % 5 === 0 ? 'right' : index % 5 === 4 ? 'left' : undefined
  }

  const handleItemClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    pluginType: EditorPluginType | string
  ) => {
    event.preventDefault()
    insertSelectedPlugin(pluginType)
  }

  const handleItemFocus = (index: number) => {
    setCurrentlyFocusedItem(index)
  }

  const handleItemBlur = () => {
    setCurrentlyFocusedItem(-1)
  }

  const renderSuggestions = (
    options: SuggestionOption[],
    offset: number = 0
  ) => {
    return options.map((item, index) => {
      const currentIndex = index + offset
      return (
        <SuggestionItem
          key={currentIndex}
          option={item}
          selected={currentIndex === currentlyFocusedItem}
          ref={(el) => (itemRefs.current[currentIndex] = el)}
          onClick={(event) => handleItemClick(event, item.pluginType)}
          onFocus={() => handleItemFocus(currentIndex)}
          onBlur={handleItemBlur}
          onMouseEnter={() => handleItemFocus(currentIndex)}
          onMouseLeave={() => {
            handleItemBlur()
            itemRefs.current[currentIndex]?.blur()
          }}
          tooltipPosition={getTooltipPosition(index)}
        />
      )
    })
  }

  return (
    <div className="mt-2">
      <div className="sticky top-0 z-10 bg-white pb-3 pl-6 pt-7 shadow-stickysearch">
        <EditorInput
          ref={searchInputRef}
          autoFocus
          placeholder="Search..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === Key.ArrowDown) {
              setCurrentlyFocusedItem(0)
              e.preventDefault()
            }
          }}
          inputWidth="50%"
          width="60%"
          className="ml-8 block"
        />
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.plugins.basicPluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderSuggestions(basicOptions)}
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.plugins.interactivePluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderSuggestions(interactiveOptions, basicOptions.length)}
      </div>
    </div>
  )
}

import { EditorInput } from '@editor/editor-ui/editor-input'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useEffect, useRef } from 'react'

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

export const Suggestions = ({
  basicOptions,
  interactiveOptions,
  searchString,
  setSearchString,
  itemRefs,
  currentlyFocusedItem,
  setCurrentlyFocusedItem,
  insertSelectedPlugin,
}: SuggestionsProps) => {
  const editorStrings = useEditorStrings()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }, [])

  return (
    <div className="mt-2">
      <div className="sticky top-0 z-10 bg-white pb-3 pl-6 pt-7 shadow-stickysearch">
        <EditorInput
          ref={searchInputRef}
          autoFocus
          placeholder="Search..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          inputWidth="50%"
          width="60%"
          className="ml-8 block"
        />
      </div>
      <h1 className="pl-6 pt-4 text-lg font-bold">
        {editorStrings.plugins.basicPluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {basicOptions.map((item, index) => (
          <SuggestionItem
            key={index}
            option={item}
            selected={index === currentlyFocusedItem}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={(event) => {
              event.preventDefault()
              insertSelectedPlugin(item.pluginType)
            }}
            onFocus={() => setCurrentlyFocusedItem(index)}
            onBlur={() => setCurrentlyFocusedItem(-1)}
            onMouseEnter={() => setCurrentlyFocusedItem(index)}
            onMouseLeave={() => {
              setCurrentlyFocusedItem(-1)
              itemRefs.current[index]?.blur()
            }}
          />
        ))}
      </div>
      <h1 className="pl-8 pt-4 text-lg font-bold">
        {editorStrings.plugins.interactivePluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {interactiveOptions.map((item, index) => (
          <SuggestionItem
            key={index}
            option={item}
            selected={index + basicOptions.length === currentlyFocusedItem}
            ref={(el) => (itemRefs.current[index + basicOptions.length] = el)}
            onClick={(event) => {
              event.preventDefault()
              insertSelectedPlugin(item.pluginType)
            }}
            onBlur={() => setCurrentlyFocusedItem(-1)}
            onFocus={() => setCurrentlyFocusedItem(index + basicOptions.length)}
            onMouseEnter={() =>
              setCurrentlyFocusedItem(index + basicOptions.length)
            }
            onMouseLeave={() => {
              setCurrentlyFocusedItem(-1)
              itemRefs.current[index + basicOptions.length]?.blur()
            }}
          />
        ))}
      </div>
    </div>
  )
}

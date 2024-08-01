import { EditorInput } from '@editor/editor-ui/editor-input'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import React, { useEffect, useRef } from 'react'

import type { SuggestionOption } from '../hooks/use-suggestions'

interface SuggestionsProps {
  options: SuggestionOption[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  renderedBasicPlugins: JSX.Element[]
  renderedInteractivePlugins: JSX.Element[]
  searchString: string
  setSearchString: (searchString: string) => void
}

export const Suggestions = ({
  options,
  renderedBasicPlugins,
  renderedInteractivePlugins,
  searchString,
  setSearchString,
}: SuggestionsProps) => {
  const editorStrings = useEditorStrings()

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current?.focus()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputRef.current])

  if (options.length === 0) {
    return <div>{editorStrings.plugins.text.noItemsFound}</div>
  }

  return (
    <div className="mt-2">
      <div className="shadow-stickysearch sticky top-0 z-10 bg-white pb-4 pl-6 pt-4">
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
      <div className="grid grid-cols-5 gap-4 p-4">{renderedBasicPlugins}</div>
      <h1 className="pl-8 pt-4 text-lg font-bold">
        {editorStrings.plugins.interactivePluginsTitle}{' '}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {renderedInteractivePlugins}
      </div>
    </div>
  )
}

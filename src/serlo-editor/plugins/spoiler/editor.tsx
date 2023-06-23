import { useCallback } from 'react'

import { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef } = props
  const editorStrings = useEditorStrings()

  const renderTitle = useCallback(
    (_collapsed: boolean) => {
      return editable ? (
        <input
          onChange={(e) => state.title.set(e.target.value)}
          value={state.title.value}
          placeholder={editorStrings.plugins.spoiler.enterATitle}
          ref={autofocusRef}
          className="-my-1 bg-transparent p-1 focus:outline-editor-primary"
        />
      ) : (
        <>{state.title.value}</>
      )
    },
    [autofocusRef, editable, state.title, editorStrings]
  )

  return (
    <SpoilerRenderer
      title={renderTitle(true)}
      content={state.content.render()}
      openOverwrite={editable} // should include focused but that's unreliable atm.
    />
  )
}

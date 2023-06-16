import { useCallback } from 'react'

import { SpoilerProps } from '.'
import { ExpandableBox } from '../../renderer-ui'
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
          placeholder={editorStrings.spoiler.enterATitle}
          ref={autofocusRef}
          className="bg-transparent p-1 focus:outline-editor-primary"
        />
      ) : (
        <>{state.title.value}</>
      )
    },
    [autofocusRef, editable, state.title, editorStrings]
  )

  return (
    <ExpandableBox renderTitle={renderTitle} editable={editable} alwaysVisible>
      {state.content.render()}
    </ExpandableBox>
  )
}

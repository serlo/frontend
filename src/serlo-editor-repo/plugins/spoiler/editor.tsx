import { useCallback } from 'react'

import { SpoilerProps } from '.'
import { ExpandableBox } from '../../renderer-ui'
import { useSpoilerConfig } from './config'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef } = props
  const config = useSpoilerConfig(props.config)

  const renderTitle = useCallback(
    (_collapsed: boolean) => {
      return editable ? (
        <input
          onChange={(e) => state.title.set(e.target.value)}
          value={state.title.value}
          placeholder={config.i18n.title.placeholder}
          ref={autofocusRef}
          className="bg-transparent p-1 focus:outline-editor-primary"
        />
      ) : (
        <>{state.title.value}</>
      )
    },
    [config.i18n.title.placeholder, autofocusRef, editable, state.title]
  )

  return (
    <ExpandableBox renderTitle={renderTitle} editable={editable} alwaysVisible>
      {state.content.render()}
    </ExpandableBox>
  )
}

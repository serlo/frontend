import * as React from 'react'

import { SpoilerProps } from '.'
import { ExpandableBox } from '../renderer-ui'
import { ThemeProvider } from '../ui'
import { useSpoilerConfig } from './config'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef } = props
  const config = useSpoilerConfig(props.config)
  const { theme } = config
  const spoilerTheme = React.useMemo(() => {
    return {
      rendererUi: {
        expandableBox: {
          toggleBackgroundColor: theme.color,
          toggleColor: '#333',
          containerBorderColor: theme.color,
        },
      },
    }
  }, [theme])

  const renderTitle = React.useCallback(
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
    <ThemeProvider theme={spoilerTheme}>
      <ExpandableBox
        renderTitle={renderTitle}
        editable={editable}
        alwaysVisible
      >
        {state.content.render()}
      </ExpandableBox>
    </ThemeProvider>
  )
}

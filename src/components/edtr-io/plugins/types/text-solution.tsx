import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import { ExpandableBox } from '@edtr-io/renderer-ui'
import { ThemeProvider } from '@edtr-io/ui'
import * as React from 'react'

import { Controls, editorContent, entity, entityType } from './common'
import { RevisionHistory } from './helpers/revision-history'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const textSolutionTypeState = entityType(
  {
    ...entity,
    content: editorContent('solution'),
  },
  {}
)
export type TextSolutionTypeProps = EditorPluginProps<
  typeof textSolutionTypeState,
  { skipControls: boolean }
>

export const textSolutionTypePlugin: EditorPlugin<
  typeof textSolutionTypeState,
  { skipControls: boolean }
> = {
  Component: TextSolutionTypeEditor,
  state: textSolutionTypeState,
  config: {
    skipControls: false,
  },
}

const solutionTheme = {
  rendererUi: {
    expandableBox: {
      toggleBackgroundColor: '#d9edf7',
      containerBorderColor: '#d9edf7',
    },
  },
}

function TextSolutionTypeEditor(props: TextSolutionTypeProps) {
  const loggedInData = useLoggedInData()
  const renderTitle = React.useCallback(
    (collapsed: boolean) => {
      if (!loggedInData) return
      const editorStrings = loggedInData.strings.editor
      return (
        <>
          {collapsed
            ? editorStrings.solution.showSolution
            : editorStrings.solution.hideSolution}
        </>
      )
    },
    [loggedInData]
  )

  return (
    <>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      <ThemeProvider theme={solutionTheme}>
        <ExpandableBox renderTitle={renderTitle} editable={props.editable}>
          {props.state.content.render()}
        </ExpandableBox>
      </ThemeProvider>
      {props.config.skipControls ? null : (
        <Controls subscriptions {...props.state} />
      )}
    </>
  )
}

import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import * as React from 'react'

import { entity, Controls, editorContent, entityType } from './common'
import { RevisionHistory, Settings } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const mathPuzzleTypeState = entityType(
  {
    ...entity,
    source: string(),
    content: editorContent(),
  },
  {}
)

export const mathPuzzleTypePlugin: EditorPlugin<typeof mathPuzzleTypeState> = {
  Component: MathPuzzleTypeEditor,
  state: mathPuzzleTypeState,
  config: {},
}

function MathPuzzleTypeEditor(
  props: EditorPluginProps<typeof mathPuzzleTypeState>
) {
  const { source, content } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {props.renderIntoSettings(
        <Settings>
          <Settings.Textarea
            label={editorStrings.mathPuzzle.sourceCode}
            state={source}
          />
        </Settings>
      )}
      <div className="math-puzzle" data-source={source.value}>
        {content.render()}
      </div>
      <Controls subscriptions {...props.state} />
    </>
  )
}

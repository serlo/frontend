import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import { ExpandableBox } from '@edtr-io/renderer-ui'
import { useCallback } from 'react'

import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

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

function TextSolutionTypeEditor(props: TextSolutionTypeProps) {
  const loggedInData = useLoggedInData()
  const renderTitle = useCallback(
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
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Solution}
        />
      )}
      <ExpandableBox
        renderTitle={renderTitle}
        editable={
          /* Title is not editable. Also rendering collapsed */
          false
        }
      >
        {props.state.content.render()}
      </ExpandableBox>
      {props.config.skipControls ? null : (
        <ToolbarMain showSubscriptionOptions {...props.state} />
      )}
    </>
  )
}

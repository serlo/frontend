import { useCallback } from 'react'

import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'
import { ExpandableBox } from '@/serlo-editor/renderer-ui'

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
  config: { skipControls: false },
}

function TextSolutionTypeEditor(props: TextSolutionTypeProps) {
  const solutionStrings = useEditorStrings().templatePlugins.solution

  const renderTitle = useCallback(
    (collapsed: boolean) => {
      return <>{solutionStrings[collapsed ? 'showSolution' : 'hideSolution']}</>
    },
    [solutionStrings]
  )

  return (
    <>
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
      {props.renderIntoToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Solution}
        />
      )}
    </>
  )
}

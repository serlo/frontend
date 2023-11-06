import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import {
  editorContent,
  entity,
  optionalSerializedChild,
  entityType,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { TextSolutionTypeState } from './text-solution'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
} from '@/serlo-editor/plugin'
import { selectStaticDocument, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Exercise),
  },
  {
    // I think this is not correct because it meant for strings?
    'text-solution': optionalSerializedChild('type-text-solution'),
  }
)

export type TextExerciseTypePluginState = typeof textExerciseTypeState

/** Exercise with an optional solution spoiler */
export const textExerciseTypePlugin: EditorPlugin<
  TextExerciseTypePluginState,
  { skipControls: boolean }
> = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: { skipControls: false },
}

function TextExerciseTypeEditor({
  state,
  config,
  id,
}: EditorPluginProps<TextExerciseTypePluginState, { skipControls: boolean }>) {
  const { content, 'text-solution': textSolution } = state

  const textExStrings = useEditorStrings().templatePlugins.textExercise

  const staticDocument = selectStaticDocument(store.getState(), id)
    ?.state as PrettyStaticState<TextExerciseTypePluginState>
  if (!staticDocument) return null

  const staticSolution = staticDocument[
    'text-solution'
  ] as PrettyStaticState<TextSolutionTypeState>

  return (
    <>
      {config.skipControls ? null : (
        <div className="absolute right-0 -mt-20 mr-side">
          <ContentLoaders
            id={state.id.value}
            currentRevision={state.revision.value}
            onSwitchRevision={state.replaceOwnState}
            entityType={UuidType.Exercise}
          />
        </div>
      )}
      <article
        className={clsx(
          'text-exercise',
          config.skipControls ? 'mt-12' : 'mt-32'
        )}
      >
        {content.render()}
        {textSolution.id ? (
          <>
            <nav className="-mt-block flex justify-end">
              <button
                className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                onClick={textSolution.remove}
              >
                <EditorTooltip text={textExStrings.removeSolution} />
                <FaIcon icon={faTrashAlt} />
              </button>
              <ContentLoaders
                id={staticSolution.id}
                currentRevision={staticSolution.revision}
                onSwitchRevision={(data) =>
                  textSolution.replace(TemplatePluginType.TextSolution, data)
                }
                entityType={UuidType.Solution}
              />
            </nav>
            {textSolution.render()}
          </>
        ) : (
          <div className="-ml-1.5 max-w-[50%]">
            <AddButton onClick={() => textSolution.create()}>
              {textExStrings.createSolution}
            </AddButton>
          </div>
        )}
        {config.skipControls ? null : (
          <ToolbarMain showSubscriptionOptions {...state} />
        )}
      </article>
    </>
  )
}

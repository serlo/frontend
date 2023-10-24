import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { TextExerciseGroupTypeRenderer } from './renderer'
import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from '../common/common'
import { ContentLoaders } from '../helpers/content-loaders/content-loaders'
import { TextExerciseTypePluginState } from '../text-exercise'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  boolean,
  type EditorPlugin,
  type EditorPluginProps,
  list,
  PrettyStaticState,
} from '@/serlo-editor/plugin'
import { selectStaticDocument, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

// text-exercises also include interactive exercises, we keep the naming to avoid db-migration

export const textExerciseGroupTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Rows),
    cohesive: boolean(false),
    /* cohesive field would indicate whether the children of a grouped exercise are cohesive
    this field might be used in the future, but currently it has no effect and can not be changed
    */
  },
  {
    // I think this is not correct because it meant for strings?
    'grouped-text-exercise': list(serializedChild('type-text-exercise')),
  }
)

export type TextExerciseGroupTypePluginState = typeof textExerciseGroupTypeState

export const textExerciseGroupTypePlugin: EditorPlugin<TextExerciseGroupTypePluginState> =
  {
    Component: TextExerciseGroupTypeEditor,
    state: textExerciseGroupTypeState,
    config: {},
  }

function TextExerciseGroupTypeEditor(
  props: EditorPluginProps<TextExerciseGroupTypePluginState>
) {
  const {
    content,
    'grouped-text-exercise': children,
    id,
    revision,
    replaceOwnState,
  } = props.state

  const exGroupStrings = useEditorStrings().templatePlugins.textExerciseGroup

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<TextExerciseGroupTypePluginState>

  if (!staticState) return null
  const staticExercises = staticState[
    'grouped-text-exercise'
  ] as PrettyStaticState<TextExerciseTypePluginState>[]

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side flex">
        <ContentLoaders
          id={id.value}
          currentRevision={revision.value}
          onSwitchRevision={replaceOwnState}
          entityType={UuidType.ExerciseGroup}
        />
      </div>
      <article className="exercisegroup mt-32">
        <TextExerciseGroupTypeRenderer
          content={<>{content.render()}</>}
          exercises={children.map((child, index) => {
            return {
              id: child.id,
              element: (
                <>
                  <nav className="flex justify-end">
                    <button
                      className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                      onClick={() => children.remove(index)}
                    >
                      <EditorTooltip text={exGroupStrings.removeExercise} />
                      <FaIcon icon={faTrashAlt} />
                    </button>
                    <ContentLoaders
                      id={staticExercises[index].id}
                      currentRevision={staticExercises[index].revision}
                      onSwitchRevision={(data) =>
                        child.replace(TemplatePluginType.TextExercise, data)
                      }
                      entityType={UuidType.GroupedExercise}
                    />
                  </nav>
                  {child.render()}
                </>
              ),
            }
          })}
        />
        <AddButton onClick={() => children.insert()}>
          {exGroupStrings.addExercise}
        </AddButton>
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
    </>
  )
}

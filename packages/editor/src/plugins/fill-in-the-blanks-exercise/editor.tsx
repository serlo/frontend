import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { selectDocument, selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { FillInTheBlanksExerciseProps, FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused } = props

  const isRendererTextPluginFocused = useAppSelector((storeState) => {
    return selectIsFocused(storeState, props.state.text.id)
  })

  const editorStrings = useEditorStrings()

  const hasFocus = focused || isRendererTextPluginFocused

  // Rerender if text plugin state changes
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  if (!textPluginState) return null

  return (
    <div className="mb-12 mt-10 pt-4">
      {hasFocus ? (
        // TODO: Add button to toggle between fill-in-the-blanks and drag-and-drop
        <PluginToolbar
          pluginType={EditorPluginType.FillInTheBlanksExercise}
          className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
          pluginControls={<InteractiveToolbarTools id={props.id} />}
        />
      ) : null}
      <FillInTheBlanksRenderer
        text={props.state.text.render({
          config: {
            placeholder: editorStrings.plugins.blanksExercise.placeholder,
          },
        })}
        textPluginState={textPluginState}
        mode={props.state.mode.value as FillInTheBlanksMode}
        initialTextInBlank="correct-answer"
      />

      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </div>
  )
}

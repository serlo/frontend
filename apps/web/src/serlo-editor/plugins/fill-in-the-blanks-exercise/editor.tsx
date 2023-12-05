import type { FillInTheBlanksExerciseProps, FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { selectDocument, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused } = props

  // Rerender if text plugin state changes
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  if (!textPluginState) return null

  return (
    <div className="mb-12 mt-10 pt-4">
      {/* while developing */}
      <div className="hidden">
        {focused ? (
          // TODO: Add button to toggle between fill-in-the-blanks and drag-and-drop
          // TODO: Make toolbars nested like in multimedia
          <PluginToolbar
            pluginType={EditorPluginType.FillInTheBlanksExercise}
            className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
          />
        ) : null}
      </div>
      <FillInTheBlanksRenderer
        text={props.state.text.render()}
        textPluginState={textPluginState}
        mode={props.state.mode.value as FillInTheBlanksMode}
        initialTextInBlank="correct-answer"
      />

      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </div>
  )
}

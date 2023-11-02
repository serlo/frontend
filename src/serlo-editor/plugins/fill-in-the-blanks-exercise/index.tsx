import { FillInTheBlanksRenderer } from './renderer'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  child,
  string,
} from '@/serlo-editor/plugin'
import { selectDocument, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const fillInTheBlanksExercise: EditorPlugin<FillInTheBlanksExerciseState> =
  {
    Component: FillInTheBlanksExerciseEditor,
    config: {},
    state: createFillInTheBlanksExerciseState(),
  }

export type FillInTheBlanksExerciseState = ReturnType<
  typeof createFillInTheBlanksExerciseState
>

function createFillInTheBlanksExerciseState() {
  return object({
    text: child({
      plugin: EditorPluginType.Text,
      config: {
        formattingOptions: [
          TextEditorFormattingOption.code,
          TextEditorFormattingOption.colors,
          TextEditorFormattingOption.headings,
          TextEditorFormattingOption.katex,
          TextEditorFormattingOption.links,
          TextEditorFormattingOption.lists,
          TextEditorFormattingOption.math,
          TextEditorFormattingOption.paragraphs,
          TextEditorFormattingOption.richTextBold,
          TextEditorFormattingOption.richTextItalic,
          TextEditorFormattingOption.blank,
        ],
      },
    }),
    mode: string('fill-in-the-blanks'),
    // mode: string('drag-and-drop'),
  })
}

export type FillInTheBlanksExerciseProps =
  EditorPluginProps<FillInTheBlanksExerciseState>

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused } = props
  // Only for debug view
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  if (!textPluginState) return null

  return (
    <>
      <div className="hidden">
        {focused ? <FillInTheBlanksExerciseToolbar /> : null}
      </div>
      <FillInTheBlanksRenderer
        text={props.state.text.render()}
        textPluginState={textPluginState}
        mode={props.state.mode.value}
      />

      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </>
  )
}

// TODO: Add button to toggle between fill-in-the-blanks and drag-and-drop
// TODO: Make toolbars nested like in multimedia
function FillInTheBlanksExerciseToolbar() {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.FillInTheBlanksExercise}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}

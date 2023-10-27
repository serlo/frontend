import { FillInTheGapRenderer } from './renderer'
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

export const fillInTheGapExercise: EditorPlugin<FillInTheGapExerciseState> = {
  Component: FillInTheGapExerciseEditor,
  config: {},
  state: createFillInTheGapExerciseState(),
}

export type FillInTheGapExerciseState = ReturnType<
  typeof createFillInTheGapExerciseState
>

function createFillInTheGapExerciseState() {
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
          TextEditorFormattingOption.gap,
        ],
      },
    }),
    mode: string('fill-in-the-gap'),
    // mode: string('drag-and-drop'),
  })
}

export type FillInTheGapExerciseProps =
  EditorPluginProps<FillInTheGapExerciseState>

export function FillInTheGapExerciseEditor(props: FillInTheGapExerciseProps) {
  const { focused } = props
  // Only for debug view
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  if (!textPluginState) return null

  return (
    <>
      <div className="hidden">
        {focused ? <FillInTheGapExerciseToolbar /> : null}
      </div>
      <FillInTheGapRenderer
        text={props.state.text.render()}
        textPluginState={textPluginState}
        mode={props.state.mode.value}
      />

      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </>
  )
}

// TODO: Add button to toggle between fill-in-the-gap and drag-and-drop
// TODO: Make toolbars nested like in multimedia
function FillInTheGapExerciseToolbar() {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.FillInTheGapExercise}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}

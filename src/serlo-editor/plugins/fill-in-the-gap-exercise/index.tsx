import { useMemo } from 'react'

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
    // mode: string('drag-and-drop'),
    mode: string('fill-in-the-gap'),
  })
}

export type FillInTheGapExerciseProps =
  EditorPluginProps<FillInTheGapExerciseState>

export function FillInTheGapExerciseEditor(props: FillInTheGapExerciseProps) {
  const { focused, state } = props
  const { mode } = state
  // Get state of text component and rerender when it changes.
  const textState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  const gapSolutions: string[] = useMemo(() => {
    const matches = JSON.stringify(textState).matchAll(
      /"correctAnswer":"(\w*)"/gi
    )
    if (!matches) return []
    const result = []
    for (const match of matches) {
      result.push(match[match.length - 1])
    }
    return result
  }, [textState])

  return (
    <>
      <div className="hidden">
        {focused ? <FillInTheGapExerciseToolbar /> : null}
      </div>
      {props.state.text.render()}

      {mode.value === 'drag-and-drop' && gapSolutions ? (
        <div className="">
          {gapSolutions.map((gapSolution, index) => (
            <span className="mx-2" key={index}>
              {gapSolution}
            </span>
          ))}
        </div>
      ) : null}
    </>
  )
}

function FillInTheGapExerciseToolbar() {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.FillInTheGapExercise}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}

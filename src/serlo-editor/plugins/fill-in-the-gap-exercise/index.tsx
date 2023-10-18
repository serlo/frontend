import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

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
    mode: string('drag-n-drop'),
  })
}

export type FillInTheGapExerciseProps =
  EditorPluginProps<FillInTheGapExerciseState>

export function FillInTheGapExerciseEditor(props: FillInTheGapExerciseProps) {
  const { focused } = props
  // Get state of text component and rerender when it changes.
  const textState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  // @@@ Hardcoded for now. Should get gap content from textState.
  const gapSolutions = ['Solution A', 'Solution B']

  return (
    <>
      <div className="hidden">
        {focused ? <FillInTheGapExerciseToolbar /> : null}
      </div>
      <DragDropContext onDragEnd={(result) => {
        // @@@ How to get the new info to the gap component?
        // Option A: Modify text component state in store.
        // Option: setState in Gap component. But I need to get a reference somehow? 
      }}>
        {props.state.text.render()}
        <div className="">
          <Droppable droppableId="gap-solutions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {gapSolutions.map((gapSolution, i) => {
                  return (
                    <Draggable draggableId={i.toString()} index={i} key={i}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
                        >
                          {gapSolution}
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="hidden">{JSON.stringify(textState)}</div>
      </DragDropContext>
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

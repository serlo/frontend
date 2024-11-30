import {
  type EditorPlugin,
  object,
  EditorPluginProps,
  boolean,
  string,
  number,
} from '@editor/plugin'

import { TextAreaExerciseEditor } from './editor'

function createTextAreaExerciseState() {
  return object({
    solution: string(''),
    allowShowSolution: boolean(true),
    solutionStrategy: string(''),
    allowShowSolutionStrategy: boolean(true),
    allowWritingAssistance: boolean(false),
    evaluationCriteria: string(''),
    allowShowEvaluationCriteria: boolean(false),
    additionalInfoForAi: string(''), // 'Hinweise, Fehlkonzepte, ...
    allowParagraphFeedback: boolean(false),
    allowSubmitFeedback: boolean(false),
    timeInMinutes: number(-1), // -1 -> No time limit
    numberOfRetries: number(3), // -1 -> Unlimited
  })
}

export const textAreaExercisePlugin: EditorPlugin<TextAreaExercisePluginState> =
  {
    Component: TextAreaExerciseEditor,
    state: createTextAreaExerciseState(),
    config: {},
  }

export type TextAreaExercisePluginState = ReturnType<
  typeof createTextAreaExerciseState
>
export type TextAreaExerciseProps =
  EditorPluginProps<TextAreaExercisePluginState>

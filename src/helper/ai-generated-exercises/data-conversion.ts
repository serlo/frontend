import { either as E } from 'fp-ts'
import { v4 as uuidv4 } from 'uuid'
import * as t from 'io-ts'

import {
  InputDecoder,
  InputScMcDecoder,
  InputShortAnswerDecoder,
} from './decoders'
import {
  InputExerciseState,
  ScMcExerciseState,
  Question,
  TypeTextExercise,
  TypeTextExerciseGroup,
  TypeTextExerciseState,
} from './types'
import { CustomText, MathElement, Paragraph } from '@/serlo-editor/plugins/text'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

type InputScMc = t.TypeOf<typeof InputScMcDecoder>
type InputShortAnswer = t.TypeOf<typeof InputShortAnswerDecoder>

export function convertAiGeneratedDataToEditorData(input: string) {
  try {
    const parsed = JSON.parse(input) as unknown

    const decoded = InputDecoder.decode(parsed)

    if (E.isLeft(decoded)) {
      throw new TypeError('The data from the API has an invalid structure.')
    }

    const inputContent = decoded.right

    let exerciseState: InputExerciseState | ScMcExerciseState

    // Define and return the output object for TypeTextExerciseGroup
    if (inputContent.subtasks.length > 1) {
      const groupedTextExercise = inputContent.subtasks.map((subtask) => {
        // Define and return the output object for InputExercise
        if (isShortAnswerExercise(subtask)) {
          exerciseState = createInputExerciseState(subtask)
          return withTypeTextExerciseStateWrapper(exerciseState)
        }
        // Define and return the output object for ScMcExercise
        exerciseState = createScMcExerciseState(subtask)
        return withTypeTextExerciseStateWrapper(exerciseState)
      })

      return withTypeTextExerciseGroupWrapper(
        groupedTextExercise,
        inputContent.heading
      )
    }

    // Define and return the output object for TypeTextExercise
    if (inputContent.subtasks.length == 1) {
      const inputTask = inputContent.subtasks[0]
      // Define and return the output object for ScMcExercise
      if (
        inputTask.type === 'multiple_choice' ||
        inputTask.type === 'single_choice'
      ) {
        exerciseState = createScMcExerciseState(inputTask)
        return {
          plugin: 'type-text-exercise',
          state: withTypeTextExerciseStateWrapper(exerciseState),
        }
      }

      // Define and return the output object for InputExercise
      if (inputTask.type === 'short_answer') {
        exerciseState = {
          content: createQuestion(inputTask.question),
          interactive: {
            plugin: EditorPluginType.InputExercise,
            state: {
              type: 'input-string-normalized-match-challenge',
              unit: '',
              answers: [],
            },
            id: uuidv4(),
          },
        }

        return {
          plugin: 'type-text-exercise',
          state: withTypeTextExerciseStateWrapper(exerciseState),
        }
      }
      return null
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'An error occured while converting AI generated exercise data to editor data: ',
      error
    )
    return null
  }
}

function withTypeTextExerciseStateWrapper(
  state: InputExerciseState | ScMcExerciseState
): TypeTextExerciseState {
  return {
    changes: '',
    content: {
      plugin: 'exercise',
      state,
    },
    id: 0,
    revision: 0,
    'text-solution': null,
  }
}

function withTypeTextExerciseGroupWrapper(
  states: Array<TypeTextExerciseState>,
  content: string
): TypeTextExerciseGroup {
  return {
    plugin: 'type-text-exercise-group',
    state: {
      changes: '',
      content: {
        state: createQuestion(content),
      },
      id: 0,
      revision: 0,
      'grouped-text-exercise': states,
    },
  }
}

function createQuestion(value: string): Question {
  return {
    plugin: EditorPluginType.Rows,
    state: [
      {
        plugin: EditorPluginType.Text,
        state: convertStringToTextPluginParagraph(value),
        id: uuidv4(),
      },
    ],
    id: uuidv4(),
  }
}

function createScMcExerciseState(subtask: InputScMc): ScMcExerciseState {
  return {
    content: createQuestion(subtask.question),
    interactive: {
      plugin: EditorPluginType.ScMcExercise,
      state: {
        isSingleChoice: subtask.type === 'single_choice',
        answers: subtask.options.map((option: any, index: any) => ({
          content: {
            plugin: EditorPluginType.Text,
            state: convertStringToTextPluginParagraph(option),
            id: uuidv4(),
          },
          isCorrect: subtask.correct_options.includes(index),
        })),
      },
    },
  }
}

function createInputExerciseState(
  subtask: InputShortAnswer
): InputExerciseState {
  return {
    content: createQuestion(subtask.question),
    interactive: {
      plugin: EditorPluginType.InputExercise,
      state: {
        type: 'input-string-normalized-match-challenge',
        unit: '',
        answers: [
          {
            value: subtask.correct_answer,
            isCorrect: true,
          },
        ],
      },
      id: uuidv4(),
    },
  }
}

// Type guard to differentiate between short_answer and single_choice/multiple_choice
function isShortAnswerExercise(
  input: InputScMc | InputShortAnswer
): input is InputShortAnswer {
  return input.type === 'short_answer'
}

function convertStringToTextPluginParagraph(content: string): [Paragraph] {
  const textPluginState = []
  let startIndex = 0
  let isInMath = false

  for (const [i, char] of content.split('').entries()) {
    // When at '$', if currently in Latex expression - push the current segment as MathElement,
    // otherwise push the current segment as CustomText
    if (char === '$') {
      const segment = content.substring(startIndex, i)
      if (segment !== '') {
        textPluginState.push(
          isInMath ? createMathElement(segment) : createCustomText(segment)
        )
        isInMath = !isInMath
      }
      startIndex = i + 1
    }

    // When at the last character, push the remaining string as CustomText
    if (i === content.length - 1) {
      const segment = content.substring(startIndex, i + 1)
      if (segment !== '') {
        textPluginState.push(createCustomText(segment))
      }
    }
  }

  return [{ type: 'p', children: textPluginState }]
}

function createCustomText(value: string): CustomText {
  return { text: value }
}

function createMathElement(value: string): MathElement {
  return {
    type: 'math',
    src: value,
    inline: true,
    children: [{ text: '' }],
  }
}

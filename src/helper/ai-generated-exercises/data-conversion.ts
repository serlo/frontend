import { either as E } from 'fp-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

import {
  ExpectedExerciseTypes,
  ExpectedMultipleChoiceType,
  ExpectedSingleChoiceType,
  InputMultipleChoiceDecoder,
  InputShortAnswerDecoder,
  InputSingleChoiceDecoder,
  humanReadableMultipleChoiceExample,
  humanReadableShortAnswerExample,
  humanReadableSingleChoiceExample,
} from './decoders'
import { InputExerciseType } from '@/serlo-editor/plugins/input-exercise/input-exercise-type'
import { CustomText, MathElement } from '@/serlo-editor/plugins/text'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorExerciseDocument,
  EditorSolutionDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

function decodeAiGeneratedExercise(exercise: ExpectedExerciseTypes) {
  const exerciseType = exercise?.type ?? null

  switch (exerciseType) {
    case 'single_choice': {
      const decoded = InputSingleChoiceDecoder.decode(exercise)
      return { decoded, humanReadableExample: humanReadableSingleChoiceExample }
    }
    case 'multiple_choice': {
      const decoded = InputMultipleChoiceDecoder.decode(exercise)

      return {
        decoded,
        humanReadableExample: humanReadableMultipleChoiceExample,
      }
    }
    case 'short_answer': {
      const decoded = InputShortAnswerDecoder.decode(exercise)
      return { decoded, humanReadableExample: humanReadableShortAnswerExample }
    }
    default: {
      const unexpectedType = (exercise as unknown as { type: unknown }).type as
        | string
        | null

      throw new Error(`Unsupported exercise type: ${unexpectedType}`)
    }
  }
}

type Interactive = EditorExerciseDocument['state']['interactive']

function createInteractive(exercise: ExpectedExerciseTypes): Interactive {
  // ! I think this type assertion doesn't properly work with the
  // discriminatory type of ScMcExercise. I think the child() function is to
  // blame but I haven't found an easy solution without complicating things
  // with type arguments.
  switch (exercise.type) {
    case 'single_choice':
    case 'multiple_choice': {
      const isSingleChoice = isSingleChoiceGuard(exercise)
      const interactive: Interactive = {
        plugin: EditorPluginType.ScMcExercise,
        state: {
          isSingleChoice: exercise.type === 'single_choice',
          answers: exercise.options.map((option, index) => ({
            content: {
              plugin: EditorPluginType.Text,
              state: [
                {
                  type: 'p',
                  children: convertStringToMathNodes(option),
                },
              ],
            },
            isCorrect: isSingleChoice
              ? index === exercise.correct_option
              : exercise.correct_options.includes(index),
            feedback: {
              plugin: EditorPluginType.Text,
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: (
                        isSingleChoice
                          ? index === exercise.correct_option
                          : exercise.correct_options.includes(index)
                      )
                        ? 'Sehr gut!'
                        : 'Leider falsch!',
                    },
                  ],
                },
              ],
            },
          })),
        },
      }
      return interactive
    }

    case 'short_answer': {
      const interactive: Interactive = {
        plugin: EditorPluginType.InputExercise,
        state: {
          // ? How can we differentiate between NumberExact and
          // ExpressionEqual? Do we need to include it in the prompt?
          type: InputExerciseType.NumberExact,
          unit: '',
          answers: [
            {
              value: exercise.correct_answer,
              isCorrect: true,
              feedback: {
                plugin: EditorPluginType.Text,
                state: [
                  {
                    type: 'p',
                    children: [
                      {
                        text: 'Sehr gut!',
                      },
                    ],
                  },
                ],
              },
            },
            // ? Should we add feedback for a wrong but similar answer? We'd
            // have to include wrong answers in the prompt.
          ],
        },
      }

      return interactive
    }

    default:
      throw new Error(
        `Error when creating 'interactive' of generated exercise.`
      )
  }
}

function createSolution(
  exercise: ExpectedExerciseTypes
): EditorSolutionDocument {
  return {
    plugin: EditorPluginType.Solution,
    state: {
      prerequisite: undefined,
      strategy: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            // ? Should we add the 'strategy' to the prompt too?
            children: [{ text: '' }],
          },
        ],
      },
      steps: {
        plugin: EditorPluginType.Rows,
        state: exercise.steps.map((step) => ({
          plugin: EditorPluginType.Text,
          state: [
            {
              type: 'p',
              children: convertStringToMathNodes(step),
            },
          ],
        })),
      },
    },
    // doesn't have an id yet
    id: undefined,
  }
}

export function convertAiGeneratedScExerciseToEditorDocument(
  input: string
): EditorExerciseDocument[] {
  if (!input) {
    return []
  }

  const parsed = JSON.parse(input) as ExpectedExerciseTypes
  const { decoded, humanReadableExample } = decodeAiGeneratedExercise(parsed)
  console.log('decoded: ', { decoded })

  if (E.isLeft(decoded)) {
    const errors = PathReporter.report(decoded)
    console.error('Decoding failed', errors)
    throw new TypeError(
      `The data from the API seems to have an invalid structure.\n\n${errors
        .map((error) => `${error.split('|}/')[1]} was not provided correctly`)
        .join('\n')} \n\nReceived: \n${JSON.stringify(
        parsed,
        null,
        2
      )}\n\nExpected format: \n${JSON.stringify(humanReadableExample, null, 2)}`
    )
  }

  const inputContent: ExpectedExerciseTypes = decoded.right
  console.log('InputContent: ', { inputContent })

  const interactive = createInteractive(inputContent)
  const solution = createSolution(inputContent)

  const exerciseDocument: EditorExerciseDocument = {
    plugin: EditorPluginType.Exercise,
    state: {
      content: {
        plugin: EditorPluginType.Rows,
        state: [
          {
            plugin: EditorPluginType.Text,
            // ! This needs to be rendered semantically as h1, however we want the
            // size of h3
            state: [
              {
                type: 'h',
                level: 3,
                children: convertStringToMathNodes(inputContent.heading),
              },
            ],
          },
          {
            plugin: EditorPluginType.Text,
            state: [
              {
                type: 'p',
                children: convertStringToMathNodes(inputContent.question),
              },
            ],
          },
        ],
      },
      interactive,
    },
    // doesn't have an id yet
    id: undefined,
    solution,
  }

  return [exerciseDocument]
}

function isSingleChoiceGuard(
  input: ExpectedSingleChoiceType | ExpectedMultipleChoiceType
): input is ExpectedSingleChoiceType {
  return input.type === 'single_choice'
}

type MathElementOrText = MathElement | CustomText

function convertStringToMathNodes(content: string) {
  const segments = content.split('$')
  return segments.reduce<MathElementOrText[]>((acc, segment, index) => {
    if (index % 2 === 0) {
      // Even index means we're dealing with regular text
      if (segment !== '') {
        return [...acc, { text: segment }]
      }
    } else {
      // Odd index means math content
      const mathElement: MathElement = {
        type: 'math',
        src: segment,
        inline: true,
        children: [{ text: segment }],
      }
      return [...acc, mathElement]
    }

    return acc
  }, [])
}

// function createLicense(): LicenseData {
//   return {
//     id: 1,
//     title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
//     shortTitle: 'CC BY-SA 4.0',
//     url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
//     isDefault: true,
//   }
// }

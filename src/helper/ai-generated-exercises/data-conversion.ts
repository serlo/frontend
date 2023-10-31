import { either as E } from 'fp-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

// import * as t from 'io-ts'
// import { v4 as uuidv4 } from 'uuid'

import {
  ExpectedExerciseTypes,
  ExpectedMultipleChoiceType,
  ExpectedSingleChoiceType,
  InputMultipleChoiceDecoder,
  InputShortAnswerDecoder,
  // InputDecoder,
  // InputMultipleChoiceDecoder,
  // InputShortAnswerDecoder,
  InputSingleChoiceDecoder,
  humanReadableMultipleChoiceExample,
  humanReadableShortAnswerExample,
  humanReadableSingleChoiceExample,
} from './decoders'
// import {
//   InputExerciseState,
//   ScMcExerciseState,
//   TypeTextExerciseGroup,
//   TypeTextExerciseState,
// } from './types'
// import { LicenseData } from '@/data-types'
import { InputExerciseType } from '@/serlo-editor/plugins/input-exercise/input-exercise-type'
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
                  children: [{ text: option }],
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
              children: [{ text: step }],
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
                children: [{ text: inputContent.heading }],
              },
            ],
          },
          {
            plugin: EditorPluginType.Text,
            state: [{ type: 'p', children: [{ text: inputContent.question }] }],
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

// function createLicense(): LicenseData {
//   return {
//     id: 1,
//     title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
//     shortTitle: 'CC BY-SA 4.0',
//     url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
//     isDefault: true,
//   }
// }

// function convertStringToTextPluginParagraph(
//   content: string
// ): [FrontendSlatePNode] {
//   const textPluginState: FrontendContentNode[] = []
//   let startIndex = 0
//   let isInMath = false

//   for (const [i, char] of content.split('').entries()) {
//     // When at '$', if currently in Latex expression - push the current segment as MathElement,
//     // otherwise push the current segment as CustomText
//     if (char === '$') {
//       const segment = content.substring(startIndex, i)
//       if (segment !== '') {
//         textPluginState.push(
//           isInMath ? createMathElement(segment) : createCustomText(segment)
//         )
//         isInMath = !isInMath
//       }
//       startIndex = i + 1
//     }

//     // When at the last character, push the remaining string as CustomText
//     if (i === content.length - 1) {
//       const segment = content.substring(startIndex, i + 1)
//       if (segment !== '') {
//         textPluginState.push(createCustomText(segment))
//       }
//     }
//   }

//   return [{ type: FrontendNodeType.SlateP, children: textPluginState }]
// }

// function createCustomText(value: string): FrontendTextNode {
//   return { text: value, type: FrontendNodeType.Text }
// }

// function createMathElement(value: string): FrontendInlineMathNode {
//   return {
//     type: FrontendNodeType.InlineMath,
//     // src: value,
//     formula: value,
//     formulaSource: value,
//     // inline: true,
//     // children: [{ text: '' }],
//   }
// }

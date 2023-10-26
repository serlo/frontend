import { either as E } from 'fp-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

// import * as t from 'io-ts'
// import { v4 as uuidv4 } from 'uuid'

import {
  ExpectedMultipleChoiceType,
  ExpectedSingleChoiceType,
  InputMultipleChoiceDecoder,
  // InputDecoder,
  // InputMultipleChoiceDecoder,
  // InputShortAnswerDecoder,
  InputSingleChoiceDecoder,
  humanReadableSingleChoiceExample,
} from './decoders'
// import {
//   InputExerciseState,
//   ScMcExerciseState,
//   TypeTextExerciseGroup,
//   TypeTextExerciseState,
// } from './types'
// import { LicenseData } from '@/data-types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorExerciseDocument,
  EditorSolutionDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

// type InputSingleChoice = t.TypeOf<typeof InputSingleChoiceDecoder>
// type InputMultipleChoice = t.TypeOf<typeof InputMultipleChoiceDecoder>
// type InputShortAnswer = t.TypeOf<typeof InputShortAnswerDecoder>

export function convertAiGeneratedScExerciseToEditorDocument(
  input: string
): EditorExerciseDocument[] {
  if (!input) {
    return []
  }

  // Better option would be to use the generic InputParser with the union type Sc | Mc |
  // We assume there is only SC or MC now!
  const doWeExpectSingleChoice = input.includes('"type": "single_choice"')

  const parsed = JSON.parse(input) as unknown

  // [ { type: 'single_choice }, {type: 'multiple_choice' }, { type: 'fill_in_the_gap' }]

  console.log('Parsed: ', { parsed })
  const decoded = doWeExpectSingleChoice
    ? InputSingleChoiceDecoder.decode(parsed)
    : InputMultipleChoiceDecoder.decode(parsed)
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
      )}\n\nExpected format: \n${JSON.stringify(
        humanReadableSingleChoiceExample,
        null,
        2
      )}`
    )
  }

  const inputContent = decoded.right
  console.log('InputContent: ', { inputContent })

  const isSingleChoice = isSingleChoiceGuard(inputContent)

  // ! I think this type assertion doesn't properly work with the
  // discriminatory type of ScMcExercise. I think the child() function is to
  // blame but I haven't found an easy solution without complicating things
  // with type arguments.
  const interactive: EditorExerciseDocument['state']['interactive'] = {
    plugin: EditorPluginType.ScMcExercise,
    state: {
      isSingleChoice: inputContent.type === 'single_choice',
      answers: inputContent.options.map((option, index) => ({
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
          ? index === inputContent.correct_option
          : inputContent.correct_options.includes(index),
        feedback: {
          plugin: EditorPluginType.Text,
          state: [
            {
              type: 'p',
              children: [
                {
                  text: (
                    isSingleChoice
                      ? index === inputContent.correct_option
                      : inputContent.correct_options.includes(index)
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

  const solution: EditorSolutionDocument = {
    plugin: EditorPluginType.Solution,
    state: {
      prerequisite: undefined,
      strategy: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            // ? Should we add the 'strategy' to the prompt too?
            children: [{ text: '-' }],
          },
        ],
      },
      steps: {
        plugin: EditorPluginType.Rows,
        state: inputContent.steps.map((step) => ({
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
  } as EditorSolutionDocument

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

// export function convertAiGeneratedDataToEditorData(
//   input: string
// ): EditorExerciseDocument[] {
//   if (!input) {
//     return []
//   }

//   try {
//     const parsed = JSON.parse(input) as unknown

//     console.log('Parsed: ', { parsed })
//     const decoded = InputDecoder.decode(parsed)
//     console.log('decoded: ', { decoded })

//     if (E.isLeft(decoded)) {
//       throw new TypeError(
//         'The data from the API has an invalid structure or is not a single choice exercise.'
//       )
//     }

//     const inputContent = decoded.right
//     console.log('InputContent: ', { inputContent })

//     // Define and return the output object for TypeTextExerciseGroup
//     if (inputContent.subtasks.length > 1) {
//       const groupedTextExercise: FrontendExerciseNode[] =
//         inputContent.subtasks.map((subtask) => {
//           // Define and return the output object for InputExercise.
//           if (isShortAnswerExercise(subtask)) {
//             const exerciseState = createInputExerciseState(subtask)

//             return wrapIntoFrontendExerciseNode(exerciseState)
//             // return withTypeTextExerciseStateWrapper(exerciseState)
//           }
//           // !!!!

//           // Define and return the output object for ScMcExercise
//           const exerciseState = createScMcExerciseState(subtask)
//           const exerciseFrontendNode =
//             wrapIntoFrontendExerciseNode(exerciseState)

//           console.log('ExerciseFrontendNode: ', { exerciseFrontendNode })

//           return exerciseFrontendNode
//         })

//       return groupedTextExercise
//       // TODO wrap into an exercise group or should we leave it at returning
//       // just the bare exercise nodes?

//       // return withTypeTextExerciseGroupWrapper(
//       //   groupedTextExercise,
//       //   inputContent.heading
//       // )
//     }

//     // Define and return the output object for TypeTextExercise
//     if (inputContent.subtasks.length === 1) {
//       const inputTask = inputContent.subtasks[0]
//       // Define and return the output object for ScMcExercise
//       if (
//         inputTask.type === 'multiple_choice' ||
//         inputTask.type === 'single_choice'
//       ) {
//         const exerciseState = createScMcExerciseState(inputTask)
//         return {
//           plugin: 'type-text-exercise',
//           state: withTypeTextExerciseStateWrapper(exerciseState),
//         }
//       }

//       // Define and return the output object for InputExercise
//       if (inputTask.type === 'short_answer') {
//         const exerciseState = {
//           content: createQuestion(inputTask.question),
//           interactive: {
//             plugin: EditorPluginType.InputExercise,
//             state: {
//               type: 'input-string-normalized-match-challenge',
//               unit: '',
//               answers: [],
//             },
//             id: uuidv4(),
//           },
//         }

//         return {
//           plugin: 'type-text-exercise',
//           state: withTypeTextExerciseStateWrapper(exerciseState),
//         }
//       }
//       return null
//     }
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(
//       'An error occured while converting AI generated exercise data to editor data: ',
//       error
//     )
//     return null
//   }
// }

// function withTypeTextExerciseStateWrapper(
//   state: InputExerciseState | ScMcExerciseState
// ): TypeTextExerciseState {
//   return {
//     changes: '',
//     content: {
//       plugin: 'exercise',
//       state,
//     },
//     id: 0,
//     revision: 0,
//     'text-solution': null,
//   }
// }

// function createLicense(): LicenseData {
//   return {
//     id: 1,
//     title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
//     shortTitle: 'CC BY-SA 4.0',
//     url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
//     isDefault: true,
//   }
// }

// function createSolution(answers): BareSolution {
//   return {
//     trashed: false,
//     license: createLicense(),
//     content: {
//       // TODO let's check if we find a way to define a prerequisite from the
//       // generated exercises
//       prerequisite: undefined,
//       strategy: [],
//       steps: [
//         {
//           type: FrontendNodeType.SlateContainer,
//           children: [
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: 'Du kannst das Ergebnis mit dem Dreisatz berechnen.',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: FrontendNodeType.SlateContainer,
//           children: [
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: '5 Kugeln ≙  6 Euro',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: '1 Kugel   ≙  1,20 Euro ',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: '2 Kugeln ≙  2,40 Euro',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   }
// }

// const exampleSolution: BareSolution = {
//   content: {
//     prerequisite: {
//       id: 1769,
//       title: 'Dreisatz',
//       href: '/mathe/1769/dreisatz',
//     },
//     strategy: [],
//     steps: [],
//   },
//   trashed: false,
//   license: {
//     id: 1,
//     url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
//     title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
//     shortTitle: 'CC BY-SA 4.0',
//     isDefault: true,
//   },
//   // steps with somehow invalid types
//   //     {
//   //       type: 'slate-container',
//   //       children: [
//   //         {
//   //           type: 'slate-p',
//   //           children: [
//   //             {
//   //               text: 'Du kannst das Ergebnis mit dem Dreisatz berechnen.',
//   //               type: 'text',
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       type: 'slate-container',
//   //       children: [
//   //         {
//   //           type: 'slate-p',
//   //           children: [
//   //             {
//   //               text: '5 Kugeln ≙  6 Euro',
//   //               type: 'text',
//   //             },
//   //           ],
//   //         },
//   //         {
//   //           type: 'slate-p',
//   //           children: [
//   //             {
//   //               text: '1 Kugel   ≙  1,20 Euro ',
//   //               type: 'text',
//   //             },
//   //           ],
//   //         },
//   //         {
//   //           type: 'slate-p',
//   //           children: [
//   //             {
//   //               text: '2 Kugeln ≙  2,40 Euro',
//   //               type: 'text',
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// }

// function wrapIntoFrontendExerciseNode(
//   state: TaskEditorState
// ): FrontendExerciseNode {
//   // const contextId = uuidv4()
//   // const revisionId = uuidv4()

//   const task = {
//     content: state,
//     license: createLicense(),
//   }

//   // TODO define solution!
//   const solution: BareSolution = createSolution()

//   const node: FrontendExerciseNode = {
//     type: FrontendNodeType.Exercise,
//     task,
//     solution,
//     context: {
//       id: 0,
//       revisionId: 0,
//     },
//     // Add more fields here as per your requirements.
//   }

//   console.log('Translated node: ', { node })

//   return node
// }

// function withTypeTextExerciseGroupWrapper(
//   states: Array<TypeTextExerciseState>,
//   content: string
// ): TypeTextExerciseGroup {
//   return {
//     plugin: 'type-text-exercise-group',
//     state: {
//       changes: '',
//       content: {
//         state: createQuestion(content),
//       },
//       id: 0,
//       revision: 0,
//       'grouped-text-exercise': states,
//     },
//   }
// }

// function createQuestion(value: string): FrontendContentNode {
//   return {
//     type: FrontendNodeType.SlateContainer,
//     // plugin: FrontendNodeType.Row,
//     children: [
//       {
//         // plugin: FrontendNodeType.Text,
//         type: FrontendNodeType.SlateContainer,
//         children: convertStringToTextPluginParagraph(value),
//         // id: uuidv4(),
//       },
//     ],
//     // id: uuidv4(),
//     pluginId: uuidv4(),
//   }
// }

// function generateFeedback(isCorrect: boolean): FrontendContentNode[] {
//   return isCorrect
//     ? [
//         {
//           type: FrontendNodeType.SlateContainer,
//           children: [
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: 'Super!',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//           ],
//           pluginId: uuidv4(),
//         },
//       ]
//     : [
//         {
//           type: FrontendNodeType.SlateContainer,
//           children: [
//             {
//               type: FrontendNodeType.SlateP,
//               children: [
//                 {
//                   text: 'Leider falsch!',
//                   type: FrontendNodeType.Text,
//                 },
//               ],
//             },
//           ],
//           pluginId: uuidv4(),
//         },
//       ]
// }

// function createScMcExerciseState(
//   subtask: InputSingleChoice | InputMultipleChoice
// ): TaskEditorState {
//   return {
//     content: [createQuestion(subtask.question)],
//     interactive: {
//       plugin: EditorPluginType.ScMcExercise,
//       state: {
//         isSingleChoice: subtask.type === 'single_choice',
//         answers: subtask.options.map((option: string, index: number) => {
//           const isCorrect =
//             subtask.type === 'single_choice'
//               ? subtask.correct_option === index
//               : subtask.correct_options.includes(index)

//           return {
//             content: [
//               {
//                 // plugin: EditorPluginType.Text,
//                 type: FrontendNodeType.SlateContainer,
//                 children: convertStringToTextPluginParagraph(option),
//                 id: uuidv4(),
//               } as FrontendContentNode,
//             ],
//             // I'm not too sure if the originalIndex is actually matching the
//             // index
//             originalIndex: index,
//             feedback: generateFeedback(isCorrect),
//             isCorrect,
//           }
//         }),
//       },
//     },
//   }
// }

// function createInputExerciseState(
//   subtask: InputShortAnswer
// ): InputExerciseState {
//   return {
//     content: createQuestion(subtask.question),
//     interactive: {
//       plugin: EditorPluginType.InputExercise,
//       state: {
//         type: 'input-string-normalized-match-challenge',
//         unit: '',
//         answers: [
//           {
//             value: subtask.correct_answer,
//             isCorrect: true,
//           },
//         ],
//       },
//       id: uuidv4(),
//     },
//   }
// }

// // Type guard to differentiate between short_answer and single_choice/multiple_choice
// function isShortAnswerExercise(
//   input: InputSingleChoice | InputMultipleChoice | InputShortAnswer
// ): input is InputShortAnswer {
//   return input.type === 'short_answer'
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

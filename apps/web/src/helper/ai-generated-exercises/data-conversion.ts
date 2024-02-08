/* eslint-disable no-console */

import { InputExerciseType } from '@editor/plugins/input-exercise/input-exercise-type'
import { CustomText, MathElement } from '@editor/plugins/text'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorExerciseDocument,
  EditorSolutionDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { either as E } from 'fp-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

import {
  ExpectedExerciseTypes,
  ExpectedLLMOutputType,
  ExpectedMultipleChoiceType,
  ExpectedSingleChoiceType,
  InputMultipleChoiceDecoder,
  InputShortAnswerDecoder,
  InputSingleChoiceDecoder,
  LLMOutputDecoder,
  humanReadableLLMOutputExample,
  humanReadableMultipleChoiceExample,
  humanReadableShortAnswerExample,
  humanReadableSingleChoiceExample,
} from './decoders'
import { LicenseData } from '@/data-types'

/**
 * Data needed to render and edit the exercises in the editor.
 */
export interface ExercisePreviewFromAi {
  exercises: EditorExerciseDocument[]
  heading: string
}

export function convertAiGeneratedScExerciseToEditorDocument(
  input: ExpectedLLMOutputType | null
): ExercisePreviewFromAi {
  if (!input) {
    return {
      exercises: [],
      heading: '',
    }
  }

  const decodedExercises = LLMOutputDecoder.decode(input)

  if (E.isLeft(decodedExercises)) {
    const errors = PathReporter.report(decodedExercises)
    console.error('Decoding failed', errors)
    throw new TypeError(
      `The data from the API seems to have an invalid structure.\n\n${errors
        .map((error) => `${error.split('|}/')[1]} was not provided correctly`)
        .join('\n')} \n\nReceived: \n${JSON.stringify(
        input,
        null,
        2
      )}\n\nExpected format: \n${JSON.stringify(
        humanReadableLLMOutputExample,
        null,
        2
      )}`
    )
  }

  const { heading, exercises } = decodedExercises.right

  const exerciseDocuments = exercises.map((exercise) => {
    const { decoded, humanReadableExample } =
      decodeAiGeneratedExercise(exercise)
    console.log('decoded: ', { decoded })

    if (E.isLeft(decoded)) {
      const errors = PathReporter.report(decoded)
      console.error('Decoding failed', errors)
      throw new TypeError(
        `The data from the API seems to have an invalid structure.\n\n${errors
          .map((error) => `${error.split('|}/')[1]} was not provided correctly`)
          .join('\n')} \n\nReceived: \n${JSON.stringify(
          input,
          null,
          2
        )}\n\nExpected format: \n${JSON.stringify(
          humanReadableExample,
          null,
          2
        )}`
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
            // If we have more than one exercise, we include the heading
            // separately as the heading of the whole exercise group! No need to
            // have it twice.
            ...(exercises.length === 1
              ? [createExerciseHeadingInEditor(heading)]
              : []),
            {
              plugin: EditorPluginType.Text,
              state: [
                {
                  type: 'p',
                  children: convertStringToMathOrTextNodes(
                    inputContent.question
                  ),
                },
              ],
            },
          ],
        },
        interactive,
        solution,
        licenseId: undefined,
      },
      // doesn't have an id yet
      id: undefined,
    }

    return exerciseDocument
  })

  return { exercises: exerciseDocuments, heading }
}

function createExerciseHeadingInEditor(heading: string) {
  return {
    plugin: EditorPluginType.Text,
    // ! This needs to be rendered semantically as h1, however we want the
    // size of h3 because it looks better
    state: [
      {
        type: 'h',
        level: 3,
        children: convertStringToMathOrTextNodes(heading),
      },
    ],
  }
}

type MathElementOrText = MathElement | CustomText

function convertStringToMathOrTextNodes(content: string): MathElementOrText[] {
  const escapedDollarMagicString = '___ESCAPED_DOLLAR_SIGN___'
  // We're telling the LLM to escape normal $ signs with a double backslash.
  // Sometimes it may use \$, but mostly \\$ so we're replacing both of them.
  const cleanedContent = content.replace(/\\\$|\\\$/g, escapedDollarMagicString)
  const segments = cleanedContent.split('$')
  return segments.reduce<MathElementOrText[]>((acc, segment, index) => {
    const correctSegment = segment.replaceAll(escapedDollarMagicString, '$')
    if (index % 2 === 0) {
      // Even index means we're dealing with regular text
      if (correctSegment !== '') {
        return [...acc, { text: correctSegment }]
      }
    } else {
      // Odd index means math content
      const mathElement: MathElement = {
        type: 'math',
        src: correctSegment,
        inline: true,
        children: [{ text: correctSegment }],
      }
      return [...acc, mathElement]
    }

    return acc
  }, [])
}

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
                  children: convertStringToMathOrTextNodes(option),
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
          // ExpressionEqual? Do we need to include this in the prompt?
          type: InputExerciseType.NumberExact,
          unit: '',
          answers: [
            {
              value: removeLatexFromAnswer(exercise.correct_answer),
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
      licenseId: undefined,
      strategy: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            children: [{ text: exercise.strategy }],
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
              children: convertStringToMathOrTextNodes(step),
            },
          ],
        })),
      },
    },
    // doesn't have an id yet
    id: undefined,
  }
}

function isSingleChoiceGuard(
  input: ExpectedSingleChoiceType | ExpectedMultipleChoiceType
): input is ExpectedSingleChoiceType {
  return input.type === 'single_choice'
}

export function transformEditorDataToExerciseGroup(
  editorData: ExercisePreviewFromAi,
  license: LicenseData
): EditorTemplateExerciseGroupDocument {
  const exercisesTransformed = editorData.exercises.map<
    EditorTemplateExerciseGroupDocument['state']['grouped-text-exercise'][0]
  >((exercise) => ({
    id: 0,
    license,
    changes: '[KI generiert]: ',
    revision: 0,
    content: JSON.stringify({
      plugin: EditorPluginType.Exercise,
      state: exercise.state,
    }),
  }))

  const exerciseGroup: EditorTemplateExerciseGroupDocument = {
    plugin: TemplatePluginType.TextExerciseGroup,
    state: {
      id: 0,
      licenseId: license.id,
      changes: '[KI generiert]: ',
      revision: 0,
      cohesive: false,
      // Heading of whole exercise group
      //@ts-expect-error ignoring this while exercise group migration is going on
      content: JSON.stringify(
        createExerciseHeadingInEditor(editorData.heading)
      ),
      'grouped-text-exercise': exercisesTransformed,
      // ? What is the difference between grouped-text-exercise and exercises?
      exercises: [],
    },
  }

  return exerciseGroup
}

/**
 * Sometimes the answers get formatted in LaTeX. However, this would mean that
 * for input exercises, the user has to type in $answer$ to have it marked as
 * correct.
 */
function removeLatexFromAnswer(answer: string): string {
  if (answer.startsWith('$') && answer.endsWith('$')) {
    return answer.slice(1, -1)
  }
  return answer
}

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
import { InputExerciseType } from '@/serlo-editor/plugins/input-exercise/input-exercise-type'
import { License } from '@/serlo-editor/plugins/serlo-template-plugins/common/common'
import { CustomText, MathElement } from '@/serlo-editor/plugins/text'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorExerciseDocument,
  EditorSolutionDocument,
  EditorTemplateExerciseGroupDocument,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

/**
 * Data needed to render and edit the exercises in the editor.
 */
export interface IEditorExerciseData {
  exercises: EditorExerciseDocument[]
  heading: string
}

export function convertAiGeneratedScExerciseToEditorDocument(
  input: string
): IEditorExerciseData {
  if (!input) {
    return {
      exercises: [],
      heading: '',
    }
  }

  const parsed = JSON.parse(input) as ExpectedLLMOutputType

  const decodedExercises = LLMOutputDecoder.decode(parsed)

  if (E.isLeft(decodedExercises)) {
    const errors = PathReporter.report(decodedExercises)
    console.error('Decoding failed', errors)
    throw new TypeError(
      `The data from the API seems to have an invalid structure.\n\n${errors
        .map((error) => `${error.split('|}/')[1]} was not provided correctly`)
        .join('\n')} \n\nReceived: \n${JSON.stringify(
        parsed,
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
          parsed,
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
      },
      // doesn't have an id yet
      id: undefined,
      solution,
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

function createLicense(): License['license'] {
  return {
    id: 1,
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
    shortTitle: 'CC BY-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    agreement:
      'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
  }
}

export function transformEditorDataToExerciseGroup(
  editorData: IEditorExerciseData
  // id: string
): EditorTemplateExerciseGroupDocument {
  // const exercisesTransformed = editorData.map((exercise) => {
  //   return {
  //     content: JSON.stringify(exercise.state),
  //     'text-solution': exercise.solution
  //       ? { content: JSON.stringify(exercise.solution.state) }
  //       : undefined,
  //   }
  // })

  const exerciseGroup: EditorTemplateExerciseGroupDocument = {
    plugin: TemplatePluginType.TextExerciseGroup,
    state: {
      exercises: editorData.exercises,
      license: createLicense(),
      content: JSON.stringify(
        createExerciseHeadingInEditor(editorData.heading)
      ),
      changes: '',
      'grouped-text-exercise': [],
      // TODO which id to use here? Why is a number expected instead of a
      // string? Should we just create a super high number here to ensure that
      // the is not yet in use
      id: 2,
      cohesive: false,
      revision: 1,
    },
  }

  return exerciseGroup
}

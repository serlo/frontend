import { either as E } from 'fp-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputDecoder } from './decoders'
import { OutputInputExercise, OutputScMcExercise, Question } from './types'
import { CustomText, MathElement, Paragraph } from '@/serlo-editor/plugins/text'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

// TODO: Add exercise entity wrapper to JSON
export function convertAiGeneratedDataToEditorData(input: string) {
  try {
    const parsed = JSON.parse(input) as unknown

    const decoded = InputDecoder.decode(parsed)

    if (E.isLeft(decoded)) {
      // eslint-disable-next-line no-console
      console.error(
        'An error occured while converting AI generated exercise data to editor data: ',
        'The data from the API has an invalid structure.'
      )
      return
    }

    const inputContent = decoded.right

    let output: OutputScMcExercise | OutputInputExercise

    // Define the output object for ScMcExercise
    if (
      inputContent.type === 'multiple_choice' ||
      inputContent.type === 'single_choice'
    ) {
      output = {
        content: createQuestion(inputContent.question),
        interactive: {
          plugin: EditorPluginType.ScMcExercise,
          state: {
            isSingleChoice: inputContent.type === 'single_choice',
            answers: inputContent.options.map((option, index) => ({
              content: {
                plugin: EditorPluginType.Text,
                state: convertStringToTextPluginParagraph(option),
                id: uuidv4(),
              },
              isCorrect: inputContent.correct_options.includes(index),
            })),
          },
        },
      }

      return output
    }

    // Define the output object for InputExercise
    if (inputContent.type === 'short_answer') {
      output = {
        content: createQuestion(inputContent.question),
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

      return output
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'An error occured while converting AI generated exercise data to editor data: ',
      error
    )
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

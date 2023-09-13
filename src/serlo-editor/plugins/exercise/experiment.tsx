import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { useState } from 'react'

import { CustomElement, CustomText, MathElement, Paragraph } from '../text'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface OutputScMcExercise {
  content: {
    plugin: EditorPluginType.Rows
    state: Array<{
      plugin: EditorPluginType.Text
      state: Array<CustomElement>
      id: string
    }>
    id: string
  }
  interactive: {
    plugin: EditorPluginType.ScMcExercise
    state: {
      isSingleChoice: boolean
      answers: Array<{
        content: {
          plugin: EditorPluginType.Text
          state: Array<CustomElement>
          id: string
        }
        isCorrect: boolean
        feedback?: {
          plugin: EditorPluginType.Text
          state: CustomElement
          id: string
        }
      }>
    }
  }
}

interface OutputInputExercise {
  content: {
    plugin: EditorPluginType.Rows
    state: Array<{
      plugin: EditorPluginType.Text
      state: Array<CustomElement>
      id: string
    }>
    id: string
  }
  interactive: {
    plugin: EditorPluginType.InputExercise
    state: {
      unit: string
      type: string
      answers: Array<{
        value: string
        isCorrect: boolean
        feedback?: {
          plugin: EditorPluginType.Text
          state: CustomElement
          id: string
        }
      }>
    }
    id: string
  }
}

const InputScMcDecoder = t.strict({
  type: t.union([t.literal('multiple_choice'), t.literal('single_choice')]),
  question: t.string,
  options: t.array(t.string),
  correct_options: t.array(t.number),
})

const InputShortAnswerDecoder = t.strict({
  type: t.literal('short_answer'),
  question: t.string,
})

export function Experiment() {
  const [openAiApiOutputJson, setOpenAiApiOutputJson] = useState<string>('')

  const clickHandler = () => {
    try {
      const parsed = JSON.parse(openAiApiOutputJson) as unknown

      const decoded =
        parsed.type === 'short_answer'
          ? InputShortAnswerDecoder.decode(parsed)
          : InputScMcDecoder.decode(parsed)

      if (E.isLeft(decoded)) {
        console.error('decoding failed')
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
          content: {
            plugin: EditorPluginType.Rows,
            state: [
              {
                plugin: EditorPluginType.Text,
                state: [splitStringIntoMathAndText(inputContent.question)],
                id: 'test-id-content-text',
              },
            ],
            id: 'test-id-content-rows',
          },
          interactive: {
            plugin: EditorPluginType.ScMcExercise,
            state: {
              isSingleChoice: inputContent.type === 'single_choice',
              answers: inputContent.options.map((option, index) => ({
                content: {
                  plugin: EditorPluginType.Text,
                  state: [splitStringIntoMathAndText(option)],
                  id: `test-id-interactive-text-${index}`,
                },
                isCorrect: inputContent.correct_options.includes(index),
              })),
            },
          },
        }
        console.log(output)
      }

      if (inputContent.type === 'short_answer') {
        output = {
          content: {
            plugin: EditorPluginType.Rows,
            state: [
              {
                plugin: EditorPluginType.Text,
                state: [splitStringIntoMathAndText(inputContent.question)],
                id: 'test-id-content-text',
              },
            ],
            id: 'test-id-content-rows',
          },
          interactive: {
            plugin: EditorPluginType.InputExercise,
            state: {
              type: 'input-string-normalized-match-challenge',
              unit: '',
              answers: [],
            },
            id: 'test-id-input-exercise',
          },
        }
        console.log(output)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="my-10">
      <input
        value={openAiApiOutputJson}
        onChange={(event) => setOpenAiApiOutputJson(event.target.value)}
      />
      <AddButton onClick={clickHandler}>
        Convert OpenAI API output JSON to exercise JSON
      </AddButton>
    </div>
  )
}

function splitStringIntoMathAndText(content: string): Paragraph {
  let text = []
  let startingIndex = 0
  let isInMath = false
  for (const [i, char] of content.split('').entries()) {
    //TODO: remove creation of text object with empty string when $ is at beginning/end of string
    if (char === '$') {
      text.push(
        (function (element) {
          if (!isInMath) {
            return { text: element.substring(startingIndex, i) } as CustomText
          } else {
            return {
              type: 'math',
              src: element.substring(startingIndex, i),
              inline: true,
              children: [{ text: '' }],
            } as MathElement
          }
        })(content)
      )
      startingIndex = i + 1
      isInMath = !isInMath
    }
    if (i === content.length - 1) {
      text.push({ text: content.substring(startingIndex, i + 1) })
    }
  }
  return { type: 'p', children: text }
}

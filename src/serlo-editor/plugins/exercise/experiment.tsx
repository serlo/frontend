import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { useState } from 'react'

import { CustomElement } from '../text'
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
  plugin: EditorPluginType.InputExercise
  // state: {}
}

const InputDecoder = t.strict({
  type: t.union([
    t.literal('multiple_choice'),
    t.literal('single_choice'),
    t.literal('short_answer'),
  ]),
  question: t.string,
  options: t.array(t.string),
  // TODO: Only accept strings when 'short_answer' type, otherwise only accept numbers
  correct_options: t.array(t.union([t.string, t.number])),
})

// TODO: Test for Latex expression
const isLatex = (_: string) => true

export function Experiment() {
  const [openAiApiOutputJson, setOpenAiApiOutputJson] = useState<string>('')

  const clickHandler = () => {
    try {
      const parsed = JSON.parse(openAiApiOutputJson) as unknown

      const decoded = InputDecoder.decode(parsed)

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
                state: [
                  {
                    type: 'p',
                    // TODO: Split into plain text and Latex (`MathElement`)
                    children: isLatex(inputContent.question)
                      ? [
                          {
                            type: 'math',
                            src: inputContent.question,
                            inline: true,
                            children: [{ text: '' }],
                          },
                        ]
                      : [{ text: inputContent.question }],
                  },
                ],
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
                  state: [
                    {
                      type: 'p',
                      children: isLatex(option)
                        ? [
                            {
                              type: 'math',
                              src: option,
                              inline: true,
                              children: [{ text: '' }],
                            },
                          ]
                        : [{ text: option }],
                    },
                  ],
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
          plugin: EditorPluginType.InputExercise,
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

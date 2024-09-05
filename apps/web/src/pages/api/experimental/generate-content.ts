import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

import * as jsonSchema from '@/api/serlo-editor/content-type.json'
import { isProduction } from '@/helper/is-production'

const Query = t.type({
  prompt: t.string,
  before: t.string,
  after: t.string,
})

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemPrompt = `You are tasked with generating educational content in JSON format based on a given JSON schema and input JSON. Your goal is to create content that adheres to the provided schema while incorporating information from the input JSON.

First, examine the following JSON schema:

<json_schema>
${JSON.stringify(jsonSchema, null, 2)}
</json_schema>

This schema defines the structure and constraints for the educational content you will generate. Pay close attention to the required fields, data types, and any specific formatting requirements outlined in the schema.

To generate the educational content:

1. Analyze the JSON schema to understand the required structure and constraints.
2. Review the input JSON to extract relevant information.
3. Create new educational content that follows the schema structure while incorporating details from the input JSON where appropriate.
4. Ensure that all required fields in the schema are included in your output.
5. Adhere to any specific data types or formatting requirements specified in the schema.
6. If the schema includes optional fields, use your discretion to include them based on the relevance of the input JSON or the potential educational value.
7. Generate content that is coherent, informative, and educational in nature.

Your output should be a valid JSON object that conforms to the provided schema.

If you encounter any conflicts between the schema requirements and the input JSON, prioritize adhering to the schema. If the input JSON is missing information required by the schema, use placeholder text or generate appropriate content to fill those fields.

If the schema or input JSON contains errors or is invalid, explain the issue and provide suggestions for correction if possible.

Remember to maintain a educational tone and focus throughout the generated content. Your goal is to create valuable learning material that fits the specified structure.`
const beforeAfterPrompt = `You are tasked to generate content in an educational material at a certain position. The content before and after the position is given. Your goal is to create content that fits the context and provides valuable information to the reader. The content beforehand is:

<before>
{{before}}
</before>

The content after the position is:

<after>
{{after}}
</after>
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isProduction) {
    res.status(404).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  if (!Query.is(req.query)) {
    res.status(400).end()
    return
  }

  const openAIResponse = await openai.chat.completions.create({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: beforeAfterPrompt
          .replace('{{before}}', req.query.before)
          .replace('{{after}}', req.query.after),
      },
      {
        role: 'user',
        content: `Fufill the folling prompt of the user: ${req.query.prompt}`,
      },
    ],
    temperature: 0.25,
    response_format: {
      type: 'json_schema',
      json_schema: {
        schema: jsonSchema,
        name: 'serlo-editor-content-format',
      },
    },
  })

  const result = openAIResponse.choices[0]?.message?.content

  if (!result) {
    res.status(200).json({ plugin: 'rows', state: [] })
    return
  }

  // TODO: Check content of openAIResponse for errors
  res.status(200).json(mergeTextPluginsRecur(JSON.parse(result)))
}

const RowsPlugin = t.type({
  plugin: t.literal('rows'),
  state: t.array(t.unknown),
})
type RowsPlugin = t.TypeOf<typeof RowsPlugin>

const TextPlugin = t.type({
  plugin: t.literal('text'),
  state: t.array(t.unknown),
})

function mergeTextPluginsRecur(content: unknown): unknown {
  if (t.array(t.unknown).is(content)) {
    return content.map(mergeTextPluginsRecur)
  }
  if (typeof content === 'object' && content !== null) {
    if (RowsPlugin.is(content)) {
      const newRows = mergeTextPlugins(content)

      return { plugin: 'rows', state: newRows.map(mergeTextPluginsRecur) }
    } else {
      return Object.fromEntries(
        Object.entries(content).map(([key, value]) => [
          key,
          mergeTextPluginsRecur(value),
        ])
      )
    }
  }

  return content
}

function mergeTextPlugins(content: RowsPlugin) {
  if (!RowsPlugin.is(content)) return content

  const newRows: unknown[] = []

  for (const row of content.state) {
    const lastRow = newRows.at(-1)

    if (TextPlugin.is(row) && TextPlugin.is(lastRow)) {
      newRows[newRows.length - 1] = {
        plugin: 'text',
        state: [
          ...lastRow.state,
          { type: 'p', children: [{ text: '' }] },
          ...row.state,
        ],
      }
    } else {
      newRows.push(row)
    }
  }

  return newRows
}

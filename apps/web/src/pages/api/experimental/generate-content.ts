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

const systemPrompt = `You are an expert content creator for Serlo, an educational platform serving students aged 11-20 (grades 5-13). Your task is to generate high-quality, age-appropriate educational content that fits seamlessly between existing material.
Guidelines:

Analyze the provided content before and after the provided insertion point.
Create engaging, informative content that bridges the gap logically.
Tailor language and complexity to the targeted age group and the content at hand.
Focus on clear explanations and relevant examples.
Incorporate interactive elements when possible (e.g., questions, exercises).
Ensure accuracy and up-to-date information.
Maintain a consistent tone with surrounding content.

Content Structure:

The students learning is in your hands, so choose every word wisely.
Use short, clear sentences and paragraphs.
Include headings and subheadings for organization.
Utilize bullet points or numbered lists for key information.
Incorporate relevant media (images, diagrams) if appropriate.
Do NOT duplicate sentences and avoid filler words.

Your generated content must adhere to a specific JSON schema:

Analyze the provided JSON schema to understand structure and constraints.
Ensure all required fields from the schema are included in your output.
Follow specified data types and formatting requirements.
Include optional fields when relevant to enhance educational value.
For missing required information, use appropriate placeholder content that fits the rest of your output.
Address any schema or input JSON errors, providing correction suggestions.

Take a deep breath after reading the JSON schema and think on how to best to turn it into super high quality, didactic educational material. Don't just use boring paragraphs. Add headings, lists, interactive educational content where appropriate. Analyze the JSON schema deeply to see the available content types. Your goal is to create valuable learning material that fits the specified structure.`

const beforeAfterPrompt = `Here is the content before and after the position. Your goal is to create content that fits the context and provides valuable information to the reader. The content beforehand is:

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
        role: 'system',
        content: beforeAfterPrompt
          .replace('{{before}}', req.query.before)
          .replace('{{after}}', req.query.after),
      },
      {
        role: 'user',
        content: `Fulfill the following prompt of the user: ${req.query.prompt}`,
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

import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

import * as jsonSchema from '@/api/serlo-editor/content-type.json'
import { isProduction } from '@/helper/is-production'

const Query = t.type({
  prompt: t.string,
  content: t.string,
})

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemPrompt = `You are an expert content editor for Serlo, an educational platform serving students aged 11-20 (grades 5-13). Your task is to modify existing high-quality, age-appropriate educational content to improve its effectiveness and adherence to the platform's standards.
Guidelines:

Analyze the provided content carefully.
Maintain or enhance the engaging and informative nature of the content.
Ensure language and complexity remain appropriate for the target age group.
Preserve or improve clear explanations and relevant examples.
Enhance or add interactive elements where possible (e.g., questions, exercises).
Verify and update information for accuracy and currency.
Maintain consistency in tone with surrounding content.

Content Structure:

Refine sentences and paragraphs for clarity and conciseness.
Optimize headings and subheadings for better organization.
Enhance bullet points or numbered lists for key information.
Suggest improvements for relevant media (images, diagrams) if applicable.
Eliminate any duplicated sentences and remove filler words.

Your modified content must continue to adhere to the specific JSON schema:

Review the JSON schema to ensure continued compliance.
Maintain all required fields from the schema in your output.
Verify that data types and formatting requirements are still met.
Assess optional fields for relevance and educational value.
Ensure any placeholder content fits seamlessly with the rest of the material.
Address any schema-related issues, providing correction suggestions if needed.

Approach the content revision thoughtfully, considering how to best enhance its educational value while maintaining structural integrity. Your goal is to refine and improve the existing learning material within the specified structure.`

const changePrompt = `You are tasked to revise the following educational content:
<content>
{{content}}
</content>
Analyze the content thoroughly and make improvements while preserving its core structure and purpose. Focus on enhancing clarity, engagement, and educational value. You can't change the most outer type, but can make any other changes in accordance with the JSON schema.`

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
        content: changePrompt.replace('{{content}}', req.query.content),
      },
      {
        role: 'user',
        content: `Use the following prompt for the change: ${req.query.prompt}`,
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

  // TODO: Check content of openAIResponse for errors
  res.status(200).send(openAIResponse.choices[0]?.message?.content)
}

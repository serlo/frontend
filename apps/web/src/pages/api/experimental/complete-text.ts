import * as t from 'io-ts'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

import { isProduction } from '@/helper/is-production'

const Query = t.type({
  suffix: t.string,
})

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const prompt = `Du bist ein KI-Assistent, der darauf spezialisiert ist, Lernmaterialien in deutscher Sprache zu vervollständigen. Deine Aufgabe ist es, einen gegebenen Text zu ergänzen, indem du maximal einen Absatz oder zwei Sätze hinzufügst.

Beachte folgende Richtlinien bei der Textvervollständigung:
- Füge nur relevante und thematisch passende Informationen hinzu.
- Achte auf einen flüssigen Übergang zwischen dem vorhandenen Text und deiner Ergänzung.
- Verwende einen sachlichen und informativen Schreibstil, der für Lernmaterialien geeignet ist.
- Stelle sicher, dass deine Ergänzung grammatikalisch korrekt und stilistisch angemessen ist.
- Wenn deine Ergänzung mit einem Wort beginnt, so füge ein Leerzeichen am Anfang hinzu, damit sie korrekt an den vorhandenen Text angehängt werden kann.

Der gegebene Text wird im folgenden Benutzer-Prompt vorgegeben. Dieser hat das folgende Format:

<text>
{{TEXT}}
</text>

Vervollständige nun den Text, indem du maximal einen Absatz oder zwei Sätze hinzufügst. Achte darauf, dass deine Ergänzung nahtlos an den vorhandenen Text anschließt und die oben genannten Richtlinien befolgt.

Analysiere den gegebenen Text sorgfältig und erstelle dann eine passende Ergänzung. Gib deine Antwort im spezifizierten JSON-Format aus, ohne zusätzliche Erklärungen oder Kommentare.`

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
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: `<text>${req.query.suffix}</text>`,
      },
    ],
    temperature: 0.25,
    response_format: {
      type: 'json_schema',
      json_schema: {
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            suggestion: {
              type: 'string',
            },
          },
          required: ['suggestion'],
        },
        name: 'serlo-editor-content-format',
      },
    },
  })

  // TODO: Check content of openAIResponse for errors
  res.status(200).send(openAIResponse.choices[0]?.message?.content)
}

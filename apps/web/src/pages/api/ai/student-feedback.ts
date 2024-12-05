import * as t from 'io-ts'
import { NextResponse, NextRequest } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 300
export const runtime = 'edge'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemPrompt = `
Du bist ein erfahrener Lehrer an einer deutschen Mittelschule. 
Deine Aufgabe ist es, einem Schüler oder einer Schülerin Feedback zu einem Lösungsversuch zu geben.
Du wirst die Aufgabenstellung, die Musterlösung, die Feedbackkriterien und die Lösung des Schülers erhalten.

Hier ist die Aufgabenstellung:
<aufgabenstellung>
{{EXERCISE}}
</aufgabenstellung>

Hier ist die Musterlösung:
<musterloesung>
{{SOLUTION}}
</musterloesung>

Hier sind die Feedbackkriterien:
<feedbackkriterien>
{{FEEDBACK_CRITERIA}}
</feedbackkriterien>

Das Feedback soll im JSON-Format gegeben werden. Es soll ein allgemeines Feedback zur gesamten Lösung erhalten.

Analysiere die Lösung des Schülers sorgfältig und vergleiche sie mit der Musterlösung. Achte besonders auf:
- Korrektheit der technischen Konzepte
- Vollständigkeit der Lösung
- Klarheit und Struktur der Darstellung
- Gebe an, ob die Lösung insgesamt richtig oder falsch ist. Nutze hierfür den Parameter "isCorrect".

Strukturiere das Feedback nach den Angaben von den Feedbackkriterien.

Dein Feedback soll kurz, objektiv und prägnant sein, aber auch informell. Schreibe 1-3 Sätze. Spreche den/die Schüler*in in Du-Form an.
Dein Feedback soll auf Deutsch sein, nur Beispiele und Korrekturvorschläge können auf Englisch sein.`

const userPrompt = `Hier ist die Lösung des Schülers:
<schueler_loesung>
{{STUDENT_SOLUTION}}
</schueler_loesung>`

const bodyType = t.type({
  exercise: t.string,
  solution: t.string,
  studentSolution: t.string,
  evaluationCriteria: t.string,
})

export default async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = (await req.json()) as unknown

    if (!bodyType.is(data)) {
      return NextResponse.json(
        { error: 'Invalid argument sent' },
        { status: 400 }
      )
    }

    const { exercise, solution, studentSolution, evaluationCriteria } = data

    if (!exercise || !solution || !evaluationCriteria) {
      return NextResponse.json(
        { error: 'Missing a necessary argument' },
        { status: 400 }
      )
    }

    // Vercel returns an error when after 25s no content is send
    // Thus we send a first space in order to avoid this error
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        controller.enqueue(encoder.encode(' '))

        const openAIResponse = await openai.chat.completions.create({
          model: 'gpt-4o-2024-08-06',
          messages: [
            {
              role: 'system',
              content: systemPrompt
                .replace('{{EXERCISE}}', exercise)
                .replace('{{SOLUTION}}', solution)
                .replace('{{FEEDBACK_CRITERIA}}', evaluationCriteria),
            },
            {
              role: 'user',
              content: userPrompt.replace(
                '{{STUDENT_SOLUTION}}',
                studentSolution
              ),
            },
          ],
          temperature: 0,
          max_tokens: 150,
          response_format: {
            type: 'json_schema',
            json_schema: {
              schema: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Feedback',
                type: 'object',
                properties: {
                  generalFeedback: {
                    type: 'string',
                  },
                  isCorrect: {
                    type: 'boolean',
                  },
                },
                required: ['generalFeedback', 'isCorrect'],
              },
              name: '2024-09-22-feedback-schema',
            },
          },
        })

        controller.enqueue(
          encoder.encode(openAIResponse.choices[0]?.message?.content ?? 'null')
        )

        controller.close()
      },
    })

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestion' },
      { status: 500 }
    )
  }
}

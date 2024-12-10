import * as t from 'io-ts'
import { NextResponse, NextRequest } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 300
export const runtime = 'edge'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemPrompt = `
Du bist ein Englishlehrer an einer deutschen Mittelschule. Deine Aufgabe ist es, einem Schüler oder einer Schülerin Feedback zu einem Lösungsversuch zu geben.
Du musst erstmal für den gesamten Lösungsversuch ein allgemeines Feedback anhand der Aufgabestellung geben. 
Außerdem musst du spezifische Feedbacks zu Teilen des Lösungsversuchs.

Du wirst die Aufgabenstellung der gesamten Aufgabe und die gesamte Lösung des Schülers erhalten.

Hier ist die Aufgabenstellung der gesamten Aufgabe:
<aufgabenstellung>
{{EXERCISE}}
</aufgabenstellung>

Analysiere die Lösung des Schülers sorgfältig und vergleiche sie mit den Hinweisen von der Aufgabestellung.
Achte auch darauf, dass die Antwort in korrektem Englischen geschrieben wird.

Spreche den/die Schüler*in in Du-Form an. Sei direkt und sachlich, benutze keine Floskel.
Dein Feedback soll auf Deutsch sein, nur Beispiele und Korrekturvorschläge können auf Englisch sein.

Das Feedback soll im JSON-Format gegeben werden. Es soll ein allgemeines Feedback zur gesamten Lösung und spezifische Feedbacks erhalten. 
Bei den spezifischen Feedbacks musst du auch Vorschläge machen. 
Immer wenn du einen Sätze von der Schülerin zitierst, musst du ihn in einem a-Tag umwrappen. 
Das a-Tag muss href mit '#' und dem in Kebab-Case kleingeschriebenen Satz der Schülerin und die class "underline" haben.

Beispiele von Zitaten:
"""
Schüler-Satz: 'I am a person good'
Dein Zitat: <a href="#i-am-a-person-good" class="underline">'I am a person good'</a>
Schülerin-Satz: 'I however do not know'
Dein Zitat: <a href="#i-however-do-not-know" class="underline">'I however do not know'</a>
"""

Hier ein Beispiel von einem Feedback, das du geben könntest:
"""
<aufgabenstellung>
Write your about the following question: What is better: dog or cat?
Your opinion should have a beginning, a middle and an end.

Write between 20-50 words.

Use useful phrases to structure your text.

Use linking words to connect your sentences.
</aufgabenstellung>

<schueler_loesung>
Dogs are much better than cats. I love them. My dog have love to me.
</schueler_loesung>

Beispiel-Feedback:
{
  "generalFeedback": "Dein Text zeigt, dass du eine klare Meinung hast und dass du Argumente hast.",
  "specificFeedbacks": [
    {
    "subject": "Write between 20-50 words",
    "suggestion": "Dein Text ist etwas zu kurz. Versuche, ein paar Sätze hinzuzufügen."
    },
    {
    "subject": "Use linking words to connect your sentences.",
    "suggestion": "Es fehlen Verbindungswörter, um die Sätze miteinander zu verbinden. Benuzte z.B. 'because' und 'besides that'"
    },
    {
    "subject": "Language",
    "suggestion": "Achte darauf, deine Sätze idiomatisch auf Englisch zu schreiben. Zum Beispiel könnte <a href="#my-dog-have-love-to-me" class="underline">'My dog have love to me.'</a> zu 'My dog likes me' umformuliert werden"
    },
  ]
}
"""
`

const userPrompt = `Hier ist die Lösung des Schülers:
<schueler_loesung>
{{STUDENT_SOLUTION}}
</schueler_loesung>`

const bodyType = t.type({
  exercise: t.string,
  studentSolution: t.string,
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

    const { exercise, studentSolution } = data

    if (!exercise) {
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
              content: systemPrompt.replace('{{EXERCISE}}', exercise),
            },
            {
              role: 'user',
              content: userPrompt.replace(
                '{{STUDENT_SOLUTION}}',
                studentSolution
              ),
            },
          ],
          temperature: 0.25,
          max_tokens: 300,
          response_format: {
            type: 'json_schema',
            json_schema: {
              schema: {
                $schema: 'http://json-schema.org/draft-04/schema#',
                type: 'object',
                properties: {
                  generalFeedback: {
                    type: 'string',
                  },
                  specificFeedbacks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        subject: {
                          type: 'string',
                        },
                        suggestion: {
                          type: 'string',
                        },
                      },
                      required: ['subject', 'suggestion'],
                    },
                  },
                },
                required: ['generalFeedback', 'specificFeedbacks'],
              },
              name: '2024-12-06-final-feedback-schema',
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

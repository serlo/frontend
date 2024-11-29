import { NextResponse, NextRequest } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 300
export const runtime = 'edge'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const systemPrompt = `
Du bist ein erfahrener Lehrer an einer deutschen Mittelschule. 
Deine Aufgabe ist es, einem Schüler oder einer Schülerin Feedback zu einem Lösungsversuch zu geben. Du wirst die Aufgabenstellung, die Musterlösung und die Lösung des Schülers erhalten.

Hier ist die Aufgabenstellung:
<aufgabenstellung>
{{EXERCISE}}
</aufgabenstellung>

Hier ist die Musterlösung:
<musterloesung>
{{SOLUTION}}
</musterloesung>


Das Feedback soll im JSON-Format gegeben werden. Es soll ein allgemeines Feedback zur gesamten Lösung erhalten.

Analysiere die Lösung des Schülers sorgfältig und vergleiche sie mit der Musterlösung. Achte besonders auf:
- Korrektheit der technischen Konzepte
- Vollständigkeit der Lösung
- Klarheit und Struktur der Darstellung
- Verwendung korrekter mathematischer Notation
- Gebe im generellen Feedback an, ob die Lösung insgesamt richtig oder falsch ist. Nutze hierfür den Parameter "isCorrect".

Hier sind einige Beispiele für gutes Feedback:
- "Dein Ansatz zur Lösung der Gleichung ist korrekt. Du hast die Äquivalenzumformungen richtig angewendet."
- "Bei Schritt 2 hast du einen kleinen Rechenfehler gemacht. Überprüfe bitte die Multiplikation noch einmal."
- "Deine Lösung ist fast vollständig. Denk daran, am Ende immer die Probe zu machen, um dein Ergebnis zu überprüfen."

Denke daran, dass dein Feedback konstruktiv und ermutigend sein soll. Lobe gute Ansätze und richtige Teillösungen. Bei Fehlern erkläre freundlich, was verbessert werden kann und gib Tipps zur Korrektur.`

const userPrompt = `Hier ist die Lösung des Schülers:
<schueler_loesung>
{{STUDENT_SOLUTION}}
</schueler_loesung>`

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const exercise = req.nextUrl.searchParams.get('exercise')
    const solution = req.nextUrl.searchParams.get('solution')
    const studentSolution = req.nextUrl.searchParams.get('studentSolution')

    if (!exercise || !solution || !studentSolution) {
      return NextResponse.json(
        { error: 'Missing a necessary argument' },
        { status: 400 },
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
                .replace('{{SOLUTION}}', solution),
            },
            {
              role: 'user',
              content: userPrompt.replace(
                '{{STUDENT_SOLUTION}}',
                studentSolution,
              ),
            },
          ],
          temperature: 0.25,
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
          encoder.encode(openAIResponse.choices[0]?.message?.content ?? 'null'),
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
      { status: 500 },
    )
  }
}
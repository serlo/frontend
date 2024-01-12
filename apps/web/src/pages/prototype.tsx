import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { useState } from 'react'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuthentication } from '@/auth/use-authentication'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import {
  ChatCompletionMessageParam,
  ExecutePromptResponse,
} from '@/fetcher/graphql-types/operations'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase>
      <HeadTags
        data={{
          title: 'Übersicht aller Mathe-Aufgabenordner - Serlo',
          metaDescription:
            'Übersicht über alle Aufgaben-Ordner in Mathematik auf Serlo',
        }}
      />
      <Prototype />
    </FrontendClientBase>
  )
}

interface Response {
  ok: boolean
  feedback: string
}

const query = `
query ($messages: [ChatCompletionMessageParam!]!) {
  ai {
    executePrompt(messages: $messages) {
      success
      record
    }
  }
}
`

function Prototype() {
  const auth = useAuthentication()
  const graphQlFetch = createAuthAwareGraphqlFetch(auth)

  const [text, setText] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [feedback, setFeedback] = useState<Response | null>(null)

  return (
    <div>
      <p className="serlo-p mt-8">
        Parallele Geraden haben überall den gleichen Abstand. Folgere daraus,
        dass zwei parallele Geraden, die nicht identisch sind, sich nicht
        schneiden können.
      </p>
      <div className=" mx-side ">
        <textarea
          readOnly={isRunning}
          className="serlo-ph-24 w-full border-2 p-2"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        ></textarea>
      </div>

      <button
        className="serlo-button-blue mx-side mt-6 disabled:cursor-wait"
        onClick={async () => {
          const variables: { messages: ChatCompletionMessageParam[] } = {
            messages: [
              {
                role: 'user',
                content: text,
              },
              {
                role: 'system',
                content: `
                    Du bist eine Maschine die mathematische Argumentationen auf Vollständigkeit überprüft. 

                    Die Nutzer erhalten folgende Eingabe:

                    "Parallele Geraden haben überall den gleichen Abstand. Folgere daraus,
                    dass zwei parallele Geraden, die nicht identisch sind, sich nicht
                    schneiden können."

                    Du erhältst die Antwort der Nutzer. Gib ein json zurück mit zwei Felder:
                    - ok: entweder true oder false, je nach dem ob deiner Einschätzung nach die Begründung ausreichend ist.
                    - feedback: Falls Begründung nicht ausreichend ist, gib eine kurze Zusammenfassung, was fehlt. Maximal 1 - 2 Sätze. Verrate nicht die Antwort! Anstatt die Antwort zu sagen, bleibe bitte allgemein, z.B. "Es fehlen wichtige Zwischenschritte".
                    - feedback: Falls Begründung ausreicht, schreibe eine freundliche Erfolgsnachricht. Maximal 5 Worte, keine Inhalte.

                    Wenn folgende drei Aspekte erwähnt werden, ist die Argumentation vollständig:

                    - Weil die Geraden nicht identisch sind, ist der Abstand größer null. Es muss erwähnt werden, dass der Abstand größer als null ist.
                    - Im Schnittpunkt ist der Abstand null.
                    - Wir erhalten einen Widerspruch, aus der die Wahrheit der Aussage folgt.
                  `,
              },
            ],
          }
          setIsRunning(true)
          const response = (await graphQlFetch(
            JSON.stringify({ query, variables })
          )) as { ai: { executePrompt: ExecutePromptResponse } }
          // console.log(response.ai.executePrompt)
          setIsRunning(false)
          setFeedback(response.ai.executePrompt.record as Response)
        }}
        disabled={isRunning}
      >
        {isRunning ? '... warte auf Antwort ...' : 'Antwort abschicken'}
      </button>
      {feedback && (
        <div className="mt-8 flex items-center">
          <div className="mx-6 text-3xl">
            {feedback.ok ? (
              <FaIcon icon={faCheckCircle} className="text-green-500" />
            ) : (
              <FaIcon icon={faTimesCircle} className="text-red-500" />
            )}
          </div>
          <p className="serlo-p mt-6">{feedback.feedback}</p>
        </div>
      )}
    </div>
  )
}
export default ContentPage

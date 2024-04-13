import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { getGcd } from '../utils/get-gcd'
import { buildFrac } from '../utils/math-builder'
import { randomItemFromArray } from '@/helper/random-item-from-array'

const appData = [
  { name: 'WhatsApp', p: 79 },
  { name: 'Instagram', p: 31 },
  { name: 'TikTok', p: 25 },
  { name: 'YouTube', p: 25 },
  { name: 'Snapchat', p: 19 },
  { name: 'Spotify', p: 15 },
  { name: 'Facebook', p: 7 },
  { name: 'Google', p: 7 },
]

export function ImportantApps() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const app = randomItemFromArray(appData)
        const negate = randomItemFromArray([true, false])
        return { app, negate }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Das Ergebnis einer repräsentativen Befragung von 1200 Jugendlichen
            zu ihren wichtigsten Apps ist in folgender Tabelle dargestellt:
          </p>
          <table className="serlo-table mb-3 ml-0">
            <thead>
              <tr>
                <th className="serlo-th rounded-tl-xl border-l-3 border-t-3">
                  Name der App
                </th>
                <th className="serlo-th rounded-tr-xl border-t-3">
                  Anzahl Nennungen
                </th>
              </tr>
            </thead>
            <tbody>
              {appData.map((entry) => (
                <tr key={entry.name}>
                  <td className="serlo-td border-l-3">{entry.name}</td>
                  <td className="serlo-td">
                    {Math.round((entry.p / 100) * 1200)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>(Bis zu drei Nennungen ohne Antwortvorgabe, Quelle: JIM 2023)</p>
          <p className="serlo-main-task">
            Von den 1200 Jugendlichen wird zufällig eine ausgewählt. Berechnen
            Sie die Wahrscheinlichkeit dafür, dass dieser Jugendliche{' '}
            {data.app.name} {data.negate ? 'nicht ' : null}genannt hat.
          </p>
        </>
      )}
      renderSolution={(data) => {
        const z = data.negate
          ? 1200 - (data.app.p * 1200) / 100
          : (data.app.p * 1200) / 100
        const d = getGcd(1200, z)
        return (
          <>
            <p>
              Teile die Anzahl der günstigen Ereignisse durch die Anzahl der
              möglichen Ereignisse:
            </p>
            <p className="serlo-highlight-green">
              P({data.negate ? 'nicht ' : null}
              {data.app.name}) = {buildFrac(z, 1200)} ={' '}
              {buildFrac(z / d, 1200 / d)} = {Math.round((z * 100) / 1200)} %
            </p>
          </>
        )
      }}
    />
  )
}

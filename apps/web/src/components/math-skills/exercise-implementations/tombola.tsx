import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function Tombola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const lose = randomIntBetween(200, 1000)
        const gewinne = randomIntBetween(1, Math.floor(lose / 20)) * 10
        const question = randomItemFromArray([
          'sonderpreis',
          'normalerpreis',
          'keinpreis',
          'preis',
        ])
        const nieten = lose - gewinne
        return { lose, gewinne, question, nieten }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Auf dem Sommerfest der Schule findet eine Verlosung statt. Zuerst
            wird ein Los aus der Lostrommel gezogen. Es gibt {data.lose} Lose,
            davon sind {data.gewinne} Gewinne, der Rest sind Nieten.
          </p>
          <p className="serlo-main-task">
            Es gibt normale Preise und Sonderpreise. Wenn man ein Gewinn-Los
            gezogen hat, würfelt man mit einem 6-seitigen Würfel. Zeigt der
            Würfel eine 6, erhält man einen Sonderpreis, ansonsten einen
            normalen Preis.
          </p>
          <p className="serlo-main-task">
            Berechnen Sie die Wahrscheinlichkeit, dass man{' '}
            {data.question === 'preis'
              ? 'einen normalen Preis oder einen Sonderpreis'
              : data.question === 'sonderpreis'
                ? 'einen Sonderpreis'
                : data.question === 'normalerpreis'
                  ? 'einen normalen Preis'
                  : 'keinen Preis'}{' '}
            erhält. Geben Sie das Ergebnis in Prozent an. Runden Sie auf zwei
            Stellen nach dem Komma.
          </p>
        </>
      )}
      renderSolution={(data) => {
        if (data.question === 'keinpreis') {
          return (
            <>
              <p>Berechne die Wahrscheinlichkeit für eine Niete:</p>
              <p>
                Es gibt {data.lose}-{data.gewinne}={data.nieten} Nieten.
              </p>
              <p className="serlo-highlight-green">
                P(Niete) = {buildFrac(data.lose - data.gewinne, data.lose)} ={' '}
                {pp(Math.round((data.nieten / data.lose) * 10000) / 100)} %
              </p>
            </>
          )
        }
        if (data.question === 'preis') {
          return (
            <>
              <p>
                Man erhält einen normalen Preis oder einen Sonderpreis, sobald
                man ein Gewinn-Los zieht. Berechne dafür die Wahrscheinlichkeit:
              </p>
              <p className="serlo-highlight-green">
                P(Gewinn-Los) = {buildFrac(data.gewinne, data.lose)} ={' '}
                {pp(Math.round((data.gewinne / data.lose) * 10000) / 100)} %
              </p>
            </>
          )
        }
        if (data.question === 'sonderpreis') {
          return (
            <>
              <p>
                Um einen Sonderpreis zu erhalten, benötigt man ein Gewinn-Los
                und die Zahl 6 beim Würfeln. Berechne die Wahrscheinlichkeiten
                und nutze die Multiplikationsregel:
              </p>
              <p className="serlo-highlight-green">
                P(Gewinn-Los; 6) = {buildFrac(data.gewinne, data.lose)} ·{' '}
                {buildFrac(1, 6)} ={' '}
                {pp(Math.round(((data.gewinne / data.lose) * 10000) / 6) / 100)}{' '}
                %
              </p>
            </>
          )
        }
        return (
          <>
            <p>
              Um einen normalen Preis zu erhalten, benötigt man ein Gewinn-Los
              und keine 6 beim Würfeln. Berechne die Wahrscheinlichkeiten und
              nutze die Multiplikationsregel:
            </p>
            <p className="serlo-highlight-green">
              P(Gewinn-Los; keine 6) = {buildFrac(data.gewinne, data.lose)} ·{' '}
              {buildFrac(5, 6)} ={' '}
              {pp(
                Math.round(((data.gewinne / data.lose) * 10000 * 5) / 6) / 100
              )}{' '}
              %
            </p>
          </>
        )
      }}
    />
  )
}

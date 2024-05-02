import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function ExponentialFunction() {
  const { data } = useMathSkillsStorage()

  return (
    <SelfEvaluationExercise
      generator={() => {
        const Aktuelles_Jahr = new Date().getFullYear()
        return {
          Zins: randomIntBetween(1, 5),
          Money_Start: randomIntBetween(20, 60) * 100,
          Ende_Anlage: randomItemFromArray([0, 1, 2, 5]),
          Aktuelles_Jahr,
          Jahr_Anlage: randomIntBetween(2010, Aktuelles_Jahr - 1),
        }
      }}
      renderTask={({
        Jahr_Anlage,
        Money_Start,
        Ende_Anlage,
        Zins,
        Aktuelles_Jahr,
      }) => {
        return (
          <>
            <p className="serlo-main-task">
              {data.name ? `${data.name} hat` : 'Du hast'} {Money_Start} € im
              Jahr {Jahr_Anlage} angelegt. Jedes Jahr wird das Kapital mit{' '}
              {Zins} % verzinst. Berechnen Sie, welchen Betrag{' '}
              {data.name || 'Du'} {Ende_Anlage === 0 ? 'heute' : null}
              {Ende_Anlage === 1 ? 'nächstes Jahr' : null}
              {Ende_Anlage === 2 ? 'übernächstes Jahr' : null}
              {Ende_Anlage === 5 ? 'in 5 Jahren' : null} besitzt. Runden Sie auf
              ganze Euro.
            </p>
            <p>
              Das aktuelle Jahr ist {Aktuelles_Jahr}. Zwischen den Zeitpunkten
              liegen immer ganze Jahre.
            </p>
          </>
        )
      }}
      renderSolution={({
        Jahr_Anlage,
        Money_Start,
        Ende_Anlage,
        Zins,
        Aktuelles_Jahr,
      }) => {
        const Jahre = Aktuelles_Jahr - Jahr_Anlage + Ende_Anlage
        const Faktor = 1 + Zins / 100
        const Geld =
          Math.round(Money_Start * Math.pow(Faktor, Jahre) * 100) / 100

        const end = (
          <>
            {Ende_Anlage === 0 ? 'heute' : null}
            {Ende_Anlage === 1 ? 'nächstes Jahr' : null}
            {Ende_Anlage === 2 ? 'übernächstes Jahr' : null}
            {Ende_Anlage === 5 ? 'heute in 5 Jahren' : null}
          </>
        )
        return (
          <>
            <p>Berechne den Wachstumsfaktor:</p>
            <p className="serlo-highlight-gray">
              a = 1 + {buildFrac(Zins, 100)} = {pp(Faktor)}
            </p>
            <p>
              Stelle die passende Exponentialgleichung auf. x gibt die Anzahl
              der Jahre ab Start der Anlage an, y gibt das Kapital an:
            </p>
            <p className="serlo-highlight-gray">
              y = {Money_Start} · {pp(Faktor)}
              <sup>x</sup>
            </p>
            <p>
              Von {Jahr_Anlage} bis {end} sind es insgesamt {Jahre} Jahre. Setze
              ein und berechne das Ergebnis:
            </p>
            <p className="serlo-highlight-gray">
              y = {Money_Start} · {pp(Faktor)}
              <sup>{Jahre}</sup> ≈ {pp(Geld)}
            </p>
            <p>Runde und antworte auf die Ausgangsfrage:</p>
            <p className="serlo-highlight-green">
              {data.name} besitzt {end} {Math.round(Geld)} €.
            </p>
          </>
        )
      }}
      renderHint={({ Money_Start, Zins }) => {
        const Faktor = 1 + Zins / 100
        return (
          <>
            Das angelegte Geld kann mit einer Exponentialfunktion beschrieben
            werden.
            <p className="serlo-highlight-gray">
              y = a · b <sup>x</sup>
            </p>
            <br />
            Dabei steht a für den Anfangswert{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {Money_Start}
            </span>{' '}
            und b für die Wachstumsrate{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {pp(Faktor)}.
            </span>
            <br />
            <br />
            Um das Kapital zu berechnen muss die richtige Anzahl der Jahre für x
            eingesetzt werden.
          </>
        )
      }}
    />
  )
}

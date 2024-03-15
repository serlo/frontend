import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NameInput } from '../name-input'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ExponentialFunction() {
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Jahr_Anlage: randomIntBetween(2010, 2024),
          Zins: randomIntBetween(1, 5),
          Money_Start: randomIntBetween(20, 60) * 100,
          Ende_Anlage: randomIntBetween(0, 3),
        }
      }}
      renderTask={({ Jahr_Anlage, Money_Start, Ende_Anlage, Zins }) => {
        return (
          <div className="text-lg">
            <h2 className="text-2xl">Rechnen mit der Exponentialfunktion</h2>
            <br />
            <br />
            {data.name ? `${data.name} hat` : 'Du hast'} {Money_Start} € im Jahr{' '}
            {Jahr_Anlage} angelegt. Jedes Jahr wird das Kapital mit {Zins} %
            verzinst. Berechne, welchen Betrag {data.name || 'Du'}{' '}
            {Ende_Anlage === 0 ? 'heute' : null}
            {Ende_Anlage === 1 ? 'nächstes Jahr' : null}
            {Ende_Anlage === 2 ? 'übernächstes Jahr' : null}
            {Ende_Anlage === 3 ? 'in 5 Jahren' : null} besitzt.
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </div>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ Jahr_Anlage, Money_Start, Ende_Anlage, Zins }) => {
        const Jahre = 2024 - Jahr_Anlage + Ende_Anlage
        const Faktor = 1 + Zins / 100
        const Geld =
          Math.round(Money_Start * Math.pow(Faktor, Jahre) * 100) / 100

        return (
          <>
            Bei {Zins} % Zinsen wächst das Kapital jährlich mit dem Faktor{' '}
            {Faktor.toString().replace('.', ',')}. <br />
            <br />
            Damit wird das Kapital durch die Exponentialfunktion
            <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {Money_Start} · {Faktor.toString().replace('.', ',')}
              <sup>x</sup>
            </span>
            <br />
            beschrieben. x steht dabei für die Anzahl der Jahre ab {Jahr_Anlage}
            .
            <br />
            <br />
            Von {Jahr_Anlage} bis {Ende_Anlage === 0 ? 'heute' : null}
            {Ende_Anlage === 1 ? 'nächstes Jahr' : null}
            {Ende_Anlage === 2 ? 'übernächstes Jahr' : null}
            {Ende_Anlage === 3 ? 'in 5 Jahren' : null} sind es insgesamt {Jahre}{' '}
            Jahre, womit wir {Jahre} für x in die Funktion einsetzen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {Money_Start} · {Faktor.toString().replace('.', ',')}
              <sup>{Jahre}</sup> = {Geld.toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Das Kapital beträgt nach {Jahre} Jahren{' '}
            {Geld.toString().replace('.', ',')} €.
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ Money_Start, Zins }) => {
        const Faktor = 1 + Zins / 100
        return (
          <>
            Das angelegte Geld kann mit einer Exponentialfunktion beschrieben
            werden.
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = a · b <sup>x</sup>
            </span>
            <br />
            Dabei steht a für den Anfangswert{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {Money_Start}
            </span>{' '}
            und b für die Wachstumsrate{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {Faktor.toString().replace('.', ',')}.
            </span>
            <br />
            <br />
            Um das Kapital zu berechnen muss die richtige Anzahl der Jahre für x
            eingesetzt werden.
          </>
        )
      }}
      centAmount={35}
    />
  )
}

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NameInput } from '../name-input'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
// eslint-disable-next-line no-duplicate-imports
import { buildSqrt } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function RootEquations() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Money_Start: randomIntBetween(200, 400) * 10,
          Start_Jahr: randomIntBetween(2010, 2020),
          Money_Ende: randomIntBetween(500, 650) * 10,
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderTask={({ Money_Start, Start_Jahr, Money_Ende }) => {
        return (
          <>
            <div className="text-lg">
              <h2 className="text-2xl">Rechnen mit der Exponentialfunktion</h2>
              <br />
              <br />
              {data.name ? `${data.name} hat` : 'Du hast'} {Money_Start} € im
              Jahr {Start_Jahr} angelegt. <br />
              Heute beträgt das Kapital {Money_Ende} €.
              <br />
              <br />
              Berechne den Zinssatz in Prozent, zu dem das Geld angelegt wurde.
              <br />
              <br />
              <i>
                Rechne mit Stift und Papier und runde am Ende auf eine
                Nachkommastelle.
              </i>
            </div>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderSolution={({ Money_Start, Start_Jahr, Money_Ende }) => {
        const LeftSide = (Math.round((Money_Ende / Money_Start) * 100) / 100)
          .toString()
          .replace('.', ',')

        const result =
          Math.round(Math.pow(Money_Ende / Money_Start, 1 / 11) * 1000) / 1000
        const zinssatz = Math.round((result * 100 - 100) * 1000) / 1000

        return (
          <>
            Das Kapital wird beschrieben durch die Funktion: <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {Money_Start} · x <sup>k</sup>
            </span>
            <br />
            Hierbei steht:
            <ol>
              <li>· {Money_Start} für den Anfangswert</li>
              <li>· x für den gesuchten Zinssatz</li>
              <li>· k für die Anzahl der Jahre</li>
            </ol>
            <br />
            <br />
            Nach {2024 - Start_Jahr} Jahren soll das Kapital {Money_Ende} €{' '}
            betragen. Setze ein:
            <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {Money_Ende} = {Money_Start} · x <sup>{2024 - Start_Jahr}</sup>
            </span>
            <br />
            <br />
            Wir lösen die Gleichung, indem wir beide Seiten durch den
            Anfangswert teilen:
            <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {LeftSide} = x <sup>{2024 - Start_Jahr}</sup>
            </span>
            <br />
            Um x zu bestimmen, verwenden wir die {2024 - Start_Jahr}-te Wurzel
            auf beiden Seiten:
            <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              <sup>{2024 - Start_Jahr}</sup>√
              <span className="pl-1 overline">{LeftSide} </span> = x
            </span>
            <br />
            Mit dem Taschenrechner berechnet sich das Ergebnis zu:
            <br />
            <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              x = {result.toString().replace('.', ',')}
            </span>
            <br /> Aus diesem Wert entnehmen wir:{' '}
            <strong>
              Der Zinssatz musste jährlich{' '}
              {zinssatz.toString().replace('.', ',')} % betragen.
            </strong>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Stelle eine Funktion der Form
            <br />
            <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = a · x <sup>k</sup>
            </span>
            <br />
            auf, die das Kapital in Abhängigkeit der Jahre k beschreibt.
            <br />
            <br /> Hierbei steht:
            <ol>
              <li>· a für den Anfangswert</li>
              <li>· x für den gesuchten Zinssatz</li>
            </ol>
            <br />
            Setze für y den Betrag von heute ein und löse die Gleichung mithilfe
            der Wurzel.
          </>
        )
      }}
      centAmount={35}
    />
  )
}

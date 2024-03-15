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

export function ExponentialFunctionTime() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Jahr_Anlage: randomIntBetween(1995, 2006),
          Geld_Ende: randomIntBetween(60, 75) * 100,
          Zins: randomIntBetween(3, 6),
          Money_Start: randomIntBetween(45, 55) * 100,
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ Jahr_Anlage, Money_Start, Zins, Geld_Ende }) => {
        return (
          <>
            <p className="mb-8 text-2xl">
              Im Jahr {Jahr_Anlage} {data.name ? `hat ${data.name}` : 'hast Du'}{' '}
              {Money_Start} € angelegt.
              <br />
              Jedes Jahr wurde das Kapital mit {Zins} % verzinst, sodass das
              Kapital am Ende {Geld_Ende} € betragen hat.
              <br />
              <br />
              Berechne, wie viele Jahre das Geld angelegt wurde.
            </p>
            <p>
              <i>
                Rechne mit der Exponentialfunktion und am besten mit Stift und
                Papier.
              </i>
            </p>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ Money_Start, Jahr_Anlage, Zins, Geld_Ende }) => {
        const Faktor = Zins / 100 + 1
        const Zeit =
          Math.round(
            (Math.log2(Geld_Ende / Money_Start) / Math.log2(Faktor)) * 100
          ) / 100
        const Zeit_Jahre = Math.ceil(
          Math.round(
            (Math.log2(Geld_Ende / Money_Start) / Math.log2(Faktor)) * 100
          ) / 100
        )
        return (
          <>
            Bei {Zins} % Zinsen wächst das Kapital jährlich mit dem Faktor{' '}
            {Faktor.toString().replace('.', ',')}.
            <br />
            <br />
            Damit wird das Kapital durch die Exponentialfunktion
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {Money_Start} · {Faktor.toString().replace('.', ',')}
              <sup>x</sup>
            </span>
            <br />
            <br />
            beschrieben. x steht dabei für die gesuchte Anzahl der Jahre ab{' '}
            {Jahr_Anlage}.
            <br />
            <br />
            Wir setzen für y den Endbetrag {Geld_Ende} € ein, weil wir
            untersuchen, wann das Kapital diesen Wert erreicht hat.
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {Geld_Ende} = {Money_Start} ·{' '}
              {Faktor.toString().replace('.', ',')}
              <sup>x</sup>
            </span>
            <br />
            Wir lösen die Gleichung, indem wir zuerst beide Seiten durch{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {Money_Start}{' '}
            </span>{' '}
            teilen.
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {buildFrac(<>{Geld_Ende}</>, <>{Money_Start}</>)} ={' '}
              {Faktor.toString().replace('.', ',')}
              <sup>x</sup>
            </span>
            <br />
            <br /> Um x zu bestimmen, muss der Logarithmus zur Basis{' '}
            {Faktor.toString().replace('.', ',')} angewendet werden:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log <sub>{Faktor.toString().replace('.', ',')}</sub>
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(<>{Geld_Ende}</>, <>{Money_Start}</>)}
              <span className="inline-block scale-y-[3] ">)</span> = x
            </span>
            <br />
            <br />
            Mit dem Taschenrechner ergibt sich:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x = {Zeit.toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Das Geld wurde also {Zeit.toString().replace('.', ',')} Jahre bzw.{' '}
            {Zeit_Jahre.toString().replace('.', ',')} ganze Jahre angelegt.
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
            Setzen wir für y den Endbetrag des Kapitals ein entsteht eine
            Exponentialgleichung.
            <br />
            <br />
            Um die Zeit x zu berechnen muss die Gleichung mithilfe des
            Logarithmus gelöst werden.
          </>
        )
      }}
      centAmount={35}
    />
  )
}

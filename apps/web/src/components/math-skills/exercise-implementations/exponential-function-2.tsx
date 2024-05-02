import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { HighlightGray } from '../components/content-components'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

export function ExponentialFunctionTime() {
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Jahr_Anlage: randomIntBetween(1995, 2006),
          Geld_Ende: randomIntBetween(60, 75) * 100,
          Zins: randomIntBetween(3, 39) / 10,
          Money_Start: randomIntBetween(45, 55) * 100,
        }
      }}
      renderTask={({ Jahr_Anlage, Money_Start, Zins, Geld_Ende }) => {
        return (
          <>
            <p className="serlo-main-task">
              Im Jahr {Jahr_Anlage}{' '}
              {data.name ? `legt ${data.name}` : 'legst Du'} {Money_Start} € an.
              Jedes Jahr wird das Kapital mit {pp(Zins)} % verzinst.
            </p>
            <p className="serlo-main-task">
              Bestimmen Sie, am Ende von wie vielen Jahren das Kapital erstmal
              mehr als {Geld_Ende} € beträgt.
            </p>
          </>
        )
      }}
      renderSolution={({ Money_Start, Zins, Geld_Ende }) => {
        const Faktor = Zins / 100 + 1

        const yDurchk = Math.round((Geld_Ende / Money_Start) * 100) / 100

        const Zeit =
          Math.round((Math.log2(yDurchk) / Math.log2(Faktor)) * 100) / 100
        const Zeit_Jahre = Math.ceil(Zeit)
        return (
          <>
            <p>Berechne den Wachstumsfaktor:</p>
            <p className="serlo-highlight-gray">
              a = 1 + {buildFrac(pp(Zins), 100)} = {pp(Faktor)}
            </p>
            <p>
              Stelle die passende Exponentialgleichung auf. x gibt die Anzahl
              der Jahre ab Start der Anlage an, y gibt das Kapital an:
            </p>
            <p className="serlo-highlight-gray">
              y = {Money_Start} · {pp(Faktor)}
              <sup>x</sup>
            </p>
            <p>Setze {Geld_Ende} für y ein und löse die Gleichung:</p>
            <p className="serlo-highlight-gray">
              {Geld_Ende} = {Money_Start} · {pp(Faktor)}
              <sup>x</sup> &nbsp;&nbsp;&nbsp;&nbsp;| : {Money_Start}
              <br />
              {pp(yDurchk)} = {pp(Faktor)}
              <sup>x</sup>
              <br />x = log<sub>{pp(Faktor)}</sub> {pp(yDurchk)}
              <br />x = {pp(Zeit)}
            </p>
            <p>Antworte:</p>
            <p className="serlo-highlight-green">
              Am Ende von {Zeit_Jahre} Jahren beträgt das Kapital erstmals mehr
              als {Geld_Ende} Euro.
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
            Setzen wir für y den Endbetrag des Kapitals ein entsteht eine
            Exponentialgleichung.
            <br />
            <br />
            Um die Zeit x zu berechnen muss die Gleichung mithilfe des
            Logarithmus gelöst werden.
          </>
        )
      }}
    />
  )
}

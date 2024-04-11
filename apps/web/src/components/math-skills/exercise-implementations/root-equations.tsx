import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildLatex } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { randomIntBetween } from '@/helper/random-int-between'

export function RootEquations() {
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Money_Start: randomIntBetween(200, 400) * 10,
          Start_Jahr: randomIntBetween(2010, 2020),
          Money_Ende: randomIntBetween(1500, 6500) * 10,
          Aktuelles_Jahr: new Date().getFullYear(),
        }
      }}
      renderTask={({ Money_Start, Start_Jahr, Money_Ende, Aktuelles_Jahr }) => {
        return (
          <>
            <div className="text-lg">
              <p className="serlo-main-task">
                {data.name ?? 'Tea'} hatte im Jahr {Start_Jahr} auf ihrem
                Ink-Star-Account {Money_Start} Follower. Heute beträgt die
                Anzahl der Follower {Money_Ende}. Gehen Sie von einem
                exponentiellen Wachstum aus.
              </p>
              <p className="serlo-main-task">
                Berechnen Sie, um wie viel Prozent die Anzahl der Follower pro
                Jahr gestiegen ist. Runden Sie das Ergebnis auf eine Stelle nach
                dem Komma.
              </p>
              <p>
                Das aktuelle Jahr ist {Aktuelles_Jahr}. Zwischen Start und Ende
                liegen ganze Jahre.
              </p>
            </div>
          </>
        )
      }}
      renderSolution={({
        Money_Start,
        Start_Jahr,
        Money_Ende,
        Aktuelles_Jahr,
      }) => {
        const intermediate = Math.round((Money_Ende / Money_Start) * 100) / 100
        const result =
          Math.round(
            Math.pow(intermediate, 1 / (Aktuelles_Jahr - Start_Jahr)) * 1000
          ) / 1000
        const zinssatz = Math.round((result * 100 - 100) * 1000) / 1000

        return (
          <>
            <p>Stelle eine Exponentialgleichung auf:</p>
            <p className="serlo-highlight-gray">
              y = {Money_Start} · x <sup>k</sup>
            </p>
            <p>
              Dabei steht {Money_Start} für den Anfangswert, x für den gesuchten
              Wachstumsfaktor und k für die Anzahl der Jahre.
            </p>
            <p className="mt-3">
              Nach {Aktuelles_Jahr - Start_Jahr} Jahren soll die Anzahl der
              Follower {Money_Ende} betragen, setze ein:
            </p>
            <p className="serlo-highlight-gray">
              {Money_Ende} = {Money_Start} · x{' '}
              <sup>{Aktuelles_Jahr - Start_Jahr}</sup>
            </p>
            <p>
              Vereinfache die Gleichung, indem du beide Seiten durch{' '}
              {Money_Start} teilst:
            </p>
            <p className="serlo-highlight-gray">
              {intermediate.toLocaleString('de-De')} = x{' '}
              <sup>{Aktuelles_Jahr - Start_Jahr}</sup>
            </p>
            <p>
              Ziehe die {Aktuelles_Jahr - Start_Jahr}
              -te Wurzel:
            </p>
            <p className="serlo-highlight-gray">
              {buildLatex(
                `\\sqrt[${Aktuelles_Jahr - Start_Jahr}]{${intermediate.toLocaleString('de-De')}}`
              )}{' '}
              = x
            </p>
            <p>Mit dem Taschenrechner berechnet sich das Ergebnis zu:</p>
            <p className="serlo-highlight-gray">
              x = {result.toLocaleString('de-De')}
            </p>
            <p>Entnehme aus dem Wert den Prozentsatz:</p>
            <p className="serlo-highlight-green">
              Das jährliche Wachstum beträgt {zinssatz.toLocaleString('de-De')}{' '}
              %.
            </p>
          </>
        )
      }}
      /*renderHint={() => {
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
            der Wurzel (Umkehrfunktion zur Potenz).
          </>
        )
      }}*/
    />
  )
}

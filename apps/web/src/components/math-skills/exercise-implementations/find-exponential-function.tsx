import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsName } from '../utils/math-skills-data-context'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function FindExponentialFunction() {
  const name = useMathSkillsName()
  return (
    <SelfEvaluationExercise
      generator={() => {
        const context = randomItemFromArray([1, 2, 3, 4])
        if (context === 1) {
          return {
            context: 'vokabeln',
            k: randomIntBetween(5, 15) * 100,
            a: randomIntBetween(2, 8),
            factor: 'Abnahme',
            xDescription: 'die Zeit in Wochen',
            yDescription: 'die Anzahl der Englischvokabeln',
          }
        }
        if (context === 2) {
          return {
            context: 'rehe',
            k: randomIntBetween(2, 45) * 1000,
            a: randomIntBetween(12, 40) / 10,
            factor: 'Wachstums',
            xDescription: 'die Zeit in Jahren',
            yDescription: 'die Anzahl der Rehe',
          }
        }
        if (context === 3) {
          return {
            context: 'rente',
            k: randomIntBetween(30, 80) * 10000,
            a: randomIntBetween(3, 30) / 10,
            factor: 'Abnahme',
            xDescription: 'die Zeit in Monaten',
            yDescription: 'das Restguthaben in Euro',
          }
        }
        return {
          context: 'basketball',
          k: randomIntBetween(18, 44) / 10,
          a: randomIntBetween(8, 24),
          factor: 'Abnahme',
          xDescription: 'die Anzahl der Bodenkontakte',
          yDescription: 'die Sprunghöhe in Metern',
        }
      }}
      renderTask={(d) => (
        <>
          <p className="serlo-main-task">
            Notieren Sie die Gleichung einer Exponentialfunktion der Form y = k
            · a<sup>x</sup>, die die Situation beschreibt. Geben Sie an, wofür
            die Variablen x und y stehen:
          </p>
          {d.context === 'vokabeln' && (
            <p className="serlo-highlight-gray">
              {name} konnte am Ende des Schuljahrs {pp(d.k)} Englischvokabeln.
              Davon vergisst {name} während der Sommerferien jede Woche{' '}
              {pp(d.a)}&nbsp;%.
            </p>
          )}
          {d.context === 'rehe' && (
            <p className="serlo-highlight-gray">
              In einem Wald leben {pp(d.k)} Rehe. Die Population wächst um{' '}
              {pp(d.a)}&nbsp;% pro Jahr.
            </p>
          )}
          {d.context === 'rente' && (
            <p className="serlo-highlight-gray">
              {name} ist in der Rente und besitzt ein Sparguthaben von {pp(d.k)}
              &nbsp;€. Von der Bank lässt sich {name} jeden Monat {pp(d.a)}
              &nbsp;% davon auszahlen.
            </p>
          )}
          {d.context === 'basketball' && (
            <p className="serlo-highlight-gray">
              Ein Basketball wird aus {pp(d.k)}&nbsp;m fallen gelassen. Nach
              jedem Bodenkontakt verringert er seine Sprunghöhe um {pp(d.a)}
              &nbsp;%.
            </p>
          )}
        </>
      )}
      renderSolution={(d) => {
        const a = 1 + d.a / (d.factor === 'Abnahme' ? -100 : 100)
        return (
          <>
            <p>Bestimme zuerst den {d.factor}faktor a:</p>
            <p className="serlo-highlight-gray">
              a = 1 {d.factor === 'Abnahme' ? '-' : '+'}{' '}
              {buildFrac(pp(d.a), 100)} = {pp(a)}
            </p>
            <p>Setze dann Anfangswert und {d.factor}faktor ein:</p>
            <p className="serlo-highlight-green">
              y = {pp(d.k)} · {pp(a)}
              <sup>x</sup>
            </p>
            <p className="serlo-highlight-green">
              x gibt {d.xDescription} an und y {d.yDescription}
            </p>
          </>
        )
      }}
    />
  )
}

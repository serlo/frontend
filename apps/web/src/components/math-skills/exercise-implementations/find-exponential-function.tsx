import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function FindExponentialFunction() {
  const { data } = useMathSkillsStorage()
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
              {data.name} konnte am Ende des Schuljahrs{' '}
              {d.k.toLocaleString('de-De').replace('.', ' ')} Englischvokabeln.
              Davon vergisst {data.name} während der Sommerferien jede Woche{' '}
              {d.a}
              %.
            </p>
          )}
          {d.context === 'rehe' && (
            <p className="serlo-highlight-gray">
              In einem Wald leben{' '}
              {d.k.toLocaleString('de-De').replace('.', ' ')} Rehe. Die
              Population wächst um {d.a.toLocaleString('de-De')} % pro Jahr.
            </p>
          )}
          {d.context === 'rente' && (
            <p className="serlo-highlight-gray">
              {data.name} ist in der Rente und besitzt ein Sparguthaben von
              <br />
              {d.k.toLocaleString('de-De').replace('.', ' ')} €. Von der Bank
              lässt sich {data.name} jeden Monat {d.a.toLocaleString('de-De')} %
              davon auszahlen.
            </p>
          )}
          {d.context === 'basketball' && (
            <p className="serlo-highlight-gray">
              Ein Basketball wird aus{' '}
              {d.k.toLocaleString('de-De').replace('.', ' ')} m fallen gelassen.
              Nach jedem Bodenkontakt verringert er seine Sprunghöhe um{' '}
              {d.a.toLocaleString('de-De')} %.
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
              {buildFrac(d.a.toLocaleString('de-De'), 100)} ={' '}
              {a.toLocaleString('de-De')}
            </p>
            <p>Setze dann Anfangswert und {d.factor}faktor ein:</p>
            <p className="serlo-highlight-green">
              y = {d.k.toLocaleString('de-De').replace('.', ' ')} ·{' '}
              {a.toLocaleString('de-De')}
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

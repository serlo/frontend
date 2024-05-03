import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

const wildtiereInWäldern = [
  'Rothirsche',
  'Wildschwein',
  'Rehe',
  'Füchse',
  'Dachse',
  'Wildkatzen',
  'Marder',
  'Eichhörnchen',
]

export function AnimalsInForest() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const startYear = randomIntBetween(2010, 2023)
        const startVal = randomIntBetween(50, 400)
        const growth = randomIntBetween(3, 20)

        const animal = randomItemFromArray(wildtiereInWäldern)

        const afterYears = randomIntBetween(5, 15)
        const a = 1 + growth / 100

        const prevPrevYearVal = startVal * Math.pow(a, afterYears - 2)
        const prevYearVal = startVal * Math.pow(a, afterYears - 1)
        const curYearVal = startVal * Math.pow(a, afterYears)
        const lowerBound = Math.ceil(prevYearVal - prevPrevYearVal)
        const upperBound = Math.floor(curYearVal - prevYearVal)

        const diff =
          randomIntBetween(
            Math.ceil(lowerBound / 5),
            Math.floor(upperBound / 5)
          ) * 5

        return { startYear, startVal, growth, animal, a, diff, afterYears }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Ende des Jahres {data.startYear} wurden im Wald {data.startVal}{' '}
            {data.animal} gezählt. Durch Beobachtungen stellt man eine
            Zuwachsrate von durchschnittlich {data.growth}&nbsp;% pro Jahr fest.
          </p>
          <p className="serlo-main-task">
            Der Zusammenhang zwischen der Anzahl y der {data.animal} und der
            Anzahl x der ab {data.startYear} vergangenen Jahre lässt sich
            näherungsweise mit folgender Funktion beschreiben:
          </p>
          <p className="serlo-highlight-gray">
            y = {data.startVal} · {pp(data.a)}
            <sup>x</sup>
          </p>
          <p className="serlo-main-task">
            Bestimmen Sie, im welchem Jahr sich die Anzahl der {data.animal}{' '}
            erstmals innerhalb eines Jahre um mehr als {data.diff} Tiere erhöht.
          </p>
        </>
      )}
      renderSolution={(data) => {
        const intermediate =
          Math.round(
            (data.diff / (data.startVal - data.startVal / data.a)) * 10000
          ) / 10000
        const x =
          Math.round((Math.log(intermediate) / Math.log(data.a)) * 1000) / 1000
        return (
          <>
            <p>
              Bestimme die Anzahl der {data.animal} am Ende von x Jahren ab{' '}
              {data.startYear}:
            </p>
            <p className="serlo-highlight-gray">
              Anzahl Ende des aktuellen Jahres: &nbsp;&nbsp;&nbsp;&nbsp;
              {data.startVal} · {pp(data.a)}
              <sup>x</sup>
            </p>
            <p>Erhalte für (x - 1) die Anzahl im Vorjahr:</p>
            <p className="serlo-highlight-gray">
              Anzahl Ende des Vorjahrs: &nbsp;&nbsp;&nbsp;&nbsp;
              {data.startVal} · {pp(data.a)}
              <sup>x - 1</sup>
            </p>
            <p>Bilde die Differenz und erhalte den Zuwachs:</p>

            <p className="serlo-highlight-gray">
              Zuwachs: &nbsp;&nbsp;&nbsp;&nbsp;
              {data.startVal} · {pp(data.a)}
              <sup>x</sup> - {data.startVal} · {pp(data.a)}
              <sup>x - 1</sup>
            </p>
            <p>
              Setze den Zuwachs gleich {data.diff} und löse die Gleichung nach x
              auf:
            </p>
            <p className="serlo-highlight-gray">
              {data.startVal} · {pp(data.a)}
              <sup>x</sup> - {data.startVal} · {pp(data.a)}
              <sup>x - 1</sup> = {data.diff}
              <br />
              <br />
              {data.startVal} · {pp(data.a)}
              <sup>x</sup> - {data.startVal} · {buildFrac(1, pp(data.a))} ·{' '}
              {pp(data.a)}
              <sup>x</sup> = {data.diff} <br />
              <br />({data.startVal} - {buildFrac(data.startVal, pp(data.a))}) ·{' '}
              {pp(data.a)}
              <sup>x</sup> = {data.diff}
              <br />
              <br />
              {pp(data.a)}
              <sup>x</sup> = {pp(intermediate)}
              <br />
              <br />x = log <sub>{pp(data.a)}</sub> {pp(intermediate)}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = {pp(x)}
            </p>
            <p>
              <strong>Runde an dieser Stelle auf</strong>. Bestimme das konkrete
              Jahr {data.startYear} + {Math.ceil(x)} und antworte:
            </p>
            <p className="serlo-highlight-green">
              Im Jahr {data.startYear + data.afterYears} erhöht sich die Anzahl
              der {data.animal} erstmals um mehr als {data.diff} Tiere.
            </p>
          </>
        )
      }}
    />
  )
}

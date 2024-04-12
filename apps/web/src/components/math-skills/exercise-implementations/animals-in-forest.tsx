import { SelfEvaluationExercise } from './self-evaluation-exercise'
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

        const afterYears = randomIntBetween(3, 15)
        const a = 1 + growth / 100

        const prevPrevYearVal = startVal * Math.pow(a, afterYears - 2)
        const prevYearVal = startVal * Math.pow(a, afterYears - 1)
        const curYearVal = startVal * Math.pow(a, afterYears)
        const lowerBound = Math.ceil(prevYearVal - prevPrevYearVal)
        const upperBound = Math.floor(curYearVal - prevYearVal)

        const diff = randomIntBetween(lowerBound, upperBound)

        return { startYear, startVal, growth, animal, a, diff }
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
            y = {data.startVal} · {data.a.toLocaleString('de-De')}
            <sup>x</sup>
          </p>
          <p className="serlo-main-task">
            Bestimmen Sie, im welchem Jahr sich die Anzahl der {data.animal}{' '}
            erstmals innerhalb eines Jahre um mehr als {data.diff} Tiere erhöht
            hat.
          </p>
        </>
      )}
      renderSolution={() => <></>}
    />
  )
}

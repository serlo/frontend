import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

const viraleVideos = [
  'Kosmische Katze: Das epische Weltraumabenteuer',
  'Tanzende Pinguine übernehmen die Antarktis',
  'Taco Dienstag: Das Musical',
  'Babyotter lernen schwimmen',
  'Alien-Invasion Streich: Area 51 Edition',
  'Super Faultier rettet den Tag',
  "Zeitreisende Oma's Kochshow",
  'Roboterhund vs. Riesenhuhn: Kampf des Jahrhunderts',
  'Fliegende Schweine: Eine Dokumentation',
  "Einhorn's Anleitung zum Glücklichsein",
]

export function CompareGrowth() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const isCrossing = randomItemFromArray([true, false])

        let startA = 0,
          startB = 0,
          growthA = 0,
          growthB = 0

        if (isCrossing) {
          startA = randomIntBetween(10, 200)
          startB = randomIntBetween(startA + 10, 400)

          growthA = randomIntBetween(200, 500) / 10
          growthB = randomIntBetween(50, growthA * 10 - 5) / 10
        } else {
          startA = randomIntBetween(10, 200)
          startB = randomIntBetween(startA + 10, 400)

          growthA = randomIntBetween(50, 200) / 10
          growthB = randomIntBetween(growthA * 10 + 5, 400) / 10
        }

        const swap = randomItemFromArray([true, false])
        if (swap) {
          const t_start = startB
          const t_growth = growthB

          startB = startA
          growthB = growthA

          startA = t_start
          growthA = t_growth
        }

        const nameA = randomItemFromArray(viraleVideos)
        const nameB = randomItemFromArray(
          viraleVideos.filter((x) => x !== nameA)
        )

        const year = randomIntBetween(2015, 2023)

        return {
          startA,
          startB,
          growthA,
          growthB,
          nameA,
          nameB,
          isCrossing,
          year,
          swap,
        }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Im Jahr {data.year} wurden zeitgleich zwei virale Videos
            veröffentlicht.
          </p>
          <p className="serlo-main-task">
            Am ersten Tag hatte &quot;{data.nameA}&quot; {data.startA}
            &nbsp;Aufrufe, die Anzahl der Aufrufe steigt täglich um{' '}
            {pp(data.growthA)}&nbsp;%.
          </p>
          <p className="serlo-main-task">
            &quot;{data.nameB}&quot; hatte am ersten Tag {data.startB}
            &nbsp;Aufrufe, die Anzahl der Aufrufe steigt täglich um{' '}
            {pp(data.growthB)}&nbsp;%.
          </p>
          <p className="serlo-main-task">
            Begründen Sie ohne Rechnung, dass{' '}
            {data.isCrossing ? (
              <>
                es einen Zeitpunkt gibt, an dem das Video &quot;
                {data.swap ? data.nameB : data.nameA}&quot; mehr Aufrufe hat als
                &quot;
                {data.swap ? data.nameA : data.nameB}&quot;
              </>
            ) : (
              <>
                die beiden Videos zu keinem Zeitpunkt gleichviele Aufrufe haben
                können
              </>
            )}
            .
          </p>
        </>
      )}
      renderSolution={(data) => {
        if (data.isCrossing) {
          return (
            <p className="serlo-highlight-green">
              &quot;{data.swap ? data.nameB : data.nameA}&quot; hat die höhere
              Wachstums-Rate. Dieses Video wird trotz des niedrigeren
              Anfangswerts ab einem Zeitpunkt das andere Video überholen.
            </p>
          )
        }
        return (
          <p className="serlo-highlight-green">
            &quot;{data.swap ? data.nameA : data.nameB}&quot; hat die höhere
            Wachstums-Rate. Weil es von Anfang an auch mehr Aufrufe, wird es
            deshalb immer mehr Aufrufe haben als das andere Video.
          </p>
        )
      }}
    />
  )
}

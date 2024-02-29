import { createExponentiateExercise } from './create/create-exponentiate-exercise'
import { createIncrDescNumberExercise } from './create/create-incr-desc-number-exercise'
import { createNumberDistancesExercise } from './create/create-number-distance-exercise'
import { createPlaceValueChangeExercise } from './create/create-place-value-change-exercise'
import { createTextToNumberExercise } from './create/create-text-to-number-exercise'
import {
  numberLineGeneratorLevel1,
  numberLineGeneratorLevel2,
  numberLineGeneratorLevel3,
} from './generators/number-line-generator'
import { NumberLineInputExercise } from '@/components/math-skills/exercise-implementations/number-line-input-exercise'
import { OrderValues } from '@/components/math-skills/exercise-implementations/order-values'
import { PlaceValueChart } from '@/components/math-skills/exercise-implementations/place-value-chart'
import { PlaceValueChooser } from '@/components/math-skills/exercise-implementations/place-value-chooser'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { shuffleArray } from '@/helper/shuffle-array'

export const allExercises = {
  'zahlen-anordnen-1': {
    title: 'Zahlenstrahl anordnen',
    level: 'Level 1',
    smallprint: (
      <>
        Fange damit an, die fehlenden Markierungen der langen Striche
        herauszufinden. Die Mitte lässt sich gut bestimmen, auch eine
        Verdopplung der Länge. Wenn du die Werte der langen Striche weißt, dann
        hast du bereits einen guten Überblick.
      </>
    ),
    component: (
      <NumberLineExercise
        generator={numberLineGeneratorLevel1}
        centAmount={35}
      />
    ),
  },
  'zahlen-anordnen-2': {
    title: 'Zahlenstrahl anordnen',
    level: 'Level 2',
    smallprint: (
      <>
        Der Zahlenstrahl ist flexibel. Pro Zahlenstrahl sind die Abstände
        zwischen den Strichen immer gleich, aber jeder Zahlenstrahl kann einen
        eigenen Abstand festlegen.
      </>
    ),
    component: (
      <NumberLineExercise
        generator={numberLineGeneratorLevel2}
        centAmount={35}
      />
    ),
  },
  'zahlen-anordnen-profi': {
    title: 'Zahlenstrahl anordnen',
    level: 'Profi',
    component: (
      <NumberLineExercise
        generator={numberLineGeneratorLevel3}
        centAmount={35}
      />
    ),
    smallprint: (
      <>
        Im Jahr 1685 wurde von John Wallis das erste Mal der Zahlenstrahl
        verwendet, um Zahlen darzustellen. Mit dem Zahlenstrahl erklärte er, wie
        man Zahlen addiert und subtrahiert. Er nutzte die Vorstellung von einem
        Menschen, der auf dem Strahl nach rechts oder nach links läuft.
      </>
    ),
  },
  'zahlen-ablesen-1': {
    title: 'Zahlenstrahl ablesen',
    level: 'Level 1',
    smallprint: (
      <>
        Wie beim Anordnen ist ein guter Anfang, die Werte der langen Striche zu
        bestimmen. Überlege dir dann, wie groß der Abstand zwischen zwei kleinen
        Strichen ist (falls nötig).
      </>
    ),
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel1}
        centAmount={35}
      />
    ),
  },
  'zahlen-ablesen-2': {
    title: 'Zahlenstrahl ablesen',
    level: 'Level 2',
    smallprint: (
      <>
        Wer genau hinschaut erkennt, dass es nur zwei verschiedene Einteilungen
        gibt! Einmal mit 400 als Maximalwert, und einmal mit 800. Der Abstand
        der kleinen Striche ist bei dem einen 10, bei dem anderen 20. Achte auf
        diesen Unterschied.
      </>
    ),
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel2}
        centAmount={35}
      />
    ),
  },
  'zahlen-ablesen-profi': {
    title: 'Zahlenstrahl ablesen',
    level: 'Profi',
    smallprint: (
      <>
        Der Zahlenstrahl beginnt bei 0 und verläuft unendlich nach rechts.
        Später wirst du sehen, dass man den Zahlenstrahl auch nach links
        erweitern kann. Daraus entsteht dann die Zahlengerade.
      </>
    ),
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel3}
        centAmount={35}
      />
    ),
  },
  'stellenwerte-finden': {
    title: 'Stellenwerte finden',
    smallprint: (
      <>
        Um die Schreibarbeit zu vereinfachen, werden in den anderen <br />
        Aufgaben die Stellenwerte auf die Anfangsbuchstaben abgekürzt:
        <br />
        E = Einer, Z = Zehner, H = Hunderter, T = Tausender,
        <br />
        ZT = Zehntausender, HT = Hunderttausender, M = Million.
      </>
    ),
    component: (
      <PlaceValueChooser
        centAmount={35}
        generator={() => {
          const figure = randomIntBetween(1000, 99999)
          // digit pos starting with 1 => Einser
          const searchedDigit = randomIntBetween(1, figure.toString().length)
          return { figure, searchedDigit }
        }}
      />
    ),
  },
  'stellenwert-tabelle-ablesen': {
    title: 'Stellenwerte ablesen',
    level: 'Level 1',
    smallprint: (
      <>
        Lange Zeit gab es keine Ziffer Null. Wenn eine Stelle in der
        Stellenwert-Tafel leer war, musste man sich anders behelfen, z.B. mit
        einem größeren Abstand zwischen zwei Ziffern oder einen anderen
        Platzhalter. So kann es sehr schwer sein, zwischen 42001 und 420001 zu
        unterscheiden. Erst mit der Erfindung der Null wurde unser Dezimalsystem
        so leistungsfähig, wie wir es heute kennen.
      </>
    ),
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const T = randomIntBetween(1, 9)
          const H = randomIntBetween(0, 9)
          const Z = randomIntBetween(0, 9)
          const E = randomIntBetween(0, 9)
          return { value: T * 1000 + H * 100 + Z * 10 + E, T, H, Z, E }
        }}
        getCorrectValue={({ value }) => value}
        render={(input, { T, H, Z, E }) => {
          return (
            <>
              <PlaceValueChart T={T} H={H} Z={Z} E={E} />
              <h2 className="my-4 text-2xl">
                Welche Zahl stellt die Stellenwert-Tafel dar?
              </h2>
              <div className="ml-0.5 mt-2" id="number-input">
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  },
  'stellenwerte-aendern-1': {
    ...createPlaceValueChangeExercise(false),
    smallprint: (
      <>
        Mathematisch bedeutet das Entfernen eines Plättchens eine Subtraktion,
        das Hinzufügen entspricht einer Addition.
      </>
    ),
  },
  'stellenwerte-aendern-profi': {
    ...createPlaceValueChangeExercise(true),
    smallprint: (
      <>
        Wenn du 10 Plättchen in einer Spalte hast, müssen diese zu einem
        Plättchen gebündelt und in die nächste Spalte links eingetragen werden.
        Unser Dezimalsystem bündelt bei der Zahl 10. Im alten Babylon gab es ein
        Zahlensystem, das erst bei der 60 bündelt! Die Tabelle dort sah deutlich
        voller aus.
      </>
    ),
  },
  'text-in-zahl-1': {
    ...createTextToNumberExercise(false),
    smallprint: (
      <>
        Die Zahl Million besteht aus dem lateinischen Wort mille (= Tausend) und
        der Vergrößerungs-Silbe &quot;-ion&quot;, wörtlich also
        &quot;großtausend&quot;. Eine Million hat 6 Nullen, ein Tausend hat 3
        Nullen. Für große Zahlen sind die Zahlwörter immer in diesem 3er-Abstand
        zu finden.
      </>
    ),
  },
  'text-in-zahl-profi': {
    ...createTextToNumberExercise(true),
    smallprint: (
      <>
        Im Englischen wird für eine Milliarde das Wort <em>billion</em>{' '}
        verwendet - nicht zu verwechseln mit der deutschen Billion. Hier liegt
        wahrlich ein großes Potenzial für Missverständnisse.
      </>
    ),
  },
  'zahlen-vergroeßern-verkleinern-1': createIncrDescNumberExercise('Level 1'),
  'zahlen-vergroeßern-verkleinern-2': createIncrDescNumberExercise('Level 2'),
  'zahlen-vergroeßern-verkleinern-3': createIncrDescNumberExercise('Level 3'),
  'zahlen-vergroeßern-verkleinern-profi': createIncrDescNumberExercise('Profi'),
  'zahlen-sortieren-wip': {
    title: 'Zahlen Sortieren',
    level: 'WIP',
    component: (
      <OrderValues
        centAmount={35}
        generator={() => {
          const v1 = randomIntBetween(1000, 99999)
          const v2 = v1 - randomIntBetween(1, 10)
          const v3 = v2 - randomIntBetween(1, 10)
          const v4 = v3 - randomIntBetween(1, 10)
          const v5 = v4 - randomIntBetween(1, 10)
          return { values: shuffleArray([v1, v2, v3, v4, v5]) }
        }}
      />
    ),
  },
  'zahlenabstaende-erkennen-1': createNumberDistancesExercise('Level 1'),
  'zahlenabstaende-erkennen-2': createNumberDistancesExercise('Level 2'),
  'zahlenabstaende-erkennen-profi': createNumberDistancesExercise('Profi'),
  'zahlenabstaende-erkennen-topprofi':
    createNumberDistancesExercise('TopProfi'),
  'potenzwert-berechnen': createExponentiateExercise(),
} as const

export type SupportedExercisesId = keyof typeof allExercises

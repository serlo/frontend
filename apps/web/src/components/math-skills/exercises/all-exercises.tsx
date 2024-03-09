import { createBinaryIncrDescExercise } from './create/create-binary-incr-decr-exercise'
import { createBinaryMemoryExercise } from './create/create-binary-memory-exercise'
import { createDecimalToDualExercise } from './create/create-decimal-to-dual-exercise'
import { createDecimalToDualWithChartExercise } from './create/create-decimal-to-dual-with-chart-exercise'
import { createDecimalToRomanExercise } from './create/create-decimal-to-roman-exercise'
import { createBinaryToDecimalExercise } from './create/create-dual-to-decimal-exercise'
import { createExponentiateExercise } from './create/create-exponentiate-exercise'
import { createFindCorrectlyRoundedExercise } from './create/create-find-correctly-rounded-exercise'
import { createIncrDescNumberExercise } from './create/create-incr-desc-number-exercise'
import { createNumberDistancesExercise } from './create/create-number-distance-exercise'
import { createOrderRomanExercise } from './create/create-order-roman-exercises'
import { createPlaceValueChangeExercise } from './create/create-place-value-change-exercise'
import { createRomanMemoryExercise } from './create/create-roman-memory-exercise'
import { createRomanToDecimalExercise } from './create/create-roman-to-decimal-exercise'
import { createTextToNumberExercise } from './create/create-text-to-number-exercise'
import {
  numberLineGeneratorLevel1,
  numberLineGeneratorLevel2,
  numberLineGeneratorLevel3,
} from './generators/number-line-generator'
import { SelfEvaluationExercise } from '../exercise-implementations/self-evaluation-exercise'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { MultipleNumberInputExercise } from '../number-input-exercise/multiple-number-input-exercise'
import { buildFrac } from '../utils/math-bulder'
import { NumberLineInputExercise } from '@/components/math-skills/exercise-implementations/number-line-input-exercise'
import { OrderValues } from '@/components/math-skills/exercise-implementations/order-values'
import { PlaceValueChart } from '@/components/math-skills/exercise-implementations/place-value-chart'
import { PlaceValueChooser } from '@/components/math-skills/exercise-implementations/place-value-chooser'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
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
          const value = randomIntBetween(1000, 9999)
          return { value }
        }}
        getCorrectValue={({ value }) => value}
        render={(input, { value }) => {
          return (
            <>
              <PlaceValueChart value={value} />
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
  'vorgaenger-nachfolger-1': {
    title: 'Vorgänger und Nachfolger',
    level: 'Tabelle',
    component: (
      <MultipleNumberInputExercise
        numberOfInputs={2}
        centAmount={35}
        generator={() => {
          const modus = randomItemFromArray(['simple', 'composite'])
          const showIndex = randomItemFromArray([0, 1, 2])
          if (modus === 'simple') {
            return { midValue: randomIntBetween(2, 30) * 100, showIndex }
          }
          return {
            midValue:
              1000 * randomIntBetween(2, 50) + 10 * randomIntBetween(0, 10),
            showIndex,
          }
        }}
        getCorrectValues={({ midValue, showIndex }) => {
          const output = [midValue - 1, midValue, midValue + 1]
          output.splice(showIndex, 1)
          return output
        }}
        render={(inputs, data) => {
          const numbers = [data.midValue - 1, data.midValue, data.midValue + 1]
          const vals = [
            inputs[0],
            <p
              className="w-[120px] rounded-lg bg-gray-100 p-2 text-2xl"
              key={data.showIndex}
            >
              {numbers[data.showIndex]}
            </p>,
            inputs[1],
          ]
          if (data.showIndex === 0) {
            const t = vals[1]
            vals[1] = vals[0]
            vals[0] = t
          }
          if (data.showIndex === 2) {
            const t = vals[2]
            vals[2] = vals[1]
            vals[1] = t
          }
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Ergänze die fehlenden Zahlen:
              </h2>
              <div className="flex flex-col gap-3 text-sm font-bold text-almost-black mobile:flex-row">
                <label>
                  {vals[0]}
                  <p className="ml-2.5 mt-0.5 font-normal">Vorgänger</p>
                </label>
                <label>
                  {vals[1]}
                  <p className="ml-2.5 mt-0.5 font-normal">Zahl</p>
                </label>
                <label>
                  {vals[2]}
                  <p className="ml-2.5 mt-0.5 font-normal">Nachfolger</p>
                </label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'vorgaenger-nachfolger-2': {
    title: 'Vorgänger und Nachfolger',
    level: 'Text',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          let midValue = -1
          const direction = randomItemFromArray(['up', 'down'])
          const rel = randomItemFromArray([
            'lower',
            'upper',
            'doublelower',
            'doubleupper',
          ])
          const modus = randomItemFromArray(['simple', 'composite'])
          if (modus === 'simple') {
            midValue = randomIntBetween(2, 30) * 100
          } else {
            midValue =
              1000 * randomIntBetween(2, 50) + 10 * randomIntBetween(0, 10)
          }
          let showValue = midValue
          if (rel === 'lower' && direction === 'up') {
            showValue--
          }
          if (rel === 'upper' && direction === 'down') {
            showValue++
          }
          if (rel === 'doublelower' && direction === 'up') {
            showValue -= 2
          }
          if (rel === 'doubleupper' && direction === 'down') {
            showValue += 2
          }
          const resultValue = direction === 'up' ? showValue + 1 : showValue - 1
          return { showValue, resultValue, direction }
        }}
        getCorrectValue={({ resultValue }) => {
          return resultValue
        }}
        render={(input, { showValue, direction }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Wie lautet der{' '}
                <b className="text-newgreen">
                  {direction === 'up' ? 'Nachfolger' : 'Vorgänger'}
                </b>{' '}
                der Zahl <b className="text-newgreen">{showValue}</b>?
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
  'zahlen-vergroeßern-verkleinern-1': createIncrDescNumberExercise('Level 1'),
  'zahlen-vergroeßern-verkleinern-2': createIncrDescNumberExercise('Level 2'),
  'zahlen-vergroeßern-verkleinern-3': createIncrDescNumberExercise('Level 3'),
  'zahlen-vergroeßern-verkleinern-profi': createIncrDescNumberExercise('Profi'),
  'zahlen-ordnen': {
    title: 'Zahlen ordnen',
    level: 'Level 1',
    component: (
      <OrderValues
        centAmount={35}
        generator={() => {
          const v1 = randomIntBetween(1000, 99999)
          const v2 = v1 - randomIntBetween(1, 10)
          const v3 = v2 - randomIntBetween(1, 10)
          const v4 = v3 - randomIntBetween(1, 10)
          const v5 = v4 - randomIntBetween(1, 10)
          return {
            values: shuffleArray([v1, v2, v3, v4, v5]),
          }
        }}
      />
    ),
  },
  'zahlenabstaende-erkennen-1': createNumberDistancesExercise('Level 1'),
  'zahlenabstaende-erkennen-2': createNumberDistancesExercise('Level 2'),
  'zahlenabstaende-erkennen-profi': createNumberDistancesExercise('Profi'),
  'zahlenabstaende-erkennen-topprofi':
    createNumberDistancesExercise('TopProfi'),
  'roemisch-nach-dezimal-1': createRomanToDecimalExercise('Level 1', 1, 54),
  'roemisch-nach-dezimal-2': createRomanToDecimalExercise('Level 2', 10, 100),
  'roemisch-nach-dezimal-3': createRomanToDecimalExercise('Level 3', 10, 350),
  'roemisch-nach-dezimal-profi': createRomanToDecimalExercise('Profi', 1, 2100),
  'dezimal-nach-roemisch-1': createDecimalToRomanExercise('Level 1', 1, 105),
  'dezimal-nach-roemisch-2': createDecimalToRomanExercise('Level 2', 1, 305),
  'dezimal-nach-roemisch-profi': createDecimalToRomanExercise('Profi', 1, 2100),
  'roemische-zahlen-memory-1': createRomanMemoryExercise('1 bis 10', 1, 10),
  'roemische-zahlen-memory-2': createRomanMemoryExercise('11 bis 60', 11, 60),
  'roemische-zahlen-memory-3': createRomanMemoryExercise('4 bis 50', 4, 50),
  'roemische-zahlen-memory-4': createRomanMemoryExercise(
    '40 bis 500',
    40,
    500,
    2
  ),
  'roemische-zahlen-memory-profi': createRomanMemoryExercise(
    'Profi',
    400,
    1500,
    2
  ),
  'roemische-zahlen-memory-profi-plus': createRomanMemoryExercise(
    'Profi+',
    40,
    1500,
    3
  ),
  'roemische-zahlen-ordnen-1': createOrderRomanExercise(
    'Level 1',
    'small-number'
  ),
  'roemische-zahlen-ordnen-2': createOrderRomanExercise(
    'Level 2',
    'consecutive',
    30,
    70
  ),
  'roemische-zahlen-ordnen-profi': createOrderRomanExercise(
    'Profi',
    'consecutive',
    50,
    130
  ),
  'dualzahlen-stellenwerte-erkennen': {
    title: 'Stellenwerte von Dualzahlen erkennen',
    component: (
      <PlaceValueChooser
        centAmount={35}
        digitString={(searchedDigit) => {
          return `${Math.pow(2, searchedDigit - 1)}er`
        }}
        generator={() => {
          const figure = parseInt(randomIntBetween(32, 511).toString(2))
          // digit pos starting with 1 => Einser
          const searchedDigit = randomIntBetween(3, figure.toString().length)
          return { figure, searchedDigit }
        }}
      />
    ),
  },
  'dual-nach-dezimal-stellenwerttafel-1': {
    title: 'Dualzahl in Dezimalzahl umrechnen',
    level: 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => randomIntBetween(2, 31)}
        getCorrectValue={(val) => val}
        render={(input, data) => {
          const digits = data.toString(2).split('')
          while (digits.length < 5) {
            digits.unshift(' ')
          }
          return (
            <>
              <p className="text-2xl">
                Gib die Dualzahl aus der Stellenwerttafel als Dezimalzahl an.
              </p>
              <div className="my-8 flex text-xl">
                {digits.map((el, i) => {
                  return (
                    <div key={i} className="border-r-4 px-2">
                      {Math.pow(2, 4 - i)}er
                      <br />
                      <span className="font-mono font-bold text-newgreen">
                        {el}
                      </span>
                    </div>
                  )
                })}
              </div>
              {input}
            </>
          )
        }}
      />
    ),
  },
  'dual-nach-dezimal-stellenwerttafel-2': {
    title: 'Dualzahl in Dezimalzahl umrechnen',
    level: 'Level 2',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => randomIntBetween(4, 127)}
        getCorrectValue={(val) => val}
        render={(input, data) => {
          const digits = data.toString(2).split('')
          while (digits.length < 7) {
            digits.unshift(' ')
          }
          return (
            <>
              <p className="text-2xl">
                Gib die Dualzahl aus der Stellenwerttafel als Dezimalzahl an.
              </p>
              <div className="my-8 flex border-l-4 text-xl">
                {digits.map((el, i) => {
                  return (
                    <div key={i} className="border-r-4 px-2">
                      {Math.pow(2, 6 - i)}er
                      <br />
                      <span className="font-mono font-bold text-newgreen">
                        {el}
                      </span>
                    </div>
                  )
                })}
              </div>
              {input}
            </>
          )
        }}
      />
    ),
  },
  'dual-nach-dezimal-umrechnen-1': createBinaryToDecimalExercise('Level 1', 15),
  'dual-nach-dezimal-umrechnen-profi': createBinaryToDecimalExercise(
    'Profi',
    45
  ),
  'dual-nach-dezimal-umrechnen-profi-plus': createBinaryToDecimalExercise(
    'Profi+',
    127
  ),
  'dezimal-nach-dual-stellenwerttafel-1': createDecimalToDualWithChartExercise(
    'Level 1',
    5
  ),
  'dezimal-nach-dual-stellenwerttafel-2': createDecimalToDualWithChartExercise(
    'Level 2',
    7
  ),
  'dezimal-nach-dual-stellenwerttafel-profi':
    createDecimalToDualWithChartExercise('Profi', 8),
  'dezimal-nach-dual-umrechnen-1': createDecimalToDualExercise(
    'Level 1',
    2,
    17
  ),
  'dezimal-nach-dual-umrechnen-profi': createDecimalToDualExercise(
    'Profi',
    2,
    40
  ),
  'dezimal-nach-dual-umrechnen-profi-plus': createDecimalToDualExercise(
    'Profi+',
    24,
    74
  ),
  'dualzahlen-memory-1': createBinaryMemoryExercise('Level 1', 2, 9),
  'dualzahlen-memory-2': createBinaryMemoryExercise('Level 2', 8, 15),
  'dualzahlen-memory-profi': createBinaryMemoryExercise('Profi', 5, 12),
  'dualzahlen-nachfolger': createBinaryIncrDescExercise('Nachfolger'),
  'dualzahlen-vorgaenger': createBinaryIncrDescExercise('Vorgänger'),
  'dualzahlen-vorgaenger-nachfolger-kombi':
    createBinaryIncrDescExercise('Kombi'),
  'dualzahlen-vorgaenger-nachfolger-profi': {
    title: 'Vorgänger und Nachfolger einer Dualzahl',
    component: (
      <MultipleNumberInputExercise
        numberOfInputs={2}
        centAmount={35}
        generator={() => {
          const showIndex = randomItemFromArray([0, 1, 2])
          return { midValue: randomIntBetween(2, 30), showIndex }
        }}
        getCorrectValues={({ midValue, showIndex }) => {
          const output = [midValue - 1, midValue, midValue + 1]
          output.splice(showIndex, 1)
          return output.map((x) => parseInt(x.toString(2)))
        }}
        render={(inputs, data) => {
          const numbers = [data.midValue - 1, data.midValue, data.midValue + 1]
          const vals = [
            <span className="font-mono" key={0}>
              {inputs[0]}
            </span>,
            <p
              className="w-[120px] rounded-lg bg-gray-100 p-2 font-mono text-2xl"
              key={data.showIndex}
            >
              {numbers[data.showIndex].toString(2)}
            </p>,
            <span className="font-mono" key={1}>
              {inputs[1]}
            </span>,
          ]
          if (data.showIndex === 0) {
            const t = vals[1]
            vals[1] = vals[0]
            vals[0] = t
          }
          if (data.showIndex === 2) {
            const t = vals[2]
            vals[2] = vals[1]
            vals[1] = t
          }
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Ergänze die fehlenden Zahlen:
              </h2>
              <div className="flex flex-col gap-3 text-sm font-bold text-almost-black mobile:flex-row">
                <label>
                  {vals[0]}
                  <p className="ml-2.5 mt-0.5 font-normal">Vorgänger</p>
                </label>
                <label>
                  {vals[1]}
                  <p className="ml-2.5 mt-0.5 font-normal">Zahl</p>
                </label>
                <label>
                  {vals[2]}
                  <p className="ml-2.5 mt-0.5 font-normal">Nachfolger</p>
                </label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'zahlen-runden-1': {
    title: 'Zahlen runden',
    level: 'Level 1',
    component: (
      <NumberInputExercise
        generator={() => {
          const number = randomIntBetween(10000, 50000)
          const [target, factor] = randomItemFromArray([
            ['Zehner', 10],
            ['Hunderter', 100],
            ['Tausender', 1000],
            ['Zehntausender', 10000],
          ])
          return {
            number,
            target,
            result: Math.round(number / factor) * factor,
          }
        }}
        centAmount={35}
        getCorrectValue={({ result }) => {
          return result
        }}
        render={(input, { number, target }) => {
          return (
            <>
              <div className="text-2xl">
                Runde <span className="font-bold text-newgreen">{number}</span>{' '}
                auf <span className="font-bold text-newgreen">{target}</span>.
                <br />
                <br />
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  },
  'zahlen-runden-profi': {
    title: 'Zahlen runden',
    level: 'Profi',
    component: (
      <NumberInputExercise
        generator={() => {
          const [target, factor] = randomItemFromArray([
            ['Zehner', 10],
            ['Hunderter', 100],
            ['Tausender', 1000],
            ['Zehntausender', 10000],
          ])
          const number = randomIntBetween(10000, 50000)
          const rounded = Math.round(number / factor) * factor
          const dir = randomItemFromArray(['lower', 'upper'])
          return {
            rounded,
            dir,
            target,
            result:
              dir === 'lower' ? rounded - factor / 2 : rounded + factor / 2 - 1,
          }
        }}
        centAmount={35}
        getCorrectValue={({ result }) => {
          return result
        }}
        render={(input, { dir, rounded, target }) => {
          return (
            <>
              <div className="text-2xl">
                Wie lautet die{' '}
                <span className="font-bold text-newgreen">
                  {dir === 'upper' ? 'größtmögliche' : 'kleinstmögliche'}
                </span>{' '}
                Zahl, die auf{' '}
                <span className="font-bold text-newgreen">{target}</span>{' '}
                gerundet{' '}
                <span className="font-bold text-newgreen">{rounded}</span>{' '}
                ergibt?
                <br />
                <br />
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  },
  'zahlen-richtig-gerundet-1': createFindCorrectlyRoundedExercise(1),
  'zahlen-richtig-gerundet-2': createFindCorrectlyRoundedExercise(2),
  'zahlen-richtig-gerundet-3': createFindCorrectlyRoundedExercise(3),
  'potenzwert-berechnen': createExponentiateExercise(),
  'euro-zerlegen': {
    title: 'Vorgänger und Nachfolger einer Dualzahl',
    component: (
      <MultipleNumberInputExercise
        numberOfInputs={2}
        centAmount={35}
        generator={() => {
          const euro = randomIntBetween(0, 35)
          const cent = randomIntBetween(0, 99)
          return { euro, cent }
        }}
        getCorrectValues={({ euro, cent }) => [euro, cent]}
        render={(inputs, { euro, cent }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Zerlege{' '}
                <b className="text-newgreen">
                  {euro},{String(cent).padStart(2, '0')} €
                </b>{' '}
                in € und Cent
              </h2>
              <div className="flex flex-col gap-3 text-2xl font-bold text-almost-black mobile:flex-row">
                <label>{inputs[0]} €</label>
                <label>{inputs[1]} Cent</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'euro-kommaschreibweise': {
    title: 'Euro in Kommaschreibweise',
    level: 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const euro = randomIntBetween(0, 35)
          const cent = randomIntBetween(0, 99)
          return { euro, cent }
        }}
        getCorrectStringValue={({ euro, cent }) =>
          centToEuroCommaString(euro * 100 + cent)
        }
        render={(input, { euro, cent }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Was ist{' '}
                <b className="text-newgreen">
                  {euro} € und {cent} Cent
                </b>
                <br />
                in Kommaschreibweise?
              </h2>
              <div
                className="flex flex-col gap-3 text-2xl font-bold text-almost-black mobile:flex-row"
                id="number-input"
              >
                <label>{input} €</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'euro-in-cent': {
    title: 'Euro in Cent',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const euro = randomIntBetween(0, 35)
          const cent = randomIntBetween(0, 99)
          return { euro, cent }
        }}
        getCorrectValue={({ euro, cent }) => euro * 100 + cent}
        render={(input, { euro, cent }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Schreibe als Cent-Betrag:
                <br />
                <b className="text-newgreen">
                  {euro} € und {cent} Cent
                </b>
              </h2>
              <div
                className="text-2xl font-bold text-almost-black"
                id="number-input"
              >
                <label>{input} Cent</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'euro-muenzen-mindestens': {
    title: 'Wie viele Münzen mindestens?',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const precalc = {
            1: [20, 50],
            2: [11, 12, 15, 21, 22, 25, 30, 40, 51, 52, 55, 60, 70],
            3: [
              13, 14, 16, 17, 23, 24, 26, 27, 31, 32, 35, 41, 42, 45, 53, 54,
              56, 57, 61, 62, 65, 71, 72, 75, 80, 90,
            ],
            4: [
              18, 19, 28, 29, 33, 34, 36, 37, 43, 44, 46, 47, 58, 59, 63, 64,
              66, 67, 73, 74, 76, 77, 81, 82, 85, 91, 92, 95,
            ],
            5: [38, 39, 48, 49, 68, 69, 78, 79, 83, 84, 86, 87, 93, 94, 96, 97],
            6: [88, 89, 98, 99],
          } as { [key: number]: number[] }
          const n = randomIntBetween(1, 6)
          const cent = randomItemFromArray(precalc[n])

          const coins = []

          const coinsAvailable = [200, 100, 50, 20, 10, 5, 2, 1]
          let remainingCents = cent
          while (remainingCents !== 0) {
            const biggestCoin = coinsAvailable.find(
              (coinCents) => remainingCents >= coinCents
            )!
            coins.push(biggestCoin)
            remainingCents -= biggestCoin
          }

          return { cent, n, coins }
        }}
        getCorrectValue={({ n }) => {
          return n
        }}
        renderFeedback={({ n, coins }) => (
          <>
            <br />
            {n}
            <br />
            mit den Münzen
            <br />
            {coins.map((x) => `${x}ct`).join(', ')}
            <br />
          </>
        )}
        render={(input, { cent }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Du willst <b className="text-newgreen">{cent} Cent</b> bezahlen.
                <br />
                Wie viele Münzen brauchst du mindestens?
              </h2>
              <div
                className="text-2xl font-bold text-almost-black"
                id="number-input"
              >
                <label>{input} Münzen</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'euro-scheine-mindestens': {
    title: 'Wie viele Scheine mindestens?',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const precalc = {
            1: [100, 200],
            2: [105, 110, 120, 150, 205, 210, 220, 250, 300, 400],
            3: [
              115, 125, 130, 140, 155, 160, 170, 215, 225, 230, 240, 255, 260,
              270, 305, 310, 320, 350, 405, 410, 420, 450,
            ],
            4: [
              135, 145, 165, 175, 180, 190, 235, 245, 265, 275, 280, 290, 315,
              325, 330, 340, 355, 360, 370, 415, 425, 430, 440, 455, 460, 470,
            ],
            5: [
              185, 195, 285, 295, 335, 345, 365, 375, 380, 390, 435, 445, 465,
              475, 480, 490,
            ],
            6: [385, 395, 485, 495],
          } as { [key: number]: number[] }
          const n = randomIntBetween(1, 6)
          const euro = randomItemFromArray(precalc[n])

          const bills = []

          const billsAvailable = [200, 100, 50, 20, 10, 5]
          let remaining = euro
          while (remaining !== 0) {
            const biggestBill = billsAvailable.find(
              (coinCents) => remaining >= coinCents
            )!
            bills.push(biggestBill)
            remaining -= biggestBill
          }
          return { euro, n, bills }
        }}
        getCorrectValue={({ n }) => {
          return n
        }}
        renderFeedback={({ n, bills }) => (
          <>
            <br />
            {n}
            <br />
            mit den Scheinen
            <br />
            {bills.map((x) => `${x}€`).join(', ')}
            <br />
          </>
        )}
        render={(input, { euro }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Du willst <b className="text-newgreen">{euro} €</b> bezahlen.
                <br />
                Wie viele Scheine brauchst du mindestens?
              </h2>
              <div
                className="text-2xl font-bold text-almost-black"
                id="number-input"
              >
                <label>{input} Scheine</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'euro-vergleichen-1': {
    title: 'Sammelergebnis vergleichen',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const centAmount = Math.round(randomIntBetween(1000, 2000) / 5) * 5
          const centDifference = randomIntBetween(-700, 700)
          return { centAmount, centDifference }
        }}
        getCorrectStringValue={({ centAmount, centDifference }) => {
          const answerAmount = centAmount - centDifference
          return centToEuroCommaString(answerAmount)
        }}
        render={(input, { centAmount, centDifference }) => {
          const amount = centToEuroCommaString(centAmount)
          const difference = centToEuroCommaString(Math.abs(centDifference))
          const direction = centDifference < 0 ? 'mehr' : 'weniger'

          return (
            <>
              <h2 className="mr-12 pb-5 text-xl text-almost-black">
                Elif und Selina sammeln Spenden für Fridays for Future. Elif hat
                schon <b>{amount} €</b>.
                <br />
                Selina hat{' '}
                <b>
                  {difference} € {direction}
                </b>
                .<br />
                Wie viel hat Selina? (in Kommaschreibweise)
              </h2>
              <div
                className="text-2xl font-bold text-almost-black"
                id="number-input"
              >
                <label>{input} €</label>
              </div>
            </>
          )
        }}
      />
    ),
  },
  'logarithmus-1': {
    // title: 'Logarithmus zusammenfassen 1',
    component: (
      <SelfEvaluationExercise
        generator={() => {
          ;<></>
          return {
            num: randomIntBetween(1, 9),
            isPlus: randomItemFromArray([true, false]),
            varName: randomItemFromArray(['a', 'b', 'c', 'x', 'y', 'z']),
            logBase: randomIntBetween(2, 15),
          }
        }}
        renderTask={({ num, isPlus, varName, logBase }) => {
          return (
            <>
              <h2 className="text-2xl">Fasse zu einem Logarithmus zusammen:</h2>
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                log&#8202;<sub>{logBase}</sub>({varName}² - {num * num}) -
                log&#8202;
                <sub>{logBase}</sub>({varName} {isPlus ? '+' : '-'} {num})
              </span>
              <br />
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        }}
        renderSolution={({ num, isPlus, varName, logBase }) => {
          return (
            <>
              Aufgabenstellung: <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                log&#8202;<sub>{logBase}</sub>({varName}² - {num * num}) -
                log&#8202;
                <sub>{logBase}</sub>({varName} {isPlus ? '+' : '-'} {num})
              </span>
              <br />
              <br />
              Forme um mit Logarithmusgesetz:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                log&#8202;<sub>{logBase}</sub>
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(
                  <>
                    {varName}² - {num * num}
                  </>,
                  <>
                    {varName} {isPlus ? '+' : '-'} {num}
                  </>
                )}
                <span className="inline-block scale-y-[2.5]">)</span>
              </span>
              <br />
              <br />
              Wende 3. binomische Formel im Zähler an:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                log&#8202;<sub>{logBase}</sub>
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(
                  <>
                    ({varName} + {num})({varName} - {num})
                  </>,
                  <>
                    {varName} {isPlus ? '+' : '-'} {num}
                  </>
                )}
                <span className="inline-block scale-y-[2.5]">)</span>
              </span>
              <br />
              <br />
              Kürze mit {varName} {isPlus ? '+' : '-'} {num} und erhalte das
              Ergebnis: <br />
              <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                log&#8202;<sub>{logBase}</sub>({varName} {isPlus ? '-' : '+'}{' '}
                {num})
              </span>
            </>
          )
        }}
        centAmount={35}
      />
    ),
  },
  'triogonometrie-1': {
    // title: 'Logarithmus zusammenfassen 1',
    component: <Trigonometry />,
  },
} as const

export type SupportedExercisesId = keyof typeof allExercises

function centToEuroCommaString(inCent: number) {
  const [euro, cent] = String(inCent / 100).split('.')
  return `${euro},${String(cent).padEnd(2, '0')}`
}

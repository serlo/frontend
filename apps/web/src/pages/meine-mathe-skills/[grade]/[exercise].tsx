import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { NumberLineInputExercise } from '@/components/math-skills/exercise-implementations/number-line-input-exercise'
import { OrderValues } from '@/components/math-skills/exercise-implementations/order-values'
import { PlaceValueChart } from '@/components/math-skills/exercise-implementations/place-value-chart'
import { PlaceValueChooser } from '@/components/math-skills/exercise-implementations/place-value-chooser'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
import { getIntRange } from '@/helper/get-int-range'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
import { shuffleArray } from '@/helper/shuffle-array'

const ContentPage: NextPage = () => {
  const router = useRouter()

  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: `Mathe-Skills für die ${String(router.query.grade).replace(
            'klasse',
            ''
          )}. Klasse`,
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const router = useRouter()
  const exercise = String(router.query.exercise)

  if (!exercise) return null

  const data = exerciseData[exercise]

  if (!data) return null

  return (
    <div className="relative mx-4 mt-20 max-w-lg bg-white sm:mx-auto sm:w-full">
      <h2 className="text-md mb-9 font-bold text-gray-400">
        {data.title}
        {data.level ? (
          <>
            : <span className="text-brand-500">{data.level}</span>
          </>
        ) : null}
      </h2>
      {data.component}
      {data.smallprint ? (
        <div className="mb-12 mt-14 hyphens-auto leading-snug">
          {data.smallprint}
        </div>
      ) : null}
    </div>
  )
}

const exerciseData: {
  [key: string]: {
    title: string
    level?: string
    component: JSX.Element
    smallprint?: JSX.Element
  }
} = {
  'zahlen-anordnen-1': {
    title: 'Zahlenstrahl anordnen',
    level: 'Level 1',
    smallprint: (
      <>
        Der Zahlenstrahl ist flexibel. Pro Zahlenstrahl sind die Abstände
        zwischen den Strichen immer gleich, aber jeder Zahlenstrahl kann einen
        eigenen Abstand festlegen.
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
        Im Jahr 1685 wurde von John Wallis das erste Mal der Zahlenstrahl
        verwendet, um Zahlen darzustellen und zu zeigen, wie man mit ihnen
        rechnet. Man stelle sich dabei vor, wie eine Person auf dem Strahl nach
        links und rechts läuft.
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
  },
  'potenzwert-berechnen': {
    title: 'Potenzwert berechnen',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const base = randomIntBetween(0, 12)
          const powerLimit = Math.floor(
            base === 10 ? 6 : base > 4 ? 2 : 8 - base * 1.2
          )
          const mode = randomItemFromArray(['trivial', 'normal', 'normal'])
          const power = mode === 'trivial' ? 1 : randomIntBetween(2, powerLimit)
          return { base, power }
        }}
        getCorrectValue={({ base, power }) => {
          return Math.pow(base, power)
        }}
        render={(input, { base, power }) => {
          return (
            <>
              <h2 className="mt-8 pb-6 text-left text-2xl font-bold">
                Berechne den Potenzwert:
              </h2>
              <div className="ml-0.5 text-2xl font-bold" id="number-input">
                <span className="text-newgreen">
                  {base}
                  <sup className="ml-0.5">{power}</sup>
                </span>
                {' = '}
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  },
  'zahlen-ablesen-1': {
    title: 'Zahlenstrahl ablesen',
    level: 'Level 1',
    smallprint: (
      <>
        Wenn die Markierung auf einem langen, grünen Strich zeigt, dann reicht
        es dir aus, die Schrittlänge zwischen zwei langen Strichen
        herauszufinden. Die Zahlen sind alle so gewählt, dass du sie gut im Kopf
        rechnen kannst.
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
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel3}
        centAmount={35}
      />
    ),
  },
  'text-in-zahl-1': dataForTextToNumberExercise(false),
  'text-in-zahl-profi': dataForTextToNumberExercise(true),
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
        getCorrectValue={({ value }) => {
          return value
        }}
        render={(input, { T, H, Z, E }) => {
          return (
            <>
              <PlaceValueChart T={T} H={H} Z={Z} E={E} />
              <h2 className="mt-4 text-xl">
                Welche Zahl ist in der Stellenwert-Tafel dargestellt?
              </h2>
              <div className="ml-0.5 mt-8 text-2xl font-bold" id="number-input">
                <span className="mr-3">Die Zahl lautet:</span>
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  },
  'stellenwerte-aendern-1': dataForPlaceValueChange(false),
  'stellenwerte-aendern-profi': {
    ...dataForPlaceValueChange(true),
    smallprint: (
      <>
        In Babylon gab es bereits ein Stellenwertsystem. Allerdings wurde nicht
        bei der 10 gebündelt, sondern erst bei der 60!
      </>
    ),
  },
  'zahlen-vergroeßern-verkleinern-1': dataForIncrDescNumberExercise('Level 1'),
  'zahlen-vergroeßern-verkleinern-2': dataForIncrDescNumberExercise('Level 2'),
  'zahlen-vergroeßern-verkleinern-3': dataForIncrDescNumberExercise('Level 3'),
  'zahlen-vergroeßern-verkleinern-profi':
    dataForIncrDescNumberExercise('Profi'),
  'stellenwerte-finden': {
    title: 'Stellenwerte finden',
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
}

function dataForPlaceValueChange(expert: boolean) {
  return {
    title: 'Stellenwerte ändern',
    level: expert ? 'Profi' : 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={52}
        generator={() => {
          const lower = expert ? 8 : 4
          const upper = expert ? 9 : 8
          const T = randomIntBetween(lower, upper)
          const H = randomIntBetween(lower, upper)
          const Z = randomIntBetween(lower, upper)
          const E = randomIntBetween(lower, upper)
          const from = randomItemFromArray(['T', 'H', 'Z', 'E'])
          const to = randomItemFromArray(
            ['T', 'H', 'Z', 'E'].filter((x) => x !== from)
          )
          const placeValues: { [key: string]: number } = {
            T: 1000,
            H: 100,
            Z: 10,
            E: 1,
          }

          return {
            value:
              T * 1000 +
              H * 100 +
              Z * 10 +
              E -
              placeValues[from] +
              placeValues[to],
            T,
            H,
            Z,
            E,
            from,
            to,
          }
        }}
        getCorrectValue={({ value }) => {
          return value
        }}
        render={(input, { T, H, Z, E, from, to }) => {
          return (
            <>
              <PlaceValueChart T={T} H={H} Z={Z} E={E} />
              <p className="mt-4 text-xl">
                Ein Plättchen wird von <b>{from}</b> nach <b>{to}</b> geschoben.
                <br />
                Welche Zahl entsteht?
              </p>
              <div className="ml-0.5 mt-4 text-2xl font-bold" id="number-input">
                <span className="mr-3">Die neue Zahl lautet:</span>
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}

function dataForIncrDescNumberExercise(
  level: 'Level 1' | 'Level 2' | 'Level 3' | 'Profi'
) {
  return {
    title: 'Zahlen vergrößern & verkleinern',
    level,
    component: (
      <NumberInputExercise
        centAmount={35}
        longerInput
        generator={() => {
          const diff = randomItemFromArray([10, 100, 1000])
          const isIncr = randomItemFromArray([true, false])
          const number =
            level === 'Profi'
              ? randomIntBetween(isIncr ? 0 : 1, 18) * 1000000 +
                randomIntBetween(1, 1000)
              : randomIntBetween(
                  isIncr ? 11 : 2000,
                  level === 'Level 1'
                    ? 18000
                    : level === 'Level 2'
                      ? 18000
                      : 180000
                )
          return { diff, isIncr, number }
        }}
        getCorrectValue={({ diff, number, isIncr }) => {
          return number + diff * (isIncr ? 1 : -1)
        }}
        render={(input, { diff, number, isIncr }) => {
          return (
            <>
              <h2 className="mt-8 pb-6 text-left text-2xl font-bold">
                Welche Zahl ist ...
              </h2>
              <div className="ml-0.5 text-2xl font-bold" id="number-input">
                <span className="text-newgreen">
                  um {diff} {isIncr ? 'größer' : 'kleiner'} als {number}?
                </span>
                <br />
                <br />
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}

function dataForTextToNumberExercise(expert: boolean) {
  return {
    title: 'Text in Zahl umwandeln',
    level: expert ? 'Profi' : 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={35}
        longerInput
        generator={() => {
          return generateTextToNumberExercise(expert)
        }}
        getCorrectValue={({ value }) => {
          return value
        }}
        render={(input, { text }) => {
          return (
            <>
              <h2 className="mt-8 pb-6 text-left text-2xl font-bold">
                Schreibe als Zahl:
              </h2>
              <div className="ml-0.5 text-2xl font-bold" id="number-input">
                <span className="text-newgreen">{text}</span>
                <br />
                <br />
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}

function generateTextToNumberExercise(expert: boolean) {
  const mode = randomItemFromArray([
    'MTE',
    'ME',
    'MT',
    ...(expert
      ? ['AMT', 'ATE', 'AME', 'AM', 'AT', 'AE']
      : ['TE', 'TE', 'ME', 'MT', 'M', 'T']),
  ])
  let text = ''
  let value = 0
  if (mode.includes('A')) {
    const val = randomIntBetween(2, 29)
    value += val * 1000000000
    text += `${val} Milliarden `
  }
  if (mode.includes('M')) {
    const val = randomIntBetween(2, expert ? 999 : 29)
    value += val * 1000000
    text += `${val} Millionen `
  }
  if (mode.includes('T')) {
    const val = randomIntBetween(2, 999)
    value += val * 1000
    text += `${val} Tausend `
  }
  if (mode.includes('E')) {
    const val = randomIntBetween(2, 999)
    value += val
    text += `${val} `
  }
  return { text, value }
}

function numberLineGeneratorLevel1(): [number, number, number] {
  const kind = randomItemFromArray([0, 1])
  if (kind === 0) {
    const maxVal = 40

    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const searchValues = getIntRange(10, 39, [labeledPos * 40])
    const searchedVal = randomItemFromArray(searchValues)
    return [searchedVal, labeledPos, maxVal]
  } else {
    const maxVal = randomItemFromArray([8000, 12000, 16000, 20000])
    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const possibleSearchValues = [
      maxVal / 4,
      maxVal / 2,
      (maxVal / 4) * 3,
      maxVal,
    ].filter((val) => val !== maxVal * labeledPos)
    const searchedVal = randomItemFromArray(possibleSearchValues)
    return [searchedVal, labeledPos, maxVal]
  }
}

function numberLineGeneratorLevel2(): [number, number, number] {
  const step = randomItemFromArray([10, 20])
  const maxVal = 40 * step

  const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
  const searchValues = getIntRange(10, 39, [labeledPos * 40])
  const searchedVal = randomItemFromArray(searchValues)
  return [searchedVal * step, labeledPos, maxVal]
}

function numberLineGeneratorLevel3(): [number, number, number] {
  const kind = randomItemFromArray([0, 1])
  if (kind === 0) {
    return numberLineGeneratorLevel2()
  } else {
    const maxVal = randomItemFromArray([8000, 12000, 16000, 20000])
    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const possibleSearchValues = [
      maxVal / 4,
      maxVal / 2,
      (maxVal / 4) * 3,
      maxVal,
    ].filter((val) => val !== maxVal * labeledPos)
    const searchedVal = randomItemFromArray(possibleSearchValues)
    return [searchedVal, labeledPos, maxVal]
  }
}

export default ContentPage

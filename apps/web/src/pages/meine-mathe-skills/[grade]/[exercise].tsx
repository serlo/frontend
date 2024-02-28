import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { NumberLineInputExercise } from '@/components/math-skills/exercise-implementations/number-line-input-exercise'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
import { getIntRange } from '@/helper/get-int-range'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

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
      <h2 className="mb-4 text-xl">{data.title}</h2>
      {data.component}
    </div>
  )
}

const exerciseData: {
  [key: string]: { title: string; component: JSX.Element }
} = {
  'zahlen-anordnen-1': {
    title: 'Zahlenstrahl anordnen – Level 1',
    component: (
      <NumberLineExercise
        generator={numberLineGeneratorLevel1}
        centAmount={35}
      />
    ),
  },
  'zahlen-anordnen-2': {
    title: 'Zahlenstrahl anordnen – Level 2',
    component: (
      <NumberLineExercise
        generator={numberLineGeneratorLevel2}
        centAmount={35}
      />
    ),
  },
  'zahlen-anordnen-profi': {
    title: 'Zahlenstrahl anordnen – Profi',
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
    title: 'Zahlenstrahl ablesen - Level 1',
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel1}
        centAmount={35}
      />
    ),
  },
  'zahlen-ablesen-2': {
    title: 'Zahlenstrahl ablesen - Level 2',
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel2}
        centAmount={35}
      />
    ),
  },
  'zahlen-ablesen-profi': {
    title: 'Zahlenstrahl ablesen - Profi',
    component: (
      <NumberLineInputExercise
        generator={numberLineGeneratorLevel3}
        centAmount={35}
      />
    ),
  },
  'text-in-zahl-1': dataForTextToNumberExercise(false),
  'text-in-zahl-profi': dataForTextToNumberExercise(true),
}

function dataForTextToNumberExercise(expert: boolean) {
  return {
    title: 'Text in Zahl umwandeln - ' + (expert ? 'Profi' : 'Level 1'),
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

/*

 {exercise === 'zahlen-anordnen-1' ? (
        <NumberLineExercise generator={numberLineGeneratorLevel1} />
      ) : null}
      {exercise === 'zahlen-anordnen-2' ? (
        <NumberLineExercise generator={numberLineGeneratorLevel2} />
      ) : null}
      {exercise === 'zahlen-anordnen-profi' ? (
        <NumberLineExercise generator={numberLineGeneratorLevel3} />
      ) : null}
      {exercise === 'potenzwert-berechnen' ? (
        <NumberInputExercise
          generator={() => {
            const base = randomIntBetween(0, 12)
            const powerLimit = Math.floor(
              base === 10 ? 6 : base > 4 ? 2 : 8 - base * 1.2
            )
            const power = randomIntBetween(1, powerLimit)
            return { base, power }
          }}
          getCorrectValue={({ base, power }) => {
            return Math.pow(base, power)
          }}
          render={(input, { base, power }) => {
            return (
              <>
                <h2 className="pb-6 text-left text-2xl font-bold">
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
      ) : null}
      {exercise === 'zahlen-ablesen-1' ? (
        <NumberLineInputExercise generator={numberLineGeneratorLevel1} />
      ) : null}
      {exercise === 'zahlen-ablesen-2' ? (
        <NumberLineInputExercise generator={numberLineGeneratorLevel2} />
      ) : null}
      {exercise === 'zahlen-ablesen-profi' ? (
        <NumberLineInputExercise generator={numberLineGeneratorLevel3} />
      ) : null}
      */

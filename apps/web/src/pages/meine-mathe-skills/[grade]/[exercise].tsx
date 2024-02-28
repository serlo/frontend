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

  return (
    <div className="relative mx-4 mt-20 max-w-lg bg-white sm:mx-auto sm:w-full">
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
    </div>
  )
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

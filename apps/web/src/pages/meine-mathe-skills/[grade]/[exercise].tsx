import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
import { getIntRange } from '@/helper/get-int-range'
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
        <NumberLineExercise
          generator={() => {
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
          }}
        />
      ) : null}
      {exercise === 'zahlen-anordnen-2' ? (
        <NumberLineExercise
          generator={() => {
            const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
            const searchValues = getIntRange(10, 39, [labeledPos * 40])
            const searchedVal = randomItemFromArray(searchValues)
            return [searchedVal * 10, labeledPos, 400]
          }}
        />
      ) : null}
      {exercise === 'zahlen-anordnen-profi' ? (
        <NumberLineExercise
          generator={() => {
            const kind = randomItemFromArray([0, 1])
            if (kind === 0) {
              const step = randomItemFromArray([10, 20])
              const maxVal = 40 * step

              const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
              const searchValues = getIntRange(10, 39, [labeledPos * 40])
              const searchedVal = randomItemFromArray(searchValues)
              return [searchedVal * step, labeledPos, maxVal]
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
          }}
        />
      ) : null}
      {exercise === 'potenzwert-berechnen' ? <NumberInputExercise /> : null}
    </div>
  )
}

export default ContentPage

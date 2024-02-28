import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

const animalEmoji = {
  lion: '🦁',
  crocodile: '🐊',
  leopard: '🐆',
  monkey: '🐵',
  penguin: '🐧',
  zebra: '🦓',
} as const

function Content() {
  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()
  const router = useRouter()
  const grade = router.query.grade

  if (grade !== 'klasse5') return null

  return (
    <div className="min-h-[80vh]">
      <div className="text-center">
        <div className="mt-16 flex justify-center text-2xl font-bold">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-white">
            <p className="text-2xl">5. Klasse</p>
          </div>
        </div>
        <h2 className="mb-8 mt-5 text-2xl font-bold">Themenauswahl</h2>
      </div>
      <div className="flex flex-wrap justify-center py-10 mobileExt:flex-nowrap">
        <div className="w-72 rounded-lg bg-brand-100 p-5">
          <h3 className="pb-2 text-xl font-bold">Natürliche Zahlen</h3>
          <h4 className="text-lg">Zahlenstrahl</h4>
          <ul className="mt-1">
            {renderItem('zahlen-anordnen-1', 'Zahlen anordnen – Level 1')}
            {renderItem('zahlen-anordnen-2', 'Zahlen anordnen – Level 2')}
            {renderItem(
              'zahlen-anordnen-profi',
              'Zahlen anordnen – für Profis'
            )}
            {renderItem('zahlen-ablesen-1', 'Zahlen ablesen – Level 1')}
            {renderItem('zahlen-ablesen-2', 'Zahlen ablesen – Level 2')}
            {renderItem('zahlen-ablesen-profi', 'Zahlen ablesen – für Profis')}
          </ul>
        </div>
        <div className="mt-4 w-72 rounded-lg bg-brand-100 p-5 mobileExt:ml-4 mobileExt:mt-0">
          <h3 className="pb-2 text-xl font-bold">Rechnen in ℕ</h3>
          <h4 className="text-lg">Potenzieren</h4>
          <ul className="mt-1">
            {renderItem('potenzwert-berechnen', 'Potenzwert berechnen')}
          </ul>
        </div>
      </div>
    </div>
  )

  function renderItem(exerciseId: string, text: string) {
    if (!grade) return null
    const slug = `${String(grade)}/${exerciseId}`
    const { skillLevel } = getExerciseData(slug)
    const points = Array.from({ length: Math.trunc(skillLevel + 0.001) })

    return (
      <li>
        <Link
          href={`/meine-mathe-skills/${slug}`}
          className="serlo-link whitespace-nowrap"
        >
          {text}{' '}
          {data?.animal ? points.map(() => animalEmoji[data?.animal]) : null}
        </Link>
      </li>
    )
  }
}

export default ContentPage

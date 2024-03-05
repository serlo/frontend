import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { animalsData } from '@/components/math-skills/utils/animal-data'
import { getPointsAmount } from '@/components/math-skills/utils/get-points-amount'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'

export function TopicItem({
  exerciseId,
  text,
}: {
  exerciseId: string
  text: string
}) {
  const grade = useRouter().query.grade
  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()
  if (grade !== 'klasse5') return null
  const slug = `${String(grade)}/${exerciseId}`
  const { skillCent } = getExerciseData(slug)
  const points = Array.from({ length: getPointsAmount(skillCent) })

  return (
    <li>
      <Link
        href={`/meine-mathe-skills/${slug}`}
        className="mb-2 block rounded-md bg-brand-50 px-1.5 py-0.5 !no-underline transition-colors hover:bg-brand-200"
      >
        {text} <br />
        {data?.animal ? points.map(() => animalsData[data.animal].emoji) : null}
      </Link>
    </li>
  )
}

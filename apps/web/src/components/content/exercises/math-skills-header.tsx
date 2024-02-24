import { useRouter } from 'next/router'

import { Link } from '../link'

export function MathSkillsHeader() {
  const router = useRouter()
  const isExercise = !!router.query.exercise
  const grade = String(router.query.grade)

  return (
    <div className="flex h-14 items-center justify-between bg-yellow-100 px-4 text-center">
      <Link
        href="/meine-mathe-skills"
        className="block cursor-pointer text-2xl text-almost-black"
      >
        Meine Mathe Skills
      </Link>
      {isExercise ? (
        <Link
          href={`/meine-mathe-skills/${String(router.query.grade)}`}
          className="my-3 block rounded bg-brand-200 px-2 py-1 text-lg !no-underline hover:bg-brand-300"
        >
          {grade}. Klasse
        </Link>
      ) : null}
    </div>
  )
}

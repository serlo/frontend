import { useRouter } from 'next/router'

import { useMathSkillsStorage } from './utils/math-skills-data-context'
import { Link } from '../content/link'
import { cn } from '@/helper/cn'

export function MathSkillsHeader() {
  const router = useRouter()
  const { data } = useMathSkillsStorage()
  const isExercise = !!router.query.exercise
  const grade = String(router.query.grade)
  const isGradePage = !!router.query.grade
  const isNotLanding = isExercise || isGradePage

  return (
    <>
      {/* {isNotLanding ? <CheckName /> : null} */}
      <div className="flex h-14 items-center justify-between bg-yellow-100 px-4 text-center">
        <Link
          href="/meine-mathe-skills"
          className={cn(
            'block cursor-pointer text-2xl text-almost-black first-letter:uppercase',
            isNotLanding ? '' : 'w-full text-center'
          )}
        >
          {data?.name ? addGermanGenetiveS(data.name) : 'Meine'} Mathe-Skills
        </Link>
        {isExercise ? (
          <Link
            href={`/meine-mathe-skills/${String(router.query.grade)}`}
            className="my-3 block rounded bg-brand-200 px-2 py-1 text-lg !no-underline hover:bg-brand-300"
          >
            zur {grade.replace('klasse', '')}. Klasse
          </Link>
        ) : isGradePage ? (
          <Link
            href="/meine-mathe-skills"
            className="my-3 block rounded bg-brand-200 px-2 py-1 text-lg !no-underline hover:bg-brand-300"
          >
            zur Startseite
          </Link>
        ) : null}
      </div>
    </>
  )
}

function addGermanGenetiveS(name: string) {
  const isException = !!name.match(/[s|ß|z|x|ce]$/)
  return `${name}${isException ? '’' : 's'}`
}

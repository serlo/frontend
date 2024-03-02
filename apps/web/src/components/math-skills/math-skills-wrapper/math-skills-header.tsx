import { faListDots } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import { SkillPoints } from './skill-points'
import { Link } from '../../content/link'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

export function MathSkillsHeader() {
  const router = useRouter()
  const isExercise = !!router.query.exercise
  const { data } = useMathSkillsStorage()
  const isGradePage = !isExercise && !!router.query.grade
  const isLanding = !isGradePage && !isExercise

  const genitiveName = addGermanGenetiveS(data.name)
  const titlePrefix = genitiveName && !isLanding ? genitiveName : 'Meine'

  return (
    <header className="flex h-[4.5rem] items-center justify-between bg-yellow-100 px-4 py-2 text-center">
      <Link
        href="/meine-mathe-skills"
        className={cn(
          'block cursor-pointer text-xl text-almost-black',
          isExercise || isGradePage ? '' : 'w-full text-center',
          isExercise && '!hidden sm:!block'
        )}
      >
        {titlePrefix} Mathe-Skills
      </Link>
      {isExercise ? <SkillPoints /> : null}
      {renderBackLink()}
    </header>
  )

  function renderBackLink() {
    if (isLanding) return null

    const className = cn(
      'my-3 block rounded bg-brand-200 px-2 py-1 text-lg !no-underline hover:bg-brand-300'
    )
    return isExercise ? (
      <Link
        href={`/meine-mathe-skills/${String(router.query.grade)}`}
        className={className}
      >
        <FaIcon icon={faListDots} /> Aufgaben
      </Link>
    ) : (
      <Link href="/meine-mathe-skills" className={className}>
        <span className="hidden sm:inline">zur </span>
        Startseite
      </Link>
    )
  }
}

function addGermanGenetiveS(name: string) {
  if (!name.length) return undefined
  const isException = !!name.match(/(s|ß|z|x|(ce))$/)
  return `${name}${isException ? '’' : 's'}`
}

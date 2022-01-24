import clsx from 'clsx'

import { Link } from '../link'

interface ExerciseNumberingProps {
  index: number
  href: string
}

export function ExerciseNumbering({ index, href }: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  return (
    <Link
      href={href}
      path={['numbering', index]}
      className={clsx(
        'block h-12 w-12 mx-side mb-5 pt-1 rounded-full',
        'sm:absolute sm:-mt-2.5 sm:-ml-10 md:-ml-14',
        'text-white text-4xl text-center font-bold bg-brand',
        'hover:no-underline hover:bg-brand-lighter'
      )}
    >
      {index + 1}
    </Link>
  )
}

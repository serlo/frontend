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
      className={clsx(
        'mx-side mb-5 block h-12 w-12 rounded-full pt-1',
        'sm:absolute sm:-mt-2.5 sm:-ml-10 md:-ml-14',
        'bg-brand text-center text-4xl font-bold text-white',
        'hover:bg-brand-400 hover:no-underline'
      )}
    >
      {index + 1}
    </Link>
  )
}

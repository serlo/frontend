import clsx from 'clsx'

import { Link } from '../link'

interface ExerciseNumberingProps {
  index: number
  isChild?: boolean
  href: string
}

export function ExerciseNumbering({
  index,
  isChild,
  href,
}: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  if (isChild) {
    const char = String.fromCharCode(97 + index)
    return (
      <div
        className={clsx(
          'flex justify-center align-middle',
          'h-7 w-7 mx-4 mb-2.5 rounded-full',
          'sm:absolute sm:-mt-1 sm:-ml-10',
          'text-xl font-bold text-brand bg-brand-150',
          'hover:no-underline hover:text-white hover:bg-brand'
        )}
      >
        {char}
      </div>
    )
  }
  return (
    <>
      <Link
        href={href}
        path={['numbering', index]}
        className={clsx(
          'numbering-parent',
          'block h-12 w-12 mx-4 mb-5 pt-1 rounded-full',
          'sm:absolute sm:-mt-2.5 sm:-ml-10 md:-ml-14',
          'text-white text-4xl text-center font-bold bg-brand',
          'hover:no-underline hover:bg-brand-lighter'
        )}
      >
        {index + 1}
      </Link>
      <style jsx>{`
        @media print {
          numbering-parent:after {
            content: '' !important;
          }
        }
      `}</style>
    </>
  )
}

import { Link } from '../link'
import { tw } from '@/helper/tw'

interface ExerciseNumberingProps {
  index: number
  href: string
}

export function ExerciseNumbering({ index, href }: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  return (
    <Link
      href={href}
      className={tw`
          mx-side mb-5 block h-12 w-12 rounded-full bg-brand
          pt-1 text-center text-4xl font-bold
          text-white hover:bg-brand-400 hover:no-underline sm:absolute sm:-ml-10
          sm:-mt-2.5 md:-ml-14
        `}
    >
      {index + 1}
    </Link>
  )
}

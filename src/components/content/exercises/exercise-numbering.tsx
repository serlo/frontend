import { Link } from '../link'
import { cn } from '@/helper/cn'

interface ExerciseNumberingProps {
  index: number
  href: string
}

export function ExerciseNumbering({ index, href }: ExerciseNumberingProps) {
  if (!Number.isInteger(index)) return null

  return (
    <Link
      href={href}
      className={cn(`
          mx-side mb-5 block h-12 w-12 rounded-full bg-brand
          pt-1 text-center text-4xl font-bold
          text-white hover:bg-brand-400 hover:no-underline sm:absolute sm:-ml-10
          sm:-mt-2.5 md:-ml-14
       `)}
    >
      {index + 1}
    </Link>
  )
}

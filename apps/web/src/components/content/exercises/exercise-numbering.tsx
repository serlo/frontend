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
          relative mx-side mt-4 block h-12
          w-12 rounded-full bg-brand px-0
          pt-1 text-center text-4xl
          font-bold
          text-white hover:bg-brand-400 hover:no-underline
       `)}
    >
      {index + 1}
    </Link>
  )
}

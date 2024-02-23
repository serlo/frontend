import { cn } from '@/helper/cn'

export function NumberLineSteps({ stepAmount }: { stepAmount: number }) {
  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute -left-4 -right-10 top-[17px] h-[3px] bg-newgreen-600"></div>
      <div className="absolute -right-12 h-0 w-0 border-y-8 border-l-[16px] border-y-transparent border-l-newgreen-600"></div>

      {Array.from({ length: stepAmount + 1 }).map((_, i) => {
        const extraClasses =
          i % 10 === 0
            ? 'bg-newgreen-600 h-9'
            : i % 5 === 0
              ? 'h-7 bg-yellow'
              : 'h-4 bg-yellow'
        return <span key={i} className={cn('w-[3px]', extraClasses)}></span>
      })}
    </div>
  )
}

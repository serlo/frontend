import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

interface PlaceValueChartProps {
  value: number
}

export function PlaceValueChart({ value = 0 }: PlaceValueChartProps) {
  const blocks = [...value.toString()].map((val) => parseInt(val))

  return (
    <div className="-ml-2 flex gap-x-3 divide-x-2 divide-gray-200 pb-3 text-xl">
      {renderBlock('T', blocks[0], 'text-brand-500')}
      {renderBlock('H', blocks[1], 'text-newgreen')}
      {renderBlock('Z', blocks[2], 'text-orange-300')}
      {renderBlock('E', blocks[3], 'text-red-400')}
    </div>
  )

  function renderBlock(title: string, amount: number, colorClass: string) {
    return (
      <div
        className={cn(
          'min-h-[90px] basis-[50px] py-2.5 pl-3 mobile:basis-[130px]',
          colorClass
        )}
      >
        <span className="font-bold text-almost-black">{title}</span>
        <div className="mt-1 flex gap-1 mobile:flex-col sm:gap-1.5">
          <div className="flex flex-col gap-1 mobile:flex-row sm:gap-1.5">
            {arrayOfLength(Math.min(amount, 5)).map(renderCircle)}
          </div>
          <div className="flex flex-col gap-1 mobile:flex-row sm:gap-1.5">
            {arrayOfLength(Math.max(amount - 5, 0)).map(renderCircle)}
          </div>
        </div>
      </div>
    )
  }

  function renderCircle(_: unknown, i: number) {
    return (
      <div key={i} className="inline-block h-4 w-4 rounded-full bg-current" />
    )
  }
}

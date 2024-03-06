import { useMathSkillsStorage } from '../../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

export function MemoryCard({
  title,
  index,
  flipped,
  onCardSelect,
  isMatched,
  render,
}: {
  title: string | number
  index: number
  flipped: boolean
  onCardSelect: (index: number) => void
  isMatched: boolean
  render?: (title: string | number) => JSX.Element
}) {
  const { data } = useMathSkillsStorage()
  const isFlipped = flipped || isMatched

  return (
    <button
      key={index}
      onClick={() => onCardSelect?.(index)}
      className={cn(
        `memory-card hover:shadow-menu, relative aspect-square scale-100 transition-transform
        [transform-style:preserve-3d] [transition-duration:0.5s]`,
        !isMatched &&
          !isFlipped &&
          'active:scale-95 active:[transition-duration:0.2s]',
        isFlipped && '[transform:rotateY(180deg)]'
      )}
    >
      <div
        className={cn(
          `absolute top-0 flex h-full w-full items-center justify-center
          rounded-md bg-brand-150 transition-all
        `,
          isMatched &&
            'animate-jump !bg-newgreen !bg-opacity-20 text-newgreen opacity-60'
        )}
      >
        <span className="[transform:rotateY(180deg)]">
          {render ? render(title) : title}
        </span>
      </div>
      <div
        className={cn(`
          absolute top-0 flex h-full w-full rotate-0 items-center
          justify-center rounded-md bg-brand-50 [backface-visibility:hidden]
         `)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Tier Maskottchen"
          src={`/_assets/img/math-skills/${data.animal}.svg`}
          className="pointer-events-none absolute w-12 opacity-50 sepia-[0.8]"
        />
      </div>
    </button>
  )
}

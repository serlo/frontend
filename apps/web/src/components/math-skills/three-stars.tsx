import { faStar } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { cn } from '@/helper/cn'

export function ThreeStars() {
  return (
    <figure className="mt-1 flex text-4xl text-yellow">
      {renderStar(100)}
      {renderStar(55)}
      {renderStar(10)}
    </figure>
  )

  function renderStar(percent: number) {
    const isFull = percent === 100
    return (
      <div className="relative mx-1 h-12 w-12">
        <div
          className={cn(
            'absolute inset-0'
            // 'after:absolute after:inset-[5px] after:rounded-full after:bg-white after:content-[""]'
            // isFull && 'after:!bg-transparent'
          )}
          style={{
            background: `#ffbe5e77 conic-gradient(#ffbe5e calc(${percent}*1%),#0000 0)`,
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
        {/* <div
          className={cn(
            isFull ? '' : 'opacity-50',
            'absolute inset-0 flex justify-around pt-2'
          )}
        >
          <FaIcon icon={faStar} />
        </div> */}
      </div>
    )
  }
}

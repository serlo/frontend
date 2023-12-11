import Image from 'next/image'

import { Link } from './link'
import { HorizonData } from '@/data-types'
import { cn } from '@/helper/cn'

export interface HorizonProps {
  data: HorizonData
}

export function Horizon({ data }: HorizonProps) {
  return (
    <aside
      id="horizon"
      className={cn(`
        -ml-2.5 px-side pb-6 pt-8
        sm:flex sm:items-stretch sm:justify-between
      `)}
    >
      {data.map(({ imageUrl, url, title, text }, index) => {
        return (
          <button
            className={cn(`
              mb-8 box-border hidden
              w-full max-w-screen-mobile
              rounded px-2.5 py-4 first:block hover:shadow-menu
              sm:mb-0 sm:mr-6 sm:block sm:w-1/3
            `)}
            tabIndex={-1}
            key={index}
          >
            <Link
              className="text-left leading-cozy text-brand-700 hover:text-almost-black hover:no-underline"
              href={url}
              noExternalIcon
            >
              <div className="relative mb-2.5 aspect-video">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 799px) 100vw, 212px"
                  className="object-cover pr-1"
                />
              </div>
              <h4 className="mx-0 mb-1 mt-3 text-xl font-bold">{title}</h4>
              <p className="m-0">{text}</p>
            </Link>
          </button>
        )
      })}
    </aside>
  )
}

import { Link } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'
import { cn } from '@/helper/cn'

export interface SubHeaderProps {
  item: HeaderLinkData
  parent: HeaderLinkData
}

const headingClasses = cn(`
  mx-4 mt-6 block w-min min-w-[12rem] bg-underlined-simple bg-contain
  bg-bottom bg-no-repeat py-4 font-handwritten
  text-2xl leading-5 text-brand group-hover:bg-underlined-simple md:m-0 md:mx-2 md:mb-3
  md:w-[80%] md:min-w-0
  md:whitespace-nowrap md:bg-none md:py-2 md:pb-1 md:text-2xl md:hover:bg-underlined-simple
`)

export function SubHeader({ item }: SubHeaderProps) {
  return (
    <NextLink legacyBehavior href={item.url} passHref>
      <Link href={item.url} className="group block md:py-[3px]">
        <span className={headingClasses}>{item.title}</span>
      </Link>
    </NextLink>
  )
}

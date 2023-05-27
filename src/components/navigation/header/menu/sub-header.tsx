import { Link } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'

export interface SubHeaderProps {
  item: HeaderLinkData
  parent: HeaderLinkData
}

const headingClasses = /* className={ */ clsx(
  'block mx-4 py-4 mt-6 w-min min-w-[12rem] text-2xl',
  'text-brand font-handwritten leading-5 bg-underlined-simple',
  'md:py-2 md:pb-1 md:m-0 md:mx-2 md:mb-3 md:w-[80%] md:min-w-0',
  'md:text-2xl md:whitespace-nowrap',
  'md:bg-none bg-contain bg-no-repeat bg-bottom md:hover:bg-underlined-simple group-hover:bg-underlined-simple'
)

export function SubHeader({ item }: SubHeaderProps) {
  return (
    <NextLink legacyBehavior href={item.url} passHref>
      <Link href={item.url} className="block md:py-[3px] group">
        <span className={headingClasses}>{item.title}</span>
      </Link>
    </NextLink>
  )
}

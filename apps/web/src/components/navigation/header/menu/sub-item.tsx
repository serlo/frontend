import { Link, Item } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'
import { cn } from '@/helper/cn'

export interface SubItemProps {
  item: HeaderLinkData
  parent: HeaderLinkData
}

const itemClasses = cn(`
  block w-full
  border-b border-brand-400 p-4 font-bold
  text-brand md:serlo-button-blue-transparent hover:bg-brand-300
  hover:no-underline group-hover:bg-brand group-hover:text-white
  md:w-auto md:hyphens-auto md:rounded-[12px] md:py-0.25 md:text-base md:font-normal
  md:leading-5
`)

export function SubItem({ item }: SubItemProps) {
  const isAbsolute = item.url.indexOf('//') > -1

  const inner = (
    <Link href={item.url} className="group block md:py-[3px]">
      <span className={itemClasses}>{item.title}</span>
    </Link>
  )

  return (
    <Item key={item.title}>
      {isAbsolute ? (
        inner
      ) : (
        <NextLink legacyBehavior href={item.url} passHref>
          {inner}
        </NextLink>
      )}
    </Item>
  )
}

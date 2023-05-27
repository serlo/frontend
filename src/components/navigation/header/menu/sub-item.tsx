import { Link, Item } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'

export interface SubItemProps {
  item: HeaderLinkData
  parent: HeaderLinkData
}

const itemClasses = /* className={ */ clsx(
  'w-full font-bold',
  'text-brand block border-b border-brand-400',
  'group-hover:text-white group-hover:bg-brand md:py-0.25',
  'hover:no-underline p-4 hover:bg-brand-300',
  'md:w-auto md:serlo-button-blue-transparent md:font-normal md:text-base md:rounded-[12px] md:special-hyphens-auto',
  'md:leading-5'
)

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

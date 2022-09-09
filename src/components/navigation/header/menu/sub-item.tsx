import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'

export interface SubItemProps {
  item: HeaderLinkData
  parent: HeaderLinkData
  heading?: boolean
}

const headingClasses = /* className={ */ clsx(
  'block mx-4 py-4 mt-6 w-min min-w-[12rem] text-2xl',
  'text-brand font-handwritten leading-5',
  'md:p-2 md:pb-1 md:m-0 md:mb-3 md:min-w-fit',
  'md:text-xl',
  'bg-underlined-simple bg-contain bg-no-repeat bg-bottom'
)

const normalItemClasses = /* className={ */ clsx(
  'w-full font-bold',
  'text-brand block border-b border-brand-lighter',
  'group-hover:text-white group-hover:bg-brand md:py-0.25',
  'hover:no-underline p-4 hover:bg-brand-300',
  'md:w-auto md:serlo-button-blue-transparent md:font-normal md:text-base md:rounded-[12px] md:special-hyphens-auto',
  'md:leading-5'
)

export function SubItem({ item, heading }: SubItemProps) {
  const isAbsolute = item.url.indexOf('//') > -1

  const inner = (
    <NavigationMenu.Link href={item.url} className="block md:py-[3px] group">
      <span className={heading ? headingClasses : normalItemClasses}>
        {item.title}
      </span>
    </NavigationMenu.Link>
  )

  return (
    <NavigationMenu.Item key={item.title}>
      {isAbsolute ? (
        inner
      ) : (
        <NextLink href={item.url} passHref>
          {inner}
        </NextLink>
      )}
    </NavigationMenu.Item>
  )
}

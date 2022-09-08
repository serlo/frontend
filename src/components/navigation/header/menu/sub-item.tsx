import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'

import { HeaderLinkData } from '@/data-types'

export interface SubItemProps {
  item: HeaderLinkData
  parent: HeaderLinkData
}

export function SubItem({ item, parent }: SubItemProps) {
  const isAbsolute = item.url.indexOf('//') > -1

  // TODO: bonus
  // const href = auth
  //   ? item.url.replace(
  //       '/user/me',
  //       `/user/${auth.id}/${auth.username}`
  //     )
  //   : item.url
  const href = item.url

  const inner = (
    <NavigationMenu.Link href={href} className="block md:py-[3px] group">
      <span
        className={clsx(
          'w-full md:mt-1.5 font-bold',
          'text-brand block border-b border-brand-lighter',

          'md:w-auto md:serlo-button-blue-transparent md:font-normal md:text-base md:rounded-[12px] md:special-hyphens-auto',
          'group-hover:text-white group-hover:bg-brand md:py-0.25',
          'hover:no-underline p-4 hover:bg-brand-300'
        )}
      >
        {item.title}
      </span>
    </NavigationMenu.Link>
  )

  return (
    <NavigationMenu.Item key={item.title}>
      {isAbsolute ? (
        inner
      ) : (
        <NextLink href={href} passHref>
          {inner}
        </NextLink>
      )}
    </NavigationMenu.Item>
  )
}

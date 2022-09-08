import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import { preventHover } from './item'
import { SubItem } from './sub-item'
import { HeaderLinkData } from '@/data-types'

export interface SubContentProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubContent({ subItems, parent }: SubContentProps) {
  if (!subItems) return null

  const isLast = parent.icon === 'user'
  const isCommunity = parent.icon === 'community'

  return (
    <NavigationMenu.Content
      className={clsx(
        'text-left md:absolute md:z-[999] md:mt-2',
        isLast || isCommunity ? 'md:right-0' : ''
        // isCommunity && 'md:left-0'
      )}
      onPointerEnter={preventHover}
      onPointerLeave={preventHover}
    >
      <NavigationMenu.Sub>
        <NavigationMenu.List className="bg-white md:serlo-sub-list border-brand-300 border-b-[1.2rem] md:border-b-0">
          {subItems.map((item) => (
            <SubItem key={item.title} item={item} parent={parent} />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Sub>
    </NavigationMenu.Content>
  )
}

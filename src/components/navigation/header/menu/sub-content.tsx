import { Content, List } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import { preventHover } from './item'
import { SubCommunityMega } from './sub-community-mega'
import { SubItem } from './sub-item'
import { useInstanceData } from '@/contexts/instance-context'
import { HeaderLinkData } from '@/data-types'

export interface SubContentProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubContent({ subItems, parent }: SubContentProps) {
  const { lang } = useInstanceData()
  if (!subItems) return null

  const isLast = parent.icon === 'user'
  const isCommunity = parent.icon === 'community'
  const isCommunityMega = isCommunity && lang === 'de'

  return (
    <Content
      className={clsx(
        'text-left md:absolute md:z-[999] md:pt-2',
        (isLast || isCommunity) && 'md:right-0',
        isCommunityMega && 'md:-left-16'
      )}
      onPointerEnter={preventHover}
      onPointerLeave={preventHover}
    >
      {isCommunityMega ? (
        <SubCommunityMega subItems={subItems} parent={parent} />
      ) : (
        <List className="bg-white md:serlo-sub-list border-brand-300 border-b-[1.2rem] md:border-b-0">
          {subItems.map((item) => (
            <SubItem key={item.title} item={item} parent={parent} />
          ))}
        </List>
      )}
    </Content>
  )
}

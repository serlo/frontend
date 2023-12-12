import { Content, List } from '@radix-ui/react-navigation-menu'
import { cn } from '@serlo/tailwind/helper/cn'

import { preventHover } from './prevent-hover'
import { SubItem } from './sub-item'
import { SubParticipateMega } from './sub-participate-mega'
import { useInstanceData } from '@/contexts/instance-context'
import type { HeaderLinkData } from '@/data-types'

export interface SubContentProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubContent({ subItems, parent }: SubContentProps) {
  const { lang } = useInstanceData()
  if (!subItems) return null

  const isLast = parent.icon === 'user'
  const isParticipate =
    parent.icon === 'participate' || parent.icon === 'community'
  const isParticipateMega = isParticipate && lang === 'de'

  return (
    <Content
      className={cn(
        'text-left md:absolute md:z-[999] md:pt-2',
        (isLast || isParticipate) && 'md:right-0'
      )}
      onPointerEnter={preventHover}
      onPointerLeave={preventHover}
    >
      {isParticipateMega ? (
        <SubParticipateMega subItems={subItems} parent={parent} />
      ) : (
        <List className="border-b-[1.2rem] border-brand-300 bg-white md:serlo-sub-list md:border-b-0">
          {subItems.map((item) => (
            <SubItem key={item.title} item={item} parent={parent} />
          ))}
        </List>
      )}
    </Content>
  )
}

import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import { SubItem } from './sub-item'
import { HeaderLinkData } from '@/data-types'

export interface SubCommunityMegaProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubCommunityMega({ subItems, parent }: SubCommunityMegaProps) {
  return (
    <div className="bg-white md:serlo-sub-list border-brand-300 border-b-[1.2rem] md:border-b-0 md:flex md:gap-4 ">
      {subItems.map((item) => (
        <div key={item.title}>
          <SubItem item={item} parent={parent} heading />
          <NavigationMenu.List className="md:mb-4">
            {item.children?.map((subItem) => {
              return (
                <SubItem key={subItem.title} item={subItem} parent={parent} />
              )
            })}
          </NavigationMenu.List>
        </div>
      ))}
    </div>
  )
}

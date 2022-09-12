import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { SubHeader } from './sub-header'
import { SubItem } from './sub-item'
import CommunityBird from '@/assets-webkit/img/community-menu-bird.svg'
import { HeaderLinkData } from '@/data-types'

export interface SubCommunityMegaProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubCommunityMega({ subItems, parent }: SubCommunityMegaProps) {
  return (
    <div className="bg-white md:serlo-sub-list border-brand-300 border-b-[1.2rem] md:border-b-0 md:flex md:gap-4 md:justify-between">
      {subItems.map((item, index) => {
        return (
          <div key={item.title}>
            <div className={index === 0 ? 'md:ml-6' : ''}>
              <SubHeader item={item} parent={parent} />
            </div>

            {index === 0 ? (
              renderNewArea()
            ) : (
              <NavigationMenu.List className="md:mb-4">
                {item.children?.map((subItem) => {
                  return (
                    <SubItem
                      key={subItem.title}
                      item={subItem}
                      parent={parent}
                    />
                  )
                })}
              </NavigationMenu.List>
            )}
          </div>
        )
      })}
    </div>
  )

  function renderNewArea() {
    return (
      <>
        <CommunityBird className="hidden md:block w-[8.1rem] px-side" />
        <NextLink href="/community" passHref>
          <NavigationMenu.Link className="ml-4 my-3 serlo-button-green text-base rounded-4xl w-max py-[0.1rem]">
            <span>Hier gehts los!</span>
          </NavigationMenu.Link>
        </NextLink>
      </>
    )
  }
}

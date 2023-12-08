import { List, Link } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { SubHeader } from './sub-header'
import { SubItem } from './sub-item'
import { HeaderLinkData } from '@/data-types'

export interface SubParticipateMegaProps {
  subItems: HeaderLinkData[]
  parent: HeaderLinkData
}

export function SubParticipateMega({
  subItems,
  parent,
}: SubParticipateMegaProps) {
  return (
    <div className="border-b-[1.2rem] border-brand-300 bg-white md:serlo-sub-list md:!flex md:justify-between md:gap-4 md:border-b-0">
      {subItems.map((item, index) => {
        return (
          <div key={item.title}>
            <div className={index === 0 ? 'md:ml-6' : ''}>
              <SubHeader item={item} parent={parent} />
            </div>

            {index === 0 ? (
              renderNewArea()
            ) : (
              <List className="md:mb-4">
                {item.children?.map((subItem) => {
                  return (
                    <SubItem
                      key={subItem.title}
                      item={subItem}
                      parent={parent}
                    />
                  )
                })}
              </List>
            )}
          </div>
        )
      })}
    </div>
  )

  function renderNewArea() {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/_assets/img/community-menu-bird.svg"
          className="hidden w-[8.1rem] px-side md:block"
        />
        <NextLink legacyBehavior href="/community" passHref>
          <Link className="serlo-button-green my-3 ml-4 w-max rounded-4xl py-[0.1rem] text-base">
            <span>Hier geht&apos;s los!</span>
          </Link>
        </NextLink>
      </>
    )
  }
}

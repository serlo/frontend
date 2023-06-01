import { Item, Link } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { tw } from '@/helper/tw'

export interface SubItemProps {
  title: string
  onClick?: () => void
  href?: string
}

const itemClasses = tw`
  serlo-button-blue-transparent rounded-[12px] py-1 text-left text-base
  font-normal leading-tight special-hyphens-auto group-hover:bg-brand group-hover:text-white
`

export function SubItem({ title, href, onClick }: SubItemProps) {
  const isAbsolute = href && href.indexOf('//') > -1

  const text = <span className={itemClasses}>{title}</span>

  const inner = (
    <Link
      href={href ?? ''}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault()
              onClick()
            }
          : undefined
      }
      className="group block md:py-[3px]"
    >
      {text}
    </Link>
  )

  return (
    <Item key={title}>
      {onClick || isAbsolute || !href ? (
        inner
      ) : (
        <NextLink legacyBehavior href={href} passHref>
          {inner}
        </NextLink>
      )}
    </Item>
  )
}

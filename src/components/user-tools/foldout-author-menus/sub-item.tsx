import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Item, Link } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

export interface SubItemProps {
  title: string
  onClick?: () => void
  href?: string
  icon?: IconDefinition
}

const itemClasses = cn(`
  serlo-button-blue-transparent inline-flex items-center hyphens-auto rounded-[12px]
  py-1 text-left text-base font-normal leading-tight  group-hover:bg-brand group-hover:text-white
`)

export function SubItem({ title, href, onClick, icon }: SubItemProps) {
  const isAbsolute = href && href.indexOf('//') > -1

  const text = (
    <span className={itemClasses}>
      {icon && <FaIcon icon={icon} className="mr-2 text-current" />}
      {title}
    </span>
  )

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

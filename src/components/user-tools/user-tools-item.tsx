import { Item, Link } from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { FaIcon, FaIconProps } from '../fa-icon'
import { cn } from '@/helper/cn'

export interface UserToolsItemProps {
  title: string
  href?: string
  onClick?: () => void
  icon: FaIconProps['icon']
  aboveContent?: boolean
}

const aboveClasses = cn(`serlo-button-green m-0.5 ml-1 text-sm leading-browser`)

const belowClasses = cn(
  `serlo-button-green-transparent m-1 py-1 text-base leading-browser`
)

export function UserToolsItem({
  title,
  href,
  onClick,
  icon,
  aboveContent,
}: UserToolsItemProps) {
  const classes = aboveContent ? aboveClasses : belowClasses

  const inner = (
    <>
      <FaIcon icon={icon} className="lg:mr-0.5" /> {title}
    </>
  )

  if (href)
    return (
      <Item>
        <NextLink legacyBehavior href={href} passHref>
          {renderLink()}
        </NextLink>
      </Item>
    )

  if (onClick)
    return (
      <Item
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        <Link className={classes}>{inner}</Link>
      </Item>
    )

  return <span className={classes}>{inner}</span>

  function renderLink() {
    return <Link className={classes}>{inner}</Link>
  }
}

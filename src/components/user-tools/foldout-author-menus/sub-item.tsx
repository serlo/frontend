import { Item, Link } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'

export interface SubItemProps {
  title: string
  onClick?: () => void
  href?: string
}

const itemClasses = /* className={ */ clsx(
  'serlo-button-blue-transparent font-normal text-base rounded-[12px] special-hyphens-auto',
  'group-hover:text-white group-hover:bg-brand text-left leading-tight py-1'
)

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
      className="block md:py-[3px] group"
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

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  Item as RadixItem,
  Trigger,
  Link,
} from '@radix-ui/react-navigation-menu'
import { default as NextLink } from 'next/link'

import { Icon } from './icon'
import { SubContent } from './sub-content'
import { useNavMenuTriggerFix } from './use-nav-menu-trigger-fix'
import { FaIcon } from '@/components/fa-icon'
import type { HeaderLinkData } from '@/data-types'
import { cn } from '@/helper/cn'
import { submitEvent } from '@/helper/submit-event'

const styledLinkCls = cn(`
  navtrigger block flex w-full
  items-center border-b border-brand-400
  p-4 align-middle text-[1.33rem] font-bold text-brand
  md:serlo-button-blue-transparent md:serlo-menu-entry-special
  hover:bg-brand-300 hover:no-underline md:my-0 md:mt-[2px] md:block
  md:px-[7px] md:py-0.5 md:text-center md:text-[0.9rem]
  md:leading-tight md:text-brand-700 md:transition
`)

export interface ItemProps {
  link: HeaderLinkData
  elementAsIcon?: JSX.Element
  className?: string
}

export function Item({ link, elementAsIcon, className }: ItemProps) {
  const hasChildren = link.children !== undefined

  const triggerFix = useNavMenuTriggerFix()

  const textAndIcon = (
    <>
      <Icon elementOrIcon={elementAsIcon ?? link.icon} />
      <span className={cn(elementAsIcon && 'md:sr-only')}>{link.title}</span>
    </>
  )

  return (
    <RadixItem
      className={cn(
        'block duration-700 ease-linear md:mx-[3px] md:inline-block',
        className
      )}
      key={link.title}
    >
      {hasChildren ? renderItemSub() : renderItemNoSub()}
    </RadixItem>
  )

  function renderItemNoSub() {
    return (
      <NextLink legacyBehavior href={link.url} passHref>
        <Link
          className={cn('group', styledLinkCls)}
          // temporarily track spenden button use
          onClick={() => {
            if (link.url === '/spenden')
              submitEvent('spenden-header-menu-click')
          }}
        >
          {textAndIcon}
        </Link>
      </NextLink>
    )
  }

  function renderItemSub() {
    if (!link.children) return null

    return (
      <>
        <Trigger
          className={'serlo-header-navtrigger ' + styledLinkCls}
          {...triggerFix}
        >
          {textAndIcon}&nbsp;
          <FaIcon icon={faCaretDown} />
        </Trigger>
        <SubContent subItems={link.children} parent={link} />
      </>
    )
  }
}

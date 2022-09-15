import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  Item as RadixItem,
  Trigger,
  Link,
} from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { PointerEventHandler } from 'react'

import { Icon } from './icon'
import { SubContent } from './sub-content'
import { FaIcon } from '@/components/fa-icon'
import { HeaderLinkData } from '@/data-types'
import { submitEvent } from '@/helper/submit-event'

export const styledLinkCls = /* className={ */ clsx(
  'navtrigger flex align-middle items-center',
  'w-full text-[1.33rem] font-bold',
  'text-brand block border-b border-brand-lighter p-4',
  'md:serlo-menu-entry-special',
  'md:block md:serlo-button-blue-transparent md:text-[0.9rem] md:leading-tight md:transition md:text-brand-light',
  'md:my-0 md:mt-[2px] md:py-0.5 md:px-[7px]',
  'md:text-center',
  'hover:no-underline hover:bg-brand-300'
)

export const preventHover: PointerEventHandler = (event) => {
  if (window.innerWidth < 1024) event.preventDefault()
}

export interface ItemProps {
  link: HeaderLinkData
  specialContent?: JSX.Element
}

export function Item({ link, specialContent }: ItemProps) {
  const hasChildren = link.children !== undefined

  const textAndIcon = (
    <>
      <Icon icon={link.icon} element={specialContent} alt={link.title} />
      <span className={clsx(specialContent && 'md:sr-only')}>{link.title}</span>
    </>
  )

  return (
    <RadixItem
      className={clsx(
        'ease-linear duration-700',
        'block md:inline-block md:mx-[3px]'
      )}
      key={link.title}
    >
      {hasChildren ? renderItemSub() : renderItemNoSub()}
    </RadixItem>
  )

  function renderItemNoSub() {
    return (
      <NextLink href={link.url} passHref>
        <Link
          className={clsx('group', styledLinkCls)}
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
          onPointerMove={preventHover}
          onPointerLeave={preventHover}
        >
          {textAndIcon}&nbsp;
          <FaIcon icon={faCaretDown} />
        </Trigger>
        <SubContent subItems={link.children} parent={link} />
      </>
    )
  }
}

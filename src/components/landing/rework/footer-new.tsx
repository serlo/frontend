import clsx from 'clsx'
import * as R from 'ramda'
import { Fragment } from 'react'

import { Link } from '../../content/link'
import { FooterNavNew } from './footer-nav-new'
import { Separator } from './separator'
import { useInstanceData } from '@/contexts/instance-context'

export function FooterNew() {
  const { footerData } = useInstanceData()
  return (
    <footer
      style={{ backgroundColor: '#eef1f5' }}
      className="px-side lg:px-36 pb-10 font-bold"
    >
      <Separator />
      <FooterNavNew />
      <Separator />
      {renderFooterLine()}
    </footer>
  )

  function renderFooterLine() {
    const items = R.concat(
      R.map(
        R.assoc('mdHidden', false),
        footerData.footerNavigation[2].children
      ),
      R.map(R.assoc('mdHidden', true), footerData.footerNavigation[1].children)
    )

    return <nav className="text-center">{items.map(renderFooterLineItem)}</nav>
  }

  function renderFooterLineItem(
    { title, url, mdHidden }: { title: string; url: string; mdHidden: boolean },
    index: number
  ) {
    const dot = ' • '

    return (
      <>
        {index > 0 && (
          <span
            className={clsx('px-1 text-truegray-400', mdHidden && 'md:hidden')}
          >
            {dot}
          </span>
        )}
        <Link
          className={clsx('text-truegray-700', mdHidden && 'md:hidden')}
          href={url}
          noExternalIcon
        >
          {title}
        </Link>
      </>
    )
  }
}

import { Fragment } from 'react'
import clsx from 'clsx'

import { Separator } from './separator'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { FooterLink } from '@/data-types'

export function FooterNavNew() {
  const { headerData, footerData } = useInstanceData()
  return (
    <nav className="flex flex-wrap md:flex justify-center md:justify-between">
      <div className="md:mr-5 text-center md:text-left">
        <h1 className="font-handwritten text-4xl -mt-2 mb-10">
          Serlo:
          <br />
          Die freie Lernplattform
        </h1>
        <div className="mx-auto md:mx-0" style={{ maxWidth: '190px' }}>
          <Link
            className="serlo-new-landing-button md:mx-0 max-w-xs"
            href="/mitmachen"
          >
            Mitmachen
          </Link>
          <Link className="serlo-new-landing-button md:mx-0" href="/spenden">
            Spenden
          </Link>
        </div>
      </div>
      <Separator className="md:hidden" />
      <div style={{ maxWidth: '50%' }} className="mr-8">
        {renderFooterNavChildren(footerData.footerNavigation[0].children)}
      </div>
      <div style={{ maxWidth: '50%' }} className="mr-8">
        {renderFooterNavChildren(headerData[0].children as FooterLink[])}
      </div>

      <div style={{ maxWidth: '50%' }} className="mr-8 hidden md:block">
        {renderFooterNavChildren(footerData.footerNavigation[1].children)}
      </div>
    </nav>
  )

  function renderFooterNavChildren(items?: FooterLink[]) {
    if (!items) return null

    return items.map((item) => (
      <Fragment key={item.url}>
        <Link
          className={clsx(
            'inline-block text-truegray-700 mb-2 w-auto',
            'border-transparent border-b-2 hover:no-underline hover:border-brand hover:text-brand'
          )}
          href={item.url}
          noExternalIcon
        >
          {item.title}
        </Link>
        <br />
      </Fragment>
    ))
  }
}

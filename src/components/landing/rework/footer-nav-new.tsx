import clsx from 'clsx'

import { Separator } from './separator'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

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
      {renderFooterNavChildren(footerData.footerNavigation[0].children)}
      {headerData[0].children &&
        renderFooterNavChildren(headerData[0].children)}
      {renderFooterNavChildren(
        footerData.footerNavigation[1].children,
        'hidden md:block'
      )}
    </nav>
  )

  function renderFooterNavChildren(
    items: { url: string; title: string }[],
    className = ''
  ) {
    return (
      <ul style={{ maxWidth: '50%' }} className={clsx('mr-8', className)}>
        {items.map(({ url, title }) => (
          <li key={url}>
            <Link
              className={clsx(
                'text-truegray-700 mb-2 w-auto border-transparent border-b-2',
                'inline-block hover:no-underline hover:border-brand hover:text-brand'
              )}
              href={url}
              noExternalIcon
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

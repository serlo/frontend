import clsx from 'clsx'

import { Separator } from './separator'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

export function FooterNavNew() {
  const { headerData, footerData } = useInstanceData()

  return (
    <nav
      className={clsx(
        'text-center mobile:text-left mobile:flex flex-wrap',
        'justify-center md:justify-between'
      )}
    >
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
      {/* first row */}
      {renderFooterNavChildren(footerData.footerNavigation[0].children)}
      {/* subjects */}
      {headerData[0].children &&
        renderFooterNavChildren(headerData[0].children)}
      {/* newsletter/github */}
      {renderFooterNavChildren(footerData.footerNavigation[1].children)}
    </nav>
  )

  function renderFooterNavChildren(items: { url: string; title: string }[]) {
    return (
      <ul className="mobile:max-w-30p mobile:mr-8 mt-8 mobile:mt-0">
        {items.map(({ url, title }) => (
          <li key={url}>
            <Link
              className={clsx(
                'text-almost-black mb-2 w-auto border-transparent border-b-2',
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

import { Fragment } from 'react'

import { FooterNavNew } from './footer-nav-new'
import { Separator } from './separator'
import { Link } from '../../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export function FooterNew() {
  const { footerData } = useInstanceData()
  return (
    <footer
      id="footer"
      className="bg-brand-100 px-side pb-10 font-bold text-almost-black lg:px-36"
    >
      <Separator />
      <FooterNavNew />
      <Separator />
      {renderFooterLine()}
    </footer>
  )

  function renderFooterLine() {
    return (
      <>
        <style jsx>{`
          nav > :global(a):not(:last-child):after {
            content: '•';
            position: absolute;
            width: 1.2rem;
            opacity: 0.4;
          }
        `}</style>
        <nav className="text-center">
          {footerData.footerNavigation[3].children.map(({ title, url }) => {
            return (
              <Fragment key={title}>
                <Link
                  className="pr-4 text-almost-black mobile:whitespace-nowrap"
                  href={url}
                  noExternalIcon
                >
                  {title}
                </Link>{' '}
              </Fragment>
            )
          })}
        </nav>
      </>
    )
  }
}

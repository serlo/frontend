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
      className="px-side lg:px-36 pb-10 font-bold text-truegray-700"
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
          nav > :global(a) {
            &:not(:last-child):after {
              content: '•';
              position: absolute;
              width: 1.2rem;
              opacity: 0.4;
            }
          }
        `}</style>
        <nav className="text-center">
          {footerData.footerNavigation[2].children.map(({ title, url }) => {
            return (
              <Fragment key={title}>
                <Link
                  className="text-truegray-700 mobile:whitespace-nowrap pr-4"
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

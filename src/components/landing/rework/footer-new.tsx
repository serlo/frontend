import styled from 'styled-components'

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
    return (
      <FooterLineNav className="text-center">
        {footerData.footerNavigation[2].children.map(({ title, url }) => {
          return (
            <>
              <Link
                className="text-truegray-700 mobile:whitespace-nowrap pr-4"
                href={url}
                noExternalIcon
              >
                {title}
              </Link>{' '}
            </>
          )
        })}
      </FooterLineNav>
    )
  }
}

const FooterLineNav = styled.nav`
  > a {
    &:not(:last-child):after {
      content: '•';
      position: absolute;
      width: 1.2rem;
      opacity: 0.4;
    }
  }
`

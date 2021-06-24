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
      <div>{renderFooterLine()}</div>
    </footer>
  )

  function renderFooterLine() {
    return (
      <div className="text-center">
        {footerData.footerNavigation[2].children.map((item, index, array) => (
          <Fragment key={item.title}>
            <Link className="text-truegray-700" href={item.url} noExternalIcon>
              {item.title}
            </Link>
            {index < array.length - 1 && (
              <span className="px-1 text-truegray-400"> • </span>
            )}
          </Fragment>
        ))}
        <span className="px-1 md:hidden text-truegray-400"> • </span>
        {footerData.footerNavigation[1].children.map((item, index, array) => (
          <Fragment key={item.title}>
            <Link
              className="text-truegray-700 md:hidden"
              href={item.url}
              noExternalIcon
            >
              {item.title}
            </Link>
            {index < array.length - 1 && (
              <span className="px-1 text-truegray-400 md:hidden"> • </span>
            )}
          </Fragment>
        ))}
      </div>
    )
  }
}

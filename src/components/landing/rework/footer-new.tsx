import { Link } from '../../content/link'
import { FooterNavNew } from './footer-nav-new'
import { Separator } from './separator'
import { useInstanceData } from '@/contexts/instance-context'

export function FooterNew() {
  const { footerData } = useInstanceData()
  return (
    <footer
      style={{ backgroundColor: '#eef1f5' }}
      className="px-side md:px-side-lg pb-10 font-bold"
    >
      <FooterNavNew />
      <Separator />
      <div>{renderFooterLine()}</div>
    </footer>
  )

  function renderFooterLine() {
    return (
      <div className="text-center md:text-right">
        {footerData.footerNavigation[2].children.map((item) => (
          <>
            <Link
              key={item.title}
              className="mr-3 text-truegray-700"
              href={item.url}
              noExternalIcon
            >
              {item.title}
            </Link>
          </>
        ))}
        {footerData.footerNavigation[1].children.map((item) => (
          <>
            <Link
              key={item.title}
              className="mr-3 text-truegray-700 md:hidden"
              href={item.url}
              noExternalIcon
            >
              {item.title}
            </Link>
          </>
        ))}
      </div>
    )
  }
}

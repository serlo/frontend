import { Separator } from './separator'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { tw } from '@/helper/tw'

export function FooterNavNew() {
  const { headerData, footerData } = useInstanceData()

  return (
    <nav
      className={tw`
        flex-wrap justify-center text-center mobile:flex
        mobile:text-left md:justify-between
      `}
    >
      <div className="text-center md:mr-5 md:text-left">
        <h1 className="-mt-2 mb-10 font-handwritten text-4xl">
          Serlo:
          <br />
          Die freie Lernplattform
        </h1>
        <div className="mx-auto max-w-[190px] md:mx-0">
          <Link
            className="serlo-new-landing-button max-w-xs md:mx-0"
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
      <ul className="mt-8 mobile:mr-8 mobile:mt-0 mobile:max-w-30p">
        {items.map(({ url, title }) => (
          <li key={url}>
            <Link
              className={tw`
                mb-2 inline-block w-auto border-b-2 border-transparent
                text-almost-black hover:border-brand hover:text-brand hover:no-underline
              `}
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

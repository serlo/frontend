import {
  faChevronUp,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import DonateIcon from '@/assets-webkit/img/footer-donate.svg'
import ParticipateIcon from '@/assets-webkit/img/footer-participate.svg'
import { Link } from '@/components/content/link'
import { FooterNav } from '@/components/navigation/footer-nav'
import { useInstanceData } from '@/contexts/instance-context'

export function Footer() {
  const { footerData } = useInstanceData()
  return (
    <footer id="footer">
      <About />
      <FooterNav data={footerData.footerNavigation} />
    </footer>
  )
}

function About() {
  const { footerData, strings } = useInstanceData()
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative min-h-[54px] w-full bg-brand">
        <div
          className={clsx(
            'absolute right-4 top-2 text-white hover:bg-brand-500',
            'flex h-10 w-10 items-center justify-center rounded-full',
            'cursor-pointer transition-colors'
          )}
          onClick={() => window.scrollTo(0, 0)}
          title={strings.footer.toTop}
        >
          <FaIcon icon={faChevronUp} className="h-5" />
        </div>
      </div>
      <div className="shrink text-lg">
        <div className="bg-brand-500 px-side pt-8 pb-4 text-white md:px-side-lg">
          <div className="my-1 font-bold">{strings.footer.summaryHeading}</div>
          <div className="mt-4 leading-browser">
            {strings.footer.summaryText}
          </div>
          <div>
            <Link
              href={footerData.aboutHref}
              className="serlo-button-blue-transparent my-4 py-0.5 text-white"
            >
              <FaIcon icon={faChevronCircleRight} className="h-4" />{' '}
              {strings.footer.learnMore}
            </Link>
          </div>
        </div>
        <div className="flex justify-around bg-brandgreen py-4">
          <Link
            href={footerData.participationHref}
            className="group flex flex-col items-center hover:no-underline"
          >
            <ParticipateIcon className="w-14" />
            <div className="serlo-button mt-2 py-0.5 text-white hover:bg-brand group-hover:bg-brand">
              {strings.footer.participate}
            </div>
          </Link>
          <Link
            href={footerData.donationHref}
            className="group flex flex-col items-center hover:no-underline"
          >
            <DonateIcon className="w-14" />
            <div className="serlo-button mt-2 py-0.5 text-white hover:bg-brand group-hover:bg-brand">
              {strings.footer.donate}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

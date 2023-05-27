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
      <div className="bg-brand w-full min-h-[54px] relative">
        <div
          className={clsx(
            'absolute right-4 top-2 text-white hover:bg-brand-500',
            'w-10 h-10 items-center justify-center rounded-full flex',
            'cursor-pointer transition-colors'
          )}
          onClick={() => window.scrollTo(0, 0)}
          title={strings.footer.toTop}
        >
          <FaIcon icon={faChevronUp} className="h-5" />
        </div>
      </div>
      <div className="text-lg shrink">
        <div className="bg-brand-500 text-white pt-8 pb-4 px-side md:px-side-lg">
          <div className="font-bold my-1">{strings.footer.summaryHeading}</div>
          <div className="mt-4 leading-browser">
            {strings.footer.summaryText}
          </div>
          <div>
            <Link
              href={footerData.aboutHref}
              className="serlo-button-blue-transparent py-0.5 text-white my-4"
            >
              <FaIcon icon={faChevronCircleRight} className="h-4" />{' '}
              {strings.footer.learnMore}
            </Link>
          </div>
        </div>
        <div className="bg-brandgreen flex justify-around py-4">
          <Link
            href={footerData.participationHref}
            className="flex flex-col items-center hover:no-underline group"
          >
            <ParticipateIcon className="w-14" />
            <div className="serlo-button py-0.5 mt-2 text-white hover:bg-brand group-hover:bg-brand">
              {strings.footer.participate}
            </div>
          </Link>
          <Link
            href={footerData.donationHref}
            className="flex flex-col items-center hover:no-underline group"
          >
            <DonateIcon className="w-14" />
            <div className="serlo-button py-0.5 mt-2 text-white hover:bg-brand group-hover:bg-brand">
              {strings.footer.donate}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

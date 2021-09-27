import {
  faChevronUp,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import DonateIcon from '@/assets-webkit/img/footer-donate.svg'
import ParticipateIcon from '@/assets-webkit/img/footer-participate.svg'
import { Link } from '@/components/content/link'
import { FooterNav } from '@/components/navigation/footer-nav'
import { useInstanceData } from '@/contexts/instance-context'

export function Footer() {
  const { footerData } = useInstanceData()
  return (
    <footer>
      <About />
      <FooterNav data={footerData.footerNavigation} />
    </footer>
  )
}

function About() {
  const { footerData, strings } = useInstanceData()
  return (
    <div className="flex flex-col md:flex-row mt-8">
      <div className="bg-brand w-full min-h-[54px] relative">
        <div
          className={clsx(
            'absolute right-4 top-2 text-white hover:bg-brand-light',
            'w-10 h-10 items-center justify-center rounded-full flex',
            'cursor-pointer transition-colors'
          )}
          onClick={() => window.scrollTo(0, 0)}
          title={strings.footer.toTop}
        >
          <FontAwesomeIcon icon={faChevronUp} size="lg" />
        </div>
      </div>
      <div className="text-lg flex-shrink">
        <div className="bg-brand-light text-white pt-8 pb-4 px-side md:px-side-lg">
          <div className="font-bold my-1">{strings.footer.summaryHeading}</div>
          <div className="mt-4 leading-browser">
            {strings.footer.summaryText}
          </div>
          <div>
            <Link
              href={footerData.aboutHref}
              path={['footer_about']}
              className="serlo-button py-0.5 serlo-make-interactive-transparent-blue text-white my-4"
            >
              <FontAwesomeIcon icon={faChevronCircleRight} size="sm" />{' '}
              {strings.footer.learnMore}
            </Link>
          </div>
        </div>
        <div className="bg-brandgreen flex justify-around py-4">
          <Link
            href={footerData.participationHref}
            path={['footer_participation']}
            className="flex flex-col items-center hover:no-underline group"
          >
            <ParticipateIcon className="w-14" />
            <div className="serlo-button py-0.5 mt-2 text-white hover:bg-brand group-hover:bg-brand">
              {strings.footer.participate}
            </div>
          </Link>
          <Link
            href={footerData.donationHref}
            path={['footer_donation']}
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

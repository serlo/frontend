import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { PrinciplesGraphic } from '../landing/principles-graphic'
import ParticipateSVG from '@/assets-webkit/img/footer-participate.svg'
import { LandingSubjectsNew } from '@/components/landing/rework/landing-subjects-new'
import { useInstanceData } from '@/contexts/instance-context'
import { InstanceLandingData } from '@/data-types'
import { breakpoints } from '@/helper/breakpoints'
import { colors } from '@/helper/colors'

export interface LandingInternationalProps {
  data: InstanceLandingData
}

export function LandingInternational({ data }: LandingInternationalProps) {
  const landingStrings = data.strings
  const subjectsData = data.subjectsData
  const { strings } = useInstanceData()

  return (
    <>
      <HeadTags data={{ title: strings.header.slogan }} />
      <section className="section">
        <p className="serlo-p ml-0">{landingStrings.vision}</p>
        <Link className="serlo-button-light -ml-1" href="/serlo">
          {landingStrings.learnMore} <FaIcon icon={faArrowCircleRight} />
        </Link>
      </section>
      <section className="mb-14">
        <LandingSubjectsNew data={subjectsData} />
      </section>

      <section className="principles-section bg-brand px-side lg:px-side-lg">
        <PrinciplesGraphic strings={landingStrings} />
      </section>

      <section className="section">
        <h2 className="text-brand">{landingStrings.wikiTitle}</h2>
        <p className="serlo-p ml-0">{landingStrings.wikiText}</p>
      </section>

      <section className="image-section" />

      <section className="section">
        <h2 className="text-brand">{landingStrings.movementTitle}</h2>
        <div className="icon-style">
          <ParticipateSVG />
        </div>
        <div className="col">
          <p className="serlo-p ml-0">{landingStrings.callForAuthors}</p>
          <Link href="/community" className="serlo-button-light -ml-1">
            {landingStrings.communityLink} <FaIcon icon={faArrowCircleRight} />
          </Link>
        </div>
        <div className="col">
          <p className="serlo-p ml-0">{landingStrings.callForOther}</p>
          <Link href="/get-involved" className="serlo-button-light -ml-1">
            {landingStrings.getInvolved} <FaIcon icon={faArrowCircleRight} />
          </Link>
        </div>
      </section>
      <style jsx>{`
        .section {
          margin-top: 60px;
          margin-bottom: 60px;
          padding-left: 16px;
          padding-right: 16px;
        }

        @media (min-width: ${breakpoints.sm}) {
          .section {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        @media (min-width: ${breakpoints.lg}) {
          .section {
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 40px;
            padding-right: 40px;
          }
        }
        .col {
          margin-top: 40px;
        }
        @media (min-width: ${breakpoints.sm}) {
          .col {
            margin-top: 0;
            margin-right: 30px;
            flex: 1;
          }

          .col > p {
            min-height: 80px;
          }

          .col:last-child {
            margin-right: 0;
          }
        }
        @media (min-width: ${breakpoints.lg}) {
          .col {
            margin-right: 50px;
          }
        }
        .col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .col :global(.a) {
          /* ? */
          margin-top: auto;
        }
        .col {
          margin-bottom: 60px;
        }
        .image-section {
          background-size: contain;
          background-repeat: no-repeat;
          padding-top: 43.75%;

          background-image: url('/_assets/img/landing-international/home_sm.jpg');
        }
        @media (min-width: ${breakpoints.sm}) {
          .image-section {
            background-image: url('/_assets/img/landing-international/home_md.jpg');
          }
        }
        @media (min-width: ${breakpoints.md}) {
          .image-section {
            background-image: url('/_assets/img/landing-international/home_lg.jpg');
          }
        }
        h2 {
          font-size: 1.66rem;
          border: 0;
        }
        @media (min-width: ${breakpoints.sm}) {
          h2 {
            width: 100%;
          }
        }
        .principles-section {
          text-align: center;
          padding-top: 70px;
          padding-bottom: 70px;
        }
        .principles-section > :global(svg) {
          height: 450px;
          width: 100%;
          font-family: inherit;
        }
        .icon-style > :global(path),
        .icon-style :global(.st0) {
          fill: ${colors.brandGreen};
        }
        .icon-style {
          width: 100px;
          margin-right: 30px;
        }
        @media (min-width: ${breakpoints.lg}) {
          .icon-style {
            margin-right: 50px;
            width: 120px;
          }
        }
      `}</style>
    </>
  )
}

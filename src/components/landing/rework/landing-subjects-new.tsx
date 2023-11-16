import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'

import { SubjectIcon } from './subject-icon'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { LandingSubjectLink, LandingSubjectsData } from '@/data-types'
import { breakpoints } from '@/helper/breakpoints'
import { colors } from '@/helper/colors'

interface LandingSubjectsProps {
  data: LandingSubjectsData
}

export function LandingSubjectsNew({ data }: LandingSubjectsProps) {
  return (
    <>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-evenly;

          flex-direction: row;
          flex-wrap: wrap;

          margin: 0 auto;
          max-width: 800px;
        }

        @media (min-width: ${breakpoints.lg}) {
          nav {
            margin-top: 40px;
          }
        }
      `}</style>
      <nav className="px-side lg:px-side-lg">
        {data.subjects.map(renderSubject)}
      </nav>
    </>
  )

  function renderSubject({ title, url, icon }: LandingSubjectLink) {
    return (
      <Fragment key={title}>
        <style jsx>{`
          :global(.landing-subjects) {
            display: block;
            padding-left: 0;
            min-width: 40%;
            max-width: 49%;
          }
          @media (min-width: ${breakpoints.sm}) {
            :global(.landing-subjects) {
              min-width: 30%;
            }
          }
          :global(.landing-subjects) {
            text-align: center;
          }
          :global(.landing-subjects):hover {
            cursor: pointer;
          }

          h2 {
            vertical-align: top;
            margin-top: 10px;

            font-size: 1.3rem;
            line-height: normal;
            width: auto;
            transition:
              color 0.4s ease,
              background-color 0.4s ease;
          }

          @media (max-width: 799) {
            h2:hover {
              color: ${colors.brand};
              background-color: transparent;
            }
          }
        `}</style>
        <Link
          key={title}
          href={url}
          className="landing-subjects group serlo-subject-icon-wrapper"
        >
          {' '}
          <SubjectIcon subject={icon} />
          <h2 className="serlo-button-blue-transparent group-hover:bg-brand-200 group-hover:text-brand">
            {title}
            <span className="ml-1.5 align-middle">
              <FaIcon icon={faArrowCircleRight} />
            </span>
          </h2>
        </Link>
      </Fragment>
    )
  }
}

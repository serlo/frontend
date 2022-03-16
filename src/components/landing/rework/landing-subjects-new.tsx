import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'

import { SubjectIcon } from './subject-icon'
import { Link } from '@/components/content/link'
import { LandingSubjectLink, LandingSubjectsData } from '@/data-types'
import { theme } from '@/theme'

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

          @apply px-side lg:px-side-lg;
          flex-direction: row;
          flex-wrap: wrap;

          margin: 0 auto;
          max-width: 800px;

          @screen lg {
            margin-top: 40px;
          }
        }
      `}</style>
      <nav>{data.subjects.map(renderSubject)}</nav>
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
            @screen sm {
              min-width: 30%;
            }

            text-align: center;

            &:hover {
              cursor: pointer;
            }
          }

          h2 {
            vertical-align: top;
            margin-top: 10px;

            font-size: 1.3rem;
            line-height: normal;
            width: auto;
            transition: color 0.4s ease, background-color 0.4s ease;

            @media (max-width: ${theme.breakpointsMax.sm}) {
              &:hover {
                color: ${theme.colors.brand};
                background-color: transparent;
              }
            }
          }
        `}</style>
        <Link
          key={title}
          href={url}
          className="landing-subjects serlo-subject-icon-wrapper group"
        >
          {' '}
          <SubjectIcon subject={icon} />
          <h2 className="group-hover:bg-brand-150 group-hover:text-brand serlo-button serlo-make-interactive-transparent-blue">
            {title}
            <span className="align-middle ml-1.5">
              <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
            </span>
          </h2>
        </Link>
      </Fragment>
    )
  }
}

import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'

import AbcSVG from '@/assets-webkit/img/landing/subjects-abc.svg'
import BiologySVG from '@/assets-webkit/img/landing/subjects-biology.svg'
import BlankSVG from '@/assets-webkit/img/landing/subjects-blank.svg'
import ChemistrySVG from '@/assets-webkit/img/landing/subjects-chemistry.svg'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import MathSVG from '@/assets-webkit/img/landing/subjects-math.svg'
import NewSVG from '@/assets-webkit/img/landing/subjects-new.svg'
import SustainabilitySVG from '@/assets-webkit/img/landing/subjects-sustainability.svg'
import { Link } from '@/components/content/link'
import {
  LandingSubjectIcon,
  LandingSubjectLink,
  LandingSubjectsData,
} from '@/data-types'
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
      <>
        <style jsx global>{`
          @keyframes jump {
            16% {
              transform: translateY(1rem);
            }
            33% {
              transform: translateY(-0.6rem);
            }
            50% {
              transform: translateY(0.4rem);
            }
            67% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes hiccup {
            33% {
              transform: translateY(0) rotate(0);
            }
            44% {
              transform: translateY(-0.25rem) rotate(0.2deg);
            }
            70% {
              transform: translateY(-0rem) rotate(-0.4deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }
          .landing-subjects {
            & svg.superspecial-bio,
            & svg.superspecial-math,
            & svg.superspecial-abc,
            & svg.superspecial-sus,
            & svg.superspecial-chem,
            & svg.superspecial-new,
            & svg.superspecial-blank,
            & svg.superspecial-informatics {
              display: block;
              margin: 0 auto;
              min-width: 10rem;

              width: 8rem;
              height: 8rem;
              margin: 1rem 0.5rem 0 0.5rem;
              margin: 1rem auto 0 auto;

              .blue {
                fill: ${theme.colors.lighterblue};
                transition: all 0.2s ease-in-out;
              }
              .green,
              .drop,
              .pipette path {
                fill: #becd2b;
                transition: all 0.2s ease-in-out;
              }

              @media (min-width: ${theme.breakpoints.sm}) {
                .blue {
                  fill: ${lighten(0.07, theme.colors.lighterblue)};
                }
              }

              /* animations */
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              animation-play-state: paused;
            }

            .pipette path,
            .flask path {
              fill: none;
              stroke: #000;
              stroke-linecap: round;
              stroke-width: 1.1px;
            }

            .eye-closed,
            .sound {
              opacity: 0;
            }

            .eye-closed {
              stroke: #000;
              stroke-width: 2px;
            }

            .chem-contents {
              transition: 0.7s ease-in all !important;
            }
            .pipette {
              transform: translateY(-5px);
              transition: 0.2s ease-in all;
              transform-origin: 50% 50%;
            }
            .drop {
              opacity: 0;
              transition: 0.2s ease-in transform;
              transform: scale(2) translateY(5px);
              transform-origin: 50% 50%;
            }
            & .superspecial-math {
              transition-duration: 0.6s;
            }
            & .superspecial-sus path.water {
              transform: scale(0) translateY(-30px);
              transform-origin: 9% 60%;
              transition: transform 0.6s cubic-bezier(0.175, 0.6, 0.32, 1.275);
            }
            & .superspecial-informatics {
              transition: fill ease-in 0.5s;
            }
            & .superspecial-new {
              transform-origin: 50% 60%;
            }
            &:hover,
            &:focus,
            &:active {
              & .superspecial-bio {
                animation: jump 0.7s ease-in-out;
              }
              & .superspecial-abc {
                transform: scale(1.25) rotate(10deg);
              }
              & .superspecial-math {
                transform: rotateY(-180deg) rotateX(-3deg);
              }
              & .superspecial-sus {
                transform: rotate(-30deg);
              }
              & .superspecial-sus .blue.water {
                transform: scale(1.08);
              }
              & .superspecial-new {
                transform: rotate(180deg);
              }
              && .blue {
                fill: ${theme.colors.brand};
              }
              && .green {
                fill: #becd2b;
              }
              .eye-open {
                opacity: 0;
              }
              .eye-closed,
              .sound {
                opacity: 1;
              }

              & .superspecial-chem {
                .flask {
                  animation: hickup 0.7s ease-in-out;
                }
                .contents {
                  fill: #becd2b !important;
                  animation: hickup 0.7s ease-in-out;
                }
                .pipette {
                  transform: translateY(0) rotate(-3deg);
                }
                .pipette .pipette-contents {
                  opacity: 0;
                }
                .drop {
                  transform: scale(2) translateY(40px);
                  opacity: 1;
                }
              }
            }
          }
        `}</style>
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
        <Link key={title} href={url} className="landing-subjects group">
          {' '}
          {renderIcon(icon)}
          <h2 className="group-hover:bg-brand-150 group-hover:text-brand serlo-button serlo-make-interactive-transparent-blue">
            {title}
            <span className="align-middle ml-1.5">
              <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
            </span>
          </h2>
        </Link>
      </>
    )
  }

  function renderIcon(icon?: LandingSubjectIcon) {
    switch (icon) {
      case 'math':
        return <MathSVG className="superspecial-math" />
      case 'abc':
        return <AbcSVG className="superspecial-abc" />
      case 'sustainability':
        return <SustainabilitySVG className="superspecial-sus" />
      case 'biology':
        return <BiologySVG className="superspecial-bio" />
      case 'informatics':
        return <InformaticsSVG className="superspecial-informatics" />
      case 'new':
        return <NewSVG className="superspecial-new" />
      case 'chemistry':
        return <ChemistrySVG className="superspecial-chem" />
      default:
        return <BlankSVG className="superspecial-blank" />
    }
  }
}

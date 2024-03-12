import AbcSVG from '@/assets-webkit/img/landing/subjects-abc.svg'
import BiologySVG from '@/assets-webkit/img/landing/subjects-biology.svg'
import BlankSVG from '@/assets-webkit/img/landing/subjects-blank.svg'
import ChemistrySVG from '@/assets-webkit/img/landing/subjects-chemistry.svg'
import GeographySVG from '@/assets-webkit/img/landing/subjects-geography.svg'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import MathSVG from '@/assets-webkit/img/landing/subjects-math.svg'
import NewSVG from '@/assets-webkit/img/landing/subjects-new.svg'
import SustainabilitySVG from '@/assets-webkit/img/landing/subjects-sustainability.svg'
import type { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import type { LandingSubjectIcon } from '@/data-types'

export interface SubjectIconProps {
  subject?: LandingSubjectIcon | deSubjectLandingSubjects | string
}

export function SubjectIcon({ subject }: SubjectIconProps) {
  return <div className="serlo-subject-icon-wrapper">{renderIcon(subject)}</div>

  function renderIcon(
    subject?: LandingSubjectIcon | deSubjectLandingSubjects | string
  ) {
    switch (subject) {
      case 'math':
      case 'mathe':
        return (
          <>
            <MathSVG className="superspecial-math serlo-subject-icon" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper .superspecial-math {
                transition-duration: 0.6s;
              }
              .serlo-subject-icon-wrapper:hover .superspecial-math,
              .serlo-subject-icon-wrapper:focus .superspecial-math,
              .serlo-subject-icon-wrapper:active .superspecial-math {
                transform: rotateY(-180deg) rotateX(-3deg);
              }
            `}</style>
          </>
        )
      case 'lerntipps':
      case 'abc':
        return (
          <>
            <AbcSVG className="superspecial-abc serlo-subject-icon" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper .superspecial-abc:hover,
              .serlo-subject-icon-wrapper .superspecial-abc:focus,
              .serlo-subject-icon-wrapper .superspecial-abc:active {
                transform: scale(1.25) rotate(10deg);
              }
            `}</style>
          </>
        )
      case 'sustainability':
      case 'nachhaltigkeit':
        return (
          <>
            <SustainabilitySVG className="superspecial-sus serlo-subject-icon" />
            <style jsx global>{`
              .superspecial-sus path.water {
                transform: scale(0) translateY(-30px);
                transform-origin: 9% 60%;
                transition: transform 0.6s cubic-bezier(0.175, 0.6, 0.32, 1.275);
              }
              .serlo-subject-icon-wrapper:hover .superspecial-sus,
              .serlo-subject-icon-wrapper:focus .superspecial-sus,
              .serlo-subject-icon-wrapper:active .superspecial-sus {
                transform: rotate(-30deg);
              }
              .serlo-subject-icon-wrapper:hover .superspecial-sus .blue.water,
              .serlo-subject-icon-wrapper:focus .superspecial-sus .blue.water,
              .serlo-subject-icon-wrapper:active .superspecial-sus .blue.water {
                transform: scale(1.08);
              }
            `}</style>
          </>
        )
      case 'biology':
      case 'biologie':
        return (
          <>
            <BiologySVG className="superspecial-bio serlo-subject-icon" />
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
              .serlo-subject-icon-wrapper:hover .superspecial-bio,
              .serlo-subject-icon-wrapper:focus .superspecial-bio,
              .serlo-subject-icon-wrapper:active .superspecial-bio {
                animation: jump 0.7s ease-in-out;
              }
            `}</style>
          </>
        )
      case 'informatics':
      case 'informatik':
        return (
          <>
            <InformaticsSVG className="superspecial-informatics serlo-subject-icon" />
            <style jsx global>{`
              .superspecial-informatics {
                transition: fill ease-in 0.5s;
              }
              .superspecial-informatics .eye-closed,
              .superspecial-informatics .sound {
                opacity: 0;
              }
              .superspecial-informatics .eye-closed {
                stroke: #000;
                stroke-width: 2px;
              }

              .serlo-subject-icon-wrapper:hover
                .superspecial-informatics
                .eye-open,
              .serlo-subject-icon-wrapper:focus
                .superspecial-informatics
                .eye-open,
              .serlo-subject-icon-wrapper:active
                .superspecial-informatics
                .eye-open {
                opacity: 0;
              }

              .serlo-subject-icon-wrapper:hover
                .superspecial-informatics
                .eye-closed,
              .serlo-subject-icon-wrapper:hover
                .superspecial-informatics
                .sound,
              .serlo-subject-icon-wrapper:focus
                .superspecial-informatics
                .eye-closed,
              .serlo-subject-icon-wrapper:focus
                .superspecial-informatics
                .sound,
              .serlo-subject-icon-wrapper:active
                .superspecial-informatics
                .eye-closed,
              .serlo-subject-icon-wrapper:active
                .superspecial-informatics
                .sound {
                opacity: 1;
              }
            `}</style>
          </>
        )
      case 'new':
        return (
          <>
            <NewSVG className="superspecial-new serlo-subject-icon" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper .superspecial-new {
                transform-origin: 50% 60%;
              }
              .serlo-subject-icon-wrapper:hover .superspecial-new,
              .serlo-subject-icon-wrapper:focus .superspecial-new,
              .serlo-subject-icon-wrapper:active .superspecial-new {
                transform: rotate(180deg);
              }
            `}</style>
          </>
        )
      case 'geography':
        return (
          <>
            <GeographySVG className="superspecial-geo serlo-subject-icon" />
            <style jsx global>{`
              .superspecial-geo .world {
                transform: translateX(-43%);
                transition: transform 0.4s ease-in-out;
              }
              .serlo-subject-icon-wrapper:hover .superspecial-geo .world,
              .serlo-subject-icon-wrapper:focus .superspecial-geo .world,
              .serlo-subject-icon-wrapper:active .superspecial-geo .world {
                transform: translateX(0%);
              }
            `}</style>
          </>
        )
      case 'chemistry':
      case 'chemie':
        return (
          <>
            <ChemistrySVG className="superspecial-chem serlo-subject-icon" />
            <style jsx global>
              {`
                .superspecial-chem .pipette path,
                .superspecial-chem .flask path {
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-width: 1.1px;
                }
                .superspecial-chem .chem-contents {
                  transition: 0.7s ease-in all !important;
                }
                .superspecial-chem .drop,
                .superspecial-chem .pipette path {
                  fill: #becd2b;
                  transition: all 0.2s ease-in-out;
                }
                .superspecial-chem .pipette {
                  transform: translateY(-5px);
                  transition: 0.2s ease-in all;
                  transform-origin: 50% 50%;
                }
                .superspecial-chem .drop {
                  opacity: 0;
                  transition: 0.2s ease-in transform;
                  transform: scale(1.3) translateY(5px);
                  transform-origin: 50% 50%;
                }
                .serlo-subject-icon-wrapper:hover .superspecial-chem .flask,
                .serlo-subject-icon-wrapper:focus .superspecial-chem .flask,
                .serlo-subject-icon-wrapper:active .superspecial-chem .flask {
                  animation: hickup 0.7s ease-in-out;
                }
                .serlo-subject-icon-wrapper:hover .superspecial-chem .contents,
                .serlo-subject-icon-wrapper:focus .superspecial-chem .contents,
                .serlo-subject-icon-wrapper:active
                  .superspecial-chem
                  .contents {
                  fill: #becd2b !important;
                  animation: hickup 0.7s ease-in-out;
                }
                .serlo-subject-icon-wrapper:hover .superspecial-chem .pipette,
                .serlo-subject-icon-wrapper:focus .superspecial-chem .pipette,
                .serlo-subject-icon-wrapper:active .superspecial-chem .pipette {
                  transform: translateY(0) rotate(-3deg);
                }
                .serlo-subject-icon-wrapper:hover
                  .superspecial-chem
                  .pipette
                  .pipette-contents,
                .serlo-subject-icon-wrapper:focus
                  .superspecial-chem
                  .pipette
                  .pipette-contents,
                .serlo-subject-icon-wrapper:active
                  .superspecial-chem
                  .pipette
                  .pipette-contents {
                  opacity: 0;
                }
                .serlo-subject-icon-wrapper:hover .superspecial-chem .drop,
                .serlo-subject-icon-wrapper:focus .superspecial-chem .drop,
                .serlo-subject-icon-wrapper:active .superspecial-chem .drop {
                  transform: scale(2) translateY(40px);
                  opacity: 1;
                }
              `}
            </style>
          </>
        )
      default:
        return <BlankSVG className="superspecial-blank serlo-subject-icon" />
    }
  }
}

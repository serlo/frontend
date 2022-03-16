import AbcSVG from '@/assets-webkit/img/landing/subjects-abc.svg'
import BiologySVG from '@/assets-webkit/img/landing/subjects-biology.svg'
import BlankSVG from '@/assets-webkit/img/landing/subjects-blank.svg'
import ChemistrySVG from '@/assets-webkit/img/landing/subjects-chemistry.svg'
import GeographySVG from '@/assets-webkit/img/landing/subjects-geography.svg'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import MathSVG from '@/assets-webkit/img/landing/subjects-math.svg'
import NewSVG from '@/assets-webkit/img/landing/subjects-new.svg'
import SustainabilitySVG from '@/assets-webkit/img/landing/subjects-sustainability.svg'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { LandingSubjectIcon } from '@/data-types'

export function SubjectIcon({
  subject,
}: {
  subject?: LandingSubjectIcon | deSubjectLandingSubjects | string
}) {
  return <div className="serlo-subject-icon-wrapper">{renderIcon(subject)}</div>

  function renderIcon(
    subject?: LandingSubjectIcon | deSubjectLandingSubjects | string
  ) {
    switch (subject) {
      case 'math':
      case 'mathe':
        return (
          <>
            <MathSVG className="serlo-subject-icon superspecial-math" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper {
                .superspecial-math {
                  transition-duration: 0.6s;
                }
                &:hover,
                &:focus,
                &:active {
                  .superspecial-math {
                    transform: rotateY(-180deg) rotateX(-3deg);
                  }
                }
              }
            `}</style>
          </>
        )
      case 'lerntipps':
      case 'abc':
        return (
          <>
            <AbcSVG className="serlo-subject-icon superspecial-abc" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper .superspecial-abc {
                &:hover,
                &:focus,
                &:active {
                  transform: scale(1.25) rotate(10deg);
                }
              }
            `}</style>
          </>
        )
      case 'sustainability':
      case 'nachhaltigkeit':
        return (
          <>
            <SustainabilitySVG className="serlo-subject-icon superspecial-sus" />
            <style jsx global>{`
              .superspecial-sus {
                path.water {
                  transform: scale(0) translateY(-30px);
                  transform-origin: 9% 60%;
                  transition: transform 0.6s
                    cubic-bezier(0.175, 0.6, 0.32, 1.275);
                }
              }
              .serlo-subject-icon-wrapper {
                &:hover,
                &:focus,
                &:active {
                  .superspecial-sus {
                    transform: rotate(-30deg);
                    .blue.water {
                      transform: scale(1.08);
                    }
                  }
                }
              }
            `}</style>
          </>
        )
      case 'biology':
      case 'biologie':
        return (
          <>
            <BiologySVG className="serlo-subject-icon superspecial-bio" />
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
              .serlo-subject-icon-wrapper {
                &:hover,
                &:focus,
                &:active {
                  .superspecial-bio {
                    animation: jump 0.7s ease-in-out;
                  }
                }
              }
            `}</style>
          </>
        )
      case 'informatics':
      case 'informatik':
        return (
          <>
            <InformaticsSVG className="serlo-subject-icon superspecial-informatics" />
            <style jsx global>{`
              .superspecial-informatics {
                transition: fill ease-in 0.5s;
                .eye-closed,
                .sound {
                  opacity: 0;
                }

                .eye-closed {
                  stroke: #000;
                  stroke-width: 2px;
                }
              }

              .serlo-subject-icon-wrapper {
                &:hover,
                &:focus,
                &:active {
                  .superspecial-informatics {
                    .eye-open {
                      opacity: 0;
                    }
                    .eye-closed,
                    .sound {
                      opacity: 1;
                    }
                  }
                }
              }
            `}</style>
          </>
        )
      case 'new':
        return (
          <>
            <NewSVG className="serlo-subject-icon superspecial-new" />
            <style jsx global>{`
              .serlo-subject-icon-wrapper {
                .superspecial-new {
                  transform-origin: 50% 60%;
                }
                &:hover,
                &:focus,
                &:active {
                  .superspecial-new {
                    transform: rotate(180deg);
                  }
                }
              }
            `}</style>
          </>
        )
      case 'geography':
        return (
          <>
            <GeographySVG className="serlo-subject-icon superspecial-geo" />
            <style jsx global>{`
              .superspecial-geo .world {
                transform: translateX(-43%);
                transition: transform 0.4s ease-in-out;
              }
              .serlo-subject-icon-wrapper {
                &:hover,
                &:focus,
                &:active {
                  .superspecial-geo .world {
                    transform: translateX(0%);
                  }
                }
              }
            `}</style>
          </>
        )
      case 'chemistry':
      case 'chemie':
        return (
          <>
            <ChemistrySVG className="serlo-subject-icon superspecial-chem" />
            <style jsx global>
              {`
                .superspecial-chem {
                  .pipette path,
                  .flask path {
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-width: 1.1px;
                  }
                  .chem-contents {
                    transition: 0.7s ease-in all !important;
                  }
                  .drop,
                  .pipette path {
                    fill: #becd2b;
                    transition: all 0.2s ease-in-out;
                  }
                  .pipette {
                    transform: translateY(-5px);
                    transition: 0.2s ease-in all;
                    transform-origin: 50% 50%;
                  }
                  .drop {
                    opacity: 0;
                    transition: 0.2s ease-in transform;
                    transform: scale(1.3) translateY(5px);
                    transform-origin: 50% 50%;
                  }
                }
                .serlo-subject-icon-wrapper {
                  &:hover,
                  &:focus,
                  &:active {
                    .superspecial-chem {
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
              `}
            </style>
          </>
        )
      default:
        return <BlankSVG className="serlo-subject-icon superspecial-blank" />
    }
  }
}

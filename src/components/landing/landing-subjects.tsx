import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import styled, { css, keyframes } from 'styled-components'

import { makeResponsivePadding, makeTransparentButton } from '../../helper/css'
import { Link } from '../content/link'
import AbcSVG from '@/assets-webkit/img/subjects-abc.svg'
import BiologySVG from '@/assets-webkit/img/subjects-biology.svg'
import BlankSVG from '@/assets-webkit/img/subjects-blank.svg'
import ChemistrySVG from '@/assets-webkit/img/subjects-chemistry.svg'
import MathSVG from '@/assets-webkit/img/subjects-math.svg'
import SustainabilitySVG from '@/assets-webkit/img/subjects-sustainability.svg'
import { LandingSubjectLink, LandingSubjectsData } from '@/data-types'

interface LandingSubjectsProps {
  data: LandingSubjectsData
}

export function LandingSubjects({ data }: LandingSubjectsProps) {
  return (
    <>
      <SubjectsWrapper>
        {data.subjects.map((subject) => renderSubject(subject))}
      </SubjectsWrapper>

      {renderAdditionalLinks()}
    </>
  )

  function renderAdditionalLinks() {
    if (data.additionalLinks.length === 0) return null
    return (
      <SubjectsWrapper extraLinks>
        {data.additionalLinks.map((link) => renderSubject(link, true))}
      </SubjectsWrapper>
    )
  }

  function renderIcon(icon?: string) {
    if (icon === undefined) return <BlankSVG />
    if (icon == 'math') return <MathSVG className="math" />
    if (icon == 'abc') return <AbcSVG className="abc" />
    if (icon == 'sustainability') return <SustainabilitySVG className="sus" />
    if (icon == 'biology') return <BiologySVG className="bio" />
    if (icon == 'chemistry') return <ChemistrySVG className="chem" />
    return <BlankSVG />
  }

  function renderSubject(
    { title, url, icon }: LandingSubjectLink,
    alwaysShowArrow?: boolean
  ) {
    return (
      <SubjectLink key={title} href={url}>
        <>
          {' '}
          {renderIcon(icon)}
          <Header>
            {title}
            <StyledIcon alwaysShow={alwaysShowArrow}>
              <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
            </StyledIcon>
          </Header>
        </>
      </SubjectLink>
    )
  }
}

const SubjectsWrapper = styled.div<{ extraLinks?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    ${makeResponsivePadding}
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    justify-content: space-between;
    margin-top: 40px;

    /* bit hacky, but way easier */
    ${(props) =>
      props.extraLinks &&
      css`
        margin-left: 16px;
        justify-content: start;
        && > a > svg {
          display: none;
        }
        & > a > h2 {
          margin-right: 40px;
          font-size: 1.3rem;
        }
        & > a {
          margin: 0;
        }
      `}
  }
`

const jump = keyframes`
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
`

const hickup = keyframes`
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
`

const SubjectLink = styled(Link)`
  display: block;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightblue};
  padding-left: 0.5rem;
  &:hover {
    background-color: ${(props) => lighten(0.5, props.theme.colors.brand)};
    cursor: pointer;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    border-bottom: 0;
    min-width: 430px;
    padding-left: 0;
    &:hover {
      background: transparent;
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    min-width: 25%;
    text-align: center;

    margin: 0 auto;
  }
  @media (max-width: 400px) {
    & svg.blank {
      display: none;
    }
  }

  & svg.bio,
  & svg.math,
  & svg.abc,
  & svg.sus,
  & svg.chem,
  & svg.blank {
    .blue {
      fill: ${(props) => props.theme.colors.lighterblue};
      transition: all 0.2s ease-in-out;
    }
    .green,
    .drop,
    .pipette path {
      fill: #becd2b;
      transition: all 0.2s ease-in-out;
    }
    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
      .blue {
        fill: ${(props) => lighten(0.07, props.theme.colors.lighterblue)};
      }
    }

    /* animations */
    width: 6rem;
    height: 6rem;
    margin-top: 1rem;
    margin-right: 1rem;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    animation-play-state: paused;

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
      display: block;
      margin: 0 auto;
      width: auto;
      height: auto;
      max-width: 120px;
    }

    @media (min-width: 1470px) {
      max-width: 100%;
    }
  }

  .pipette path,
  .flask path {
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-width: 1.1px;
  }

  .contents {
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
  & .math {
    transition-duration: 0.6s;
  }
  & .sus path.water {
    transform: scale(0) translateY(-30px);
    transform-origin: 9% 60%;
    transition: transform 0.6s cubic-bezier(0.175, 0.6, 0.32, 1.275);
  }

  &:hover,
  &:focus,
  &:active {
    & .bio {
      animation: ${jump} 0.7s ease-in-out;
    }
    & .abc {
      transform: scale(1.25) rotate(10deg);
    }
    & .math {
      transform: rotateY(-180deg) rotateX(-3deg);
    }
    & .sus {
      transform: rotate(-30deg);
    }
    & .sus .blue.water {
      transform: scale(1.08);
    }
    && .blue {
      fill: ${(props) => props.theme.colors.brand};
    } /* TODO: Helperblue */
    && .green {
      fill: #becd2b;
    }

    & .chem {
      .flask {
        animation: ${hickup} 0.7s ease-in-out;
      }
      .contents {
        fill: #becd2b !important;
        animation: ${hickup} 0.7s ease-in-out;
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
`

const Header = styled.h2`
  ${makeTransparentButton}
  line-height: 5.8rem;
  vertical-align: top;
  margin-top: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    &:hover {
      color: ${(props) => props.theme.colors.brand};
      background-color: transparent;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
    line-height: inherit;
    width: auto;
    margin-top: 2.5rem;
    transition: color 0.4s ease, background-color 0.4s ease;
    ${SubjectLink}:hover & {
      background-color: ${(props) => lighten(0, props.theme.colors.brand)};
      color: #fff;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-top: 10px;
  }
`

const StyledIcon = styled.span<{ alwaysShow?: boolean }>`
  margin-left: 0.4rem;
  vertical-align: middle;

  ${(props) =>
    !props.alwaysShow &&
    css`
      @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
        display: none;
      }
    `}
`

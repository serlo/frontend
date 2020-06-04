import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import styled, { css, keyframes } from 'styled-components'

import AbcSVG from '../../../public/_assets/img/subjects-abc.svg'
import BiologySVG from '../../../public/_assets/img/subjects-biology.svg'
import BlankSVG from '../../../public/_assets/img/subjects-blank.svg'
import MathSVG from '../../../public/_assets/img/subjects-math.svg'
import SustainabilitySVG from '../../../public/_assets/img/subjects-sustainability.svg'
import { makeResponsivePadding, makeDefaultButton } from '../../helper/css'

export function LandingSubjects() {
  return (
    <>
      <SubjectsWrapper>
        <Subject
          url="/mathe"
          title="Mathematik lernen"
          SubjectSVG={<MathSVG className="math" />}
        />
        <Subject
          url="/abc"
          title="Alphabetisierung"
          SubjectSVG={<AbcSVG className="abc" />}
        />
        <Subject
          url="/nachhaltigkeit"
          title="Nachhaltigkeit lernen"
          SubjectSVG={<SustainabilitySVG className="sus" />}
        />
        <Subject
          url="/biologie"
          title="Biologie lernen"
          SubjectSVG={<BiologySVG className="bio" />}
        />
      </SubjectsWrapper>

      <SubjectsWrapper extraLinks>
        <Subject
          url="/eltern"
          title="Einstieg für Eltern"
          SubjectSVG={<BlankSVG />}
          alwaysShowArrow
        />
        <Subject
          url="/lehrkraefte"
          title="Einstieg für LehrerInnen"
          SubjectSVG={<BlankSVG />}
          alwaysShowArrow
        />
      </SubjectsWrapper>
    </>
  )
}

interface SubjectProps {
  url: string
  title: string
  SubjectSVG: React.ReactNode
  alwaysShowArrow?: boolean
}

function Subject({ url, title, SubjectSVG, alwaysShowArrow }: SubjectProps) {
  return (
    <SubjectLink href={url}>
      {' '}
      {SubjectSVG}
      <Header>
        {title}
        <StyledIcon alwaysShow={alwaysShowArrow}>
          <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
        </StyledIcon>
      </Header>
    </SubjectLink>
  )
}

const SubjectsWrapper = styled.div<{ extraLinks?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${makeResponsivePadding}
    margin-left: 35px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: space-between;
    margin-top: 40px;

    /* bit hacky, but way easier */
    ${props =>
      props.extraLinks &&
      css`
        justify-content: start;
        && > a > svg {
          display: none;
        }
        & > a > h2 {
          margin-right: 40px;
          font-size: 1.3rem;
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

const SubjectLink = styled.a`
  display: block;
  border-bottom: 1px solid ${props => props.theme.colors.lightblue};
  padding-left: 0.5rem;
  &:hover {
    background-color: ${props => lighten(0.5, props.theme.colors.brand)};
    cursor: pointer;
  }
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    border-bottom: 0;
    min-width: 430px;
    width: 43%;
    padding-left: 0;
    &:hover {
      background: transparent;
    }
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    text-align: center;
    min-width: auto;
    width: auto;
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
  & svg.blank {
    .blue {
      fill: ${props => props.theme.colors.lighterblue};
      transition: all 0.2s ease-in-out;
    }
    .green {
      fill: #becd2b;
      transition: all 0.2s ease-in-out;
    }
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      .blue {
        fill: ${props => lighten(0.07, props.theme.colors.lighterblue)};
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

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
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
      fill: ${props => props.theme.colors.brand};
    } /* TODO: Helperblue */
    && .green {
      fill: #becd2b;
    }
  }
`

const Header = styled.h2`
  ${makeDefaultButton}
  font-size: 1.2rem;
  line-height: 5.8rem;
  vertical-align: top;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    &:hover {
      color: ${props => props.theme.colors.brand};
      background-color: transparent;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
    line-height: inherit;
    width: auto;
    margin-top: 2.5rem;
    transition: color 0.4s ease, background-color 0.4s ease;
    ${SubjectLink}:hover & {
      background-color: ${props => lighten(0, props.theme.colors.brand)};
      color: #fff;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-top: 10px;
  }
`

const StyledIcon = styled.span<{ alwaysShow?: boolean }>`
  margin-left: 0.4rem;
  vertical-align: middle;

  ${props =>
    !props.alwaysShow &&
    css`
      @media (min-width: ${props => props.theme.breakpoints.sm}) {
        display: none;
      }
    `}
`

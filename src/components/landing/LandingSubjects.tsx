import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { makeSVGStyle } from './landingcsshelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import MathSVG from '../../../public/img/subjects-math.svg'
import AbcSVG from '../../../public/img/subjects-abc.svg'
import SustainabilitySVG from '../../../public/img/subjects-sustainability.svg'
import BiologySVG from '../../../public/img/subjects-biology.svg'

// export interface SubjectProps {
//   url: string
//   iconSrc: string
//   text: string
// }

export default function LandingSubjects() {
  return (
    <>
      {/* xs={12} sm={6} lg={3} */}
      <Subject
        url={'#'}
        title={'Mathematik lernen'}
        icon={<_MathSVG className={'math'} />}
      />
      <Subject
        url={'#'}
        title={'Alphabetisierung'}
        icon={<_AbcSVG className={'abc'} />}
      />
      <Subject
        url={'#'}
        title={'Nachhaltigkeit lernen'}
        icon={<_SustainabilitySVG className={'sus'} />}
      />
      <Subject
        url={'#'}
        title={'Biologie lernen'}
        icon={<_BiologySVG className={'bio'} />}
      />
    </>
  )
}

function Subject({ url, title, icon }) {
  return (
    <SubjectLink href={url}>
      {' '}
      {icon}
      <Header>
        {title}
        <StyledIcon icon={faArrowCircleRight} size="1x" />
      </Header>
    </SubjectLink>
  )
}

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
    border-radius: 3rem;
    &:hover {
      background: transparent;
    }
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    text-align: center;
  }
  > a {
    display: block;
  }
`

const _MathSVG = styled(MathSVG)`
  ${makeSVGStyle({ Parent: SubjectLink })}
`
const _BiologySVG = styled(BiologySVG)`
  ${makeSVGStyle({ Parent: SubjectLink })}
`
const _SustainabilitySVG = styled(SustainabilitySVG)`
  ${makeSVGStyle({ Parent: SubjectLink })}
`
const _AbcSVG = styled(AbcSVG)`
  ${makeSVGStyle({ Parent: SubjectLink })}
`

const Header = styled.h2`
  font-size: 1.2rem;
  line-height: 5.8rem;
  display: inline-block;
  padding: 0.1rem;
  vertical-align: top;
  margin-top: 1rem;
  color: ${props => props.theme.colors.brand};
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
    line-height: 1.45;
    display: inline-block;
    width: auto;
    border-radius: 0.4em;
    margin-top: 2.5rem;
    transition: color 0.4s ease, background-color 0.4s ease;
    ${SubjectLink}:hover & {
      background-color: ${props => lighten(0.5, props.theme.colors.brand)};
    }
  }
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0.3rem 0.6rem;
    margin-top: 0;
  }
`

const StyledIcon = styled(FontAwesomeIcon)`
  /*ICON*/
  margin-left: 0.4rem;
  vertical-align: middle;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

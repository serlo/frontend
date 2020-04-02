import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { makeSVGStyle } from './landingcsshelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import {
  makeResponsivePadding,
  makeDefaultButton
} from '../../helper/csshelper'

import MathSVG from '../../../public/img/subjects-math.svg'
import AbcSVG from '../../../public/img/subjects-abc.svg'
import SustainabilitySVG from '../../../public/img/subjects-sustainability.svg'
import BiologySVG from '../../../public/img/subjects-biology.svg'

export default function LandingSubjects() {
  return (
    <SubjectsWrapper>
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
    </SubjectsWrapper>
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

const SubjectsWrapper = styled.div`
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
    min-width: 420px;
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
  ${makeDefaultButton}
  font-size: 1.2rem;
  line-height: 5.8rem;
  vertical-align: top;
  margin-top: 1rem;

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

const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 0.4rem;
  vertical-align: middle;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

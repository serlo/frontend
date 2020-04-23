import styled, { css } from 'styled-components'
import StyledOl from '../tags/StyledOl'
import StyledLi from '../tags/StyledLi'
import StyledA from '../tags/StyledA'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { makeMargin } from '../../helper/csshelper'

export default function CourseNavigation({ courseTitle, pageTitle, pages }) {
  console.log(pageTitle)
  console.log(pages[0])
  return (
    <Wrapper>
      <CourseH1>
        <FontAwesomeIcon icon={faGraduationCap} /> {courseTitle}
      </CourseH1>
      <StyledOl>
        {pages.map(page => (
          <StyledLi key={page.alias}>
            <CourseA
              active={pageTitle === page.currentRevision.title}
              href={
                pageTitle === page.currentRevision.title ? null : page.alias
              }
            >
              {page.currentRevision.title}
            </CourseA>
          </StyledLi>
        ))}
      </StyledOl>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-top: 25px;
  background-color: ${props => props.theme.colors.lightBackground};
  padding: 5px 0;
`
const CourseH1 = styled.h1`
  font-size: 1.25rem;
  ${makeMargin}
  color: ${props => props.theme.colors.brand};
`

const CourseA = styled(StyledA)<{ active: boolean }>`
  font-size: 1.125rem;

  ${props =>
    props.active &&
    css`
      font-weight: 600;
      color: ${props => props.theme.colors.darkgray};
      &:hover {
        text-decoration: none;
      }
    `}
`

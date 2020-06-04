import { faGraduationCap, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeDefaultButton } from '../../helper/css'
import { StyledA } from '../tags/styled-a'
import { StyledLi } from '../tags/styled-li'
import { StyledOl } from '../tags/styled-ol'

interface CourseNavigationPagesProps {
  alias: string
  currentRevision: {
    title: string
  }
}

export interface CourseNavigationProps {
  courseTitle: string
  pageTitle: string
  pages: CourseNavigationPagesProps[]
  open: boolean
  opener: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function CourseNavigation({
  courseTitle,
  pageTitle,
  pages,
  open,
  opener
}: CourseNavigationProps) {
  return (
    <Wrapper id="course-overview">
      <CourseH1>
        <FontAwesomeIcon icon={faGraduationCap} /> {courseTitle}
      </CourseH1>
      {open ? (
        <StyledOl>
          {/* TODO: needs type declaration */}
          {pages.map(page => (
            <StyledLi key={page.alias}>
              <CourseA
                active={pageTitle === page.currentRevision.title}
                href={
                  pageTitle === page.currentRevision.title
                    ? undefined
                    : page.alias
                }
              >
                {page.currentRevision.title}
              </CourseA>
            </StyledLi>
          ))}
        </StyledOl>
      ) : (
        <Button onClick={opener}>
          <FontAwesomeIcon icon={faListUl} /> Kursübersicht anzeigen
        </Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-top: 25px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background-color: ${props => props.theme.colors.lightBackground};
  }
  padding: 5px 0 22px 0;

  > ol {
    margin-top: 28px;
    margin-bottom: 0;
  }
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

const Button = styled.a`
  font-size: 1.125rem;
  ${makeDefaultButton}
  padding: 3px 8px;
  ${makeMargin}
  background-color: ${props => props.theme.colors.brand};
  &:hover{
    background-color: ${props => props.theme.colors.lightblue};
  }
  color: #fff;
  font-weight: bold;
`

import { faGraduationCap, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin, makeTransparentButton } from '../../helper/css'
import { Link } from '../content/link'
import { StyledLi } from '../tags/styled-li'
import { StyledOl } from '../tags/styled-ol'
import { useInstanceData } from '@/contexts/instance-context'
import { CourseData } from '@/data-types'

export interface CourseNavigationProps {
  open: boolean
  onOverviewButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  data: CourseData
}

export function CourseNavigation({
  data,
  open,
  onOverviewButtonClick,
}: CourseNavigationProps) {
  const { strings } = useInstanceData()

  return (
    <Wrapper id="course-overview">
      <CourseH1>
        <FontAwesomeIcon icon={faGraduationCap} /> {data.title}
      </CourseH1>
      {open ? (
        <StyledOl>
          {data.pages.map((page) => (
            <StyledLi key={page.url}>
              <CourseLink
                active={!!page.active}
                href={page.active ? undefined : page.url}
              >
                {page.title}
              </CourseLink>
            </StyledLi>
          ))}
        </StyledOl>
      ) : (
        <Button onClick={onOverviewButtonClick}>
          <FontAwesomeIcon icon={faListUl} /> {strings.course.showPages}
        </Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-top: 25px;

  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    background-color: ${(props) => props.theme.colors.lightBackground};
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
  color: ${(props) => props.theme.colors.brand};
`

const CourseLink = styled(Link)<{ active: boolean }>`
  font-size: 1.125rem;

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      color: ${(props) => props.theme.colors.darkgray};
      &:hover {
        text-decoration: none;
      }
    `}
`

export const Button = styled.button`
  ${makeTransparentButton}
  padding: 3px 8px;
  ${makeMargin}
  background-color: ${(props) => props.theme.colors.brand};
  &:hover {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
  color: #fff;
  font-weight: bold;
`

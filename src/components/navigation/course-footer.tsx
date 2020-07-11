import { faArrowCircleRight, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { makeMargin, makeDefaultButton } from '../../helper/css'
import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface CourseFooterProps extends CourseFooterData {
  onOverviewButtonClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  nextHref: string
}

export interface CourseFooterData {
  nextHref: string
}

export function CourseFooter({
  onOverviewButtonClick,
  nextHref,
}: CourseFooterProps) {
  const onOverviewClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }

  const { strings } = useInstanceData()

  return (
    <Wrapper>
      <OverviewButton onClick={onOverviewClick} as="a">
        <FontAwesomeIcon icon={faListUl} /> {strings.course.pages}
      </OverviewButton>
      {nextHref && (
        <ButtonLink href={nextHref}>
          <FontAwesomeIcon icon={faArrowCircleRight} /> {strings.course.next}
        </ButtonLink>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin: 40px 0 30px 0;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    background-color: ${(props) => props.theme.colors.lightBackground};
  }
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`

const ButtonLink = styled(Link)`
  font-size: 1.125rem;
  ${makeDefaultButton}
  text-decoration: none !important;
  padding: 3px 8px;
  ${makeMargin}
  background-color: ${(props) => props.theme.colors.brand};
  &:hover{
    background-color: ${(props) => props.theme.colors.lightblue};
  }
  color: #fff;
  font-weight: bold;
`

const OverviewButton = styled(ButtonLink)`
  background-color: ${(props) => props.theme.colors.lightblue};
  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
  }
  color: #fff;
`

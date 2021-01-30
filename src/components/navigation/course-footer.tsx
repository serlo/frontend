import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'

import { makeMargin, makePrimaryButton } from '../../helper/css'
import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface CourseFooterProps extends CourseFooterData {
  onOverviewButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  nextHref: string
}

export interface CourseFooterData {
  nextHref: string
}

export function CourseFooter({
  nextHref,
  onOverviewButtonClick,
}: CourseFooterProps) {
  const onOverviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    location.href = '#course-overview'
    onOverviewButtonClick(e)
  }

  const { strings } = useInstanceData()

  return (
    <Wrapper>
      {nextHref ? (
        <ButtonLink href={nextHref}>
          <FontAwesomeIcon icon={faArrowCircleRight} /> {strings.course.next}
        </ButtonLink>
      ) : (
        <ButtonLink as="button" onClick={onOverviewClick}>
          <FontAwesomeIcon icon={faArrowCircleUp} /> {strings.course.showPages}
        </ButtonLink>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin: 40px 0 30px 0;
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    background-color: ${(props) => props.theme.colors.lightBackground};
  }
  padding: 20px 0;
`

const ButtonLink = styled(Link)`
  ${makePrimaryButton}
  ${makeMargin}
`

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faListUl } from '@fortawesome/free-solid-svg-icons'
import { makeMargin, makeDefaultButton } from '../../helper/csshelper'

export default function CourseFooter({ opener, nextHref }) {
  const onOverviewClick = e => {
    location.href = '#course-overview'
    opener(e)
  }

  return (
    <Wrapper>
      <OverviewButton onClick={onOverviewClick}>
        <FontAwesomeIcon icon={faListUl} /> Kursübersicht
      </OverviewButton>
      {nextHref && (
        <Button href={nextHref}>
          <FontAwesomeIcon icon={faArrowCircleRight} /> Weiter
        </Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin: 40px 0 30px 0;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background-color: ${props => props.theme.colors.lightBackground};
  }
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
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

const OverviewButton = styled(Button)`
  background-color: ${props => props.theme.colors.lightblue};
  &:hover {
    background-color: ${props => props.theme.colors.brand};
  }
  color: #fff;
`

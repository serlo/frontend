import styled from 'styled-components'
import StyledA from '../tags/StyledA'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa
} from '@fortawesome/free-brands-svg-icons'
import { makePadding } from '../../helper/csshelper'

export default function LicenseNotice({ data }) {
  //only link license
  let titleParts = data.title.split('CC')
  const text = titleParts.length === 2 ? titleParts[0] : ''
  const licenseName =
    titleParts.length === 2 ? 'CC' + titleParts[1] : data.title

  return (
    <Wrapper>
      <FontAwesomeIcon icon={faCreativeCommons} size="2x" />{' '}
      <FontAwesomeIcon icon={faCreativeCommonsBy} size="2x" />{' '}
      <FontAwesomeIcon icon={faCreativeCommonsSa} size="2x" />
      <br />
      <StyledSmall>
        {' '}
        {text}
        <br />
        <StyledA href={data.url}>{licenseName}</StyledA>
        {' → '}
        <StyledA href={`https://de.serlo.org/license/detail/${data.id}`}>
          <b>Was bedeutet das?</b>
        </StyledA>
      </StyledSmall>
    </Wrapper>
  )
}

const StyledSmall = styled.span`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 12px;
  }
`

const Wrapper = styled.div`
  ${makePadding}
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.9rem;
  margin-top: 40px;
  border-top: 2px solid ${props => props.theme.colors.lightBlueBackground};
  color: ${props => props.theme.colors.dark1};
  > svg {
    color: ${props => props.theme.colors.lighterblue};
    width: 1.4rem !important;
    margin-bottom: 1px;
  }

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;

    > svg {
      width: 2rem !important;
      height: 2rem !important;
      margin-top: 1px;
      margin-right: 2px;
    }
  }
`

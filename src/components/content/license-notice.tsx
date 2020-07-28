import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { makePadding, makeDefaultButton } from '../../helper/css'
import { serloDomain } from '../../helper/serlo-domain'
import { StyledA } from '../tags/styled-a'
import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'

interface LicenseNoticeProps {
  data: LicenseData
  minimal?: boolean
}

export function LicenseNotice({ data, minimal }: LicenseNoticeProps) {
  const { strings } = useInstanceData()
  // only link license
  const titleParts = data.title.split('CC')
  const text = titleParts.length === 2 ? titleParts[0] : ''
  const licenseName =
    titleParts.length === 2 ? `CC${titleParts[1]}` : data.title

  if (minimal)
    return (
      <>
        <MinimalLink href={data.url} title={data.title} noExternalIcon>
          <FontAwesomeIcon icon={faCreativeCommons} />
        </MinimalLink>
      </>
    )

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
        <StyledA href={data.url} rel="license">
          {licenseName}
        </StyledA>
        {' → '}
        <Link
          href={`https://de.${serloDomain}/license/detail/${data.id}`}
          noExternalIcon
        >
          <b>{strings.license.readMore}</b>
        </Link>
      </StyledSmall>
    </Wrapper>
  )
}

const MinimalLink = styled(Link)`
  ${makeDefaultButton}
  text-align: center;
  color: ${(props) => props.theme.colors.dark1};
  background-color: ${(props) => props.theme.colors.lightBackground};
  font-size: 1.3rem;
  line-height: 2rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
`

const StyledSmall = styled.span`
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: 12px;
  }
`

const Wrapper = styled.div`
  ${makePadding}
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.9rem;
  margin-top: 40px;
  margin-bottom: 40px;
  border-top: 2px solid ${(props) => props.theme.colors.lightBlueBackground};
  color: ${(props) => props.theme.colors.dark1};
  > svg {
    color: ${(props) => props.theme.colors.lighterblue};
    width: 1.4rem !important;
    margin-bottom: 1px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;

    > svg {
      width: 2rem !important;
      height: 2rem !important;
      margin-top: 1px;
      margin-right: 2px;
    }
  }
`

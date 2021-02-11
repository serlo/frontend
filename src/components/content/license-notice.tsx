import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa,
} from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { makePadding, makeTransparentButton } from '../../helper/css'
import { StyledA } from '../tags/styled-a'
import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'

interface LicenseNoticeProps {
  data: LicenseData
  minimal?: boolean
  type?: 'video' | 'task' | 'exercise-group' | 'solution'
}

export function LicenseNotice({ data, minimal, type }: LicenseNoticeProps) {
  const { strings } = useInstanceData()
  // only link license
  const titleParts = data.title.split('CC')
  const text = titleParts.length === 2 ? titleParts[0] : ''
  const licenseName =
    titleParts.length === 2 ? `CC${titleParts[1]}` : data.title

  const isCreativeCommons = licenseName.indexOf('CC') > -1

  if (data.default && minimal) return null
  if (minimal) return renderMinimalNotice()
  return renderFullNotice()

  function renderFullNotice() {
    return (
      <Wrapper>
        {data.default ? (
          <>
            <FontAwesomeIcon icon={faCreativeCommons} size="2x" />{' '}
            <FontAwesomeIcon icon={faCreativeCommonsBy} size="2x" />{' '}
            <FontAwesomeIcon icon={faCreativeCommonsSa} size="2x" />
          </>
        ) : isCreativeCommons ? (
          <FontAwesomeIcon icon={faCreativeCommons} />
        ) : (
          <span className="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCreativeCommons} />
            <FontAwesomeIcon
              icon={faSlash}
              flip="horizontal"
              transform="shrink-6"
            />
          </span>
        )}
        <br />
        <StyledSmall>
          {' '}
          {text}
          <br />
          <StyledA href={data.url} rel="license">
            {licenseName}
          </StyledA>
          {' → '}
          <Link href={`/license/detail/${data.id}`}>
            <b>{strings.license.readMore}</b>
          </Link>
        </StyledSmall>
      </Wrapper>
    )
  }

  function renderMinimalNotice() {
    const typeString = translateTypeString()
    const licenseHref = `/license/detail/${data.id}`

    const text = `${typeString}: ${
      data.shortTitle ? data.shortTitle : strings.license.special
    }`
    const title = isCreativeCommons
      ? data.title
      : `${data.title} –– ${strings.license.nonFree}`

    return (
      <>
        <MinimalLink title={title} href={licenseHref} noExternalIcon>
          {data.default ? (
            <FontAwesomeIcon icon={faCreativeCommons} />
          ) : (
            <>
              <StyledIcon className="fa-layers fa-fw">
                <FontAwesomeIcon icon={faCreativeCommons} />
                {!isCreativeCommons && (
                  <FontAwesomeIcon
                    icon={faSlash}
                    flip="horizontal"
                    transform="shrink-6"
                  />
                )}
              </StyledIcon>
              {text}
            </>
          )}
        </MinimalLink>
      </>
    )
  }

  function translateTypeString(): string {
    if (type == 'task') return strings.content.task
    if (type == 'exercise-group') return strings.content.task
    return strings.entities[type || 'content']
  }
}

const MinimalLink = styled(Link)`
  ${makeTransparentButton}
  font-weight: normal;
  font-size: 1rem;
  height: max-content;
`

const StyledIcon = styled.span`
  font-size: 1.25rem;
  vertical-align: sub;
  margin-right: 3px;
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

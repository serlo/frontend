import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa,
} from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import styled from 'styled-components'

import { Link } from './link'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'
import { NodePath } from '@/schema/article-renderer'

interface LicenseNoticeProps {
  data: LicenseData
  minimal?: boolean
  type?: 'video' | 'task' | 'exercise-group' | 'solution'
  path?: NodePath
}

export function LicenseNotice({
  data,
  minimal,
  type,
  path,
}: LicenseNoticeProps) {
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

  // font-size: 0.9rem;
  // color: ${ (props) => props.theme.colors.dark1 };

  function renderFullNotice() {
    return (
      <Wrapper
        className={clsx(
          'border-t-2 border-brand-150 text-truegray-700 text-sm',
          'px-side py-2.5 my-10 mobile:flex'
        )}
      >
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
        <span className="mobile:ml-3">
          {' '}
          {text}
          <br />
          <a className="serlo-link" href={data.url} rel="license">
            {licenseName}
          </a>
          {' → '}
          <Link href={`/license/detail/${data.id}`} path={path}>
            <b>{strings.license.readMore}</b>
          </Link>
        </span>
      </Wrapper>
    )
  }

  function renderMinimalNotice() {
    const typeString = translateTypeString()
    const licenseHref = `/license/detail/${data.id}`

    const text = `${
      data.shortTitle ? data.shortTitle : strings.license.special
    } (${typeString})`
    const title = isCreativeCommons
      ? data.title
      : `${data.title} –– ${strings.license.nonFree}`

    return (
      <>
        <MinimalLink
          className="serlo-button serlo-make-interactive-transparent-blue font-normal text-base !no-underline"
          title={title}
          href={licenseHref}
          noExternalIcon
          path={path}
        >
          {data.default ? (
            <FontAwesomeIcon icon={faCreativeCommons} />
          ) : (
            <>
              <StyledIcon className="fa-layers fa-fw text-xl mr-0.5">
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

const StyledIcon = styled.span`
  vertical-align: sub;
`

const Wrapper = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.lighterblue};
    width: 1.4rem !important;
    margin-bottom: 1px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    > svg {
      width: 2rem !important;
      height: 2rem !important;
      margin-top: 1px;
      margin-right: 2px;
    }
  }
`

const MinimalLink = styled(Link)`
  height: max-content;
`

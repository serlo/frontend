import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons/faCreativeCommons'
import { faCreativeCommonsBy } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsBy'
import { faCreativeCommonsSa } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsSa'
import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
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
      <div
        className={clsx(
          'border-t-2 border-brand-150 text-truegray-700 text-sm',
          'px-side py-2.5 my-10 mobile:flex'
        )}
      >
        {data.default ? (
          <>
            {renderIcon({ icon: faCreativeCommons, className: 'h-8' })}{' '}
            {renderIcon({ icon: faCreativeCommonsBy, className: 'h-8' })}{' '}
            {renderIcon({ icon: faCreativeCommonsSa, className: 'h-8' })}
          </>
        ) : isCreativeCommons ? (
          renderIcon({ icon: faCreativeCommons })
        ) : (
          <span className="relative inline-block w-10 h-8">
            {renderIcon({ icon: faCreativeCommons, className: 'absolute' })}
            {renderIcon({
              icon: faSlash,
              className: '-scale-x-[0.6] absolute -left-[4px] scale-y-[0.6]',
            })}
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
      </div>
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
        <Link
          className="serlo-button serlo-make-interactive-transparent-blue font-normal text-base hover:no-underline h-[max-content]"
          title={title}
          href={licenseHref}
          noExternalIcon
          path={path}
        >
          {data.default ? (
            <FaIcon icon={faCreativeCommons} />
          ) : (
            <>
              <span
                className="relative inline-block text-xl mr-0.5 w-6 h-5"
                style={{ verticalAlign: 'sub' }}
              >
                <FaIcon icon={faCreativeCommons} className="absolute" />
                {!isCreativeCommons && (
                  <FaIcon
                    icon={faSlash}
                    className="-scale-x-[0.6] absolute -left-[3px] scale-y-[0.6]"
                  />
                )}
              </span>
              {text}
            </>
          )}
        </Link>
      </>
    )
  }

  function translateTypeString(): string {
    if (type === 'task' || type == 'exercise-group') return strings.content.task
    return strings.entities[type || 'content']
  }
}

function renderIcon(props: { className?: string; icon: IconDefinition }) {
  return (
    <FaIcon
      className={clsx(
        'text-brand-lighter mb-0.25 mobile:text-[2rem] mobile:mt-0.25 mobile:mr-1',
        props.className
      )}
      icon={props.icon}
    />
  )
}

import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons/faCreativeCommons'
import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash'
import clsx from 'clsx'

import { FaIcon } from '../../fa-icon'
import { Link } from '../link'
import { LicenseIcons } from './license-icons'
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
  const { title, isDefault, url, id, shortTitle } = data
  // only link license
  const titleParts = title.split('CC')
  const text = titleParts.length === 2 ? titleParts[0] : ''
  const licenseName = titleParts.length === 2 ? `CC${titleParts[1]}` : title

  const isCreativeCommons = licenseName.indexOf('CC') > -1

  if (isDefault && minimal) return null
  if (minimal) return renderMinimalNotice()
  return renderFullNotice()

  function renderFullNotice() {
    return (
      <div
        className={clsx(
          'border-t-2 border-brand-150 text-truegray-700 text-sm',
          'px-side py-2.5 my-10 mobile:flex'
        )}
      >
        <LicenseIcons title={title} isDefault={isDefault} />
        <br />
        <span className="mobile:ml-3">
          {' '}
          {text}
          <br />
          <a className="serlo-link" href={url} rel="license">
            {licenseName}
          </a>
          {' → '}
          <Link href={`/license/detail/${id}`} path={path}>
            <b>{strings.license.readMore}</b>
          </Link>
        </span>
      </div>
    )
  }

  function renderMinimalNotice() {
    const typeString = translateTypeString()
    const licenseHref = `/license/detail/${id}`

    const text = `${
      shortTitle ? shortTitle : strings.license.special
    } (${typeString})`
    const minTitle = isCreativeCommons
      ? title
      : `${title} –– ${strings.license.nonFree}`

    return (
      <>
        <Link
          className="serlo-button serlo-make-interactive-transparent-blue font-normal text-base hover:no-underline h-[max-content]"
          title={minTitle}
          href={licenseHref}
          noExternalIcon
          path={path}
        >
          {isDefault ? (
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

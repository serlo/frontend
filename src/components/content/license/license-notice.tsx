import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Link } from '../link'
import { LicenseIcons } from './license-icons'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData } from '@/data-types'

interface LicenseNoticeProps {
  data: LicenseData
  minimal?: boolean
  type?: 'video' | 'task' | 'exercise-group' | 'solution'
}

export function LicenseNotice({ data, minimal, type }: LicenseNoticeProps) {
  const { lang, strings } = useInstanceData()
  const router = useRouter()
  const urlSlugArray = Array.isArray(router.query.slug)
    ? router.query.slug
    : [router.query.slug]
  const canonicalHref = `https://${lang}.serlo.org/` + urlSlugArray.join('/')

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
          'border-t-2 border-brand-200 text-almost-black text-sm',
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
          {renderHiddenMeta()}
          {' → '}
          <Link href={`/license/detail/${id}`}>
            <b>{strings.license.readMore}</b>
          </Link>
        </span>
      </div>
    )
  }

  function renderHiddenMeta() {
    return (
      <div className="hidden">
        <a
          {...{ 'xmlns:cc': 'http://creativecommons.org/ns#' }}
          href={canonicalHref}
          // eslint-disable-next-line react/no-unknown-property
          property="cc:attributionName"
          rel="cc:attributionURL"
        >
          serlo.org
        </a>
        <a rel="license" href={url.split('deed.')[0]}>
          {licenseName}
        </a>
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
          className="serlo-button-blue-transparent font-normal text-base hover:no-underline h-[max-content]"
          title={minTitle}
          href={licenseHref}
          noExternalIcon
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
        {renderHiddenMeta()}
      </>
    )
  }

  function translateTypeString(): string {
    if (type === 'task' || type === 'exercise-group')
      return strings.content.exercises.task
    return strings.entities[type || 'content']
  }
}

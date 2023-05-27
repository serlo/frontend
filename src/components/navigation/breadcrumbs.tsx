import {
  faArrowCircleLeft,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { BreadcrumbsData, BreadcrumbEntry } from '@/data-types'

export interface BreadcrumbsProps {
  data?: BreadcrumbsData
  isTaxonomy?: boolean
  asBackButton?: boolean
  noIcon?: boolean
}

export function Breadcrumbs({
  data,
  isTaxonomy,
  asBackButton,
  noIcon,
}: BreadcrumbsProps) {
  return (
    <nav className={clsx('mx-side mt-5 sm:mb-11 sm:ml-2.5')}>
      {data &&
        data.map((bcEntry, i) => {
          return (
            <Fragment key={i}>{renderBreadcrumbEntry(bcEntry, i)}</Fragment>
          )
        })}
    </nav>
  )

  function renderBreadcrumbEntry(bcEntry: BreadcrumbEntry, index: number) {
    const withRightArrow = /* className={ */ clsx(
      'serlo-button font-normal mb-1 py-0.5',
      'after:special-content-gt after:absolute after:ml-3 mr-5 after:text-gray-300'
    ) /*}*/

    if (bcEntry.ellipsis) {
      return (
        <span
          className={clsx(
            'hidden sm:inline-block cursor-default',
            withRightArrow
          )}
        >
          …
        </span>
      )
    } else {
      if (data?.length !== index + 1) {
        return (
          <Link
            className={clsx(
              'hidden sm:inline-block',
              withRightArrow,
              bcEntry.url && 'hover:bg-brand hover:text-white'
            )}
            href={bcEntry.url ?? undefined}
          >
            {bcEntry.label}
          </Link>
        )
      } else
        return (
          <>
            <Link
              className={clsx(
                'serlo-button py-0.5 bg-brand-200 hover:bg-brand-400',
                'hover:text-white sm:bg-brand-100 sm:hover:bg-brand'
              )}
              href={bcEntry.url ?? undefined}
            >
              <span className="sm:hidden pt-0.25 pr-1">{renderIcon()}</span>
              {!isTaxonomy && (
                <span className="hidden sm:inline text-base pt-0.25 pr-1">
                  {renderIcon()}
                </span>
              )}
              {bcEntry.label}
            </Link>
          </>
        )
    }
  }

  function renderIcon() {
    if (noIcon) return null
    return <FaIcon icon={asBackButton ? faArrowCircleLeft : faFolderOpen} />
  }
}

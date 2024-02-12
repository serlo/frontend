import {
  faArrowCircleLeft,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { BreadcrumbsData, BreadcrumbEntry } from '@/data-types'
import { cn } from '@/helper/cn'

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
    <nav
      className="mx-side mt-5 sm:mb-11 sm:ml-2.5 md:mb-16"
      data-qa="breadcrumbs"
    >
      {data &&
        data.map((bcEntry, i) => {
          return (
            <Fragment key={i}>{renderBreadcrumbEntry(bcEntry, i)}</Fragment>
          )
        })}
    </nav>
  )

  function renderBreadcrumbEntry(bcEntry: BreadcrumbEntry, index: number) {
    const withRightArrow = cn(`
      serlo-button mb-1 mr-5 py-0.5 font-normal
      after:absolute after:ml-3 after:text-gray-300 after:content-['>']
    `)

    if (bcEntry.ellipsis) {
      return (
        <span
          className={cn(
            'hidden cursor-default sm:inline-block',
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
            className={cn(
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
              className={cn(`
                serlo-button bg-brand-200 py-0.5 hover:bg-brand-400
                hover:text-white sm:bg-brand-100 sm:hover:bg-brand
              `)}
              href={bcEntry.url ?? undefined}
            >
              <span className="pr-1 pt-0.25 sm:hidden">{renderIcon()}</span>
              {!isTaxonomy && (
                <span className="hidden pr-1 pt-0.25 text-base sm:inline">
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

import {
  faArrowCircleLeft,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { BreadcrumbsData, BreadcrumbEntry } from '@/data-types'
import { tw } from '@/helper/tw'

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
    <nav className="mx-side mt-5 sm:mb-11 sm:ml-2.5">
      {data &&
        data.map((bcEntry, index) => (
          <Fragment key={index}>
            <BreadcrumbEntry
              bcEntry={bcEntry}
              index={index}
              data={data}
              isTaxonomy={isTaxonomy}
              asBackButton={asBackButton}
              noIcon={noIcon}
            />{' '}
          </Fragment>
        ))}
    </nav>
  )
}

type BreadcrumbEntryProps = Pick<
  BreadcrumbsProps,
  'data' | 'isTaxonomy' | 'asBackButton' | 'noIcon'
> & {
  bcEntry: BreadcrumbEntry
  index: number
}

function BreadcrumbEntry({
  bcEntry,
  index,
  data,
  isTaxonomy,
}: BreadcrumbEntryProps) {
  const withRightArrow = tw`
    serlo-button mb-1 mr-5 py-0.5 font-normal
    after:absolute after:ml-3 after:text-gray-300 after:content-[>]
  `

  if (bcEntry.ellipsis) {
    return (
      <span
        className={clsx(
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
            className={tw`
              serlo-button bg-brand-200 py-0.5 hover:bg-brand-400
              hover:text-white sm:bg-brand-100 sm:hover:bg-brand
            `}
            href={bcEntry.url ?? undefined}
          >
            <span className="pr-1 pt-0.25 sm:hidden">
              <Icon />
            </span>
            {!isTaxonomy && (
              <span className="hidden pr-1 pt-0.25 text-base sm:inline">
                <Icon />
              </span>
            )}
            {bcEntry.label}
          </Link>
        </>
      )
  }
}

function Icon({
  noIcon,
  asBackButton,
}: {
  noIcon?: boolean
  asBackButton?: boolean
}) {
  if (noIcon) return null
  return <FaIcon icon={asBackButton ? faArrowCircleLeft : faFolderOpen} />
}

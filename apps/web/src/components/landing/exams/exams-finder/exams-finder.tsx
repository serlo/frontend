import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

import {
  SupportedRegion,
  SchoolType,
  schoolTypesWithExamsByRegion,
  regionKeys,
  regions,
  examsByRegionAndType,
} from './exams-data'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

interface ExamsFinderProps {
  region: SupportedRegion
  setRegion: Dispatch<SetStateAction<SupportedRegion>>
  initSchoolType?: SchoolType
}

export function ExamsFinder({
  region,
  setRegion,
  initSchoolType,
}: ExamsFinderProps) {
  const [schoolType, setSchoolType] = useState<SchoolType | undefined>(
    initSchoolType
  )

  const router = useRouter()

  function handleRegionChange(newRegion: SupportedRegion) {
    setRegion(newRegion)
    void router.push(
      router.pathname.replace('[region]', newRegion),
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    )
    if (
      schoolType &&
      !Object.hasOwn(schoolTypesWithExamsByRegion[newRegion], schoolType)
    ) {
      setSchoolType(undefined)
    }
  }

  const exams = schoolType
    ? schoolTypesWithExamsByRegion[region][schoolType].exams
    : undefined

  return (
    <>
      {renderRegionSelect()}
      {schoolType ? renderSchoolTypeSelect() : renderSchoolTypeButtons()}
      {exams ? renderResults() : null}
    </>
  )

  function renderRegionSelect() {
    return (
      <p className="text-2xl leading-cozy text-almost-black">
        <b className="text-base">Bundesland:</b>{' '}
        {regionKeys.map((regionKey) => {
          return (
            <button
              key={regionKey}
              className={cn(
                'mr-2',
                regionKey === region
                  ? 'serlo-button-blue'
                  : 'serlo-button-blue-transparent'
              )}
              onClick={() => handleRegionChange(regionKey)}
            >
              {regions[regionKey].title}
            </button>
          )
        })}
      </p>
    )
  }

  function renderSchoolTypeButtons() {
    return (
      <div className="mt-6 text-2xl leading-cozy text-almost-black">
        Für welche Prüfung lernst du?
        <br />
        <div className="flex flex-wrap justify-center pt-4">
          {Object.entries(examsByRegionAndType[region]).map(
            ([_schoolTypeKey, boxData]) => renderFeaturedBox(boxData)
          )}
        </div>
      </div>
    )
  }

  function renderSchoolTypeSelect() {
    return (
      <p className="mt-2 text-2xl leading-cozy text-almost-black">
        <b className="inline-block text-base">Schulart:</b>

        {Object.entries(schoolTypesWithExamsByRegion[region]).map(
          ([schoolTypeKey, { title }]) => {
            return (
              <button
                key={schoolTypeKey}
                className={cn(
                  'ml-2',
                  schoolTypeKey === schoolType
                    ? 'serlo-button-blue'
                    : 'serlo-button-blue-transparent'
                )}
                onClick={() => setSchoolType(schoolTypeKey as SchoolType)}
              >
                {title}
              </button>
            )
          }
        )}
      </p>
    )
  }

  function renderResults() {
    if (!exams) return null

    return (
      <div className="-ml-2 mt-4 flex w-full flex-wrap items-stretch sm:max-w-3xl lg:max-w-max">
        {exams.map(renderFeaturedBox)}
      </div>
    )
  }

  function renderFeaturedBox({
    title,
    url,
    options,
  }: {
    title: string
    url?: string
    options?: { title: string; url: string }[]
  }) {
    return (
      <Link
        key={title}
        className={cn(
          `
            group relative mx-2 mb-4 box-border flex min-h-[9rem] w-36 content-center
            rounded-xl bg-white bg-opacity-50 p-2.5 text-left align-middle leading-cozy
            text-brand transition-all hover:text-almost-black
            hover:no-underline hover:shadow-menu mobile:w-52 lg:w-44 xl:w-48
          `,
          url ? '' : '!cursor-default'
        )}
        href={url}
        onClick={(e) => {
          if (!url) e.preventDefault()
        }}
      >
        <h4 className="relative mx-auto mb-1 mt-1 hyphens-auto break-normal text-center text-xl font-bold">
          {options ? (
            <span
              className={cn(
                'absolute z-10 h-full w-full flex-col content-stretch justify-stretch gap-2',
                'hidden group-focus-within:flex group-hover:flex'
              )}
            >
              {options.map((option) => {
                return (
                  <Link
                    href={option.url}
                    key={option.url}
                    className="block flex-1 rounded-md bg-brand-50 p-2 text-base !no-underline hover:bg-brand-200 focus-visible:bg-brand-200"
                  >
                    {option.title}
                  </Link>
                )
              })}
            </span>
          ) : null}

          <div
            className={cn(
              options && 'group-focus-within:opacity-0 group-hover:opacity-0'
            )}
          >
            <FaIcon
              icon={faGraduationCap}
              className="mb-2 mt-6 text-4xl text-brand opacity-80"
            />
            <br />
            {title}
          </div>
        </h4>
      </Link>
    )
  }
}

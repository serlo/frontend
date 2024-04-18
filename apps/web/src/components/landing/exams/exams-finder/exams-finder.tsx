import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import {
  type Exam,
  type SchoolType,
  type SupportedRegion,
  deRegions,
  regionKeys,
  mathExamTaxDataStatic,
  ExamsTaxonomyData,
} from '@/data/de/math-exams-data'
import { cn } from '@/helper/cn'

interface ExamsFinderProps {
  region: SupportedRegion
  setRegion: Dispatch<SetStateAction<SupportedRegion>>
  initSchoolType?: SchoolType
  examsTaxonomyData: ExamsTaxonomyData
}

export function ExamsFinder({
  region,
  setRegion,
  initSchoolType,
  examsTaxonomyData,
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
      !Object.hasOwn(mathExamTaxDataStatic[newRegion], schoolType)
    ) {
      setSchoolType(undefined)
    }
  }

  return (
    <>
      {renderRegionSelect()}
      {schoolType ? renderSchoolTypeSelect() : renderSchoolTypeButtons()}
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
              {deRegions[regionKey].title}
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
          {Object.entries(mathExamTaxDataStatic[region]).map(
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

        {Object.entries(mathExamTaxDataStatic[region]).map(
          ([schoolTypeKey, { displayTitle }]) => {
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
                {displayTitle}
              </button>
            )
          }
        )}
      </p>
    )
  }

  function renderFeaturedBox({ id, displayTitle, options }: Exam) {
    const alias = examsTaxonomyData[`id${id}`]?.alias

    return (
      <Link
        key={displayTitle}
        className={cn(
          `
            group relative mx-2 mb-4 box-border flex min-h-[9rem] w-36 content-center
            rounded-xl bg-white bg-opacity-50 p-2.5 text-left align-middle leading-cozy
            text-brand transition-all hover:text-almost-black
            hover:no-underline hover:shadow-menu mobile:w-52 lg:w-44 xl:w-48
          `,
          id ? '' : '!cursor-default'
        )}
        href={alias}
        onClick={(e) => {
          if (!id) e.preventDefault()
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
              {options.map(({ id, displayTitle }) => {
                const alias = examsTaxonomyData[`id${id}`]?.alias
                return (
                  <Link
                    href={alias}
                    key={id}
                    className="block flex-1 rounded-md bg-brand-50 p-2 text-base !no-underline hover:bg-brand-200 focus-visible:bg-brand-200"
                  >
                    {displayTitle}
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
            {displayTitle}
          </div>
        </h4>
      </Link>
    )
  }
}

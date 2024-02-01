import { FaIcon } from '@editor/package'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Link } from '@/components/content/link'
import { cn } from '@/helper/cn'

const maxOnMobile = 4

//   BW: 'Baden-Württemberg',
//   BY: 'Bayern',
//   BE: 'Berlin',
//   BB: 'Brandenburg',
//   HB: 'Bremen',
//   HH: 'Hamburg',
//   HE: 'Hessen',
//   MV: 'Mecklenburg-Vorpommern',
//   NI: 'Niedersachsen',
//   NW: 'Nordrhein-Westfalen',
//   RP: 'Rheinland-Pfalz',
//   SL: 'Saarland',
//   SN: 'Sachsen',
//   ST: 'Sachsen-Anhalt',
//   SH: 'Schleswig-Holstein',
//   TH: 'Thüringen',

// TODO: persists school choice in url or sessionstorage

export const regions = {
  bayern: {
    title: 'Bayern',
    code: 'BY',
  },
  niedersachsen: {
    title: 'Niedersachsen',
    code: 'NI',
  },
} as const

const schoolTypes = [
  'mittelschule',
  'realschule',
  'gymnasium',
  'fos-bos',
] as const

type Region = keyof typeof regions
type SchoolType = (typeof schoolTypes)[number]

const schoolTypesWithExamsByRegion: Record<
  Region,
  Record<SchoolType, { title: string; exams: { title: string; url: string }[] }>
> = {
  bayern: {
    mittelschule: {
      title: 'Mittelschule',
      exams: [
        {
          title: 'Quali',
          url: '/mathe/75678/quali-abschlusspr%C3%BCfungen-mit-l%C3%B6sung',
        },
        {
          title: 'Mittlerer Schulabschluss',
          url: '/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule',
        },
      ],
    },
    realschule: {
      title: 'Realschule',
      exams: [
        {
          title: 'Abschluss Zweig I',
          url: '/mathe/75049/abschlusspr%C3%BCfungen-mit-l%C3%B6sung-zweig-i',
        },
        {
          title: 'Abschluss Zweig II & III',
          url: '/mathe/76750/abschlusspr%C3%BCfungen-mit-l%C3%B6sungen-zweig-ii-und-iii',
        },
      ],
    },
    gymnasium: {
      title: 'Gymnasium',
      exams: [
        {
          title: 'Abitur',
          url: '/mathe/20852/abiturpr%C3%BCfungen-mit-l%C3%B6sung',
        },
      ],
    },
    'fos-bos': {
      title: 'FOS&BOS',
      exams: [
        {
          title: 'Fachhochschulreife',
          url: '/mathe/91252/fachhochschulreife',
        },
        {
          title: 'Fachgebundene Hochschulreife',
          url: '/mathe/91253/fachgebundene-hochschulreife',
        },
      ],
    },
  },
  //@ts-expect-error not sure how to fix the type here,
  niedersachsen: {
    mittelschule: {
      title: 'Mittelschule',
      exams: [
        {
          title: 'Quali',
          url: '/mathe/75678/quali-abschlusspr%C3%BCfungen-mit-l%C3%B6sung',
        },
        {
          title: 'Mittlerer Schulabschluss',
          url: '/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule',
        },
      ],
    },
    // realschule: { title: 'Realschule', exams: [] },
    // gymnasium: { title: 'Gymnasium', exams: [] },
  },
} as const

interface ExamsFinderProps {
  initRegion?: Region
  initSchoolType?: SchoolType
}

export function ExamsFinder({ initRegion, initSchoolType }: ExamsFinderProps) {
  const [region, setRegion] = useState<Region>(initRegion ?? 'bayern')
  const [schoolType, setSchoolType] = useState<SchoolType | undefined>(
    initSchoolType
  )

  const router = useRouter()

  function handleRegionChange(newRegion: Region) {
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
        Bundesland:{' '}
        <select
          value={region}
          onChange={(e) => {
            handleRegionChange(e.target.value as Region)
          }}
          className="mx-0.5 min-w-[10rem] rounded-lg bg-transparent px-0.5 text-brand outline-none focus-visible:outline-inherit"
        >
          {Object.entries(regions).map(([regionKey, regionValue]) => {
            return (
              <option key={regionKey} value={regionKey}>
                {regionValue.title}
              </option>
            )
          })}
        </select>
      </p>
    )
  }

  function renderSchoolTypeButtons() {
    return (
      <p className="mt-8 text-2xl leading-cozy text-almost-black">
        Auf welche Schule gehst du?
        <br />
        {Object.entries(schoolTypesWithExamsByRegion[region]).map(
          ([schoolTypeKey, { title }]) => {
            return (
              <button
                key={schoolTypeKey}
                onClick={() => {
                  setSchoolType(schoolTypeKey as SchoolType)
                }}
                className="serlo-button-blue mr-3 mt-3 rounded-md px-2 py-[7px] text-xl"
              >
                {title}
              </button>
            )
          }
        )}
      </p>
    )
  }

  function renderSchoolTypeSelect() {
    return (
      <p className="mt-2 text-2xl leading-cozy text-almost-black">
        <span className="inline-block min-w-[141px]">Schulart: </span>
        <select
          value={schoolType}
          onChange={(e) => {
            setSchoolType(e.target.value as SchoolType)
          }}
          className="mx-0.5 min-w-[10rem] rounded-lg bg-transparent px-0.5 text-brand outline-none focus-visible:outline-inherit"
        >
          {Object.entries(schoolTypesWithExamsByRegion[region]).map(
            ([schoolTypeKey, { title }]) => {
              return (
                <option key={schoolTypeKey} value={schoolTypeKey}>
                  {title}
                </option>
              )
            }
          )}
        </select>
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

  function renderFeaturedBox(
    { title, url }: { title: string; url: string },
    index: number
  ) {
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
          index >= maxOnMobile ? 'hidden mobile:block' : ''
        )}
        href={`${url}`}
      >
        <h4 className="mx-auto mb-4 mt-1 hyphens-auto break-normal text-center text-xl font-bold">
          <FaIcon
            icon={faGraduationCap}
            className="my-2 text-4xl text-brand opacity-80"
          />
          <br />
          {title}
        </h4>
      </Link>
    )
  }
}

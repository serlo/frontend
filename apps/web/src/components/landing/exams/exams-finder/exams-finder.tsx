import { FaIcon } from '@editor/package'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

import { Link } from '@/components/content/link'
import { cn } from '@/helper/cn'

const maxOnMobile = 4

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

export type SupportedRegion = keyof typeof regions
export type SchoolType = (typeof schoolTypes)[number]

export const schoolTypesWithExamsByRegion: Record<
  SupportedRegion,
  Record<
    SchoolType,
    {
      title: string
      exams: {
        title: string
        url: string
        years: { title: string; url: string }[]
      }[]
    }
  >
> = {
  bayern: {
    mittelschule: {
      title: 'Mittelschule',
      exams: [
        {
          title: 'Quali',
          url: '/mathe/75678/quali-abschlusspr%C3%BCfungen-mit-l%C3%B6sung',
          years: [
            { title: '2023', url: '/mathe/290075/2023' },
            { title: '2022', url: '/mathe/261569/2022' },
            { title: '2021', url: '/mathe/226922/2021' },
            { title: '2020', url: '/mathe/178169/2020' },
          ],
        },
        {
          title: 'Mittlerer Schulabschluss',
          url: '/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule',
          years: [
            { title: '2023', url: '/mathe/293322/2023' },
            { title: '2022', url: '/mathe/261415/2022' },
            { title: '2021', url: '/mathe/247428/2021' },
            { title: '2020', url: '/mathe/247429/2020' },
          ],
        },
      ],
    },
    realschule: {
      title: 'Realschule',
      exams: [
        {
          title: 'Abschluss Zweig I',
          url: '/mathe/75049/abschlusspr%C3%BCfungen-mit-l%C3%B6sung-zweig-i',
          years: [
            { title: '2023', url: '/mathe/288940/2023' },
            { title: '2022', url: '/mathe/272196/2022' },
            { title: '2021', url: '/mathe/232930/2021' },
            { title: '2020', url: '/mathe/180388/2020' },
            { title: '2019', url: '/mathe/146968/2019' },
            { title: '2018', url: '/mathe/146967/2018' },
            { title: '2017', url: '/mathe/95100/2017' },
            { title: '2016', url: '/mathe/75548/2016' },
            { title: '2015', url: '/mathe/75050/2015' },
          ],
        },
        {
          title: 'Abschluss Zweig II & III',
          url: '/mathe/76750/abschlusspr%C3%BCfungen-mit-l%C3%B6sungen-zweig-ii-und-iii',
          years: [
            { title: '2023', url: '/mathe/288945/2023' },
            { title: '2022', url: '/mathe/272224/2022' },
            { title: '2021', url: '/mathe/234076/2021' },
            { title: '2020', url: '/mathe/180403/2020' },
            { title: '2019', url: '/mathe/146981/2019' },
            { title: '2018', url: '/mathe/139217/2018' },
            { title: '2017', url: '/mathe/94502/2017' },
            { title: '2016', url: '/mathe/76714/2016' },
            { title: '2015', url: '/mathe/76717/2015' },
          ],
        },
      ],
    },
    gymnasium: {
      title: 'Gymnasium',
      exams: [
        {
          title: 'Abitur',
          url: '/mathe/20852/abiturpr%C3%BCfungen-mit-l%C3%B6sung',
          years: [
            {
              title: '2023',
              url: '/mathe/274629/mathematik-abitur-bayern-2023',
            },
            {
              title: '2022',
              url: '/mathe/248460/mathematik-abitur-bayern-2022',
            },
            {
              title: '2021',
              url: '/mathe/231486/mathematik-abitur-bayern-2021',
            },
            {
              title: '2020',
              url: '/mathe/179851/mathematik-abitur-bayern-2020',
            },
            {
              title: '2019',
              url: '/mathe/137533/mathematik-abitur-bayern-2019',
            },
            {
              title: '2018',
              url: '/mathe/106725/mathematik-abitur-bayern-2018',
            },
            {
              title: '2017',
              url: '/mathe/76975/mathematik-abitur-bayern-2017',
            },
            {
              title: '2016',
              url: '/mathe/70296/mathematik-abitur-bayern-2016',
            },
            {
              title: '2015',
              url: '/mathe/70295/mathematik-abitur-bayern-2015',
            },
            {
              title: '2015',
              url: '/mathe/70304/mathematik-abitur-bayern-2014',
            },
            {
              title: '2015',
              url: '/mathe/21007/mathematik-abitur-bayern-2013',
            },
          ],
        },
      ],
    },
    'fos-bos': {
      title: 'FOS & BOS',
      exams: [
        {
          title: 'Fachhochschulreife',
          url: '/mathe/91252/fachhochschulreife',
          years: [
            { title: '2022', url: '/mathe/262133/2022' },
            { title: '2021', url: '/mathe/253867/2021' },
            { title: '2020', url: '/mathe/201338/2020' },
            { title: '2019', url: '/mathe/201337/2019' },
            { title: '2018', url: '/mathe/186715/2018' },
            { title: '2017', url: '/mathe/91264/2017' },
            { title: '2016', url: '/mathe/91265/2016' },
          ],
        },
        {
          title: 'Fachgebundene Hochschulreife',
          url: '/mathe/91253/fachgebundene-hochschulreife',
          years: [
            { title: '2020', url: '/mathe/201339/2020' },
            { title: '2019', url: '/mathe/201340/2019' },
            { title: '2018', url: '/mathe/201341/2018' },
            { title: '2017', url: '/mathe/91266/2017' },
            { title: '2016', url: '/mathe/91267/2016' },
          ],
        },
      ],
    },
  },
  //@ts-expect-error not sure how to fix the type here,
  niedersachsen: {
    mittelschule: {
      title: 'Gesamtschule',
      exams: [
        {
          title: 'IGS G',
          url: '/mathe/300763/igs-g',
          years: [
            { title: '2023', url: '/mathe/300785/2023' },
            { title: '2022', url: '/mathe/300786/2022' },
            { title: '2021', url: '/mathe/300787/2021' },
          ],
        },
        {
          title: 'IGS E',
          url: '/mathe/300762/igs-e',
          years: [
            { title: '2023', url: '/mathe/300764/2023' },
            { title: '2022', url: '/mathe/300765/2022' },
            { title: '2021', url: '/mathe/300766/2021' },
          ],
        },
      ],
    },
    realschule: {
      title: 'Realschule',
      exams: [
        {
          title: 'Abschlussarbeit Realschule',
          url: '/mathe/297604/abschlussprüfungen-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300698/2023' },
            { title: '2022', url: '/mathe/300714/2022' },
            { title: '2021', url: '/mathe/300718/2021' },
          ],
        },
      ],
    },
    gymnasium: {
      title: 'Gymnasium',
      exams: [
        {
          title: 'Abitur (gA)',
          url: '/mathe/300778/abiturprüfungen-ga-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300804/2023' },
            { title: '2022', url: '/mathe/300805/2022' },
            { title: '2021', url: '/mathe/300806/2021' },
          ],
        },
        {
          title: 'Abitur (eA)',
          url: '/mathe/297606/abiturprüfungen-ea-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300750/2023' },
            { title: '2022', url: '/mathe/300754/2022' },
            { title: '2021', url: '/mathe/300755/2021' },
          ],
        },
      ],
    },
  },
} as const

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
        Bundesland:{' '}
        <select
          value={region}
          onChange={(e) => {
            handleRegionChange(e.target.value as SupportedRegion)
          }}
          className="mx-0.5 min-w-[12rem] rounded-lg bg-transparent px-0.5 text-brand outline-none focus-visible:outline-inherit"
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
          className="mx-0.5 min-w-[12rem] rounded-lg bg-transparent px-0.5 text-brand outline-none focus-visible:outline-inherit"
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

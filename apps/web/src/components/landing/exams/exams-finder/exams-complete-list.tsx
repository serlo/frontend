import { Fragment } from 'react'

import {
  SupportedRegion,
  regions,
  schoolTypesWithExamsByRegion,
} from './exams-data'
import { Link } from '@/components/content/link'

export function ExamsCompleteList({ region }: { region: SupportedRegion }) {
  const schoolTypesWithData = Object.entries(
    schoolTypesWithExamsByRegion[region]
  )

  return (
    <div className="px-side">
      <h2 className="mb-6 text-left text-2xl font-extrabold sm:text-center">
        Alle Mathe-Abschlussprüfungen für {regions[region].title}
      </h2>
      <div className="max-w-6xl text-left sm:mx-auto sm:flex sm:flex-wrap">
        {schoolTypesWithData.map(([schoolTypeKey, { title, exams }]) => {
          return (
            <div
              key={schoolTypeKey}
              className="mt-6 min-w-[10rem] text-lg sm:mx-4 sm:min-w-[14rem] sm:max-w-[16rem]"
            >
              <h2 className="mb-2 font-bold">{title}</h2>
              {exams.map((exam) => {
                return (
                  <p key={exam.url} className="mb-3">
                    <b>
                      <Link href={exam.url}>{exam.title}</Link>
                    </b>
                    <br />
                    {exam.years.map((year, index) => {
                      return (
                        <Fragment key={year.url}>
                          <Link href={year.url}>{year.title}</Link>
                          {index === exam.years.length - 1 ? '' : ', '}
                        </Fragment>
                      )
                    })}
                  </p>
                )
              })}
            </div>
          )
        })}
      </div>

      <h2 className="mt-12 pb-12 text-2xl font-extrabold leading-10">
        Andere Bundesländer: <br />
        {region === 'bayern' ? (
          // using regular links to make sure region and school state resets
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a className="serlo-link" href="/mathe-pruefungen/niedersachsen">
            Abschlussprüfungen für Niedersachsen
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a className="serlo-link" href="/mathe-pruefungen/bayern">
            Abschlussprüfungen für Bayern
          </a>
        )}
      </h2>
    </div>
  )
}

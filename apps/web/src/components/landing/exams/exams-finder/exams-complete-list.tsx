import { Fragment } from 'react'

import {
  SupportedRegion,
  regions,
  schoolTypesWithExamsByRegion,
} from './exams-finder'
import { Link } from '@/components/content/link'

export function ExamsCompleteList({ region }: { region: SupportedRegion }) {
  const schoolTypesWithData = Object.entries(
    schoolTypesWithExamsByRegion[region]
  )

  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold">
        Alle Mathe-Abschlussprüfungen für {regions[region].title}
      </h2>
      <div className="mx-auto max-w-6xl justify-around text-left sm:flex sm:flex-wrap">
        {schoolTypesWithData.map(([schoolTypeKey, { title, exams }]) => {
          return (
            <div
              key={schoolTypeKey}
              className="mx-4 mt-6 min-w-[10rem] text-lg sm:min-w-[17rem] md:min-w-[14rem]"
            >
              <h2 className="mb-2 font-bold">{title}</h2>
              {exams.map((exam) => {
                return (
                  <p key={exam.url} className="mb-3">
                    <b>
                      <Link href={exam.url}>{exam.title}</Link>
                    </b>
                    <br />
                    {exam.years.slice(0, 3).map((year, index) => {
                      return (
                        <Fragment key={year.url}>
                          <Link href={year.url}>{year.title}</Link>
                          {index !== 2 ? ', ' : ''}
                        </Fragment>
                      )
                    })}
                    {exam.years.length > 3 ? (
                      <>
                        {', '}
                        <Link href={exam.url}>weitere ...</Link>
                      </>
                    ) : null}
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
    </>
  )
}

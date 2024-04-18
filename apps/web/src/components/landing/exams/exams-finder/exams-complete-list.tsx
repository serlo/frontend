import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import {
  deRegions,
  mathExamTaxDataStatic,
  schoolTypes,
} from '@/data/de/math-exams-data'
import { type ExamsLandingData } from '@/pages/mathe-pruefungen/[region]'

export function ExamsCompleteList({
  region,
  examsTaxonomyData,
}: ExamsLandingData) {
  if (!examsTaxonomyData) return

  const dataByExamType = Object.values(mathExamTaxDataStatic[region])

  return (
    <div className="px-side">
      <h2 className="mb-6 text-left text-2xl font-extrabold sm:text-center">
        Alle Mathe-Abschlussprüfungen für {deRegions[region].title}
      </h2>
      <div className="max-w-6xl text-left sm:mx-auto sm:flex sm:flex-wrap">
        {Object.entries(schoolTypes).map(([schoolTypeKey, schoolTitle]) => {
          const exams = dataByExamType.filter(
            (data) => data.schoolType === schoolTypeKey
          )
          if (!exams?.length) return

          const flatExamTaxonomies = exams.flatMap((exam) => {
            if (exam.id) return { displayTitle: exam.displayTitle, id: exam.id }
            return exam.options!
          })

          return (
            <div
              key={schoolTypeKey}
              className="mt-6 min-w-[10rem] text-lg sm:mx-4 sm:min-w-[14rem] sm:max-w-[16rem]"
            >
              <h2 className="mb-2 font-bold">{schoolTitle}</h2>
              {flatExamTaxonomies.map((examTax) => {
                const examTaxData = examsTaxonomyData[`id${examTax.id}`]
                if (!examTaxData || examTaxData.trashed) return
                return (
                  <p key={examTax.id} className="mb-3">
                    <b>
                      <Link href={examTaxData.alias}>
                        {examTax.displayTitle}
                      </Link>
                    </b>
                    <br />
                    {examTaxData.children.nodes.map((year, index) => {
                      if (year.trashed) return
                      const title = year.title.replace(/[^0-9.]/g, '')
                      return (
                        <Fragment key={year.alias}>
                          <Link href={year.alias}>{title}</Link>
                          {index === examTaxData.children.nodes.length - 1
                            ? ''
                            : ', '}
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

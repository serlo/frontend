import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import {
  deRegions,
  mathExamTaxDataStatic,
  schoolTypes,
} from '@/data/de/math-exams-data'
import { cn } from '@/helper/cn'
import { type ExamsLandingData } from '@/pages/mathe-pruefungen/[region]'

export function ExamsCompleteList({
  region,
  examsTaxonomyData,
}: ExamsLandingData) {
  if (!examsTaxonomyData) return

  const dataByExamType = Object.values(mathExamTaxDataStatic[region])

  const examsBySchoolTypes = Object.entries(schoolTypes)
    .flatMap(([schoolTypeKey, schoolTitle]) => {
      const exams = dataByExamType.filter(
        (data) => data.schoolType === schoolTypeKey
      )
      if (!exams?.length) return undefined
      const flatExamTaxonomies = exams
        .flatMap((exam) => {
          if (exam.id) return { displayTitle: exam.displayTitle, id: exam.id }
          return exam.options!
        })
        .map((examTax) => {
          const examTaxData = examsTaxonomyData[`id${examTax.id}`]
          if (!examTaxData || examTaxData.trashed) return
          return {
            alias: examTaxData.alias,
            displayTitle: examTax.displayTitle,
            children: examTaxData.children.nodes,
          }
        })

      return {
        title: schoolTitle,
        exams: flatExamTaxonomies,
      }
    })
    .filter(Boolean)

  return (
    <div className="px-side">
      <h2 className="mb-6 text-left text-2xl font-extrabold sm:text-center">
        Alle Mathe-Abschlussprüfungen für {deRegions[region].title}
      </h2>
      <div className="max-w-6xl text-left sm:mx-auto sm:flex sm:flex-wrap">
        {Object.entries(examsBySchoolTypes).map(
          ([schoolTypeKey, schoolData]) => {
            if (!schoolData) return null

            return (
              <div
                key={schoolTypeKey}
                className={cn(
                  'mt-6 min-w-[10rem] text-lg sm:mx-4 sm:min-w-[14rem] sm:max-w-[16rem]',
                  examsBySchoolTypes.length === 1 && ' !text-center sm:!mx-auto'
                )}
              >
                <h2 className="mb-2 font-bold">{schoolData.title}</h2>
                {schoolData.exams.map((examTax) => {
                  if (!examTax) return
                  return (
                    <p key={examTax.alias} className="mb-3">
                      <b>
                        <Link href={examTax.alias}>{examTax.displayTitle}</Link>
                      </b>
                      <br />
                      {examTax.children.map((year, index) => {
                        if (year.trashed) return
                        const title = year.title.replace(/[^0-9.]/g, '')
                        return (
                          <Fragment key={year.alias}>
                            <Link href={year.alias}>{title}</Link>
                            {index === examTax.children.length - 1 ? '' : ', '}
                          </Fragment>
                        )
                      })}
                    </p>
                  )
                })}
              </div>
            )
          }
        )}
      </div>

      <h2 className="mt-12 pb-12 text-2xl font-extrabold leading-10">
        Andere Bundesländer: <br />
        {Object.entries(deRegions).map(([regionKey, otherRegion]) => {
          if (regionKey === region) return null
          return (
            <>
              {/* // using regular links to make sure region and school state resets
              // eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="serlo-link" href={`/mathe-pruefungen/${regionKey}`}>
                {otherRegion.title}
              </a>
              <br />
            </>
          )
        })}
      </h2>
    </div>
  )
}

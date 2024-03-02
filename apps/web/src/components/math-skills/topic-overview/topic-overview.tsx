import { Fragment, useEffect } from 'react'

import { GradeTopicData, grade5Data } from './grade-5-data'
import { TodaysExercise } from './todays-exercise'
import { TopicItem } from './topic-item'

export function TopicOverview() {
  useEffect(() => {
    if (window.innerWidth > 1215) {
      document.querySelectorAll('details').forEach((elem) => {
        if (elem) elem.open = true
      })
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 pb-10 pt-3 sm:flex-row sm:flex-wrap">
      {renderCard(grade5Data[0])}
      {renderCard(grade5Data[1])}
      <TodaysExercise />
      {grade5Data.slice(2).map(renderCard)}
    </div>
  )

  function renderCard(area: GradeTopicData) {
    return (
      <details
        key={area.title}
        className="h-fit w-full rounded-lg border border-brand-200 p-4 pb-3 shadow-menu sm:w-64 lg:w-60"
      >
        <summary>
          <h3 className="inline-block pb-2 text-xl"> {area.title}</h3>
        </summary>
        {area.children.map((subsection) => {
          return (
            <Fragment key={subsection.title}>
              <h4 className="mt-2 text-base font-bold">{subsection.title}</h4>
              <ul className="-ml-0.25 mt-1.5 flex flex-wrap gap-x-2 gap-y-0">
                {subsection.children.map((item) => {
                  return (
                    <TopicItem
                      key={item.id}
                      exerciseId={item.id}
                      text={item.text}
                    />
                  )
                })}
              </ul>
            </Fragment>
          )
        })}
      </details>
    )
  }
}

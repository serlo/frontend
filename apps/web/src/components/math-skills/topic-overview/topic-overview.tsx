import { useEffect } from 'react'

import { GradeTopicData, grade5Data } from './grade-5-data'
import { TodaysExercise } from './todays-exercise'
import { TopicItem } from './topic-item'
import { scrollIfNeeded } from '@/helper/scroll'

export function TopicOverview() {
  useEffect(() => {
    const target = document.querySelector(window.location.hash)
    target?.setAttribute('open', '')
  })

  return (
    <div
      className="flex flex-col gap-4 pb-10 pt-3 sm:flex-row sm:flex-wrap"
      id="topic-overview-wrapper"
    >
      {renderCard(grade5Data[0])}
      {renderCard(grade5Data[1])}
      <TodaysExercise />
      {grade5Data.slice(2).map(renderCard)}
    </div>
  )

  function renderCard(area: GradeTopicData) {
    return (
      <div
        key={area.title}
        className="h-fit w-full rounded-lg border border-brand-200 p-4 pb-3 shadow-menu sm:w-64 lg:w-60"
      >
        <h3 className="inline-block pb-2 text-xl font-bold"> {area.title}</h3>
        {area.children.map((subsection) => {
          return (
            <details
              id={subsection.hash}
              key={subsection.title}
              onToggle={(e) => {
                if ((e.nativeEvent as ToggleEvent).newState === 'open') {
                  window.location.hash = subsection.hash
                  document
                    .querySelectorAll('#topic-overview-wrapper details')
                    .forEach((details) => {
                      if (details !== e.target) details.removeAttribute('open')
                      const handle = (e.target as HTMLElement)
                        ?.firstElementChild as HTMLElement
                      if (handle) scrollIfNeeded(handle)
                    })
                }
              }}
            >
              <summary className="cursor-pointer">
                <h4 className="mt-2 inline-block text-base text-xl">
                  {subsection.title}
                </h4>
              </summary>
              <div>
                {subsection.children.map((subsubsection) => {
                  return (
                    <>
                      <b className="mt-2 block text-base">
                        {subsubsection.title}
                      </b>
                      <ul className="-ml-0.25 mt-1.5 flex flex-wrap gap-x-2 gap-y-0">
                        {subsubsection.children.map((item) => {
                          return (
                            <TopicItem
                              key={item.id}
                              exerciseId={item.id}
                              text={item.text}
                            />
                          )
                        })}
                      </ul>
                    </>
                  )
                })}
              </div>
            </details>
          )
        })}
      </div>
    )
  }
}

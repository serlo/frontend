import { grade5Data } from './grade-5-data'
import { TopicItem } from './topic-item'

export function TopicOverview() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 pb-10 pt-3 mobileExt:flex-nowrap">
      {grade5Data.map((area) => {
        return (
          <div
            key={area.title}
            className="h-fit w-72 rounded-lg border border-brand-200 p-5 shadow-menu"
          >
            <h3 className="pb-2 text-xl"> {area.title}</h3>
            {area.children.map((subsection) => {
              return (
                <>
                  <h4 className="mt-2 text-base font-bold">
                    {subsection.title}
                  </h4>
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
                </>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

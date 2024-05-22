import { cn } from '@/helper/cn'

const roadmapData = [
  {
    title: 'Latest Releases',
    steps: [
      'Fill-in-the-gap exercise (new plugin)',
      'Exercise generation with AI ✨',
      'Copy & Paste content across plugins',
      'Web Component release',
    ],
  },
  {
    title: 'Next up',
    steps: [
      'Improve Image plugin, easier uploads',
      'Drag & Drop image exercise (fill-in-the-gap)',
      'AI supported input exercises',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Better keyboard navigation',
      'Asset upload for Editor integrations',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Better support for LMS integrations',
      'Automated OER license management',
    ],
  },
]

export function EditorRoadmap() {
  return (
    <div className="text-center text-xl sm:flex">
      {roadmapData.map(({ title, steps }, colIndex) => {
        return (
          <div key={title} className="mt-8 flex-1 px-3">
            <h3 className="mb-4 font-handwritten text-3xl text-brand">
              {title}
            </h3>
            <ul className="">
              {steps.map((title) => {
                return (
                  <li
                    key={title}
                    className={cn(`
                      mx-auto mb-3 block w-fit rounded-xl px-2 py-1
                      text-base leading-6
                      shadow-menu transition-colors sm:mx-0
                      sm:w-auto
                    `)}
                  >
                    {title}
                  </li>
                )
              })}
            </ul>
            {colIndex === 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/_assets/img/jobs/impact.svg"
                className="mx-3 my-5 hidden opacity-75 sm:block"
                alt=""
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

import { cn } from '@/helper/cn'

const roadmapData = [
  {
    title: 'Latest Releases',
    steps: [
      'Integrate H5P exercises in Serlo Editor content',
      'Simple Autosave',
      'Slash command to add new plugin',
      'Import existing Serlo content',
      'Redesigned plugin toolbar',
    ],
  },
  {
    title: 'Next up',
    steps: [
      'Directly link to content sections',
      'Exercise generation with AI ✨',
      'Improved focus management',
      'Integrated help section',
      'Audio plugin',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Improve Image plugin, easier uploads',
      'Better keyboard navigation',
      'Impact dashboard – supporting authors with usage data',
      'Fill-in-the-gap exercise (new plugin)',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Drag & Drop exercise (new plugin)',
      'Better support for LMS integrations',
      'Copy & Paste content across plugins',
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

import { tw } from '@/helper/tw'

const roadmapData = [
  {
    title: 'Latest Releases',
    steps: [
      'Redesigned plugin selection, custom icons',
      'Helpful tooltips that open directly on hover',
      'Integrate H5P exercises in Serlo Editor content',
      'Feature to easily find and link Serlo content',
      'Simple Autosave',
    ],
  },
  {
    title: 'Next up',
    steps: [
      'Redesigned plugin toolbar',
      'Accessibility improvements for pictures using AI',
      'Import existing Serlo content',
      'Directly link to sections in Serlo content',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Improve Image plugin, easier uploads',
      'Better keyboard navigation',
      'Improved focus management',
      'Impact dashboard – supporting authors with usage data',
      'Differentiate between new paragraph and new lines',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Fill-in-the-gap exercise (new plugin)',
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
                    className={tw`
                      mx-auto mb-3 block w-fit rounded-xl px-2 py-1
                      text-base leading-6
                      shadow-menu transition-colors sm:mx-0
                      sm:w-auto
                    `}
                  >
                    {title}
                  </li>
                )
              })}
            </ul>
            {colIndex === 0 ? (
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

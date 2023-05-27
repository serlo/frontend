import clsx from 'clsx'

const roadmapData = [
  {
    title: 'Latest Releases',
    steps: ['Table plugin', 'Math equations plugin', 'Highlighting box plugin'],
  },
  {
    title: 'Next up',
    steps: [
      'Better rich text editing UX (Update Slate to 0.82) ',
      'Improved plugin selection menu',
      'Helpful tooltips that open directly on hover',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Integrate H5P elements in Serlo Editor content (new plugin)',
      'Migration algorithm from old to new versions of the Serlo Editor data format',
      'New data format for easy exchange  between different LMS',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Fill-in-the-gap exercise (new plugin)',
      'Drag & Drop exercise (new plugin)',
      'Improved focus management',
      'Better support for LMS integrations',
      'Copy & Paste content across plugins',
      'Automated OER license management',
      'Impact dashboard – supporting authors with usage data',
    ],
  },
]

export function EditorRoadmap() {
  return (
    <div className="text-center text-xl sm:flex">
      {roadmapData.map(({ title, steps }, colIndex) => {
        return (
          <div key={title} className="mt-8 flex-1 px-3">
            <h3 className={clsx('mb-4 font-handwritten text-3xl text-brand')}>
              {title}
            </h3>
            <ul className="">
              {steps.map((title) => {
                return (
                  <li
                    key={title}
                    className={clsx(
                      'mx-auto mb-3 block w-fit px-2 py-1 leading-6',
                      'sm:mx-0 sm:w-auto',
                      'rounded-xl shadow-menu transition-colors',
                      'text-base'
                    )}
                  >
                    {title}
                  </li>
                )
              })}
            </ul>
            {colIndex === 0 ? (
              <img
                src="/_assets/img/jobs/impact.svg"
                className="my-5 mx-3 hidden opacity-75 sm:block"
                alt=""
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

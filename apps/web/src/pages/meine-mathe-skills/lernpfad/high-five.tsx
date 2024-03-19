import { NextPage } from 'next'
import { Fragment, useState } from 'react'

import {
  levels,
  positions,
} from '../../../components/math-skills/high-five/high-five-levels'
import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { useMathSkillsStorage } from '@/components/math-skills/utils/math-skills-data-context'
import { cn } from '@/helper/cn'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: `Lernpfad High Five - meine Mathe-Skills`,
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const [selected, setSelected] = useState(-1)
  const [renderCounter, setRenderCounter] = useState(1)
  const [showAll, setShowAll] = useState(false)

  const { updateData, data } = useMathSkillsStorage()

  return (
    <div className="mx-auto w-fit px-4">
      {selected === -1 ? (
        <>
          <h2 className="mb-3 mt-8 text-2xl font-bold">High Five</h2>
          <p>Eine entspannte Tour durch die Highlights der 5. Klasse</p>
          <p className="mb-7 mt-4">
            <Link href="/meine-mathe-skills">zurück zur Lernpfad-Auswahl</Link>
          </p>
          <div
            className="relative h-[668px] w-[800px]"
            style={{
              backgroundImage: "url('/_assets/mathe-skills/high-five.jpg')",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 668"
              className="relative"
            >
              {Object.entries(levels).map(([id, levelData]) => {
                const lid = parseInt(id)
                if (
                  data.highFiveSolved.includes(lid) ||
                  levels[lid].deps.length === 0 ||
                  levels[lid].deps.some((dep) =>
                    data.highFiveSolved.includes(dep)
                  ) ||
                  showAll
                )
                  return (
                    <Fragment key={id}>
                      {levelData.deps.map((dep, index) => {
                        if (data.highFiveSolved.includes(dep) || showAll) {
                          return (
                            <line
                              key={`connect-${id}-${dep}`}
                              x1={positions[index].x}
                              y1={positions[index].y}
                              x2={positions[dep].x}
                              y2={positions[dep].y}
                              strokeWidth="10"
                              stroke="rgba(148, 163, 184, 0.8)"
                            />
                          )
                        } else {
                          return null
                        }
                      })}
                    </Fragment>
                  )

                return null
              })}
            </svg>
            {Object.entries(levels).map(([id, levelData], index) => {
              const lid = parseInt(id)
              if (
                data.highFiveSolved.includes(lid) ||
                levels[lid].deps.length === 0 ||
                levels[lid].deps.some((dep) =>
                  data.highFiveSolved.includes(dep)
                ) ||
                showAll
              )
                return (
                  <div
                    className="absolute flex w-0 items-center justify-center"
                    style={{
                      left: `${positions[index].x}px`,
                      top: `${positions[index].y}px`,
                    }}
                    key={id}
                  >
                    <button
                      className={cn(
                        'absolute whitespace-nowrap  rounded px-2 py-0.5 font-bold',
                        data.highFiveSolved.includes(parseInt(id))
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'bg-newgreen hover:bg-newgreen-600'
                      )}
                      onClick={() => {
                        setSelected(parseInt(id))
                      }}
                    >
                      {levelData.title}
                    </button>
                  </div>
                )
            })}
          </div>
          <div className="mb-4 mt-3 text-right text-sm">
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setShowAll(e.target.checked)
                }}
              />{' '}
              Karte aufklappen
            </label>
          </div>
        </>
      ) : (
        <div className="w-[800px]">
          <h2 className="mb-3 mt-8 text-2xl font-bold">
            High Five - {levels[selected].title}
          </h2>
          <p>
            <button
              onClick={() => {
                setSelected(-1)
                setRenderCounter((counter) => counter + 1)
              }}
              className="serlo-link"
            >
              zurück
            </button>
          </p>
          <main className="mt-8 text-base [&>p]:my-4 [&>p]:text-lg">
            {levels[selected].component(renderCounter, () => {
              updateData((data) => {
                if (!data.highFiveSolved.includes(selected)) {
                  data.highFiveSolved.push(selected)
                }
                setSelected(-1)
              })
            })}
          </main>
        </div>
      )}
    </div>
  )
}

export default ContentPage

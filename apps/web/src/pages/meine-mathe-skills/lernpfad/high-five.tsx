import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

import {
  nodes,
  levelComponents,
} from '../../../components/math-skills/high-five/high-five-levels'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
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

  const router = useRouter()
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
              {Object.entries(nodes).map(([id, levelData]) => {
                const lid = parseInt(id)
                if (
                  data.highFiveSolved.includes(lid) ||
                  nodes[lid].deps.length === 0 ||
                  nodes[lid].deps.some((dep) =>
                    data.highFiveSolved.includes(dep)
                  ) ||
                  showAll
                )
                  return (
                    <Fragment key={id}>
                      {levelData.deps.map((dep) => {
                        if (data.highFiveSolved.includes(dep) || showAll) {
                          return (
                            <line
                              key={`connect-${id}-${dep}`}
                              x1={levelData.x}
                              y1={levelData.y}
                              x2={nodes[dep].x}
                              y2={nodes[dep].y}
                              strokeWidth="6"
                              stroke="rgba(178, 193, 204, 0.6)"
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
            {Object.entries(nodes).map(([id, levelData]) => {
              const lid = parseInt(id)
              const isSolved = data.highFiveSolved.includes(lid)
              if (
                isSolved ||
                nodes[lid].deps.length === 0 ||
                nodes[lid].deps.some((dep) =>
                  data.highFiveSolved.includes(dep)
                ) ||
                showAll
              )
                return (
                  <div
                    className="absolute flex w-0 items-center justify-center"
                    style={{
                      left: `${levelData.x}px`,
                      top: `${levelData.y}px`,
                    }}
                    key={id}
                  >
                    <button
                      className={cn(
                        'absolute whitespace-nowrap rounded bg-gray-50 px-2 py-0.5 font-bold hover:opacity-100',
                        isSolved ? 'opacity-100' : 'opacity-80'
                      )}
                      onClick={() => {
                        void router.push(
                          {
                            ...router,
                            query: {
                              ...router.query,
                              grade: 'high-five',
                              exercise: levelData.title.toLowerCase(),
                            },
                          },
                          undefined,
                          { shallow: true }
                        )
                        setSelected(lid)
                      }}
                    >
                      {levelData.title}
                      {isSolved ? (
                        <span className="absolute -bottom-2.5 -right-2.5 block aspect-square h-5 w-5 rounded-full bg-newgreen align-middle leading-[1.36rem] text-white">
                          <FaIcon icon={faCheckCircle} />
                        </span>
                      ) : null}
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
            High Five - {nodes[selected].title}
          </h2>
          <p>
            <button
              onClick={() => {
                setSelected(-1)
                void router.push(router.basePath, undefined, {
                  shallow: true,
                })
                setRenderCounter((counter) => counter + 1)
              }}
              className="serlo-link"
            >
              zurück
            </button>
          </p>
          <main className="mt-8 text-base [&>p]:my-4 [&>p]:text-lg">
            {levelComponents[selected](renderCounter, () => {
              updateData((data) => {
                if (!data.highFiveSolved.includes(selected)) {
                  data.highFiveSolved.push(selected)
                }
                setSelected(-1)
                void router.push(router.basePath, undefined, { shallow: true })
              })
            })}
          </main>
        </div>
      )}
    </div>
  )
}

export default ContentPage

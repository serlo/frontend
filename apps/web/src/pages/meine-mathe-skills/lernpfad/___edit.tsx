import { NextPage } from 'next'
import { Fragment, useState } from 'react'

import {
  levels,
  positions as inputPositions,
} from '../../../components/math-skills/high-five/high-five-levels'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
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
  const [positions, setPositions] = useState(inputPositions)
  const [, setRenderCounter] = useState<number>(0)
  const [movingIndex, setMovingIndex] = useState<number | undefined>(undefined)

  return (
    <div className="mx-auto w-fit px-4">
      <p className="mb-7 mt-4">
        <button
          className="serlo-button-light"
          onClick={() => {
            console.log(JSON.stringify(positions))
          }}
        >
          export json to console
        </button>
      </p>
      <>
        <h2 className="mb-3 mt-8 text-2xl font-bold">Edit Tree</h2>
        <div
          className="relative h-[668px] w-[800px]"
          id="tree-wrapper"
          style={{
            backgroundImage: "url('/_assets/mathe-skills/high-five.jpg')",
          }}
          onMouseDown={(e) => {
            const div = e.target as HTMLButtonElement
            if (div.tagName.toLocaleLowerCase() !== 'button') return
            const index = parseInt(div.id)
            setMovingIndex(index)
          }}
          onMouseUp={() => {
            setMovingIndex(undefined)
          }}
          onMouseMove={(e) => {
            if (movingIndex === undefined) return
            const wrapper = e.currentTarget

            const newPositions = positions
            newPositions[movingIndex] = {
              x: e.pageX - wrapper.offsetLeft,
              y: e.pageY - wrapper.offsetTop,
            }
            setPositions(newPositions)
            setRenderCounter((counter) => counter + 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 668"
            className="relative"
          >
            {Object.entries(levels).map(([id, levelData], index) => {
              return (
                <Fragment key={id}>
                  {levelData.deps.map((dep) => {
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
                  })}
                </Fragment>
              )
            })}
          </svg>
          {Object.entries(levels).map(([id, levelData], index) => {
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
                  id={String(index)}
                  className={cn(
                    'absolute whitespace-nowrap  rounded px-2 py-0.5 font-bold',
                    'bg-gray-200 hover:bg-gray-300'
                  )}
                >
                  {levelData.title}
                  <span className="absolute -right-4 -top-4 block aspect-square h-7 rounded-full bg-orange-500 bg-opacity-30 p-0.5">
                    {index}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </>
    </div>
  )
}

export default ContentPage

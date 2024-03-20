import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { Fragment, useState } from 'react'

import { nodes as inputNodes } from '../../../components/math-skills/high-five/high-five-levels'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'

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
  const [nodes, setNodes] = useState(inputNodes)
  const [, setRenderCounter] = useState<number>(0)
  const [movingIndex, setMovingIndex] = useState<number | undefined>(undefined)
  const [active, setActive] = useState<number | undefined>(undefined)

  return (
    <div className="mx-auto w-fit px-4">
      <p className="mb-7 mt-4">
        <button
          className="serlo-button-light"
          onClick={() => {
            const output = JSON.stringify(nodes)
            // eslint-disable-next-line no-console
            console.log(output)
            void navigator.clipboard.writeText(output)
            showToastNotice('👌', 'success')
          }}
        >
          copy json to clipboard
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

            setNodes((oldNodes) => {
              oldNodes[movingIndex].x = e.pageX - wrapper.offsetLeft
              oldNodes[movingIndex].y = e.pageY - wrapper.offsetTop
              return oldNodes
            })

            setRenderCounter((counter) => counter + 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 668"
            className="relative"
          >
            {Object.entries(nodes).map(([id, node]) => {
              return (
                <Fragment key={id}>
                  {node.deps.map((dep) => {
                    return (
                      <line
                        key={`connect-${id}-${dep}`}
                        x1={node.x}
                        y1={node.y}
                        x2={nodes[dep].x}
                        y2={nodes[dep].y}
                        strokeWidth="10"
                        stroke="rgba(148, 163, 184, 0.8)"
                      />
                    )
                  })}
                </Fragment>
              )
            })}
          </svg>
          {Object.entries(nodes).map(([id, node], index) => {
            return (
              <div
                className="group absolute flex w-0 items-center justify-center"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
                key={id}
              >
                <button
                  id={String(index)}
                  className={cn(
                    'absolute whitespace-nowrap  rounded px-2 py-0.5 font-bold',
                    'cursor-move bg-gray-200 hover:bg-gray-300'
                  )}
                  onClick={() => setActive(index)}
                >
                  {node.title}
                </button>
              </div>
            )
          })}
        </div>
        <div className="w-full bg-gray-100 p-2">
          {active !== undefined ? (
            <div className="flex items-center justify-between">
              <label className="mr-6">
                Titel:{' '}
                <input
                  className="mx-1 rounded-sm p-1"
                  type="text"
                  value={nodes[active].title}
                  onChange={(e) => {
                    const value = e.currentTarget.value
                    setNodes((oldNodes) => {
                      oldNodes[active].title = value
                      return oldNodes
                    })
                    setRenderCounter((counter) => counter + 1)
                  }}
                />
              </label>
              Node-ID: {active}
              <button
                onClick={() => {
                  setNodes((currentNodes) => {
                    Object.values(currentNodes).forEach((node) => {
                      node.deps = node.deps.filter((depId) => depId !== active)
                    })
                    delete nodes[active]
                    return currentNodes
                  })
                  setActive(undefined)
                  setRenderCounter((counter) => counter + 1)
                }}
              >
                <FaIcon icon={faTrash} /> Remove Node
              </button>
            </div>
          ) : (
            <>&nbsp;</>
          )}
        </div>
      </>
    </div>
  )
}

export default ContentPage

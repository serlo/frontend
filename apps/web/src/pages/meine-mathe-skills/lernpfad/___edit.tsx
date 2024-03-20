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

  function forceRender() {
    setRenderCounter((counter) => counter + 1)
  }

  return (
    <div className="mx-auto w-fit px-4">
      <h2 className="mb-3 mt-8 text-2xl font-bold">Edit Tree</h2>
      <div className="mb-7 mt-4">
        <ul className="serlo-ul">
          <li>Create new node: CTRL/CMD-Click somewhere on the image</li>
          <li>
            Create connection: Click on a node (child) and CTRL/CMD-Click on
            another node (parent)
          </li>
          <li>Remove connection: CTRL/CMD-Click on a connections</li>
        </ul>
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
      </div>
      <div className="min-h-12 w-full bg-gray-100 p-2">
        {active !== undefined ? (
          <div className="flex items-center justify-between">
            <label className="mr-6">
              Titel:{' '}
              <input
                id="title-input"
                className="mx-1 rounded-sm p-1"
                type="text"
                value={nodes[active].title}
                onChange={(e) => {
                  const value = e.currentTarget.value
                  setNodes((currentNodes) => {
                    currentNodes[active].title = value
                    return currentNodes
                  })
                  forceRender()
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
                forceRender()
              }}
            >
              <FaIcon icon={faTrash} /> Remove Node
            </button>
          </div>
        ) : (
          <>&nbsp;</>
        )}
      </div>
      <div
        className="relative h-[668px] w-[800px]"
        id="tree-wrapper"
        style={{
          backgroundImage: "url('/_assets/mathe-skills/high-five.jpg')",
        }}
        onMouseDown={(e) => {
          const div = e.target as HTMLButtonElement
          if (div.tagName.toLowerCase() !== 'button') return
          const numId = parseInt(div.id)
          setMovingIndex(numId)
        }}
        onMouseUp={() => {
          setMovingIndex(undefined)
        }}
        onMouseMove={(e) => {
          if (movingIndex === undefined) return
          const wrapper = e.currentTarget

          setNodes((currentNodes) => {
            currentNodes[movingIndex].x = e.pageX - wrapper.offsetLeft
            currentNodes[movingIndex].y = e.pageY - wrapper.offsetTop
            return currentNodes
          })
          forceRender()
        }}
        onClick={(e) => {
          if (!e.metaKey) return
          const target = e.target as HTMLElement
          if (target.tagName.toLowerCase() !== 'svg') return

          const wrapper = e.currentTarget
          const newId = parseInt(Object.keys(nodes).at(-1) ?? '0') + 1
          setNodes((currentNodes) => {
            currentNodes[newId] = {
              title: '',
              deps: [],
              x: e.pageX - wrapper.offsetLeft,
              y: e.pageY - wrapper.offsetTop,
            }
            return currentNodes
          })
          setActive(newId)
          setTimeout(() => {
            document.getElementById('title-input')?.focus()
          })
          forceRender()
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
                      className="cursor-cell"
                      key={`connect-${id}-${dep}`}
                      x1={node.x}
                      y1={node.y}
                      x2={nodes[dep].x}
                      y2={nodes[dep].y}
                      strokeWidth="10"
                      stroke="rgba(148, 163, 184, 0.8)"
                      onClick={(e) => {
                        if (!e.metaKey) return
                        setNodes((currentNodes) => {
                          const node = currentNodes[parseInt(id)]
                          node.deps = node.deps.filter((depId) => depId !== dep)
                          return currentNodes
                        })
                        forceRender()
                      }}
                    />
                  )
                })}
              </Fragment>
            )
          })}
        </svg>
        {Object.entries(nodes).map(([id, node]) => {
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
                id={id}
                className={cn(
                  'absolute cursor-move  whitespace-nowrap rounded px-2 py-0.5 font-bold',
                  active === parseInt(id)
                    ? 'bg-orange-200 hover:bg-orange-300'
                    : 'bg-gray-200 hover:bg-gray-300'
                )}
                onClick={(e) => {
                  if (e.metaKey && active) {
                    //new connection from currently active element
                    setNodes((currentNodes) => {
                      const numId = parseInt(id)
                      if (!currentNodes[active].deps.includes(numId)) {
                        currentNodes[active].deps.push(numId)
                      }
                      return currentNodes
                    })
                    forceRender()
                  } else {
                    setActive(parseInt(id))
                  }
                }}
              >
                {node.title.length ? node.title : <>&nbsp;</>}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContentPage

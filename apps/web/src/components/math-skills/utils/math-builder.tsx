import { StaticMath } from '@editor/plugins/text/static-components/static-math'
import { useState, useEffect } from 'react'

import { JSXGraphWrapper } from './jsx-graph-wrapper'
import { cn } from '@/helper/cn'

export function buildFrac(
  x: JSX.Element | string | number,
  y: JSX.Element | string | number
) {
  return (
    <div className="relative mx-0.5 inline-block text-center align-middle">
      <span className="block p-0.5">{x}</span>
      <span className="block border-t border-black p-0.5">{y}</span>
    </div>
  )
}

export function buildOverline(x: JSX.Element | number | string) {
  return <span className="overline">{x}</span>
}

export function buildSqrt(x: JSX.Element | number | string) {
  return (
    <>
      <span className="text-2xl">&#8730;</span>
      {buildOverline(x)}
    </>
  )
}

export function buildBigSqrt(x: JSX.Element) {
  return (
    <>
      <span
        className="inline-block scale-y-[2.67] text-2xl"
        style={{ verticalAlign: '-3px' }}
      >
        &#8730;
      </span>
      <span className="inline-block border-t border-black px-1">{x}</span>
    </>
  )
}

export function buildVec2(
  x: JSX.Element | string | number,
  y: JSX.Element | string | number
) {
  return (
    <>
      <span className="inline-block  scale-y-[2.6]">(</span>
      <div className="mx-0.5 inline-block text-center align-middle">
        <div>{x}</div>
        <div>{y}</div>
      </div>
      <span className="inline-block scale-y-[2.6]">)</span>
    </>
  )
}

export function buildLatex(src: string) {
  return <StaticMath src={src} inline type="math" />
}

export function buildBlock(
  color: 'gray' | 'green' | 'orange',
  x: JSX.Element | string
) {
  return (
    <div
      className={cn(
        'my-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl',
        color === 'gray' && 'bg-gray-300',
        color === 'green' && 'bg-newgreen',
        color === 'orange' && 'bg-yellow'
      )}
    >
      {x}
    </div>
  )
}

export function buildVec(x: JSX.Element | string | number) {
  return (
    <span className="relative mr-0.5 inline-block">
      <div className="absolute -top-[0.13em] left-0 right-0">
        <div className="flex justify-end">{rightarrow}</div>
      </div>
      <div>{x}</div>
    </span>
  )
}

export function buildMat2(
  x1: JSX.Element | string | number,
  x2: JSX.Element | string | number,
  y1: JSX.Element | string | number,
  y2: JSX.Element | string | number
) {
  return (
    <>
      <span className="inline-block  scale-y-[2.6]">(</span>
      <div className="mx-1 inline-block text-center align-middle">
        <div>{x1}</div>
        <div>{y1}</div>
      </div>
      <div className="mx-1 inline-block text-center align-middle">
        <div>{x2}</div>
        <div>{y2}</div>
      </div>
      <span className="inline-block scale-y-[2.6]">)</span>
    </>
  )
}

export function buildDet2(
  x1: JSX.Element | string | number,
  x2: JSX.Element | string | number,
  y1: JSX.Element | string | number,
  y2: JSX.Element | string | number
) {
  return (
    <>
      <div className="inline-block border-l border-black pl-1 pr-2 text-center align-middle">
        <div>{x1}</div>
        <div>{y1}</div>
      </div>
      <div className="inline-block border-r border-black pl-2 pr-1 text-center align-middle">
        <div>{x2}</div>
        <div>{y2}</div>
      </div>
    </>
  )
}

const rightarrow = (
  <svg
    height="0.522em"
    viewBox="0 0 400000 522"
    preserveAspectRatio="xMaxYMin slice"
  >
    <path
      d="M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z"
    ></path>
  </svg>
)

interface JSXOptions {
  id?: string
  width?: number
  height?: number
}

export function buildJSX(f: () => Board, dep: object, opts: JSXOptions = {}) {
  if (!opts.width) opts.width = 300
  if (!opts.height) opts.height = 300
  if (!opts.id) opts.id = 'jxgbox'
  return (
    <JSXGraph
      f={f}
      id={opts.id}
      dep={dep}
      width={opts.width}
      height={opts.height}
    />
  )
}

type Board = ReturnType<typeof JXG.JSXGraph.initBoard>

function JSXGraph({
  f,
  dep,
  id,
  width,
  height,
}: {
  f: () => Board
  dep: object
  id: string
  width: number
  height: number
}) {
  const [board, setBoard] = useState<Board | null>(null)

  useEffect(() => {
    setBoard(f())

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep])

  return <JSXGraphWrapper id={id} width={width} height={height} />
}

import JXG from 'jsxgraph'
import { useEffect, useRef } from 'react'

import { type WofData } from './wheel-of-fortune-step-by-step'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'
import { randomIntBetween } from '@/helper/random-int-between'

export function WheelDiagram({ data }: { data: WofData }) {
  const board = useRef<JXG.Board | null>(null)

  const { sections } = data

  function setRotation(deg: number, relative?: boolean) {
    const svg = board.current?.containerObj.querySelector('svg')
    if (!svg) return
    const currentDeg = relative
      ? parseInt(svg.style.rotate.replace('deg', ''))
      : 0
    svg.style.rotate = currentDeg + deg + 'deg'
  }

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
    })
    board.current = b

    const colors = sections.map((value) => (value ? '#FFBE5E' : '#007EC1'))
    const parts = arrayOfLength(sections.length).map(() => 1)

    b.create('chart', parts, {
      chartStyle: 'pie',
      colors,
      center: [0, 0],
      strokeColor: '#222',
      strokeWidth: 2,
    })

    b.create('text', [-0.2, 4, '⧪'], {
      color: '#222',
      fontSize: '20',
    })

    setTimeout(() => setRotation(randomIntBetween(310, 420)))

    return () => {
      if (board.current) JXG.JSXGraph.freeBoard(board.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections])

  return (
    <>
      <div
        id="jxgbox"
        className={cn(
          'jxgbox pointer-events-none mb-2 mt-6 h-[300px] w-[300px] rounded-2xl border border-gray-200',
          '[&_svg]:transition-[rotate] [&_svg]:ease-out [&_svg]:[transition-duration:1500ms]	'
        )}
        style={{ rotate: '0deg' }}
        onClickCapture={() => setRotation(randomIntBetween(220, 460), true)}
      ></div>
    </>
  )
}

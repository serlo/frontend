import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { type WofData } from './wheel-of-fortune-step-by-step'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'
import { randomIntBetween } from '@/helper/random-int-between'

export function WheelDiagram({ data }: { data: WofData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  const { sections } = data

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
    })

    const colors = sections.map((value) => (value ? '#FFBE5E' : '#007EC1'))
    const parts = arrayOfLength(sections.length).map(() => 1)

    b.create('chart', parts, {
      chartStyle: 'pie',
      colors,
      center: [0, 0],
      strokeColor: '#222',
      strokeWidth: 2,
      highlightOnSector: true,
      hightlightStrokeColor: '#cc0022',
    })

    b.create('text', [-0.2, 4, '⧪'], { color: '#222', fontSize: 24 })

    setBoard(b)

    setTimeout(() => {
      const svg = b.containerObj.querySelector('svg')
      const deg = randomIntBetween(310, 420)
      if (svg) svg.style.rotate = deg + 'deg'
    }, 0)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
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
      ></div>
      <style jsx global>
        {`
          .JXGtext {
            font-family: Karla, sans-serif !important;
            font-weight: bold !important;
            font-size: 18px !important;
          }
        `}
      </style>
    </>
  )
}

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

  function setRotation(deg: number, relative?: boolean) {
    const svg = board?.containerObj.querySelector('svg')
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

    setBoard(b)

    setTimeout(() => setRotation(randomIntBetween(310, 420)))

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
        onClickCapture={() => setRotation(randomIntBetween(0, 360), true)}
      ></div>
    </>
  )
}

import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'
// import '@/assets-webkit/fonts/default.css'

// diagram code from https://jsxgraph.uni-bayreuth.de/share/example/chart-assessment

const inputLabel = ['A', 'B', 'C', 'D', 'E']
const inputValue = [20, 40, 10, 35, 5]
const max = inputValue.length
const width = 35 - max

export function JSXGraphExample() {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const newBoard = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-0.5, 55, max + 1, -5],
      axis: true,
      defaultAxes: {
        x: { ticks: { label: { visible: false } } },
      },
      showNavigation: false,
      showCopyright: false,
    })

    const G = []
    for (let i = 0; i < max; i++) {
      const par = newBoard.create(
        'segment',
        [
          [i + 1, 0],
          [i + 1, 100],
        ],
        { name: '', fixed: true, visible: false }
      )
      G[i] = newBoard.create('glider', [i + 1, inputValue[i], par], {
        name: '',
        snapToGrid: true,
        face: 'minus',
        size: width / 2,
        strokeWidth: 4,
        strokeColor: '#00cc00',
        showInfoBox: false,
      })
      newBoard.create('segment', [[i + 1, 0], G[i]], {
        name: '',
        fixed: true,
        visible: true,
        strokeWidth: width,
        strokeColor:
          'rgb(' + (255 * (max - i)) / max + ', 0, ' + (255 * i) / max + ')',
        highLightstrokeColor:
          'rgb(' + (255 * (max - i)) / max + ', 0, ' + (255 * i) / max + ')',
      })
      newBoard.create('text', [i + 1, -2, inputLabel[i]], {
        name: '',
        fixed: true,
        anchorX: 'middle',
      })
    }

    setBoard(newBoard)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
        JSXGraph Example
      </h2>
      <div id="wrapper" className="">
        <div id="jxgbox" className="jxgbox h-[200px] w-[500px]"></div>
      </div>
    </>
  )
}

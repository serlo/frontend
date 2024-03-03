import { useState, type TouchEvent, type MouseEvent, useEffect } from 'react'

import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

export function BarGraphSVG({
  maxValue,
  values,
  showRuler,
  allowBarResize,
}: {
  maxValue: number
  values: [number, number, number]
  showRuler?: boolean
  allowBarResize?: boolean
}) {
  const labelStep = maxValue / 8

  const [heights, setHeights] = useState(
    values.map((value) => (value / maxValue) * 200)
  )

  const [barIsDragging, setBarIsDragging] = useState<number | undefined>(
    undefined
  )
  const [rulerPosY, setRulerPosY] = useState(24)

  function getPositionY(
    e: TouchEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>
  ) {
    const clientY = Object.hasOwn(e, 'touches')
      ? e.touches[0]?.clientY
      : e.clientY
    const rect = e.currentTarget.getBoundingClientRect()

    const offsetY = clientY - rect.top
    const newPos = (offsetY / rect.height) * 242

    const limited = Math.min(Math.max(newPos, 24), 224)
    return limited
  }

  function setRulerPosition(
    e: TouchEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>
  ) {
    setRulerPosY(getPositionY(e))
  }

  function setBarPosition(
    e: TouchEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>
  ) {
    if (barIsDragging === undefined) return
    const newHeights = [...heights]

    const steps = maxValue / 80
    const newHeight = Math.ceil((224 - getPositionY(e)) / steps) * steps

    newHeights[barIsDragging] = newHeight
    setHeights(newHeights)
  }

  useEffect(() => {
    if (!allowBarResize) return
    const mouseUpHandler = () => {
      setBarIsDragging(undefined)
    }

    document.addEventListener('mouseup', mouseUpHandler)
    document.addEventListener('touchend', mouseUpHandler)
    return () => {
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('touchend', mouseUpHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  function onDragHandlerDown(index: number) {
    setBarIsDragging(index)
  }

  return (
    <svg
      onMouseMove={
        showRuler
          ? setRulerPosition
          : barIsDragging !== undefined
            ? setBarPosition
            : undefined
      }
      onTouchMove={
        showRuler
          ? setRulerPosition
          : barIsDragging !== undefined
            ? setBarPosition
            : undefined
      }
      width="195"
      height="243"
      viewBox="0 0 195 243"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'h-[22rem] w-auto touch-none',
        barIsDragging ? '[user-select:none]' : ''
      )}
    >
      <g id="bar-chart-1">
        <rect width="195" height="243" fill="white" />
        <g id="Group 243">
          <g id="Group 242">
            <path
              id="Polygon 23"
              d="M191 224.5L177.5 228.397L177.5 220.603L191 224.5Z"
              fill="#404040"
            />
            <line
              id="Line 49"
              x1="32"
              y1="224.5"
              x2="181"
              y2="224.5"
              stroke="#404040"
            />
          </g>
          <g id="Group 241">
            <path
              id="Polygon 22"
              d="M49.5 2L53.3971 17H45.6029L49.5 2Z"
              fill="#404040"
            />
            <line
              id="Line 48"
              x1="49.5"
              y1="225"
              x2="49.5"
              y2="12"
              stroke="#404040"
            />
          </g>
        </g>
        <g id="Group 240">
          <g id="Group 239">
            <line
              id="Line 48_2"
              x1="32"
              y1="199.5"
              x2="50"
              y2="199.5"
              stroke="#404040"
            />
            <line
              id="Line 48_3"
              x1="32"
              y1="24.5"
              x2="50"
              y2="24.5"
              stroke="#404040"
            />
            <line
              id="Line 48_4"
              x1="32"
              y1="99.5"
              x2="50"
              y2="99.5"
              stroke="#404040"
            />
            <line
              id="Line 48_5"
              x1="32"
              y1="74.5"
              x2="50"
              y2="74.5"
              stroke="#404040"
            />
            <line
              id="Line 48_6"
              x1="32"
              y1="174.5"
              x2="50"
              y2="174.5"
              stroke="#404040"
            />
            <line
              id="Line 48_7"
              x1="32"
              y1="149.5"
              x2="50"
              y2="149.5"
              stroke="#404040"
            />
            <line
              id="Line 48_8"
              x1="32"
              y1="124.5"
              x2="50"
              y2="124.5"
              stroke="#404040"
            />
            <line
              id="Line 48_9"
              x1="32"
              y1="49.5"
              x2="50"
              y2="49.5"
              stroke="#404040"
            />
          </g>
          <g id="Group 238">
            <line
              id="Line 49_2"
              x1="40"
              y1="219.5"
              x2="50"
              y2="219.5"
              stroke="#404040"
            />
            <line
              id="Line 50"
              x1="40"
              y1="214.5"
              x2="50"
              y2="214.5"
              stroke="#404040"
            />
            <line
              id="Line 51"
              x1="40"
              y1="209.5"
              x2="50"
              y2="209.5"
              stroke="#404040"
            />
            <line
              id="Line 52"
              x1="40"
              y1="204.5"
              x2="50"
              y2="204.5"
              stroke="#404040"
            />
            <line
              id="Line 49_3"
              x1="40"
              y1="194.5"
              x2="50"
              y2="194.5"
              stroke="#404040"
            />
            <line
              id="Line 50_2"
              x1="40"
              y1="189.5"
              x2="50"
              y2="189.5"
              stroke="#404040"
            />
            <line
              id="Line 51_2"
              x1="40"
              y1="184.5"
              x2="50"
              y2="184.5"
              stroke="#404040"
            />
            <line
              id="Line 52_2"
              x1="40"
              y1="179.5"
              x2="50"
              y2="179.5"
              stroke="#404040"
            />
            <line
              id="Line 49_4"
              x1="40"
              y1="94.5"
              x2="50"
              y2="94.5"
              stroke="#404040"
            />
            <line
              id="Line 50_3"
              x1="40"
              y1="89.5"
              x2="50"
              y2="89.5"
              stroke="#404040"
            />
            <line
              id="Line 51_3"
              x1="40"
              y1="84.5"
              x2="50"
              y2="84.5"
              stroke="#404040"
            />
            <line
              id="Line 52_3"
              x1="40"
              y1="79.5"
              x2="50"
              y2="79.5"
              stroke="#404040"
            />
            <line
              id="Line 49_5"
              x1="40"
              y1="69.5"
              x2="50"
              y2="69.5"
              stroke="#404040"
            />
            <line
              id="Line 50_4"
              x1="40"
              y1="64.5"
              x2="50"
              y2="64.5"
              stroke="#404040"
            />
            <line
              id="Line 51_4"
              x1="40"
              y1="59.5"
              x2="50"
              y2="59.5"
              stroke="#404040"
            />
            <line
              id="Line 52_4"
              x1="40"
              y1="54.5"
              x2="50"
              y2="54.5"
              stroke="#404040"
            />
            <line
              id="Line 49_6"
              x1="40"
              y1="169.5"
              x2="50"
              y2="169.5"
              stroke="#404040"
            />
            <line
              id="Line 50_5"
              x1="40"
              y1="164.5"
              x2="50"
              y2="164.5"
              stroke="#404040"
            />
            <line
              id="Line 51_5"
              x1="40"
              y1="159.5"
              x2="50"
              y2="159.5"
              stroke="#404040"
            />
            <line
              id="Line 52_5"
              x1="40"
              y1="154.5"
              x2="50"
              y2="154.5"
              stroke="#404040"
            />
            <line
              id="Line 49_7"
              x1="40"
              y1="144.5"
              x2="50"
              y2="144.5"
              stroke="#404040"
            />
            <line
              id="Line 50_6"
              x1="40"
              y1="139.5"
              x2="50"
              y2="139.5"
              stroke="#404040"
            />
            <line
              id="Line 51_6"
              x1="40"
              y1="134.5"
              x2="50"
              y2="134.5"
              stroke="#404040"
            />
            <line
              id="Line 52_6"
              x1="40"
              y1="129.5"
              x2="50"
              y2="129.5"
              stroke="#404040"
            />
            <line
              id="Line 49_8"
              x1="40"
              y1="119.5"
              x2="50"
              y2="119.5"
              stroke="#404040"
            />
            <line
              id="Line 50_7"
              x1="40"
              y1="114.5"
              x2="50"
              y2="114.5"
              stroke="#404040"
            />
            <line
              id="Line 51_7"
              x1="40"
              y1="109.5"
              x2="50"
              y2="109.5"
              stroke="#404040"
            />
            <line
              id="Line 52_7"
              x1="40"
              y1="104.5"
              x2="50"
              y2="104.5"
              stroke="#404040"
            />
            <line
              id="Line 49_9"
              x1="40"
              y1="44.5"
              x2="50"
              y2="44.5"
              stroke="#404040"
            />
            <line
              id="Line 50_8"
              x1="40"
              y1="39.5"
              x2="50"
              y2="39.5"
              stroke="#404040"
            />
            <line
              id="Line 51_8"
              x1="40"
              y1="34.5"
              x2="50"
              y2="34.5"
              stroke="#404040"
            />
            <line
              id="Line 52_8"
              x1="40"
              y1="29.5"
              x2="50"
              y2="29.5"
              stroke="#404040"
            />
          </g>
        </g>

        {renderBar(0, 63, '#3BCDB1')}
        {renderBar(1, 101, '#FCBA7A')}
        {renderBar(2, 139, '#F67274')}

        <text
          xmlSpace="preserve"
          className="whitespace-pre fill-almost-black text-[11px] font-extrabold"
        >
          <tspan x="62.7329" y="238.158">
            2021
          </tspan>
        </text>
        <text
          id="2022"
          xmlSpace="preserve"
          className="whitespace-pre fill-almost-black text-[11px] font-extrabold"
        >
          <tspan x="99.8687" y="238.158">
            2022
          </tspan>
        </text>
        <text
          id="2023"
          xmlSpace="preserve"
          className="whitespace-pre fill-almost-black text-[11px] font-extrabold"
        >
          <tspan x="137.74" y="238.158">
            2023
          </tspan>
        </text>
        <text
          id="Jahr"
          xmlSpace="preserve"
          className="whitespace-pre fill-gray-400 text-[11px] font-extrabold"
        >
          <tspan x="170" y="238.493">
            Jahr
          </tspan>
        </text>
        <text
          id="Zahlenwert"
          transform="translate(57 6)"
          xmlSpace="preserve"
          className="whitespace-pre fill-gray-400 text-[11px] font-extrabold"
        >
          <tspan x="0" y="8.4925">
            Zahlenwert
          </tspan>
        </text>

        {showRuler ? (
          <line
            x1="49.5"
            x2="190"
            y1={rulerPosY}
            y2={rulerPosY}
            className="stroke-black"
            strokeDasharray="2"
          />
        ) : null}

        {renderNumberLabels()}
      </g>
    </svg>
  )

  function renderBar(index: number, xPos: number, color: string) {
    const yPos = 224 - heights[index]
    return (
      <>
        <rect
          onMouseDown={() => onDragHandlerDown(index)}
          onTouchStart={() => onDragHandlerDown(index)}
          x={xPos}
          y={yPos}
          width="26"
          height={heights[index]}
          fill={color}
          className="cursor-pointer opacity-60"
        />
        {allowBarResize ? (
          <>
            <line
              x1={50}
              x2={xPos + 25}
              y1={yPos}
              y2={yPos}
              stroke={color}
              strokeDasharray="4"
              strokeLinecap="round"
              className="stroke-brand"
            />
            <circle
              onMouseDown={() => onDragHandlerDown(index)}
              onTouchStart={() => onDragHandlerDown(index)}
              cx={xPos + 25}
              cy={yPos}
              r="6"
              stroke={color}
              fill={color}
              strokeDasharray={2.6}
              strokeLinecap="round"
              className="cursor-pointer stroke-brand"
            />
          </>
        ) : null}
      </>
    )
  }

  function renderNumberLabels() {
    return arrayOfLength(9).map((_, i) => {
      return (
        <text
          key={i}
          transform={`translate(0 ${218 - i * 25})`}
          xmlSpace="preserve"
          textAnchor="end"
          className="fill-almost-block whitespace-pre fill-almost-black text-right text-[11px] font-extrabold"
        >
          <tspan x="28.5" y="10.1">
            {i * labelStep}
          </tspan>
        </text>
      )
    })
  }
}

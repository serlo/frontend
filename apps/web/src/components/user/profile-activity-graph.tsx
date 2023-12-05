import { faGrinStars } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

interface ProfileActivityGraphProps {
  value: number
  maxValue: number
  title: string
}

const maxLevel = 5
const fullRadius = 50
const minRadius = 15

export function ProfileActivityGraph({
  value,
  maxValue,
  title,
}: ProfileActivityGraphProps) {
  const { activityGraph } = useInstanceData().strings.profiles

  const factor = Math.sqrt(maxValue) / maxLevel
  const progress = Math.sqrt(value) / factor // 0 to maxLevel
  const level = Math.floor(progress) // 0 to maxLevel
  const extraAmount = progress - level // 0 to 1
  const untilNextLevel = Math.floor(Math.pow((level + 1) * factor, 2)) - value

  const radiusStep = (fullRadius - minRadius) / maxLevel
  const innerRadius = minRadius + level * radiusStep
  const progressRadius = innerRadius + 0.5 * radiusStep // since strokes get centered
  const dashArray = 2 * Math.PI * progressRadius

  const [dashOffset, setDashOffset] = useState(dashArray)
  const dashOffsetTarget = (1 - extraAmount) * dashArray

  const isLegendary = value >= maxValue

  // start animation
  useEffect(() => {
    setDashOffset(dashOffsetTarget)
  }, [dashOffsetTarget])

  return (
    <figure
      className="relative mx-side w-36 text-center text-brand"
      title={
        isLegendary
          ? activityGraph.legendary
          : activityGraph.untilNextLevel.replace(
              '%amount%',
              untilNextLevel.toString()
            )
      }
    >
      <h3 className="mb-2 mt-5 text-xl font-bold">{title}</h3>
      {isLegendary ? renderLegendary() : renderGraphInProgress()}
    </figure>
  )

  function renderLegendary() {
    return (
      <>
        <FaIcon icon={faGrinStars} className="h-32 w-32 text-brandgreen-100" />
        <p className="text-xl font-bold text-brandgreen">{value}</p>
      </>
    )
  }

  function renderGraphInProgress() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="h-36 w-36"
        >
          <circle
            r={progressRadius}
            cx={fullRadius}
            cy={fullRadius}
            className="fill-none stroke-brandgreen-50"
            style={{ strokeWidth: radiusStep }}
          />
          <circle
            r={progressRadius}
            cx={fullRadius}
            cy={fullRadius}
            className="origin-center rotate-90 fill-none stroke-brandgreen-300"
            style={{
              strokeWidth: radiusStep,
              transition: 'all ease 3s',
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
          <circle
            r={innerRadius}
            cx={fullRadius}
            cy={fullRadius}
            className="fill-brandgreen"
          />
          <text
            className="fill-current text-xs font-bold text-white"
            textAnchor="middle"
            x={fullRadius}
            y="54"
          >
            {value}
          </text>
        </svg>
      </>
    )
  }
}

import { faGrinStars } from '@fortawesome/free-solid-svg-icons/faGrinStars'
import { tint } from 'polished'
import { useState, useEffect } from 'react'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { theme } from '@/theme'

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
      className="mx-side w-36 text-center text-brand relative"
      title={
        isLegendary
          ? activityGraph.legendary
          : activityGraph.untilNextLevel.replace(
              '%amount%',
              untilNextLevel.toString()
            )
      }
    >
      <h3 className="text-xl font-bold mt-5 mb-2">{title}</h3>
      {!isLegendary ? renderLegendary() : renderGraphInProgress()}
    </figure>
  )

  function renderLegendary() {
    return (
      <>
        <FaIcon
          icon={faGrinStars}
          className="text-brandgreen-light h-32 w-32"
        />
        <p
          className="font-bold text-xl"
          style={{ color: theme.colors.brandGreen }}
        >
          {value}
        </p>
      </>
    )
  }

  function renderGraphInProgress() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-36 h-36"
        >
          <circle
            r={progressRadius}
            cx={fullRadius}
            cy={fullRadius}
            style={{
              fill: 'none',
              stroke: tint(0.85, theme.colors.brandGreen),
              strokeWidth: radiusStep,
            }}
          />
          <circle
            r={progressRadius}
            cx={fullRadius}
            cy={fullRadius}
            style={{
              fill: 'none',
              stroke: tint(0.5, theme.colors.brandGreen),
              strokeWidth: radiusStep,
              transition: 'all ease 3s',
              transformOrigin: 'center',
              transform: 'rotate(90deg)',
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
          <circle
            r={innerRadius}
            cx={fullRadius}
            cy={fullRadius}
            style={{ fill: theme.colors.brandGreen }}
          />
          <text
            className="font-bold text-white fill-current"
            textAnchor="middle"
            x={fullRadius}
            y="54"
            style={{ fontSize: 12 }}
          >
            {value}
          </text>
        </svg>
      </>
    )
  }
}

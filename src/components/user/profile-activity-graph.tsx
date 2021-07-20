import {
  faCircle,
  faGrinStars,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tint } from 'polished'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { theme } from '@/theme'

const max_value = 10_000

export function ProfileActivityGraph({
  value,
  title,
}: {
  value: number
  title: string
}) {
  const { strings } = useInstanceData()

  const progress = Math.log10(Math.min(value, max_value))
  const max_level = Math.floor(Math.log10(max_value))
  const level = Math.floor(progress)
  const amount = progress - level

  const dashArray = 283
  const dashOffsetMin = 17 //space for the heart
  const [dashOffset, setDashOffset] = useState(dashArray)
  const dashOffsetTarget =
    dashOffsetMin + (1 - amount) * (dashArray - dashOffsetMin)

  // start animation
  useEffect(() => {
    setDashOffset(dashOffsetTarget)
  }, [amount, dashOffsetTarget])

  return (
    <figure className="mx-side w-40 text-center text-brand relative">
      <h3 className="text-xl font-bold mt-5 mb-2">{title}</h3>
      {level >= max_level ? renderLegendary() : renderGraphInProgress()}
    </figure>
  )

  function renderLegendary() {
    return (
      <>
        <FontAwesomeIcon
          icon={faGrinStars}
          size="10x"
          style={{ color: theme.colors.lighterBrandGreen }}
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
    const levels = [faCircle, faCircle, faHeart, faStar]
    const levelCeil = Math.pow(10, Math.ceil(progress)).toString()
    const titleString =
      level > 0
        ? strings.profiles.activityGraph.levelTitle
            .replace('%level%', level.toString())
            .replace('%max_level%', Math.log10(max_value).toString())
            .replace('%level_ceil%', levelCeil)
        : strings.profiles.activityGraph.noLevel

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-40 h-40"
        >
          <circle
            r="45"
            cx="50"
            cy="50"
            style={{
              fill: tint(0.85, theme.colors.brandGreen),
              stroke: tint(0.75, theme.colors.brandGreen),
              strokeWidth: 5,
            }}
          />
          <circle
            r="45"
            cx="50"
            cy="50"
            style={{
              fill: 'none',
              stroke: tint(0.4, theme.colors.brandGreen),
              strokeWidth: 5,
              transition: 'all ease 3s',
              transformOrigin: 'center',
              transform: 'rotate(58deg)',
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
          <circle
            r={(progress / max_level) * 40}
            cx="50"
            cy="50"
            style={{ fill: theme.colors.brandGreen }}
          />
          <text
            className="font-bold text-white fill-current"
            textAnchor="middle"
            x="50"
            y="54"
            style={{ fontSize: 12 }}
          >
            {value}
          </text>
        </svg>

        <HeartLevel
          title={titleString}
          className="cursor-pointer"
          level={level}
        >
          {level > 0 && <span>{level}</span>}
          <FontAwesomeIcon icon={levels[level]} />
        </HeartLevel>
      </>
    )
  }
}

const HeartLevel = styled.div<{ level: number }>`
  position: absolute;
  margin-top: -3.1rem;
  right: 0.9rem;
  width: 2.3rem;
  height: 2.3rem;
  color: ${(props) => props.theme.colors.brandGreen};
  font-size: 2.2rem;

  > span {
    position: absolute;
    width: 2.15rem;
    margin-top: 0.45rem;
    font-weight: bold;
    font-size: 1.3rem;
    color: #fff;
  }

  ${(props) =>
    props.level === 3 &&
    css`
      > svg {
        margin-left: -2px;
        margin-bottom: 3px;
      }
    `};
  ${(props) =>
    props.level === 1 &&
    css`
      > svg {
        margin-bottom: 1px;
      }
    `};
`

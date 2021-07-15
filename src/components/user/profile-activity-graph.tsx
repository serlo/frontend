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

interface ProfileActivityGraphProps {
  value: number
  title: string
}

const levels = {
  0: { floor: 0, ceil: 10, icon: faCircle },
  1: { floor: 10, ceil: 100, icon: faCircle },
  2: { floor: 100, ceil: 1000, icon: faHeart },
  3: { floor: 1000, ceil: 10000, icon: faStar },
  4: { floor: 10000, ceil: -1, icon: faGrinStars },
}

export function ProfileActivityGraph({
  value,
  title,
}: ProfileActivityGraphProps) {
  const { strings } = useInstanceData()

  const level = Math.min(Math.floor(Math.log10(value)), 4) as 1 | 2 | 3 | 4

  const levelAmount = levels[level].ceil - levels[level].floor
  const missing = levelAmount - (value - levels[level].floor)
  const amount = 1 - missing / levelAmount

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
      {level === 4 ? renderLegendary() : renderGraphInProgress()}
    </figure>
  )

  function renderLegendary() {
    return (
      <>
        <FontAwesomeIcon
          icon={levels[level].icon}
          size="10x"
          style={{ color: theme.colors.lighterBrandGreen }}
        />
        <AbsoluteNumber legendary>{value}</AbsoluteNumber>
      </>
    )
  }

  function renderGraphInProgress() {
    const titleString =
      level > 0
        ? strings.profiles.activityGraph.levelTitle
            .replace('%level%', level.toString())
            .replace('%max_level%', '4')
            .replace('%level_ceil%', levels[level].ceil.toString())
        : strings.profiles.activityGraph.noLevel

    return (
      <>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <OuterCircle r="45" cx="50" cy="50" />
          <ProgressCircle
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
          <InnerCircle r="24" cx="50" cy="50" />
        </StyledSVG>
        <AbsoluteNumber>{value}</AbsoluteNumber>

        <HeartLevel
          title={titleString}
          className="cursor-pointer"
          level={level}
        >
          {level > 0 && <span>{level}</span>}
          <FontAwesomeIcon icon={levels[level].icon} />
        </HeartLevel>
      </>
    )
  }
}

const StyledSVG = styled.svg`
  height: 10rem;
  width: 10rem;
`

const OuterCircle = styled.circle`
  fill: ${(props) => tint(0.85, props.theme.colors.brandGreen)};
  stroke: ${(props) => tint(0.75, props.theme.colors.brandGreen)};
  stroke-width: 5;
`

const InnerCircle = styled.circle`
  fill: ${(props) => props.theme.colors.brandGreen};
`

const ProgressCircle = styled.circle`
  fill: none;
  stroke: ${(props) => tint(0.4, props.theme.colors.brandGreen)};
  stroke-width: 5;
  transition: all ease 3s;
  transform-origin: center;
  transform: rotate(58deg);
`

const AbsoluteNumber = styled.div<{ legendary?: boolean }>`
  position: absolute;
  margin-top: -6rem;
  width: 10rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.33rem;

  ${(props) =>
    props.legendary &&
    css`
      margin-top: 0;
      color: ${(props) => props.theme.colors.brandGreen};
    `};
`

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

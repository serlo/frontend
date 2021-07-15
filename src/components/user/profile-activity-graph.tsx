import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tint } from 'polished'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

interface ProfileActivityGraphProps {
  isOwnProfile: boolean
  amount?: number
  absoluteValue: number
  title: string
}

export function ProfileActivityGraph({
  isOwnProfile,
  amount,
  absoluteValue,
  title,
}: ProfileActivityGraphProps) {
  const dashArray = 283
  const dashOffsetMin = 17 //space for the heart
  const [dashOffset, setDashOffset] = useState(dashArray)
  const dashOffsetTarget =
    dashOffsetMin + (1 - amount) * (dashArray - dashOffsetMin)

  // start animation
  useEffect(() => {
    setDashOffset(dashOffsetTarget)
  }, [amount])

  return (
    <figure className="mx-side w-40 text-center text-brand relative">
      <h3 className="text-xl font-bold mt-5 mb-2 ">{title}</h3>
      <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <OuterCircle r="45" cx="50" cy="50" />
        {amount && (
          <ProgressCircle
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
          />
        )}
        <InnerCircle r="24" cx="50" cy="50" />
      </StyledSVG>
      <AbsoluteNumber>{absoluteValue}</AbsoluteNumber>
      {amount && (
        <>
          <HeartLevel>
            <span>1</span>
            <FontAwesomeIcon icon={faHeart} />
          </HeartLevel>

          {isOwnProfile && (
            <figcaption className="mt-2">Noch 22 bis Level 2!</figcaption>
          )}
        </>
      )}
    </figure>
  )
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
  transition: all ease 3.5s;
  transform-origin: center;
  transform: rotate(58deg);
`

const AbsoluteNumber = styled.div`
  position: absolute;
  margin-top: -6rem;
  width: 10rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.33rem;
`

const HeartLevel = styled.div`
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
`

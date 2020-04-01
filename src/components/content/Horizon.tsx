import React from 'react'
import styled from 'styled-components'
import { makePadding } from '../../helper/csshelper'

interface HorizonEntry {
  imageUrl: string
  title: string
  text: string
  url: string
}

interface HorizonProps {
  entries: HorizonEntry[]
  randoms: number[]
}

function shuffle(a, randoms) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    const r = randoms.pop()
    j = Math.floor(randoms.pop() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export default function Horizon({ entries, randoms }: HorizonProps) {
  // this is absolute deep shit
  entries = entries.slice(0)
  randoms = randoms.slice(0)
  shuffle(entries, randoms)
  return (
    <Wrapper>
      {entries.map((horizonEntry, index) => {
        return (
          <Item href={horizonEntry.url} key={index}>
            <Image alt={horizonEntry.title} src={horizonEntry.imageUrl} />
            <Headline>{horizonEntry.title}</Headline>
            <Text>{horizonEntry.text}</Text>
          </Item>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  ${makePadding}
  padding-top: 32px;
  padding-bottom: 24px;
  margin-left: -10px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const Item = styled.a`
  color: ${props => props.theme.colors.brand};
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  text-decoration: none;
  max-width: 400px;
  width: 29.3%;
  padding: 15px 10px;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(170, 170, 170, 0.25);
    color: ${props => props.theme.colors.darkgray};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    /* quickfix: slider or not loading them at all would be better */
    display: none;
    &:first-child {
      display: block;
    }
    margin-bottom: 30px;
    width: 100%;
  }
`

const Image = styled.img`
  align-self: center;
  margin-bottom: 10px;
  max-width: 400px;
  width: 98%;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 400px;
  }
`

const Headline = styled.h4`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 10px 0 5px;
`

const Text = styled.p`
  margin: 0;
`

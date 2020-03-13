import React from 'react'
import styled from 'styled-components'

function HelloWorld() {
  const [gray, setGray] = React.useState(false)

  React.useEffect(() => {
    function handleScroll() {
      const scrollY = window.pageYOffset
      setGray(scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <BigDiv>
      <Par gray={gray}>Please scroll down a little bit ...</Par>
    </BigDiv>
  )
}

const BigDiv = styled.div`
  height: 4000px;
`

const Par = styled.p<{ gray: boolean }>`
  font-size: 3rem;
  text-align: center;
  margin-top: 500px;
  ${props => (props.gray ? 'color:lightgray;' : '')}
`

export default HelloWorld

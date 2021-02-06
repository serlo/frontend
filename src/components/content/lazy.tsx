import * as React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

type LazyProps = React.Props<React.ReactNode> & PlaceholderProps

export function Lazy(props: LazyProps) {
  return (
    <>
      <LazyLoad
        once
        offset={220}
        placeholder={
          <Placeholder className="lazyload-placeholder" slim={props.slim} />
        }
      >
        {props.children}
      </LazyLoad>
      <noscript>
        <style>{`.lazyload-placeholder { display: none; }`}</style>
        {props.children}
      </noscript>
    </>
  )
}

interface PlaceholderProps {
  slim?: boolean
}

const Placeholder = styled.div<PlaceholderProps>`
  background-color: ${(props) => props.theme.colors.bluewhite};
  height: auto;
  padding-bottom: ${(props) => (props.slim ? '80px' : '65%')};
`

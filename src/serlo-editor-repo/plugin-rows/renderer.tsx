import * as React from 'react'

import { RowsProps } from '.'
import { styled } from '../ui'

const Row = styled.div({
  marginBottom: '25px',
})

export function RowsRenderer(props: RowsProps) {
  return (
    <>
      {props.state.map((row) => {
        return <Row key={row.id}>{row.render()}</Row>
      })}
    </>
  )
}

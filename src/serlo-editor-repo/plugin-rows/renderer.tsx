import { styled } from '../ui'
import * as React from 'react'

import { RowsProps } from '.'

const Row = styled.div({
  marginBottom: '25px',
})

export function RowsRenderer(props: RowsProps) {
  return (
    <React.Fragment>
      {props.state.map((row) => {
        return <Row key={row.id}>{row.render()}</Row>
      })}
    </React.Fragment>
  )
}

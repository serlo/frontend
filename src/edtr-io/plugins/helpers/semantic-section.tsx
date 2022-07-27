import { styled } from '@edtr-io/ui'
import * as React from 'react'

const Container = styled.div({
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)',
  marginTop: '10px',
  padding: '10px',
  minHeight: '70px',
  position: 'relative',
})

export function SemanticSection(props: SemanticSectionProps) {
  const { children, editable } = props
  if (!editable) return <>{children}</>

  return <Container>{props.children}</Container>
}

export interface SemanticSectionProps {
  children: React.ReactNode
  editable?: boolean
}

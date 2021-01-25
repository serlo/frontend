import React from 'react'

import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'

export function LoadingError({ error }: { error: object }) {
  const { strings } = useInstanceData()
  console.log(error)
  return <StyledP>{strings.loading.unknownProblem}</StyledP>
}

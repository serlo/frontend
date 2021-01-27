import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'

export function LoadingError({ error }: { error: object }) {
  const { strings } = useInstanceData()
  console.log(error)
  return (
    <ColoredIcon>
      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
      {strings.loading.unknownProblem}
    </ColoredIcon>
  )
}

const ColoredIcon = styled(StyledP)`
  margin-top: 50px;
  color: ${(props) => props.theme.colors.brand};
`

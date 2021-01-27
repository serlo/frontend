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
      <StyledP>
        <FontAwesomeIcon icon={faExclamationCircle} />{' '}
        {strings.loading.unknownProblem}
      </StyledP>
    </ColoredIcon>
  )
}

const ColoredIcon = styled.div`
  margin-top: 50px;
  color: ${(props) => props.theme.colors.brand};
  text-align: ${(props) => (props.$center ? 'center' : 'initial')};
`

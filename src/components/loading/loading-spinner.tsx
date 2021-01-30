import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'

export interface LoadingSpinnerProps {
  text?: string
  noText?: boolean
}

export function LoadingSpinner({ text, noText }: LoadingSpinnerProps) {
  const { strings } = useInstanceData()
  return (
    <ColoredIcon $center={noText}>
      <StyledP>
        <FontAwesomeIcon icon={faSpinner} spin size={noText ? '2x' : '1x'} />{' '}
        {(!noText && text) ?? strings.loading.isLoading}
      </StyledP>
    </ColoredIcon>
  )
}

const ColoredIcon = styled.div<{ $center?: boolean }>`
  margin-top: 50px;
  color: ${(props) => props.theme.colors.brand};
  text-align: ${(props) => (props.$center ? 'center' : 'initial')};
`

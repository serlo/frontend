import styled from 'styled-components'

import { edtrColorText, EdtrIcon } from '@/serlo-editor/editor-ui'

interface ColorTextIconProps {
  color: string
}

const ColoredText = styled.span({
  position: 'relative',
  verticalAlign: 'middle',
  display: 'inline-block',
})

const FlexContainer = styled.span({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Line = styled.span<ColorTextIconProps>(({ color }) => ({
  border: `2px solid ${color}`,
  borderRadius: '4px',
  bottom: '0',
  width: '80%',
  position: 'absolute',
}))

export const ColorTextIcon = ({ color }: ColorTextIconProps) => (
  <ColoredText>
    <FlexContainer>
      <EdtrIcon icon={edtrColorText} />
      <Line color={color} />
    </FlexContainer>
  </ColoredText>
)

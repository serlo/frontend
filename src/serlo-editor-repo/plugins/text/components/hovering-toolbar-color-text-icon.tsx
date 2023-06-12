import { edtrColorText, EdtrIcon, styled } from '../../../ui'

interface HoveringToolbarColorTextIconProps {
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

const Line = styled.span<HoveringToolbarColorTextIconProps>(({ color }) => ({
  border: `2px solid ${color}`,
  borderRadius: '4px',
  bottom: '0',
  width: '80%',
  position: 'absolute',
}))

export const HoveringToolbarColorTextIcon = ({
  color,
}: HoveringToolbarColorTextIconProps) => (
  <ColoredText>
    <FlexContainer>
      <EdtrIcon icon={edtrColorText} />
      <Line color={color} />
    </FlexContainer>
  </ColoredText>
)

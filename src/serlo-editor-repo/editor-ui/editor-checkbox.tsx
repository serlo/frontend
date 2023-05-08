import { styled } from '../ui'
import { legacyEditorTheme } from '@/helper/colors'

const Container = styled.label({
  color: legacyEditorTheme.backgroundColor,
})

const ToggleContainer = styled.div({
  cursor: 'pointer',
  margin: '0 5px -1px 5px',
  border: `2px solid ${legacyEditorTheme.backgroundColor}`,
  borderRadius: '15%',
  width: '15px',
  height: '15px',
  display: 'inline-block',
  backgroundColor: 'transparent',
})

const Label = styled.span({ width: '5%' })

const Toggle = styled.div<{ value?: boolean }>(({ value }) => {
  return {
    opacity: value ? 1 : 0,
    content: '',
    position: 'absolute',
    fontWeight: 'bold',
    margin: '3px 0 0 2px',
    width: '10px',
    height: '5px',
    border: `2px solid ${legacyEditorTheme.backgroundColor}`,
    borderTop: 'none',
    borderRight: 'none',

    transform: 'rotate(-45deg)',
    zIndex: 1000,
  }
})

/**
 * @param props - Props
 * @public
 */
export function EditorCheckbox(props: EditorCheckboxProps) {
  const { checked, onChange, label } = props
  return (
    <Container>
      <Label>{label}</Label>=
      <ToggleContainer
        onClick={() => {
          if (onChange) {
            onChange(!checked)
          }
        }}
      >
        <Toggle value={checked} />
      </ToggleContainer>
    </Container>
  )
}

/** @public */
export interface EditorCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

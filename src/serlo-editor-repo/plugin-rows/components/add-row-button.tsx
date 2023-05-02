import { RowsPluginConfig } from '..'
import { styled, EdtrIcon, edtrPlus } from '../../ui'

const AddIcon = styled(EdtrIcon)({
  width: '26px',
})

interface AddButtonProps {
  focused: boolean
  visible: 'always' | 'on-focus'
  config: RowsPluginConfig
}

const AddButton = styled.div<AddButtonProps>(({ focused, visible, config }) => {
  const { theme } = config
  return {
    maxWidth: '100%',
    height: '26px',
    borderRadius: '13px',
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.color,
    backgroundColor: theme.backgroundColor,
    padding: '5px 0 10px',
    opacity: visible === 'always' ? 0.6 : focused ? 0.6 : 0,
    transition: '250ms all ease-in-out 250ms',
    // position: inline ? 'absolute' : 'relative',
    zIndex: 70,

    '&:hover': {
      color: theme.highlightColor,
      opacity: 1,
      cursor: 'pointer',
    },
  }
})

interface AddRowButtonProps {
  config: RowsPluginConfig
  focused: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  visuallyEmphasized?: boolean
}

export function AddRowButton(props: AddRowButtonProps) {
  const { config, focused, onClick, visuallyEmphasized = false } = props
  return (
    <AddButton
      className="add-trigger"
      config={config}
      focused={focused}
      visible={visuallyEmphasized ? 'always' : 'on-focus'}
      title={config.i18n.addLabel}
      onMouseDown={onClick}
    >
      <AddIcon icon={edtrPlus} />
      {visuallyEmphasized ? <span>{config.i18n.addLabel}</span> : null}
    </AddButton>
  )
}

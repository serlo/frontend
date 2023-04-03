import { styled } from '../../ui'

export const HoveringToolbarButton = styled.button<{
  active?: boolean
}>(({ active, theme }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  backgroundColor: active
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      theme.active.backgroundColor
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      theme.backgroundColor,
  cursor: 'pointer',
  boxShadow: active ? 'inset 0 1px 3px 0 rgba(0,0,0,0.50)' : undefined,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  color: active ? theme.active.color : theme.color,
  outline: 'none',
  height: '25px',
  border: 'none',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  borderRadius: theme.borderRadius,
  margin: '5px',
  padding: '0px',
  width: '25px',
  '&:hover': {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    color: theme.hoverColor,
  },
}))

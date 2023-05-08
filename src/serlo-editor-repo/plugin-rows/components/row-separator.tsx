import { RowsPluginConfig } from '..'
import { styled } from '../../ui'
import { AddRowButton } from './add-row-button'

interface SeparatorProps {
  isFirst?: boolean
  isLast?: boolean
}

const Separator = styled.div<SeparatorProps>(({ isFirst, isLast }) => ({
  position: 'absolute',
  height: 'auto',
  width: '100%',
  transform:
    isFirst && isLast
      ? undefined
      : isFirst
      ? 'translateY(-100%)'
      : isLast
      ? 'translateY(170%)'
      : 'translateY(100%)',
  top: isFirst ? 0 : undefined,
  bottom: isFirst ? undefined : 0,
  zIndex: 1,
}))

const TriggerArea = styled.div({
  width: '100%',
  padding: '2px 0 4px',
  display: 'flex',
  justifyContent: 'center',

  '&:hover .add-trigger': {
    opacity: 0.6,
  },
})

interface RowSeparatorProps {
  config: RowsPluginConfig
  isFirst?: boolean
  isLast?: boolean
  visuallyEmphasizeAddButton?: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  focused?: boolean
}

export function RowSeparator({
  config,
  isFirst,
  isLast = false,
  visuallyEmphasizeAddButton = false,
  onClick,
  focused,
}: RowSeparatorProps) {
  return (
    <Separator isFirst={isFirst} isLast={isLast}>
      <TriggerArea>
        <AddRowButton
          config={config}
          focused={focused || false}
          onClick={onClick}
          visuallyEmphasized={visuallyEmphasizeAddButton}
        />
      </TriggerArea>
    </Separator>
  )
}

import * as React from 'react'

import { styled, faSortDown, faSortUp, Icon } from '../ui'

const Container = styled.div<{ collapsed: boolean }>(({ collapsed }) => {
  return {
    borderRadius: '5px',
    boxShadow: `0 5px 5px rgba(0, 0, 0, ${collapsed ? 0 : 0.05})`,
  }
})

const toggleBackgroundColor = '#eff7fb'
const toggleColor = '#333'

const Toggle = styled.div<{
  collapsed: boolean
  editable?: boolean
  alwaysVisible?: boolean
}>(({ collapsed, editable, alwaysVisible }) => {
  return {
    backgroundColor:
      alwaysVisible || !collapsed ? toggleBackgroundColor : 'transparent',
    '& a': {
      color: toggleColor,
    },
    padding: '10px 15px 10px 10px',
    marginBottom: '10px',
    position: 'relative',
    textAlign: 'left',
    borderRadius: alwaysVisible && collapsed ? '5px' : undefined,
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    cursor: editable ? undefined : 'pointer',
  }
})

const Content = styled.div<{ collapsed: boolean }>(({ collapsed }) => {
  return {
    display: collapsed ? 'none' : 'block',
    position: 'relative',
    padding: '5px 0',
  }
})

const ToggleIcon = styled(Icon)<{ collapsed: boolean }>(({ collapsed }) => {
  return {
    marginRight: '10px',
    marginBottom: collapsed ? '3px' : '-3px',
    color: toggleColor,
  }
})

/**
 * @param props - The props
 * @public
 */
export function ExpandableBox(props: ExpandableBoxProps) {
  const { children, editable, alwaysVisible, renderTitle } = props
  const [collapsed, setCollapsed] = React.useState(!editable)

  return (
    <Container collapsed={collapsed}>
      <Toggle
        editable={editable}
        alwaysVisible={alwaysVisible}
        collapsed={collapsed}
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <>
          <ToggleIcon
            collapsed={collapsed}
            icon={collapsed ? faSortDown : faSortUp}
          />
          <a>{renderTitle(collapsed)}</a>
        </>
      </Toggle>
      <Content collapsed={collapsed}>{children}</Content>
    </Container>
  )
}
/** @public */
export interface ExpandableBoxProps {
  children?: React.ReactNode
  editable?: boolean
  alwaysVisible?: boolean
  renderTitle: (collapsed: boolean) => React.ReactNode
}

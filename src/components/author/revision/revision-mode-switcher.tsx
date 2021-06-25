import { Dispatch } from 'react'
import styled, { css } from 'styled-components'

import { DisplayMode } from './revision'
import { useInstanceData } from '@/contexts/instance-context'
import { makePadding, makeTransparentButton } from '@/helper/css'

export interface RevisionModeSwitcherProps {
  isCurrent: boolean
  displayMode: DisplayMode
  setDisplayMode: Dispatch<React.SetStateAction<DisplayMode>>
}

export function RevisionModeSwitcher({
  isCurrent,
  displayMode,
  setDisplayMode,
}: RevisionModeSwitcherProps) {
  const { strings } = useInstanceData()

  return <MetaBar>{renderButtons()}</MetaBar>

  function renderButtons() {
    return (
      <>
        {!isCurrent && renderButton('diff', strings.revisions.diff)}
        {!isCurrent && renderButton('sidebyside', strings.revisions.sidebyside)}
        {renderButton('this', strings.revisions.thisVersion)}
      </>
    )
  }

  function renderButton(mode: DisplayMode, title: string) {
    //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported
    return (
      <Button
        onPointerUp={(e) => e.currentTarget.blur()}
        onClick={() => setDisplayMode(mode)}
        current={displayMode === mode}
      >
        {title}
      </Button>
    )
  }
}

const MetaBar = styled.nav`
  ${makePadding};
  display: flex;
  justify-content: center;
  position: sticky;
  z-index: 50;
  padding-top: 25px;
  padding-bottom: 10px;
  top: 0;
  background-color: #fff;
`

const Button = styled.button<{ current?: boolean }>`
  ${makeTransparentButton};
  margin-left: 5px;

  ${(props) =>
    props.current &&
    css`
      &,
      &:hover {
        background-color: ${(props) => props.theme.colors.brand};
        color: #fff;
      }
    `}
`

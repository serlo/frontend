import { Dispatch } from 'react'
import styled, { css } from 'styled-components'

import { DisplayModes } from './revision'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { makePadding, makeTransparentButton } from '@/helper/css'

export interface RevisionModeSwitcherProps {
  isCurrent: boolean
  previousRevisionId?: number
  repositoryId: number
  displayMode: DisplayModes
  setDisplayMode: Dispatch<React.SetStateAction<DisplayModes>>
}

export function RevisionModeSwitcher({
  isCurrent,
  previousRevisionId,
  repositoryId,
  displayMode,
  setDisplayMode,
}: RevisionModeSwitcherProps) {
  const { strings } = useInstanceData()

  return <MetaBar>{renderButtons()}</MetaBar>

  function renderButtons() {
    return (
      <>
        {!isCurrent && renderButton(DisplayModes.Diff, strings.revisions.diff)}
        {!isCurrent &&
          renderButton(DisplayModes.SideBySide, strings.revisions.sidebyside)}
        {isCurrent && previousRevisionId && (
          <ViewPreviousButton
            href={`/entity/repository/compare/${repositoryId}/${previousRevisionId}#${DisplayModes.SideBySide}`}
          >
            Vorherige Bearbeitung ansehen
          </ViewPreviousButton>
        )}

        {renderButton(DisplayModes.This, strings.revisions.thisVersion)}
      </>
    )
  }

  function renderButton(mode: DisplayModes, title: string) {
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

const ViewPreviousButton = styled(Link)`
  ${makeTransparentButton};
  margin-left: 5px;
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

import React from 'react'
import styled from 'styled-components'

import { menuData } from '../../data/menu'
import { makeResponsivePadding } from '../../helper/css'
import { Logo } from './logo'
import { Menu } from './menu'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SearchInput } from './search-input'

export function Header() {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <BlueHeader>
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <PaddedDiv>
        <Menu links={menuData}></Menu>
        <Logo subline="Die freie Lernplattform" />
      </PaddedDiv>
      <SearchInput />
      {isOpen && <MobileMenu links={menuData} />}
    </BlueHeader>
  )
}

const BlueHeader = styled.header`
  background-color: ${props => props.theme.colors.bluewhite};
`

const PaddedDiv = styled.div`
  ${makeResponsivePadding}
  padding-top: 12px;
  padding-bottom: 24px;
`

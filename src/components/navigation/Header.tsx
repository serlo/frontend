import React from 'react'
import styled from 'styled-components'

import Menu from './Menu'
import menudata from '../../data/menudata'
import Logo from './Logo'
import SearchInput from './SearchInput'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'
import { makeResponsivePadding } from '../../helper/csshelper'

export default function Header() {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <BlueHeader>
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <PaddedDiv>
        <Menu links={menudata}></Menu>
        <Logo subline={'Die freie Lernplattform'} />
      </PaddedDiv>
      <SearchInput />
      {isOpen && <MobileMenu links={menudata} />}
    </BlueHeader>
  )
}

const BlueHeader = styled.header`
  background-color: ${(props) => props.theme.colors.bluewhite};
`

const PaddedDiv = styled.div`
  ${makeResponsivePadding}
  padding-top: 12px;
  padding-bottom: 24px;
`

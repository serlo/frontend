import React from 'react'
import styled from 'styled-components'

import Menu from './Menu'
import menudata from '../../menudata'
import Logo from './Logo'
import SearchInput from './SearchInput'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'

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
  background-color: ${props => props.theme.colors.bluewhite};
`

const PaddedDiv = styled.div`
  padding: 24px 24px 24px;
`

// import dynamic from 'next/dynamic'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { Logo } from './logo'
import { Menu } from './menu'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SearchInput } from './search-input'
import { useAuth } from '@/auth/use-auth'
import { getMenuData } from '@/data/menu'
import { makeResponsivePadding } from '@/helper/css'

export function Header() {
  const [isOpen, setOpen] = React.useState(false)
  const auth = useAuth()
  const links = getMenuData()

  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <BlueHeader>
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <PaddedDiv>
        <Menu links={links} auth={auth} />
        <Logo subline="Die freie Lernplattform" />
      </PaddedDiv>
      <SearchInput />
      {isOpen && <MobileMenu links={links} />}
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

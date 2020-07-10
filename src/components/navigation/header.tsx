import { Router } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { Logo } from './logo'
import { Menu } from './menu'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'
import { SearchInput } from './search-input'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { makeResponsivePadding } from '@/helper/css'

interface HeaderProps {
  onSearchPage?: boolean
}

export function Header({ onSearchPage }: HeaderProps) {
  const [isOpen, setOpen] = React.useState(false)
  const auth = useAuth()
  const { headerData, strings } = useInstanceData()

  // compat: close mobile menu on client side navigation, we need the global Router instance
  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <BlueHeader>
      <MobileMenuButton onClick={() => setOpen(!isOpen)} open={isOpen} />
      <PaddedDiv>
        <Menu data={headerData} auth={auth} />
        <Logo subline={strings.header.slogan} />
      </PaddedDiv>
      <SearchInput onSearchPage={onSearchPage} />
      {isOpen && <MobileMenu data={headerData} auth={auth} />}
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

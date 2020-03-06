import styled from 'styled-components'
import { Menu } from './desktopmenu'
import { menudata } from './menudata'
import Logo from './logo'
import { SearchInput } from './searchinput'

export default function Header() {
  return (
    <BlueHeader>
      <PaddedDiv>
        <DesktopMenu links={menudata}></DesktopMenu>
        <Logo subline={'Die freie Lernplattform'} />
      </PaddedDiv>
      <SearchInput />
    </BlueHeader>
  )
}

const BlueHeader = styled.header`
  background-color: ${props => props.theme.colors.bluewhite};
`

const PaddedDiv = styled.div`
  padding: 2rem 1.5rem 1.5rem;
`

const DesktopMenu = styled(Menu)`
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

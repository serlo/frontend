import {
  faCaretDown,
  faBars,
  faUser,
  faInfoCircle,
  faUserEdit,
  faGraduationCap,
  faHandHoldingHeart,
  faUserFriends,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize, lighten } from 'polished'
import * as React from 'react';
import styled from 'styled-components'

import { Link } from '../content/link'
import { AuthPayload } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { getAuthData } from '@/helper/feature-auth'

interface MobileMenuProps {
  data: HeaderData
  auth: AuthPayload
}

const menuIconMapping = {
  subject: faGraduationCap,
  about: faInfoCircle,
  participate: faUserEdit,
  community: faUserFriends,
  donate: faHandHoldingHeart,
  user: faUser,
  login: faUser,
  notifications: faBell,
}

export function MobileMenu({ data, auth }: MobileMenuProps) {
  const [openEntryIndex, setOpenEntryIndex] = React.useState<null | number>(
    null
  )
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  function toggle(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) {
    e.preventDefault()
    if (index === openEntryIndex) setOpenEntryIndex(null)
    else setOpenEntryIndex(index)
  }

  return (
    <List>
      {data.map((entry, index) => (
        <Entry
          onToggle={toggle}
          key={index}
          {...entry}
          open={openEntryIndex === index}
          index={index}
        />
      ))}
      {renderAuthMenu()}
    </List>
  )

  function renderAuthMenu() {
    const authData = getAuthData(
      auth !== null,
      strings.header.login,
      loggedInData?.authMenu
    )
    if (!authData) return null
    return authData.map((link, i) => {
      return (
        <Entry
          key={i}
          url={link.url}
          onToggle={toggle}
          open={openEntryIndex === data.length + i}
          index={data.length + i}
          title={link.title}
          // eslint-disable-next-line react/no-children-prop
          children={link.children}
          icon={link.icon}
        />
      )
    })
  }
}

interface EntryProps extends HeaderLink {
  isChild?: boolean
  open?: boolean
  index?: number
  onToggle?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => void
}

function Entry({
  url,
  title,
  icon,
  children,
  isChild = false,
  open,
  onToggle,
  index,
}: EntryProps) {
  return (
    <>
      <li
        onClick={(e) =>
          children && onToggle !== undefined && index !== undefined
            ? onToggle(e, index)
            : undefined
        }
      >
        <EntryLink href={url} isChild={isChild} open={open}>
          {!isChild ? (
            <IconWrapper>
              <FontAwesomeIcon
                icon={icon !== undefined ? menuIconMapping[icon] : faBars}
                size="1x"
                style={{ fontSize: '23px' }}
              />
            </IconWrapper>
          ) : null}
          <EntryLinkText isChild={isChild}>
            {title}
            {children ? (
              <span>
                {' '}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : null}
          </EntryLinkText>
        </EntryLink>
      </li>
      {open && children ? (
        <>
          {children.map((entry, index) => (
            <Entry {...entry} isChild key={index} />
          ))}{' '}
          <Seperator />
        </>
      ) : null}
    </>
  )
}

const EntryLinkText = styled.span<{ isChild?: boolean }>`
  display: inline-block;
  vertical-align: middle;
  margin-top: ${(props) => (props.isChild ? '0' : '0.45rem')};
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  .Collapsible__trigger.is-open li a {
    background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
  }
`

const Seperator = styled.li`
  height: 28px;
  background-color: ${(props) => transparentize(0.8, props.theme.colors.brand)};
  border-bottom: 1px solid ${(props) => props.theme.colors.lighterblue};
`

const EntryLink = styled(Link)<{ isChild?: boolean; open?: boolean }>`
  display: flex;
  align-items: start;
  padding: 16px;
  color: ${(props) => props.theme.colors.brand};
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.lighterblue};
  font-weight: bold;
  text-decoration: none !important;
  font-size: ${(props) => (props.isChild ? '1rem' : '1.33rem')};

  background-color: ${(props) =>
    props.open
      ? transparentize(0.8, props.theme.colors.brand)
      : props.theme.colors.bluewhite};

  ${(props) => (props.isChild ? 'background-color: #fff;' : '')}

  &:active {
    background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
  }
  @media (hover: hover) {
    &:hover {
      background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
    }
  }
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => lighten(0.3, props.theme.colors.lightblue)};
  border-radius: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.lightblue};
  text-align: center;
  margin-right: 10px;
`

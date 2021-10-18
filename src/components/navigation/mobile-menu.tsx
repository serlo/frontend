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
import clsx from 'clsx'
import { useState, MouseEvent } from 'react'

import { Link } from '../content/link'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HeaderData, HeaderLink } from '@/data-types'
import { getAuthData } from '@/helper/feature-auth'

interface MobileMenuProps {
  data: HeaderData
  auth: AuthenticationPayload
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
  const [openEntryIndex, setOpenEntryIndex] = useState<null | number>(null)
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  function toggle(e: MouseEvent, index: number) {
    e.preventDefault()
    if (index === openEntryIndex) setOpenEntryIndex(null)
    else setOpenEntryIndex(index)
  }

  return (
    <ul>
      {data.map((entry, index) => (
        <Entry
          onToggle={toggle}
          key={index}
          {...entry}
          open={openEntryIndex === index}
          index={index}
          i={index}
        />
      ))}
      {renderAuthMenu()}
    </ul>
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
          // children is a "protected" name, but we are using it as prop
          // eslint-disable-next-line react/no-children-prop
          children={link.children}
          icon={link.icon}
          i="auth"
        />
      )
    })
  }
}

interface EntryProps extends HeaderLink {
  isChild?: boolean
  open?: boolean
  index?: number
  onToggle?: (e: MouseEvent, index: number) => void
  i: number | string
  subI?: number | string
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
  i,
  subI,
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
        <Link
          href={url}
          path={['menu', i, subI!]}
          className={clsx(
            'flex border-b border-brand-lighter',
            'hover:no-underline p-4 hover:bg-brand-300',
            isChild && 'bg-white',
            open && 'bg-brand-300'
          )}
        >
          {!isChild ? (
            <div
              className={clsx(
                'w-10 h-10 rounded-full flex justify-center items-center mr-2.5',
                'bg-brand-150 text-brand-light'
              )}
            >
              <FontAwesomeIcon
                icon={icon !== undefined ? menuIconMapping[icon] : faBars}
                size="1x"
                style={{ fontSize: '23px' }}
              />
            </div>
          ) : null}
          <span
            className={clsx(!isChild && 'text-[1.33rem] mt-1.5', 'font-bold')}
          >
            {title}
            {children ? (
              <span>
                {' '}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : null}
          </span>
        </Link>
      </li>
      {open && children ? (
        <>
          {children.map((entry, index) => (
            <Entry {...entry} isChild key={index} i={i} subI={index} />
          ))}{' '}
          <li
            className="border-b border-brand-lighter h-7 bg-brand-300" /*Seperator*/
          />
        </>
      ) : null}
    </>
  )
}

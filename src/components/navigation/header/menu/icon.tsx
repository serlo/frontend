import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons/faHandHoldingHeart'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faUserEdit'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

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

export type IconIdentifier = keyof typeof menuIconMapping

export interface IconProps {
  icon?: IconIdentifier
  element?: JSX.Element
  alt: string
}

export function Icon({ icon, element, alt }: IconProps) {
  return (
    <span
      className={clsx(
        'w-10 h-10 rounded-full flex justify-center items-center mr-2.5',
        'bg-brand-150 text-brand-light',
        element
          ? 'md:w-auto md:h-auto md:inline-block md:mr-0 md:bg-transparent'
          : 'md:hidden'
      )}
    >
      {element ? (
        <>
          {element} <span className="sr-only">{alt}</span>
        </>
      ) : icon ? (
        <FaIcon icon={menuIconMapping[icon]} style={{ fontSize: '23px' }} />
      ) : null}
    </span>
  )
}

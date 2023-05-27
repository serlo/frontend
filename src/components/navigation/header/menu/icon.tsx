import {
  faBell,
  faGraduationCap,
  faHandHoldingHeart,
  faInfoCircle,
  faUser,
  faUserEdit,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
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
  elementOrIcon?: IconIdentifier | JSX.Element
}

export function Icon({ elementOrIcon }: IconProps) {
  if (!elementOrIcon) return null
  const isIcon = typeof elementOrIcon === 'string'

  return (
    <span
      aria-hidden
      className={clsx(
        'w-10 h-10 rounded-full flex justify-center items-center mr-2.5',
        'bg-brand-200 text-brand-500',
        isIcon
          ? 'md:hidden'
          : 'md:w-auto md:h-auto md:inline-block md:mr-0 md:bg-transparent'
      )}
    >
      {isIcon ? (
        <FaIcon
          icon={menuIconMapping[elementOrIcon]}
          style={{ fontSize: '23px' }}
        />
      ) : (
        elementOrIcon
      )}
    </span>
  )
}

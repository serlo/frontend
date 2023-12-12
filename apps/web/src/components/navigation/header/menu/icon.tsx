import {
  faBell,
  faGraduationCap,
  faHandHoldingHeart,
  faInfoCircle,
  faUser,
  faUserEdit,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'

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
      className={cn(
        `
          mr-2.5 flex h-10 w-10 items-center justify-center rounded-full
          bg-brand-200 text-brand-500
        `,
        isIcon
          ? 'md:hidden'
          : 'md:mr-0 md:inline-block md:h-auto md:w-auto md:bg-transparent'
      )}
    >
      {isIcon ? (
        <FaIcon icon={menuIconMapping[elementOrIcon]} className="text-[23px]" />
      ) : (
        elementOrIcon
      )}
    </span>
  )
}

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { aboveClasses, belowClasses } from './user-tools-item'
import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

export function ProfileUserTools({ aboveContent }: { aboveContent?: boolean }) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return (
    <div
      className={cn(
        'serlo-user-tools mb-8 mr-4 mt-4 justify-end text-right',
        aboveContent
          ? 'mobile:flex sm:-mt-6 sm:text-left lg:hidden'
          : 'absolute bottom-8 right-8 z-50 hidden h-full items-end lg:flex [&>a]:!sticky [&>a]:bottom-8'
      )}
    >
      <Link
        href="/user/settings"
        className={aboveContent ? aboveClasses : belowClasses}
      >
        <FaIcon icon={faPencilAlt} />{' '}
        {loggedInData.strings.authorMenu.editProfile}
      </Link>
    </div>
  )
}

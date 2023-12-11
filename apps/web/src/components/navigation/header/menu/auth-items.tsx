import { faBell } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

import { Item } from './item'
import { NoAuthItem } from './no-auth-item'
import { useAuthentication } from '@/auth/use-authentication'
import { getAvatarUrl } from '@/components/user/user-link'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function AuthItems() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  if (!auth || !loggedInData || !auth.username)
    return <NoAuthItem hidden={false} />

  const { id, username } = auth
  const userMeReplacement = `user/${id}/${username}`

  const [notificationLinkData, userLinkData] = loggedInData.authMenu
  const updatedSubData = {
    ...userLinkData,
    children: userLinkData.children?.map((item) => {
      return { ...item, url: item.url.replace('user/me', userMeReplacement) }
    }),
  }

  return (
    <>
      <Item
        link={notificationLinkData}
        elementAsIcon={
          <div className="-top-[2px] md:relative md:mx-[3px]">
            <UnreadNotificationsCount icon={faBell} />
          </div>
        }
      />
      <Item
        link={updatedSubData}
        elementAsIcon={
          <Image
            src={getAvatarUrl(username)}
            alt="Avatar"
            width={24}
            height={24}
            className="inline rounded-full"
            title={`${updatedSubData.title} ${username}`}
          />
        }
      />
    </>
  )
}

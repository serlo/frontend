import { faBell } from '@fortawesome/free-solid-svg-icons'

import { Item } from './item'
import { NoAuthItem } from './no-auth-item'
import { useAuthentication } from '@/auth/use-authentication'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { getAvatarUrl } from '@/components/user/user-link'
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
          <img
            className="inline h-6 w-6 rounded-full"
            src={getAvatarUrl(username)}
            title={`${updatedSubData.title} ${username}`}
          />
        }
      />
    </>
  )
}

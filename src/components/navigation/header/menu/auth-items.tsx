import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import dynamic from 'next/dynamic'

import { Item } from './item'
import { useAuthentication } from '@/auth/use-authentication'
import type { UnreadNotificationsCountProps } from '@/components/user-tools/unread-notifications-count'
import { getAvatarUrl } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const UnreadNotificationsCount = dynamic<UnreadNotificationsCountProps>(() =>
  import('@/components/user-tools/unread-notifications-count').then(
    (mod) => mod.UnreadNotificationsCount
  )
)

export function AuthItems() {
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  const noAuthData = {
    url: '/auth/login',
    title: strings.header.login,
    icon: 'user',
  } as const

  if (!auth || !loggedInData || !auth.username)
    return <Item link={noAuthData} />

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
      {UnreadNotificationsCount ? (
        <Item
          link={notificationLinkData}
          elementAsIcon={
            <div className="-top-[2px] md:relative md:mx-[3px] md:my-[7px]">
              <UnreadNotificationsCount icon={faBell} />
            </div>
          }
        />
      ) : null}
      <Item
        link={updatedSubData}
        elementAsIcon={
          <img
            className="rounded-full w-6 h-6 inline md:my-[7px]"
            src={getAvatarUrl(username)}
            title={`${updatedSubData.title} ${username}`}
          />
        }
      />
    </>
  )
}

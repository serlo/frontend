import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'

import { Item } from './item'
import { useAuthentication } from '@/auth/use-authentication'
import { getAvatarUrl } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function AuthItems() {
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  const loggedInComponents = useLoggedInComponents()

  const noAuthData = {
    url: '/api/auth/login',
    title: strings.header.login,
    icon: 'user',
  } as const

  if (!auth.current || !loggedInData || !auth.current.username)
    return <Item link={noAuthData} />

  const UnreadNotificationsCount = loggedInComponents?.UnreadNotificationsCount

  const ownProfileHref = `/user/${auth.current.id}/${auth.current.username}`

  const [notificationLinkData, userLinkData] = loggedInData.authMenu
  const updatedSubData = {
    ...userLinkData,
    children: userLinkData.children?.map((item) =>
      item.url === '/user/me' ? { ...item, url: ownProfileHref } : item
    ),
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
            src={getAvatarUrl(auth.current.username)}
            title={`${updatedSubData.title} ${auth.current.username}`}
          />
        }
      />
    </>
  )
}

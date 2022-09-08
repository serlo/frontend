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
    icon: 'user', //login?
  } as const

  if (!auth.current || !loggedInData || !auth.current.username)
    return <Item link={noAuthData} />

  const UnreadNotificationsCount = loggedInComponents?.UnreadNotificationsCount

  return (
    <>
      {UnreadNotificationsCount ? (
        <Item
          link={loggedInData.authMenu[0]}
          specialContent={
            <div className="-top-[2px] md:relative md:mx-[3px] md:my-[7px]">
              <UnreadNotificationsCount icon={faBell} />
            </div>
          }
        />
      ) : null}
      <Item
        link={loggedInData.authMenu[1]}
        specialContent={
          <img
            className="rounded-full w-6 h-6 inline md:my-[7px]"
            src={getAvatarUrl(auth.current.username)}
            title={`${loggedInData.authMenu[1].title} ${auth.current.username}`}
          />
        }
      />
    </>
  )
}

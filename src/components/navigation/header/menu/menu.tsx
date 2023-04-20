import { Root, List } from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { Item } from './item'
import { NoAuthItem } from './no-auth-item'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'

const AuthItems = dynamic<{}>(() =>
  import('./auth-items').then((mod) => mod.AuthItems)
)

export function Menu() {
  const auth = useAuthentication()
  const { headerData } = useInstanceData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const showAuth = auth && mounted

  return (
    <Root>
      <List
        className={clsx(
          'md:text-right block m-0 p-0 relative sm:min-w-[27rem]',
          showAuth ? '' : 'md:mt-0.5 md:mr-3.5'
        )}
      >
        {headerData.map((link) => (
          <Item key={link.title} link={link} />
        ))}
        {showAuth ? <AuthItems /> : <NoAuthItem hidden={!mounted} />}
      </List>
    </Root>
  )
}

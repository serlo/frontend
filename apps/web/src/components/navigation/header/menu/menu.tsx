import { Root, List } from '@radix-ui/react-navigation-menu'
import { cn } from '@serlo/tailwind/helper/cn'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { Item } from './item'
import { NoAuthItem } from './no-auth-item'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'

const AuthItems = dynamic(() =>
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
        className={cn(
          'relative m-0 block p-0 sm:min-w-[27rem] md:text-right',
          showAuth ? '' : 'md:mr-3.5 md:mt-0.5'
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

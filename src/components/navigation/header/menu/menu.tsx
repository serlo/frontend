import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useEffect, useState } from 'react'

import { AuthItems } from './auth-items'
import { Item } from './item'
import { useInstanceData } from '@/contexts/instance-context'
// import { submitEvent } from '@/helper/submit-event'

export function Menu() {
  const { headerData } = useInstanceData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // TODO: what happens on click on item with submenu?

  // TODO: auto position right

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="md:text-right block m-0 p-0 relative">
        {headerData.map((link) => (
          <Item key={link.title} link={link} />
        ))}
        {mounted ? <AuthItems /> : null}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

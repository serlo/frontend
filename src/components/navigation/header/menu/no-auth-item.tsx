import { Item } from './item'
import { useInstanceData } from '@/contexts/instance-context'

export function NoAuthItem({ hidden }: { hidden: boolean }) {
  const { strings } = useInstanceData()

  const noAuthData = {
    url: '/auth/login',
    title: strings.header.login,
    icon: 'user',
  } as const

  return <Item link={noAuthData} className={hidden ? 'opacity-0' : ''} />
}

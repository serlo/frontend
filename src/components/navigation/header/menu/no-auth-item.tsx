import { Item } from './item'
import { loginUrl } from '@/components/pages/auth/utils'
import { useInstanceData } from '@/contexts/instance-context'

export function NoAuthItem({ hidden }: { hidden: boolean }) {
  const { strings } = useInstanceData()

  const noAuthData = {
    url: loginUrl,
    title: strings.header.login,
    icon: 'user',
  } as const

  return <Item link={noAuthData} className={hidden ? 'opacity-0' : ''} />
}

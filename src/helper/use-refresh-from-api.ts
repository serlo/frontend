import { useRouter } from 'next/router'

import { useInstanceData } from '@/contexts/instance-context'

export function useRefreshFromAPI() {
  const { lang } = useInstanceData()
  const router = useRouter()

  return (keepCache?: boolean) => {
    if (!keepCache) {
      sessionStorage.removeItem(`/${lang}${router.asPath}`)
    }
    void router.replace(router.asPath.split('#')[0])
  }
}

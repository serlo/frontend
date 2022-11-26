import { useRouter } from 'next/router'

// we currently only use this for kratos auth flows
// if a user is following a link in a kratos mail the user is redirected to de.serlo.org by default
// this hook forwards them to the right instance if possible

export function useCheckInstance() {
  const { locale: current } = useRouter()
  const previous = localStorage.getItem('instance')

  const checkInstance = ({ redirect }: { redirect?: boolean }) => {
    if (redirect && previous && current && previous !== current) {
      window.location.href = window.location.href.replace(current, previous)
      throw new Error('wrong instance, redirecting …')
    }
    if (current) localStorage.setItem('instance', current)
  }

  return checkInstance
}

import { useRouter } from 'next/router'

// we currently only use this for kratos auth flows
// if a user is following a link in a kratos mail the user is redirected to de.serlo.org by default
// this hook forwards them to the right instance if possible

export function useCheckInstance() {
  const { locale: current } = useRouter()

  return ({ redirect }: { redirect?: boolean }) => {
    const previous = localStorage.getItem('instance')
    if (redirect && previous && current && previous !== current) {
      if (window.location.hostname === 'localhost') {
        window.location.pathname =
          '/' + previous + window.location.pathname.replace(`/${current}`, '')
      } else {
        window.location.href = window.location.href.replace(
          `//${current}`,
          `//${previous}`
        )
      }
      // make sure no more code is executed
      throw new Error('wrong instance, redirecting …')
    } else {
      // store current value for the next auth page
      if (current) localStorage.setItem('instance', current)
    }
  }
}

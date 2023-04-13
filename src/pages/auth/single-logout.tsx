import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  useEffect(() => {
    Cookies.set('auth-session', 'test')
    // AuthSessionCookie.remove()
    // void kratos
    //   .createBrowserLogoutFlow()
    //   .then(({ data }) => {
    //     void kratos.updateLogoutFlow({ token: data.logout_token }).then(() => {
    //       console.log('kratos logout flow done')
    //     })
    //   })
    //   .catch((error: AxiosError) => {
    //     // eslint-disable-next-line no-console
    //     console.error(error)
    //   })
  })

  return <>test</>
})

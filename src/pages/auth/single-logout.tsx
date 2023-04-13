import { useEffect } from 'react'

import { AuthSessionCookie } from '@/auth/cookie/auth-session-cookie'
import { kratos } from '@/auth/kratos'
import { AxiosError } from '@/auth/types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  useEffect(() => {
    AuthSessionCookie.remove()
    void kratos
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        void kratos.updateLogoutFlow({ token: data.logout_token }).then(() => {
          console.log('kratos logout flow done')
        })
      })
      .catch((error: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  })

  return <>single logout</>
})

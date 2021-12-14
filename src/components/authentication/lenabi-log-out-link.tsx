// eslint-disable-next-line import/no-internal-modules
import { signOut } from 'next-auth/react'

import { MenuSubButtonLink } from '../user-tools/menu-sub-button-link'

export function LenabiLogOutLink({ title }: { title: string }) {
  function signOutHelper() {
    void signOut({ redirect: false })
    window.location.href =
      'https://keycloak.serlo-staging.dev/auth/realms/serlo/protocol/openid-connect/logout?redirect_uri=' +
      encodeURIComponent(window.location.href)
  }

  return <MenuSubButtonLink onClick={signOutHelper}>{title}</MenuSubButtonLink>
}

import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

import { HeadTags } from '@/components/head-tags'
import { Logo } from '@/components/navigation/logo'

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
}

export function SingleSignOn() {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">angemeldet</span>
  ) : (
    <span className="text-danger">nicht angemeldet</span>
  )

  const greeting =
    keycloak?.authenticated || (keycloak && parsedToken)
      ? `Willkommen zurück ${parsedToken?.preferred_username ?? ''}!`
      : 'Willkommen Visitor. Melde dich bitte an.'

  return (
    <>
      <HeadTags data={{ title: 'Single-Sign-On – Serlo.org' }} />
      <header className="px-side pt-12 bg-brand-100 sm:text-center pb-5">
        <div className="pb-6">
          <Logo subline="" noLink />
        </div>
        {keycloak?.authenticated ? (
          <>
            <button
              type="button"
              className="serlo-button serlo-make-interactive-transparent-blue"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createAccountUrl()
                }
              }}
            >
              Mein Konto
            </button>

            <button
              type="button"
              className="serlo-button serlo-make-interactive-transparent-blue"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createLogoutUrl()
                }
              }}
            >
              Abmelden
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="serlo-button serlo-make-interactive-transparent-blue"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createRegisterUrl()
                }
              }}
            >
              Registrieren
            </button>

            <button
              type="button"
              className="serlo-button serlo-make-interactive-transparent-blue"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createLoginUrl()
                }
              }}
            >
              Anmelden
            </button>
          </>
        )}
      </header>
      <p className="italic pt-5 text-center text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
        {greeting}
      </p>
      <h1 className="text-center text-5xl font-extrabold tracking-tight max-w-2xl mt-3 mb-6 mx-auto">
        Du bist {loggedinState}
      </h1>
    </>
  )
}

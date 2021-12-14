import { useKeycloak } from '@react-keycloak/ssr'
import clsx from 'clsx'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

import { PartnerListNew } from '../landing/rework/partner-list-new'
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
  const username = parsedToken?.preferred_username ?? ''
  const isLoggedIn = keycloak?.authenticated

  return (
    <>
      <HeadTags data={{ title: 'Single Sign-On – serlo.org' }} />
      <header className="px-side pt-12 bg-brand-100 sm:text-center pb-5">
        <div className="pb-6">
          <Logo subline="" noLink />
        </div>
        {renderButtons()}
      </header>
      <section
        className={clsx(
          'serlo-responsive-margin mt-5 mb-10',
          'md:mt-12 md:px-8 lg:block text-center min-h-1/2'
        )}
      >
        <div className="max-w-xl sm:mx-auto text-lg">
          <h1 className="serlo-h1 text-brand mt-16 mb-5">
            👋 Willkommen{username ? ` zurück ${username}` : ''}!<br />
          </h1>
          <p className="serlo-p text-2xl font-bold tracking-tight">
            Du bist {isLoggedIn ? '' : 'nicht'} angemeldet{' '}
            <small className="font-normal">{isLoggedIn ? '🟢' : '⚪️'}</small>
          </p>
        </div>
      </section>
      <footer className="partner font-bold text-center serlo-responsive-padding pb-1">
        <h2 className="font-bold pt-16 pb-12 text-center">
          Partner und Unterstützer
        </h2>
        <PartnerListNew />
        <nav>
          <a
            href="https://de.serlo.org/serlo"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Über Serlo
          </a>
          {' • '}
          <a
            href="https://de.serlo.org/privacy"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Datenschutz
          </a>
          {' • '}
          <a
            href="https://de.serlo.org/imprint"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Impressum
          </a>
        </nav>
        <style jsx>
          {`
            .partner {
              background: url('/_assets/img/landing/about-container.svg');
              border-bottom: 2rem solid #ffefda;
              background-size: cover;
            }
          `}
        </style>
      </footer>
    </>
  )

  function renderButtons() {
    if (!keycloak) return null
    const btnClass = 'serlo-button serlo-make-interactive-transparent-blue'

    return (
      <nav>
        {keycloak.authenticated ? (
          <>
            <button
              className={btnClass}
              onClick={() => {
                window.location.href = keycloak.createAccountUrl()
              }}
            >
              Mein Konto
            </button>
            <button
              className={btnClass}
              onClick={() => {
                window.location.href = keycloak.createLogoutUrl()
              }}
            >
              Abmelden
            </button>
          </>
        ) : (
          <>
            <button
              className={btnClass}
              onClick={() => {
                window.location.href = keycloak.createRegisterUrl()
              }}
            >
              Registrieren
            </button>
            <button
              className={btnClass}
              onClick={() => {
                window.location.href = keycloak.createLoginUrl()
              }}
            >
              Anmelden
            </button>
          </>
        )}
      </nav>
    )
  }
}

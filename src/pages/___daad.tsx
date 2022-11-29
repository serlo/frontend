/* eslint-disable @next/next/no-page-custom-font */
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import { FaIcon } from '@/components/fa-icon'

const backlink = '/willkommen'

const ContentPage: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = backlink
    }, 500)
  }, [])

  return (
    <>
      <Head>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://b2cfilestore.blob.core.windows.net/samlfiles/login-screen.css?v=1.1.3"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <header>
        <h1>
          <img
            id="replace_logo"
            src="https://b2cfilestore.blob.core.windows.net/samlfiles/logo-my-daad.svg"
            alt="Mein DAAD"
            className="daad-logo"
          />
        </h1>
      </header>
      <div className="background-wrapper" id="replace_background" style={{}}>
        <div className="mt-12 text-brand text-center">
          <p className="serlo-p">
            <FaIcon icon={faSpinner} className="animate-spin-slow h-24" />
          </p>
        </div>
        {/* <div className="c-login-screen">
          <div className="col-66">
            <div className="c-login-screen__box">
              <div className="c-login-screen__azure-wrapper">
                <div id="api" data-name="Unified">
                  <form
                    id="localAccountForm"
                    action="JavaScript:void(0);"
                    className="localAccount"
                    aria-label="Mit DAAD-ID anmelden"
                  >
                    <div className="intro">
                      <h2>Mit DAAD-ID anmelden</h2>
                    </div>
                    <div className="entry">
                      <div className="entry-item">
                        <label htmlFor="signInName"> E-Mail-Adresse </label>
                        <input
                          className="mb-14 !p-0 !text-[#333] !px-4 !text-4xl"
                          //   type="email"
                          title="Geben Sie eine gültige E-Mail-Adresse ein."
                          id="signInName"
                          name="E-Mail-Adresse"
                          //   pattern="^[a-zA-Z0-9.!#$%&’'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                          placeholder="E-Mail-Adresse"
                          aria-label="E-Mail-Adresse"
                        />
                      </div>
                      <div className="entry-item">
                        <div className="password-label">
                          <label htmlFor="password">Passwort</label>
                          <a
                            id="forgotPassword"
                            href="https://mydaadbird.b2clogin.com/mydaadbird.onmicrosoft.com/B2C_1A_signup_signin_BIRD_saml/api/CombinedSigninAndSignup/forgotPassword?csrf_token=c2IwUGYvVGVMUWpDbTJYL0h4MzJ1MUdrK1NPMGErTzVmdXZ0NFFFOGxIMDNXWFQ3TWVCUmZZb0xQZzdJMDFKMnVwdU1KRFgvWnVGMlEwVVpsM1kweEE9PTsyMDIyLTA5LTEyVDA5OjUzOjEzLjk2OTYyMVo7S2tvNUx4dXRHWnlRalU5dU5JRnB0QT09O3siT3JjaGVzdHJhdGlvblN0ZXAiOjF9&amp;tx=StateProperties=eyJUSUQiOiJhMGY4MGQ1Ni01NzBmLTRjZTUtOWVlMC1mZjRhYTkwMWQ4ZjIifQ&amp;p=B2C_1A_signup_signin_BIRD_saml"
                          >
                            Kennwort vergessen?
                          </a>
                        </div>
                        <input
                          className="mb-14 !p-0 !text-[#333] !px-4 !text-4xl"
                          type="password"
                          id="password"
                          name="Passwort"
                          placeholder="Passwort"
                          aria-label="Passwort"
                        />
                      </div>
                      <div className="working"></div>
                      <div className="buttons">
                        <button
                          id="next"
                          type="submit"
                          onClick={() => {
                            window.location.href = backlink
                          }}
                        >
                          Anmelden
                        </button>
                      </div>
                    </div>
                    <div className="divider">
                      <h2>ODER</h2>
                    </div>
                    <div className="create">
                      <p>
                        Sie haben noch keine DAAD-ID?{' '}
                        <a
                          id="createAccount"
                          href="https://mydaadbird.b2clogin.com/mydaadbird.onmicrosoft.com/B2C_1A_signup_signin_BIRD_saml/api/CombinedSigninAndSignup/unified?local=signup&amp;csrf_token=c2IwUGYvVGVMUWpDbTJYL0h4MzJ1MUdrK1NPMGErTzVmdXZ0NFFFOGxIMDNXWFQ3TWVCUmZZb0xQZzdJMDFKMnVwdU1KRFgvWnVGMlEwVVpsM1kweEE9PTsyMDIyLTA5LTEyVDA5OjUzOjEzLjk2OTYyMVo7S2tvNUx4dXRHWnlRalU5dU5JRnB0QT09O3siT3JjaGVzdHJhdGlvblN0ZXAiOjF9&amp;tx=StateProperties=eyJUSUQiOiJhMGY4MGQ1Ni01NzBmLTRjZTUtOWVlMC1mZjRhYTkwMWQ4ZjIifQ&amp;p=B2C_1A_signup_signin_BIRD_saml"
                        >
                          Jetzt registrieren.
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="new-pw">
                  {/* <p style="display: none">
                    <a
                      id="replace_forgot_password"
                      href="https://mydaad.b2clogin.com/mydaad.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_passwordreset_openid&amp;client_id=5ac95e84-c964-4b36-9111-263206a95884&amp;nonce=defaultNonce&amp;redirect_uri=https%3A%2F%2Fwww.mydaad.de%2Fde%2Fpasswort-geaendert%2F&amp;scope=openid&amp;response_type=id_token&amp;prompt=login"
                    >
                      Passwort vergessen?
                    </a>
                  </p> 
                </div>
              </div>
            </div>
          </div>
          <div className="col-33">
            <div className="c-login-screen__info">
              <h2 id="replace_info_headline">Hinweis</h2>
              <h3 id="replace_info_subline">
                Sie haben sich bereits im DAAD-Portal registriert?
              </h3>
              <p id="replace_info_text">
                Ihre bestehenden Portal-Zugangsdaten sind ab sofort Ihre
                DAAD-ID. Sie können sich mit Ihrer bisherigen E-Mail-Adresse und
                Passwort hier anmelden.
              </p>
              <p className="bottom">
                <a
                  id="replace_info_button"
                  href="https://www.mydaad.de/de/help-category/daad-id/"
                  target="_balnk"
                >
                  Häufig gestellte Fragen
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <footer>
        <ul>
          <li>
            <a
              target="_balnk"
              id="replace_faq"
              href="https://www.mydaad.de/de/help-category/daad-id/"
            >
              Häufig gestellte Fragen
            </a>
          </li>
          <li>
            <a
              target="_balnk"
              id="replace_imprint"
              href="https://www.mydaad.de/de/datenschutz/"
            >
              Datenschutzerklärung
            </a>
          </li>
          <li>
            <a
              target="_balnk"
              id="replace_privacy"
              href="https://www.mydaad.de/de/impressum/"
            >
              Impressum
            </a>
          </li>
        </ul>
      </footer>

      {/* <style jsx>{``}</style> */}
    </>
  )
}
export default ContentPage

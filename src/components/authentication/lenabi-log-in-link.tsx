import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
// eslint-disable-next-line import/no-internal-modules
import { signIn } from 'next-auth/react'
import { MouseEvent, useState } from 'react'

import { ModalWithCloseButton } from '../modal-with-close-button'

const styledLinkCls = clsx(
  'serlo-button serlo-make-interactive-transparent-blue',
  'text-[0.9rem] leading-tight block transition mx-[3px] my-0 text-brand-light',
  'serlo-menu-entry-special'
)

export function LenabiLogInLink({ title }: { title: string }) {
  const [showModal, setShowModal] = useState(false)

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowModal(true)
  }

  // const router = useRouter()

  function onBirdLogin() {
    void signIn('bird', { callbackUrl: '/willkommen' })
    // setTimeout(() => {
    //   void router.push('/user/steff')
    // }, 610)
  }

  return (
    <>
      <a
        href="/login"
        className={clsx('group', styledLinkCls)}
        onClick={handleOnClick}
      >
        {title}
      </a>
      <ModalWithCloseButton
        isOpen={showModal}
        onCloseClick={() => setShowModal(false)}
      >
        <h2 className="serlo-h2 border-0">Anmelden</h2>
        <div className="flex pt-4">
          <div>
            <p className="serlo-p">Mit Serlo Account:</p>
            <p className="serlo-p mr-8">
              <label className="mb-4 block">
                Username oder E-Mail Adresse
                <br />
                <input
                  type="text"
                  className="w-42 serlo-input-font-reset mt-1 rounded-full bg-brand-300 p-2 px-4 text-xl font-bold text-brand outline-none"
                />
              </label>
              <label className="mb-4 block">
                Passwort
                <br />
                <input
                  type="password"
                  className="w-42 serlo-input-font-reset mt-1 rounded-full bg-brand-300 p-2 px-4 text-xl font-bold text-brand outline-none"
                />
              </label>
            </p>

            <p className="serlo-p mt-20 text-sm">
              <b>Bist du neu hier?</b>
              <br /> Willkommen! <br />
              <a
                className="serlo-link"
                href="https://de.serlo-staging.dev/user/register"
              >
                Hier kannst du einen Account anlegen
              </a>
            </p>
            <p className="serlo-p text-sm">
              <b>Klappt nicht?</b>
              <br />
              <a
                className="serlo-link"
                href="https://de.serlo-staging.dev/auth/password/restore"
              >
                Passwort vergessen
              </a>{' '}
              <br />
              oder{' '}
              <a
                className="serlo-link"
                href="https://de.serlo-staging.dev/auth/activate"
              >
                Account noch nicht aktiviert
              </a>
              ?
            </p>
          </div>
          <div className="bird-box">
            <p className="serlo-p">
              oder über die Bildungsplattform:
              <br />
              <button
                className="serlo-make-interactive-green serlo-button mt-8 p-2 px-4"
                onClick={onBirdLogin}
              >
                <FontAwesomeIcon icon={faFlag} /> Weiter mit BIRD
              </button>
            </p>
            {/* <p className="serlo-p text-sm">
                Auch hier gelten unsere{' '}
                <a className="serlo-link" href="/datenschutz" target="_blank">
                  Datenschutzerklärung
                </a>{' '}
                und{' '}
                <a className="serlo-link" href="/21654" target="_blank">
                  Nutzungsbedingungen
                </a>{' '}
                .
            </p> */}
          </div>
          <style jsx>{`
            .bird-box {
              border-left: 1px solid gray;
              padding-left: 1rem;
              margin-left: 1rem;
            }
          `}</style>
          <style jsx global>{`
            .ReactModalPortal .ReactModal__Content {
              @apply max-h-[80vh] w-[700px] max-w-[90vw];
              @apply top-8 translate-y-0 overflow-y-scroll;
              @apply pt-0;
            }
          `}</style>
        </div>
      </ModalWithCloseButton>
    </>
  )
}

import { faFlag } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
// import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'

import { FaIcon } from '../fa-icon'
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
    setTimeout(() => {
      window.location.href = '/___daad'
    }, 100)
  }

  return (
    <>
      <button className={clsx('group', styledLinkCls)} onClick={handleOnClick}>
        {title}
      </button>
      <ModalWithCloseButton
        isOpen={showModal}
        onCloseClick={() => setShowModal(false)}
      >
        <h2 className="serlo-h2 border-0">Anmelden</h2>
        <div className="flex pt-4">
          <div>
            <p className="serlo-p">Mit Serlo Account:</p>
            <p className="serlo-p mr-8">
              <label className="block mb-4">
                Username oder E-Mail Adresse
                <br />
                <input
                  type="text"
                  className="serlo-input-font-reset text-xl bg-brand-300 outline-none text-brand rounded-full p-2 px-4 mt-1 w-42 font-bold"
                />
              </label>
              <label className="block mb-4">
                Passwort
                <br />
                <input
                  type="password"
                  className="serlo-input-font-reset text-xl bg-brand-300 outline-none text-brand rounded-full p-2 mt-1 px-4 w-42 font-bold"
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
                className="serlo-button-green p-2 px-4 mt-8"
                onClick={onBirdLogin}
              >
                <FaIcon icon={faFlag} /> Weiter mit BIRD
              </button>
            </p>
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
              @apply w-[700px] max-w-[90vw] max-h-[80vh];
              @apply translate-y-0 top-8 overflow-y-scroll;
              @apply pt-0;
            }
          `}</style>
        </div>
      </ModalWithCloseButton>
    </>
  )
}

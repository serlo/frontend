import { faWarning } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { useAuthentication } from '@/auth/use-authentication'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { WelcomeMessage } from '@/components/landing/rework/welcome-message'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <KratosLoginCheck />
  </FrontendClientBase>
))

function KratosLoginCheck() {
  const auth = useAuthentication()

  return (
    <>
      <main className="text-truegray-700">
        <section className="text-center max-w-3xl mx-auto mt-20 md:mt-[11vh] font-bold px-2">
          {auth.current ? null : (
            <StaticInfoPanel type="warning" icon={faWarning}>
              Not logged in
            </StaticInfoPanel>
          )}

          <p className="text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
            <WelcomeMessage />
          </p>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-6 mx-auto'
            )}
          >
            Wilkommen{' '}
            <span className="pb-2 underlined">{auth.current?.username} ?</span>
          </h1>
        </section>
      </main>
      <style jsx>{`
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }
        .underlined {
          padding-right: 1rem;
          white-space: nowrap;
          background: url('/_assets/img/landing/simple-underline.svg') no-repeat
            bottom;
        }
        :global(.landing-button-with-wings) {
          &:after,
          &:before {
            content: ' ';
            background: url('/_assets/img/landing/wing-left.svg') no-repeat;
            position: absolute;
            margin-top: -0.6rem;
            width: 4rem;
            height: 4rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity ease-in 0.2s;
          }

          &:after {
            margin-left: 1rem;
            transform: scaleX(-1);
          }

          &:before {
            margin-left: -5rem;
          }

          &:hover {
            &:after,
            &:before {
              opacity: 1;
            }
          }
        }
        :global(.landing-button-with-wink) {
          &:after,
          &:before {
            background: url('/_assets/img/landing/wink-left.svg') no-repeat !important;
            margin-top: -2rem !important;
            background-size: 65% !important;
          }
        }

        .p-with-wink {
          &:after,
          &:before {
            margin-top: -1rem !important;
            background-size: 75%;
            width: 2.5rem;
            height: 2.5rem;
            opacity: 1;
          }

          &:after {
            margin-left: -0.5rem;
          }

          &:before {
            margin-left: -1.5rem;
          }
        }
      `}</style>
    </>
  )
}

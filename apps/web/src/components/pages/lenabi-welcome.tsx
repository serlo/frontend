import clsx from 'clsx'
import React, { ReactElement, useState, useEffect } from 'react'

import { WelcomeModal } from './user/welcome-modal'
import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { LandingSubjectsNew } from '../landing/rework/landing-subjects-new'
import { useAuthentication } from '@/auth/use-authentication'
import { LandingSubjectsData } from '@/data-types'

const landingSubjectsData: LandingSubjectsData = {
  subjects: [
    { url: '/mathe', title: 'Mathematik', icon: 'math' },
    {
      url: '/nachhaltigkeit',
      title: 'Nachhaltigkeit',
      icon: 'sustainability',
    },
    { url: '/biologie', title: 'Biologie', icon: 'biology' },
    { url: '/chemie', title: 'Chemie', icon: 'chemistry' },
    { url: '/informatik', title: 'Informatik', icon: 'informatics' },
    {
      url: '/community/neue-fächer-themen',
      title: 'Fächer im Aufbau',
      icon: 'new',
    },
  ],
  additionalLinks: [],
}

export function LenabiWelcome() {
  const [learnDataLoaded, setLearnDataLoaded] = useState(false)
  const auth = useAuthentication()
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const sessionId = createRandomSessionId()
    setSessionId(sessionId)
    sessionStorage.setItem('sessionId', sessionId)
  }, [])

  if (!auth) return <>bitte einloggen</>

  return (
    <>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <main className="text-truegray-700">
        <section className="mx-auto mt-20 max-w-3xl px-2 text-center font-bold md:mt-15vh">
          <p className="landing-button-with-wings landing-button-with-wink p-with-wink font-handwritten text-3xl text-brand">
            <span className="mr-2 italic">Willkommen {auth.username}!</span> 👋
          </p>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold',
              'tracking-tight',
              'mx-auto mb-6 mt-3 max-w-2xl'
            )}
          >
            Was möchtest du <span className="underlined pb-2">lernen ?</span>
          </h1>
          <p className="text-lg font-normal leading-cozy">
            Mit dir lernen gerade <b className="tracking-tight">1621</b> andere
            Menschen auf Serlo.
          </p>
        </section>

        <section className={clsx('mb-20 mt-40 font-bold tracking-tight')}>
          <h2 className="mx-side-lg mb-8 border-b-2 pb-3 text-center font-handwritten text-3xl text-brand">
            Lernempfehlungen
          </h2>

          <div className="flex justify-around">
            {learnDataLoaded ? (
              renderLearnData()
            ) : (
              <div className="max-w-3xl text-center font-normal">
                <p className="serlo-p">
                  Wenn du die Lerndaten aus deiner Data-Wallet für Serlo
                  freigibts,
                  <br />
                  kannst du hier deine aktuelle Lernempfehlungen und Aufgaben
                  sehen.
                </p>
                {sessionId && (
                  <WelcomeModal
                    callback={() => setLearnDataLoaded(true)}
                    username={auth.username}
                    sessionId={sessionId}
                  />
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-40 mt-40">
          <h2 className="mx-side-lg border-b-2 pb-3 text-center font-handwritten text-3xl text-brand">
            Nach Fächern
          </h2>
          <LandingSubjectsNew data={landingSubjectsData} />
        </section>

        <section className="mb-40 mt-10">
          <h2 className="mx-side-lg mb-8 border-b-2 pb-3 text-center font-handwritten text-3xl text-brand">
            Nach Lehrplan
          </h2>
          <div className="text-center">
            <Link
              href="/mathe"
              className="serlo-make-interactive-light serlo-button"
            >
              Realschule
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-make-interactive-light serlo-button"
            >
              Mittelschule (Hauptschule)
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-make-interactive-light serlo-button"
            >
              FOS &amp; BOS
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-make-interactive-light serlo-button"
            >
              Hochschule
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-make-interactive-light serlo-button"
            >
              Prüfungen
            </Link>
          </div>
        </section>
      </main>
      <style jsx>{`
        .underlined {
          padding-right: 1rem;
          white-space: nowrap;
          background: url('/_assets/img/landing/simple-underline.svg') no-repeat
            bottom;
        }
      `}</style>
    </>
  )

  function renderLearnData() {
    if (!learnDataLoaded) return null

    return (
      <>
        {renderBox({
          title: 'Logistisches Wachstum',
          content: (
            <p className="serlo-p font-normal">
              <span className="font-bold hover:underline">Jetzt zum Kurs</span>
              <br />
              (erstellt von Lehrkraft)
            </p>
          ),
          link: '/244309',
        })}
      </>
    )
  }

  function renderBox({
    title,
    content,
    link,
  }: {
    title: string
    content: ReactElement
    link?: string
  }) {
    return (
      <Link
        className="mx-2 block rounded-xl bg-brand-100 !no-underline"
        href={link}
      >
        <h3 className="serlo-h3">{title}</h3>
        {content}
      </Link>
    )
  }
}

function createRandomSessionId() {
  return (Math.random() + 1).toString(36).substring(2, 13)
}

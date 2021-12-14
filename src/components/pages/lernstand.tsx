import clsx from 'clsx'
import React, { ReactElement, useState } from 'react'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { LandingSubjectsNew } from '../landing/rework/landing-subjects-new'
import { LernstandModal } from '../user/lernstand-modal'
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

export function Lernstand() {
  const [learnDataLoaded, setLearnDataLoaded] = useState(false)
  const auth = useAuthentication()

  if (!auth.current) return <>bitte einloggen</>

  return (
    <>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <main className="text-truegray-700">
        <section className="text-center max-w-3xl mx-auto mt-20 md:mt-15vh font-bold px-2">
          <p className="text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
            <span className="italic mr-2">
              Willkommen {auth.current?.username}!
            </span>{' '}
            👋
          </p>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-6 mx-auto'
            )}
          >
            Was möchtest du <span className="pb-2 underlined">lernen ?</span>
          </h1>
          <p className="text-lg leading-cozy font-normal">
            Mit dir lernen gerade <b className="tracking-tight">1621</b> andere
            Menschen auf Serlo.
          </p>
        </section>

        <section className={clsx('tracking-tight font-bold mt-40 mb-20')}>
          <h2 className="font-handwritten text-brand text-3xl text-center pb-3 border-b-2 mx-side-lg mb-8">
            Dein Lernstand
          </h2>

          <div className="flex justify-around">
            {learnDataLoaded ? (
              renderLearnData()
            ) : (
              <div className="mt-6 max-w-3xl text-center font-normal">
                <p className="serlo-p">
                  Wenn du die Lerndaten aus deiner BIRD Data-Wallet für Serlo
                  freigibts,
                  <br />
                  kannst du hier deinen Lernstand einsehen und Lernempfehlungen
                  bekommen.
                </p>
                <p className="serlo-p">
                  <LernstandModal callback={() => setLearnDataLoaded(true)} />
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 mb-40">
          <h2 className="font-handwritten text-brand text-3xl text-center pb-3 border-b-2 mx-side-lg">
            Nach Fächern
          </h2>
          <LandingSubjectsNew data={landingSubjectsData} />
        </section>

        <section className="mt-10 mb-40">
          <h2 className="font-handwritten text-brand text-3xl text-center pb-3 border-b-2 mx-side-lg mb-8">
            Nach Lehrplan
          </h2>
          <div className="text-center">
            <Link
              href="/mathe"
              className="serlo-button serlo-make-interactive-light"
            >
              Realschule
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-button serlo-make-interactive-light"
            >
              Mittelschule (Hauptschule)
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-button serlo-make-interactive-light"
            >
              FOS &amp; BOS
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-button serlo-make-interactive-light"
            >
              Hochschule
            </Link>{' '}
            <Link
              href="/mathe"
              className="serlo-button serlo-make-interactive-light"
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
        {renderBox({ title: 'Fächer', content: <>123</> })}
        {renderBox({ title: 'Badges', content: <>123</> })}
        {renderBox({ title: '">???</', content: <>123</> })}
        {renderBox({ title: 'Fünfte Klasse Gymnasium', content: <>123</> })}
        {renderBox({
          title: 'Aufgaben',
          content: (
            <>
              <ul className="serlo-ul">
                <li>
                  <Link href="/135381">Orginalkurs (mit Lückentext)</Link>
                </li>
                <li>
                  <Link href="/232011">
                    Kurs den wir eigentlich benutzen wollen (ist noch nicht in
                    staging, erst ab moin)
                  </Link>
                </li>
                <li>
                  <Link href="">…</Link>
                </li>
              </ul>
            </>
          ),
        })}
      </>
    )
  }

  function renderBox({
    title,
    content,
  }: {
    title: string
    content: ReactElement
  }) {
    return (
      <div className="bg-brand-100 mx-2 rounded-xl">
        <h3 className="serlo-h3">{title}</h3>
        {content}
      </div>
    )
  }
}

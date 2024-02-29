import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { ExamsCompleteList } from '../landing/exams/exams-finder/exams-complete-list'
import {
  ExamsFinder,
  SupportedRegion,
  regions,
} from '../landing/exams/exams-finder/exams-finder'
import { FooterNew } from '../landing/rework/footer-new'
import { SubjectIcon } from '../landing/rework/subject-icon'
import { Header } from '../navigation/header/header'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
import { serloDomain } from '@/helper/urls/serlo-domain'
import type { RegionData } from '@/pages/mathe-pruefungen/[region]'

export function MathExamsLanding({ region: initRegion }: RegionData) {
  const [region, setRegion] = useState<SupportedRegion>(initRegion ?? 'bayern')
  const { lang } = useInstanceData()
  if (lang !== Instance.De) return null

  return (
    <>
      <HeadTags
        data={{
          title: `Mathe Abschlussprüfungen ${regions[region].title} – lernen mit serlo!`,
          metaImage: `https://de.${serloDomain}/_assets/img/meta/mathe.png`,
        }}
      />
      <Header />
      <main id="content" className="mx-side text-almost-black">
        <section
          className={cn(`
            mx-auto mt-16 max-w-3xl text-center sm:flex sm:text-left md:mt-14
          `)}
        >
          <div>
            <h1
              className={cn(`
                mb-10 mt-3 text-4xl
                font-extrabold
                tracking-tight sm:text-6xl
              `)}
            >
              <span className="inline-block w-min max-w-[27rem] !whitespace-normal pb-3">
                Mathe Prüfungen{' '}
                <span className="serlo-underlined">
                  {regions[region].title}
                </span>
              </span>
            </h1>
            <p className="text-2xl leading-cozy text-almost-black">
              Hier findest du <b>Übungsaufgaben</b>, <b>Lösungen</b> und{' '}
              <b>Erklärungen</b> für Deine Prüfungen.
              <br />
              <br />
              Du packst das! 🙌
            </p>
          </div>
          {renderIcon()}
        </section>

        <section className="themen relative -left-side min-h-[28rem] w-[calc(100%+32px)] px-side text-center">
          <div className="mx-auto mb-12 max-w-3xl text-left">
            <h2 className={cn(`pb-6 text-lg font-extrabold tracking-tight`)}>
              Finde deine Prüfung 🔎
            </h2>
            <ExamsFinder region={region} setRegion={setRegion} />
          </div>
        </section>

        <section className="mb-24 mt-20 justify-around sm:flex">
          <div className="sm:px-side">
            <h2 className="mx-side mt-3 max-w-2xl pb-6 text-2xl font-extrabold tracking-tight sm:mx-auto">
              😵‍💫 Könnte besser laufen?
            </h2>

            <p className="mx-side max-w-xl text-xl leading-cozy text-almost-black sm:mx-auto">
              Wir haben einen ganzen{' '}
              <Link href="/lerntipps">Bereich mit Lerntipps</Link> für dich.
            </p>
            <p className="mx-side my-3 max-w-xl text-xl leading-cozy text-almost-black sm:mx-auto">
              Oder schau in unserem{' '}
              <Link href="https://discord.com/invite/HyPx9jVq5G">
                Discord-Server
              </Link>{' '}
              vorbei für Austausch rund ums Thema Abschlussprüfungen.
            </p>
          </div>
          <div className="mt-12 sm:mt-0 sm:px-side">
            <h2 className="mx-side mt-3 max-w-2xl pb-6 text-2xl font-extrabold tracking-tight sm:mx-auto">
              😶‍🌫️ Nicht die richtige Aufgabe dabei?
            </h2>
            <p className="mx-side max-w-xl text-xl leading-cozy text-almost-black sm:mx-auto">
              Wenn Aufgaben zu Deinem Bundesland oder Deiner Schulform fehlen,
              sag uns gern kurz über{' '}
              <a className="serlo-link" href="mailto:de@serlo.org">
                de@serlo.org <FaIcon icon={faEnvelope} />
              </a>{' '}
              bescheid oder hilf unserer{' '}
              <Link href="/community">Autor*innencommunity</Link> die Aufgaben
              zu erstellen.
            </p>
          </div>
        </section>

        <section className="relative -left-side w-[calc(100%+32px)] bg-blueWave bg-100% pt-24 text-center">
          <ExamsCompleteList region={region} />
        </section>
      </main>
      <FooterNew />
      <style jsx>{`
        .themen,
        .community {
          padding-top: 3rem;
          padding-bottom: 1rem;
          margin: 4rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-position: 77% 12%;
          background-size: 100vw 100%;
        }
        @media (min-width: ${breakpoints.sm}) {
          .themen,
          .community {
            padding-top: 4rem;
            margin: 4rem 0 0 0;
            background-position: 20% 19%;
            background-size: 100vw 100%;
          }
        }
      `}</style>
    </>
  )

  function renderIcon() {
    return (
      <>
        <div className="landing-subjects group mx-auto mt-2 sm:-mt-3">
          <SubjectIcon subject="mathe" />
        </div>
        <style jsx global>{`
          .landing-subjects svg.serlo-subject-icon {
            display: block;
            margin: 0 auto;
            min-width: 16rem;

            width: 13rem;
            height: 13rem;
          }
        `}</style>
      </>
    )
  }
}

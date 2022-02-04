import clsx from 'clsx'
import Head from 'next/head'
import { lighten } from 'polished'
import React from 'react'

import { HeadTags } from '../head-tags'
import { FooterNew } from '../landing/rework/footer-new'
import { CommunityWallInformatik } from '../landing/subjects/community-wall-informatik'
import { LandingInformatikFeatured } from '../landing/subjects/landing-informatik-featured'
import { LandingInformatikTopicOverview } from '../landing/subjects/landing-informatik-topic-overview'
import { Header } from '../navigation/header'
import { Quickbar } from '../navigation/quickbar'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomySubTerm } from '@/data-types'
import { theme } from '@/theme'

interface LandingInformatikProps {
  subterms: TaxonomySubTerm[]
}

export function LandingInformatik({ subterms }: LandingInformatikProps) {
  const { lang } = useInstanceData()

  if (lang !== 'de') return null

  return (
    <>
      <Head>
        <link href="_assets/landing-fonts.css" rel="stylesheet" />
      </Head>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <Header />
      <main className="text-truegray-700">
        <section
          className={clsx(
            'max-w-3xl mx-auto mt-16',
            'md:mt-14 sm:flex',
            'text-center sm:text-left'
          )}
        >
          <div>
            <h1
              className={clsx(
                'text-6xl font-extrabold',
                'tracking-tight',
                'mt-3 mb-10'
              )}
            >
              <span className="pb-2 underlined">Informatik</span>
            </h1>
            <p className="text-2xl leading-cozy text-truegray-700">
              Keine Angst vor Computern.
              <br /> Lerne ihre Sprache und zähme sie 😉
            </p>
          </div>
          {renderIcon()}
        </section>

        <section className="max-w-3xl mx-auto mt-10 px-2 text-center sm:text-left sm:mt-16">
          <h2 className="text-truegray-700 font-bold text-lg mb-2">
            Durchsuche den Informatikbereich
          </h2>

          <Quickbar subject="informatik" className="max-w-sm sm:px-0 sm:ml-0" />
        </section>

        <section className={clsx('text-center', 'themen')}>
          <p className="text-brand font-handwritten text-4xl mt-4 mb-12">
            <span className="italic">Was darf&apos;s denn heute sein?</span>
          </p>
          <LandingInformatikTopicOverview subterms={subterms} />
        </section>

        <section className={clsx('text-center', 'mt-20 mb-8')}>
          <h2
            className={clsx(
              'text-4xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 pb-10 mx-auto'
            )}
          >
            <span className="pb-2">Beliebte Inhalte</span>
          </h2>

          <LandingInformatikFeatured />
        </section>

        <section className="text-center partner">
          <CommunityWallInformatik />
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

          @screen sm {
            padding-top: 4rem;
            margin: 4rem 0 0 0;
            background-position: 20% 19%;
            background-size: 100vw 100%;
          }
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
        .partner {
          padding-top: 1rem;
          background: url('/_assets/img/landing/footer-container.svg') no-repeat;
          background-size: 100% 100%;
        }
      `}</style>
    </>
  )

  function renderIcon() {
    return (
      <>
        <div className="landing-subjects group mx-auto -mt-3">
          <InformaticsSVG className="superspecial-informatics" />
        </div>
        <style jsx global>{`
          .landing-subjects {
            & svg.superspecial-informatics {
              display: block;
              margin: 0 auto;
              min-width: 16rem;

              width: 13rem;
              height: 13rem;

              .blue {
                fill: ${theme.colors.lighterblue};
                transition: all 0.2s ease-in-out;
              }
              .green,
              .drop,
              .pipette path {
                fill: #becd2b;
                transition: all 0.2s ease-in-out;
              }

              @media (min-width: ${theme.breakpoints.sm}) {
                .blue {
                  fill: ${lighten(0.07, theme.colors.lighterblue)};
                }
              }

              /* animations */
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              animation-play-state: paused;
            }
            .eye-closed,
            .sound {
              opacity: 0;
            }
            .eye-closed {
              stroke: #000;
              stroke-width: 2px;
            }
            & .superspecial-informatics {
              transition: fill ease-in 0.5s;
            }
            &:hover,
            &:focus,
            &:active {
              && .blue {
                fill: ${theme.colors.brand};
              }
              && .green {
                fill: #becd2b;
              }
              .eye-open {
                opacity: 0;
              }
              .eye-closed,
              .sound {
                opacity: 1;
              }
            }
          }
        `}</style>
      </>
    )
  }
}

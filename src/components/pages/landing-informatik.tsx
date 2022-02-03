import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Head from 'next/head'
import { lighten } from 'polished'
import React from 'react'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { CommunityWallInformatik } from '../landing/rework/community-wall-informatik'
import { FooterNew } from '../landing/rework/footer-new'
import { Header } from '../navigation/header'
import { Quickbar } from '../navigation/quickbar'
import { LandingInformatikTopicOverview } from './landing-informatik-topic-overview'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { theme } from '@/theme'

interface FeaturedContentData {
  title: string
  type: string
  url: string
  img: string
}

const featuredContent = [
  {
    title: 'Vektor- und Pixelgrafik',
    type: 'article',
    url: '/informatik/57636/vektor-und-pixelgrafik',
    img: 'https://assets.serlo.org/legacy/573afde7f3fc1_0b64541b7d14bafc97c9ab582b7d480d1b970b39.png',
  },
  {
    title: 'Beispiele: Wie verändert Big Data die Welt?',
    type: 'article',
    url: '/informatik/158556/beispiele-wie-verändert-big-data-die-welt',
    img: 'https://assets.serlo.org/5e6bba021ecc6_8a830acbe9cdd3341b5cc829bd14d6d0fde2ee02.jpg',
  },
  {
    title: 'Einführung in die Pixel- und Vektorgrafik',
    type: 'course',
    url: '/informatik/93484/pixelgrafik',
    img: 'https://assets.serlo.org/5a4f9574a8bba_0e16bbe25658c9d1ceb68425e781f7985817f0ca.png',
  },
  {
    title: 'Caesar-Verschlüsselung',
    type: 'article',
    url: '/informatik/48121/caesar-verschlüsselung',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg',
  },
  {
    title: 'Welche Probleme entstehen durch Big Data?',
    type: 'article',
    url: '/informatik/158565/welche-probleme-entstehen-durch-big-data',
    img: 'https://assets.serlo.org/5e820b77172a8_57299a41c225cec8161139906a807e1d57dd2467.jpg',
  },
  {
    title: 'Hack The Web',
    type: 'folder',
    url: '/informatik/200247/hack-the-web',
    img: 'https://assets.serlo.org/60f583949b1a6_bf557cf5479ff23e170c34e8a2eef03d0d645bdc.gif',
  },
] as FeaturedContentData[]

export function LandingInformatik() {
  const { strings, lang } = useInstanceData()

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
          <h2
            className={clsx(
              'text-4xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-2 mb-8 mx-auto',
              'landing-button-with-wings landing-button-with-wink p-with-wink'
            )}
          >
            <span>Alle Themen</span>
          </h2>

          <LandingInformatikTopicOverview />
          {/* <p className="text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
            <span className="italic">was darf&apos;s denn heute sein?</span>
          </p> */}
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

          {renderFeaturedContent()}
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

  function renderFeaturedContent() {
    return (
      <div
        className={clsx(
          'flex items-stretch justify-around',
          'px-side pb-6 flex-wrap',
          'w-full mx-auto sm:max-w-3xl lg:max-w-max '
        )}
      >
        {featuredContent.map(renderFeaturedBox)}
      </div>
    )
  }

  function renderFeaturedBox(data: FeaturedContentData) {
    return (
      <Link
        className={clsx(
          'text-brand hover:no-underline box-border',
          'p-2.5 leading-cozy',
          'rounded hover:shadow-menu hover:text-truegray-700',
          'mb-4 mx-2 w-44 group transition-all text-left',
          'relative'
        )}
        href={data.url}
        key={data.title}
        path={[]}
      >
        <div className="mb-2.5 mr-5 bg-brand-100 group-hover:bg-white rounded-lg transition-all">
          <img
            className={clsx(
              'object-contain object-center',
              'mix-blend-multiply opacity-80 transition-all',
              'group-hover:opacity-100'
            )}
            style={{ aspectRatio: '1' }}
            alt={data.title}
            src={data.img}
          />
        </div>
        <h4 className="font-bold text-xl mx-0 mt-1 mb-10">{data.title}</h4>
        <span className="block mt-1 font-sm text-brand-lighter absolute bottom-2">
          {renderTypeIcon(data.type)} {getTranslatedType(strings, data.type)}
        </span>
      </Link>
    )
  }

  function renderTypeIcon(type: string) {
    const icon = getIconByTypename(type)
    return (
      <FontAwesomeIcon icon={icon} title={getTranslatedType(strings, type)} />
    )
  }
}

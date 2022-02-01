import clsx from 'clsx'
import Head from 'next/head'
import { lighten } from 'polished'
import React from 'react'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { CommunityWallInformatik } from '../landing/rework/community-wall-informatik'
import { FooterNew } from '../landing/rework/footer-new'
import { LandingJsonLd } from '../landing/rework/landing-json-ld'
import { Header } from '../navigation/header'
import { Quickbar } from '../navigation/quickbar'
import InformaticsSVG from '@/assets-webkit/img/landing/subjects-informatics.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomySubTerm } from '@/data-types'
import { theme } from '@/theme'

const subterms = [
  {
    id: 76682,
    title: 'Informatik, Mensch und Gesellschaft',
    url: '/informatik/76682/informatik-mensch-und-gesellschaft',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/60afd286bb12c_bd3453012f4429ca2876867c69768272a9b4ed08.png',
        alt: 'Weltkarte Schaltkreise (Pixabay https://pixabay.com/de/vectors/kartographie-kontinente-erde-3244166/)',
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      {
        title: 'Big Data – einfach erklärt',
        url: '/informatik/155948/big-data-%E2%80%93-einfach-erkl%C3%A4rt',
        id: 155948,
      },
      {
        title: 'Wie funktioniert das Internet?',
        url: '/informatik/191577/wie-funktioniert-das-internet',
        id: 191577,
      },
      {
        title: 'Chancen und Risiken digitaler Kommunikation',
        url: '/informatik/198771/chancen-und-risiken-digitaler-kommunikation',
        id: 198771,
      },
      {
        title: 'Datenschutz',
        url: '/informatik/65055/datenschutz',
        id: 65055,
      },
      {
        title: 'Verschlüsselung',
        url: '/informatik/48499/verschl%C3%BCsselung',
        id: 48499,
      },
    ],
  },
  {
    id: 199823,
    title: 'Objektorientierte Programmierung und Modellierung',
    url: '/informatik/199823/objektorientierte-programmierung-und-modellierung',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/60b0ccb9eb9b9_07af9cd3278005b66a52dd74343dfb6d9bc63993.png',
        alt: 'Klassendiagramm Unterricht',
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      {
        title: 'Klassen und Objekte',
        url: '/informatik/57028/klassen-und-objekte',
        id: 57028,
      },
      {
        title: 'Objektorientierte Programmierung',
        url: '/informatik/182145/objektorientierte-programmierung',
        id: 182145,
      },
      {
        title: 'Objektorientierte Programmierung mit JavaScript',
        url: '/informatik/206894/objektorientierte-programmierung-mit-javascript',
        id: 206894,
      },
    ],
  },
  {
    id: 57628,
    title: 'Daten und Informationen',
    url: '/informatik/57628/daten-und-informationen',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/legacy/57eb81717a07d_67e94a62d819d4381996c582721810e2ced768dc.svg',
        alt: 'Daten und Informationen, QR-Code',
        href: '/57628',
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      {
        title: 'Darstellung von Informationen',
        url: '/informatik/57629/darstellung-von-informationen',
        id: 57629,
      },
      {
        title: 'Strukturierung von Informationen',
        url: '/informatik/65813/strukturierung-von-informationen',
        id: 65813,
      },
      {
        title: 'Speicherung von Informationen',
        url: '/informatik/57630/speicherung-von-informationen',
        id: 57630,
      },
      {
        title: 'Verarbeitung von Informationen',
        url: '/informatik/57631/verarbeitung-von-informationen',
        id: 57631,
      },
      {
        title: 'Übertragung von Informationen',
        url: '/informatik/57633/%C3%BCbertragung-von-informationen',
        id: 57633,
      },
    ],
  },
  {
    id: 162150,
    title: 'Datenstrukturen und Algorithmen',
    url: '/informatik/162150/datenstrukturen-und-algorithmen',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/legacy/590c3b6e1c109_7423b39acc2f84cddd1f01611143594af115ac85.png',
        alt: 'Roboter Robi',
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [
      {
        title: 'Datenstrukturen und Algorithmen',
        id: 194044,
        url: '/informatik/194044/datenstrukturen-und-algorithmen',
        unrevised: false,
      },
    ],
    events: [],
    folders: [
      {
        title: 'Algorithmen und ihre Bausteine',
        url: '/informatik/212756/algorithmen-und-ihre-bausteine',
        id: 212756,
      },
      {
        title: 'Hierarchische und vernetzte Strukturen',
        url: '/informatik/210211/hierarchische-und-vernetzte-strukturen',
        id: 210211,
      },
    ],
  },
  {
    id: 199822,
    title: 'Funktionale Programmierung und Modellierung',
    url: '/informatik/199822/funktionale-programmierung-und-modellierung',
    description: [
      {
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/6053973483875_f8f489fd37b974cdaa826ffdbea1f5bf8141bd51.png',
            alt: 'Vektorgrafik zur Tabellenkalkulation (https://pixabay.com/de/vectors/tabellen-grafik-gesch%C3%A4ft-bericht-24956/)',
          },
        ],
        children: [
          {
            type: 'blockquote',
            children: [
              {
                type: 'p',
                children: [
                  {
                    type: 'text',
                    text: 'Dieser Bereich befindet sich im Aufbau!',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      {
        title: 'Tabellenkalkulation',
        url: '/informatik/69554/tabellenkalkulation',
        id: 69554,
      },
    ],
  },
  {
    id: 76683,
    title: 'Werkzeuge und Methoden',
    url: '/informatik/76683/werkzeuge-und-methoden',
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [
      {
        title: 'Versionskontrolle mit git',
        id: 227404,
        url: '/informatik/227404/versionskontrolle-mit-git',
        unrevised: false,
      },
    ],
    events: [],
    folders: [
      {
        title: 'Versionskontrolle mit Git',
        url: '/informatik/226587/versionskontrolle-mit-git',
        id: 226587,
      },
      {
        title: 'Internet der Dinge mit CircuitPython',
        url: '/informatik/129469/internet-der-dinge-mit-circuitpython',
        id: 129469,
      },
      {
        title: 'Präsentation',
        url: '/informatik/76684/pr%C3%A4sentation',
        id: 76684,
      },
      {
        title: 'Open Roberta',
        url: '/informatik/76866/open-roberta',
        id: 76866,
      },
      {
        title: 'Robot Karol',
        url: '/informatik/70053/robot-karol',
        id: 70053,
      },
    ],
  },
  {
    id: 162149,
    title: 'Theoretische Informatik',
    url: '/informatik/162149/theoretische-informatik',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/60a440cc6c7c8_179469dc3233620a93c5d6619e4142dbe15e9f5d.jpg',
        alt: 'Spielfigur bewegt sich über Automaten',
      },
    ],
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      {
        title: 'Formale Sprachen',
        url: '/informatik/75406/formale-sprachen',
        id: 75406,
      },
      {
        title: 'Zahlensysteme',
        url: '/informatik/184932/zahlensysteme',
        id: 184932,
      },
    ],
  },
] as TaxonomySubTerm[]

interface FeaturedContentData {
  title: string
  type: string
  url: string
  img: string
}

const featuredContent = [
  {
    title: 'Vektor- und Pixelgrafik',
    type: 'Artikel',
    url: '/informatik/57636/vektor-und-pixelgrafik',
    img: 'https://assets.serlo.org/legacy/573afde7f3fc1_0b64541b7d14bafc97c9ab582b7d480d1b970b39.png',
  },
  {
    title: 'Beispiele: Wie verändert Big Data die Welt?',
    type: 'Artikel',
    url: '/informatik/158556/beispiele-wie-verändert-big-data-die-welt',
    img: 'https://assets.serlo.org/5e6bba021ecc6_8a830acbe9cdd3341b5cc829bd14d6d0fde2ee02.jpg',
  },
  {
    title: 'Einführung in die Pixel- und Vektorgrafik',
    type: 'Kurs',
    url: '/informatik/93484/pixelgrafik',
    img: 'https://assets.serlo.org/5a4f9574a8bba_0e16bbe25658c9d1ceb68425e781f7985817f0ca.png',
  },
  {
    title: 'Caesar-Verschlüsselung',
    type: 'Artikel',
    url: '/informatik/48121/caesar-verschlüsselung',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg',
  },
  {
    title: 'Welche Probleme entstehen durch Big Data?',
    type: 'Artikel',
    url: '/informatik/158565/welche-probleme-entstehen-durch-big-data',
    img: 'https://assets.serlo.org/5e820b77172a8_57299a41c225cec8161139906a807e1d57dd2467.jpg',
  },
  {
    title: 'Hack The Web',
    type: 'Taxonomy',
    url: '/informatik/200247/hack-the-web',
    img: 'https://assets.serlo.org/60f583949b1a6_bf557cf5479ff23e170c34e8a2eef03d0d645bdc.gif',
  },
] as FeaturedContentData[]

export function LandingInformatik() {
  const { lang } = useInstanceData()

  if (lang !== 'de') return null

  return (
    <>
      <Head>
        <link href="_assets/landing-fonts.css" rel="stylesheet" />
      </Head>
      <LandingJsonLd />
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <Header />
      <main className="text-truegray-700">
        <section className="max-w-3xl mx-auto mt-20 md:mt-15vh px-2 sm:flex">
          <div>
            <h1
              className={clsx(
                'text-6xl font-extrabold',
                'tracking-tight',
                'max-w-2xl mt-3 mb-10 mx-auto'
              )}
            >
              <span className="pb-2 underlined">Informatik</span>
            </h1>
            <p className="text-2xl leading-cozy text-truegray-700">
              Keine Angst vor Computern.
              <br /> Lerne ihre Sprache und zähme sie 😉
            </p>
          </div>
          <div className="">{renderIcon()}</div>
        </section>

        <section className="max-w-3xl mx-auto mt-20 md:mt-15vh px-2">
          <h2 className="text-truegray-700 font-bold text-xl">
            Durchsuche den Informatikbereich
          </h2>
          <div className="max-w-lg mt-1 -ml-4">
            <Quickbar subject="informatik" />
          </div>
        </section>

        <section className={clsx('text-center', 'mt-7', 'themen')}>
          <h2
            className={clsx(
              'text-4xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-10 mx-auto'
            )}
          >
            <span className="pb-2">Alle Themen</span>
          </h2>

          {renderTopicOverview()}
        </section>

        <section className={clsx('text-center', 'mt-20 mb-8')}>
          <h2
            className={clsx(
              'text-4xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-10 mx-auto'
            )}
          >
            <span className="pb-2">Beliebte Inhalte</span>
          </h2>

          {renderFeaturedContent()}
        </section>

        <section className="text-center partner">
          <div className="overflow-hidden">
            <CommunityWallInformatik />
          </div>
        </section>
      </main>
      <FooterNew />
      <style jsx>{`
        .themen,
        .community {
          padding-top: 4rem;
          padding-bottom: 5rem;
          margin: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-position: 77% 12%;
          background-size: 100vw 100%;

          @screen sm {
            padding-top: 4rem;
            padding-bottom: 9rem;
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
        <div className="landing-subjects group">
          <InformaticsSVG className="superspecial-informatics" />
        </div>
        <style jsx global>{`
          @keyframes jump {
            16% {
              transform: translateY(1rem);
            }
            33% {
              transform: translateY(-0.6rem);
            }
            50% {
              transform: translateY(0.4rem);
            }
            67% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes hiccup {
            33% {
              transform: translateY(0) rotate(0);
            }
            44% {
              transform: translateY(-0.25rem) rotate(0.2deg);
            }
            70% {
              transform: translateY(-0rem) rotate(-0.4deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }
          .landing-subjects {
            & svg.superspecial-informatics {
              display: block;
              margin: 0 auto;
              min-width: 16rem;

              width: 13rem;
              height: 13rem;
              margin: -2.5rem 0 0 0;

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
        <style jsx>{`
          :global(.landing-subjects) {
            position: relative;
            right: -5rem;
          }
        `}</style>
      </>
    )
  }

  function renderTopicOverview() {
    return <ul className="font-lg flex text-left">{renderTerms()}</ul>
  }

  function renderTerms() {
    return subterms.map((term) => {
      const image =
        term.description &&
        term.description.length > 0 &&
        term.description[0].type === 'img'
          ? term.description[0]
          : undefined

      return (
        <li
          // className="transition-all ease-in-out duration-200 inline-block text-brand hover:text-black font-bold py-1 px-2 text-lg m-2 cursor-pointer bg-white rounded-xl "
          className="m-1 flex-1 p-2"
          key={term.title}
        >
          <img
            src={image?.src}
            alt={image?.alt}
            className="mix-blend-multiply object-center object-contain h-24 mb-3"
          />

          <h4 className="pb-2 border-b-2 font-bold text-lg border-black mb-2 h-24">
            {term.title}
          </h4>

          {term.folders.map((folder) => {
            return (
              <>
                {folder.title}
                <br />
              </>
            )
          })}
        </li>
      )
    })
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
          'mb-4 mx-2 w-44 group transition-all'
        )}
        href={data.url}
        key={data.title}
        path={[]}
      >
        <div className="mb-2.5 mx-3 bg-brand-100 group-hover:bg-white rounded-lg transition-all">
          <img
            className={clsx(
              'object-contain object-center',
              'mix-blend-multiply opacity-70 transition-all',
              'group-hover:opacity-100'
            )}
            style={{ aspectRatio: '1' }}
            alt={data.title}
            src={data.img}
          />
        </div>
        <h4 className="font-bold text-xl mx-0 mt-3 mb-1">{data.title}</h4>
        {/* <p className="m-0">…</p> */}
        {/* {data.description} */}
      </Link>
    )
  }
}

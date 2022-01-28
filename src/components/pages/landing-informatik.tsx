import clsx from 'clsx'
import Head from 'next/head'
import { lighten } from 'polished'
import React from 'react'

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
    id: 69501,
    title: 'Datenbanken und Datenbanksysteme',
    url: '/informatik/69501/datenbanken-und-datenbanksysteme',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/legacy/58b4178e26e8e_1723290b59dad596570851a0b730e667ad3b3118.png',
        alt: 'Datenbank',
        href: '/69501',
      },
    ],
    articles: [
      {
        title: 'Datenbankverwaltungssystem (DBMS)',
        id: 69730,
        url: '/informatik/69730/datenbankverwaltungssystem-dbms',
        unrevised: false,
      },
      {
        title: 'Beziehungen zwischen Tabellen',
        id: 69732,
        url: '/informatik/69732/beziehungen-zwischen-tabellen',
        unrevised: false,
      },
      {
        title: 'Schlüssel ',
        id: 69734,
        url: '/informatik/69734/schl%C3%BCssel',
        unrevised: false,
      },
      {
        title: 'SQL-Abfragen',
        id: 69747,
        url: '/informatik/69747/sql-abfragen',
        unrevised: false,
      },
      {
        title: 'Join-Operationen',
        id: 93029,
        url: '/informatik/93029/join-operationen',
        unrevised: false,
      },
      {
        title: 'Objektorientiertes Datenmodell',
        id: 160080,
        url: '/informatik/160080/objektorientiertes-datenmodell',
        unrevised: false,
      },
      {
        title: 'relationales Datenbankschema',
        id: 160123,
        url: '/informatik/160123/relationales-datenbankschema',
        unrevised: false,
      },
      {
        title: 'Tabellen (Relationen)',
        id: 160124,
        url: '/informatik/160124/tabellen-relationen',
        unrevised: false,
      },
      {
        title: 'Datenintegrität',
        id: 160140,
        url: '/informatik/160140/datenintegrit%C3%A4t',
        unrevised: false,
      },
      {
        title: 'typische Datentypen in DBMS',
        id: 160143,
        url: '/informatik/160143/typische-datentypen-in-dbms',
        unrevised: false,
      },
      {
        title: 'Datenbanktransaktionen',
        id: 160256,
        url: '/informatik/160256/datenbanktransaktionen',
        unrevised: false,
      },
      {
        title: 'ACID-Eigenschaften',
        id: 160497,
        url: '/informatik/160497/acid-eigenschaften',
        unrevised: false,
      },
      {
        title: 'rekursive Beziehungen',
        id: 161407,
        url: '/informatik/161407/rekursive-beziehungen',
        unrevised: false,
      },
      {
        title: 'Redundanz in Datenbanken',
        id: 161423,
        url: '/informatik/161423/redundanz-in-datenbanken',
        unrevised: false,
      },
      {
        title: 'Referenzattribute',
        id: 161293,
        url: '/informatik/161293/referenzattribute',
        unrevised: false,
      },
      {
        title: 'NULL in der Datenbank',
        id: 161967,
        url: '/informatik/161967/null-in-der-datenbank',
        unrevised: false,
      },
    ],
    exercises: [
      {
        title: 'Aufgaben zu SQL',
        id: 161399,
        url: '/informatik/161399/aufgaben-zu-sql',
      },
      {
        title: 'Umfangreichere Aufgaben zu Datenbanken',
        id: 161400,
        url: '/informatik/161400/umfangreichere-aufgaben-zu-datenbanken',
      },
      {
        title: 'Aufgaben zu Datenbankmodellierung',
        id: 69859,
        url: '/informatik/69859/aufgaben-zu-datenbankmodellierung',
      },
    ],
    videos: [],
    applets: [],
    courses: [
      {
        title: 'Datenmodellierung: Realität goes Datenbank',
        id: 160492,
        url: '/informatik/160492/datenmodellierung-realit%C3%A4t-goes-datenbank',
        unrevised: false,
      },
      {
        title: 'Einführung in Abfragen mit SQL',
        id: 161018,
        url: '/informatik/161018/einf%C3%BChrung-in-abfragen-mit-sql',
        unrevised: false,
      },
      {
        title: 'Beziehungen in Datenbanken',
        id: 161276,
        url: '/informatik/161276/beziehungen-in-datenbanken',
        unrevised: false,
      },
      {
        title: 'Anomalien in Datenbanken',
        id: 161470,
        url: '/informatik/161470/anomalien-in-datenbanken',
        unrevised: false,
      },
      {
        title: 'Abfragen über mehrere Tabellen',
        id: 161964,
        url: '/informatik/161964/abfragen-%C3%BCber-mehrere-tabellen',
        unrevised: false,
      },
      {
        title: 'Kardinalitäten in Klassendiagrammen',
        id: 206351,
        url: '/informatik/206351/kardinalit%C3%A4ten-in-klassendiagrammen',
        unrevised: false,
      },
    ],
    events: [],
    folders: [],
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
  {
    id: 75211,
    title: 'Baustelle',
    url: '/informatik/75211/baustelle',
    description: [
      {
        type: 'img',
        src: 'https://assets.serlo.org/legacy/590c3f2e45f0c_a908178dee7d3daccf5ed0872ee1ea9ae0aeb67d.png',
        alt: 'Baustelle',
      },
      {
        type: 'p',
        children: [
          {
            type: 'text',
            text: 'In diesem Bereich werden Inhalte gesammelt, die gerade überarbeitet werden oder noch nicht fertig gestellt sind. Alle Inhalte sind noch in Arbeit.',
          },
        ],
      },
    ],
    articles: [
      {
        title: 'Urheberrecht',
        id: 79220,
        url: '/informatik/79220/urheberrecht',
        unrevised: false,
      },
      {
        title: 'Informationssicherheit',
        id: 79221,
        url: '/informatik/79221/informationssicherheit',
        unrevised: false,
      },
      {
        title: 'Geschichte der Informatik',
        id: 79723,
        url: '/informatik/79723/geschichte-der-informatik',
        unrevised: false,
      },
      {
        title: 'Datenschutz im Internet',
        id: 79389,
        url: '/informatik/79389/datenschutz-im-internet',
        unrevised: false,
      },
      {
        title: 'Codierungen',
        id: 84604,
        url: '/informatik/84604/codierungen',
        unrevised: false,
      },
      {
        title: 'Alphanumerische Codes',
        id: 85855,
        url: '/informatik/85855/alphanumerische-codes',
        unrevised: false,
      },
      {
        title: 'Graphische Codes',
        id: 85858,
        url: '/informatik/85858/graphische-codes',
        unrevised: false,
      },
      {
        title: 'Numerische Codes',
        id: 85864,
        url: '/informatik/85864/numerische-codes',
        unrevised: false,
      },
      {
        title: 'Pflichtenheft',
        id: 160083,
        url: '/informatik/160083/pflichtenheft',
        unrevised: false,
      },
      {
        title: 'CamelCase-Schreibweise',
        id: 176579,
        url: '/informatik/176579/camelcase-schreibweise',
        unrevised: false,
      },
      {
        title: 'Datenstruktur Queue',
        id: 212766,
        url: '/informatik/212766/datenstruktur-queue',
        unrevised: false,
      },
      {
        title: 'Datenstruktur Stack',
        id: 212769,
        url: '/informatik/212769/datenstruktur-stack',
        unrevised: false,
      },
      {
        title: 'Queue und Stack implementieren',
        id: 212771,
        url: '/informatik/212771/queue-und-stack-implementieren',
        unrevised: false,
      },
      {
        title: 'Doppelt verkettete Liste',
        id: 213256,
        url: '/informatik/213256/doppelt-verkettete-liste',
        unrevised: false,
      },
      {
        title: 'Editierdistanz - Ähnlichkeit von Wörtern',
        id: 233516,
        url: '/informatik/233516/editierdistanz-%C3%A4hnlichkeit-von-w%C3%B6rtern',
        unrevised: false,
      },
    ],
    exercises: [],
    videos: [
      {
        title: 'Video zur Pixelgrafik',
        id: 94658,
        url: '/informatik/94658/video-zur-pixelgrafik',
        unrevised: false,
      },
      {
        title: 'Video zur Vektorgrafik',
        id: 94660,
        url: '/informatik/94660/video-zur-vektorgrafik',
        unrevised: false,
      },
    ],
    applets: [],
    courses: [
      {
        title: 'Webseite selbst erstellen mit HTML 5 und CSS',
        id: 176078,
        url: '/informatik/176078/webseite-selbst-erstellen-mit-html-5-und-css',
        unrevised: false,
      },
    ],
    events: [],
    folders: [
      {
        title: 'Technische Informatik',
        url: '/informatik/48965/technische-informatik',
        id: 48965,
      },
      {
        title: 'Hack The Web',
        url: '/informatik/200247/hack-the-web',
        id: 200247,
      },
    ],
  },
  {
    id: 60395,
    title: 'Bayern',
    url: '/informatik/60395/bayern',
    articles: [],
    exercises: [],
    videos: [],
    applets: [],
    courses: [],
    events: [],
    folders: [
      { title: 'Gymnasium', url: '/informatik/60396/gymnasium', id: 60396 },
      { title: 'Realschule', url: '/informatik/60397/realschule', id: 60397 },
    ],
  },
] as TaxonomySubTerm[]

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

        <section className={clsx('text-center', 'mt-20 mb-20')}>
          <h2
            className={clsx(
              'text-4xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-10 mx-auto'
            )}
          >
            <span className="pb-2">Beliebte Inhalte</span>
          </h2>

          {renderTopicOverview()}
        </section>

        {/* <section className="mt-20 mb-20 mx-side">
          <img src="/_assets/img/landing/birds.svg" className="mx-auto" />
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(
              'text-center text-4xl font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-7 mx-auto'
            )}
          >
            Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
            digitale Transformation unserer Schulen ein.
          </h3>
        </section> */}

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
    return <ul className="font-lg">{renderTerms()}</ul>
  }

  function renderTerms() {
    return subterms.map((term) => {
      // const image =
      //   term.description &&
      //   term.description.length > 0 &&
      //   term.description[0].type === 'img'
      //     ? term.description[0]
      //     : undefined

      return (
        <li
          // className="transition-all ease-in-out duration-200 inline-block text-brand hover:text-black font-bold py-1 px-2 text-lg m-2 cursor-pointer bg-white rounded-xl "
          className="serlo-button serlo-make-interactive-light bg-white m-1"
          key={term.title}
        >
          {term.title}
          {/* <br />
          <img src={image?.src} alt={image?.alt} /> */}
        </li>
      )
    })
  }
}

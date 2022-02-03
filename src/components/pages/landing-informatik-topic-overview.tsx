import clsx from 'clsx'
import { useState } from 'react'

import { MaxWidthDiv } from '../navigation/max-width-div'
import { SubTopic } from '../taxonomy/sub-topic'
import { SecondaryNavigationData, TaxonomySubTerm } from '@/data-types'

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

export function LandingInformatikTopicOverview() {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const navData: SecondaryNavigationData = subterms.map((term, index) => {
    return { url: term.url, title: term.title, active: selectedIndex === index }
  })

  function onMenuClick(index: number) {
    setSelectedIndex(index)
  }

  return (
    <div className="">
      {/* <p className=" text-brand italic font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink pb-6">
        
      </p> */}
      {/* <MetaMenu data={navData} hackForSubjectLanding onClick={onMenuClick} /> */}
      {renderMenu()}

      <div className="pt-3 md:pt-6 image-hack">
        <MaxWidthDiv>
          {selectedIndex > -1 ? (
            <SubTopic
              data={subterms[selectedIndex]}
              subid={subterms[selectedIndex].id}
              id={0}
            />
          ) : null}
        </MaxWidthDiv>
      </div>
      <style jsx>{`
        .placeholder:after {
          content: ' ';
          display: block;
          background: url('/_assets/img/landing/about-big-arrow.svg') no-repeat;
          transform: scaleX(-1);
          margin-top: 2.5rem;
          height: 5rem;
          max-width: 40rem;
          margin-left: -12rem;
        }
      `}</style>
      <style jsx global>
        {`
          .image-hack img {
            mix-blend-mode: multiply;
          }
        `}
      </style>
    </div>
  )

  function renderMenu() {
    return (
      <nav className="mx-side text-left">
        <ul className="max-w-full items-end text-center">
          {navData.map((entry, i) => {
            const className = clsx(
              'serlo-button rounded-xl tracking-slightly-tighter py-[3px] block mobile:inline-block',
              'mobile:mx-2 text-lg sm:text-xl mb-3.5',
              entry.active
                ? 'text-white bg-brand'
                : 'serlo-make-interactive-transparent-blue bg-white'
            )

            return (
              <li key={entry.url} className="inline">
                <a onClick={() => onMenuClick(i)} className={className}>
                  {entry.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

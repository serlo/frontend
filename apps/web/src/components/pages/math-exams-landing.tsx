import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useMemo, useState } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { FooterNew } from '../landing/rework/footer-new'
import { SubjectIcon } from '../landing/rework/subject-icon'
import { Header } from '../navigation/header/header'
import { Quickbar, QuickbarData, quickbarUrl } from '../navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
import { serloDomain } from '@/helper/urls/serlo-domain'

const schoolTypes = [
  'Mittelschule (Hauptschule)',
  'Realschule',
  'Gymnasium',
  'FOS & BOS',
] as const

export function MathExamsLanding() {
  const [quickbarData, setQuickbarData] = useState<QuickbarData | undefined>(
    undefined
  )

  useEffect(() => {
    if (!quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }, [quickbarData])

  const featuredTaxonomies = useMemo(() => {
    const getCount = (inputId: number) => {
      return quickbarData?.find(({ id }) => id === String(inputId))?.count ?? 0
    }
    if (!quickbarData) return []
    return [...mathExamTaxonomies]
      .sort((a, b) => {
        return getCount(b.id) - getCount(a.id)
      })
      .slice(0, 6)
  }, [quickbarData])

  const { lang } = useInstanceData()
  if (lang !== Instance.De) return null

  return (
    <>
      <HeadTags
        data={{
          title: `Mathe Abschlussprüfungen – lernen mit serlo!`,
          metaImage: `https://de.${serloDomain}/_assets/img/meta/mathe.png`,
        }}
      />
      <Header />
      <main id="content" className="mx-side text-almost-black">
        <section
          className={cn(`
            mx-auto mt-16 max-w-3xl
            text-center sm:flex
            sm:text-left md:mt-14
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
              <span className="serlo-underlined inline-block w-min max-w-[27rem] !whitespace-normal pb-3">
                Mathe Prüfungen
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

        <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-16 sm:text-left">
          <h2 className="mb-2 text-lg font-bold text-almost-black">
            Suche nach Prüfungen
          </h2>

          <Quickbar
            subject="mathe"
            className="max-w-sm sm:-ml-1 sm:px-0 md:max-w-2xl md:pr-4"
            customData={quickbarData}
          />
        </section>

        {/* Hier vielleicht eher eine Tabelle? */}
        <section className="themen relative -left-side w-[calc(100%+32px)] text-center">
          {/* <h2 className="-mt-4 text-2xl font-extrabold tracking-tight">
            <span>Nach Schulart (Bayern)</span>
          </h2>
          <nav className="mx-auto mt-2 flex max-w-xl justify-center text-center">
            {schoolTypes.map(renderSchoolButton)}
          </nav> */}
          {/* <SubjectLandingTopicOverview subterms={subterms} subject={subject} /> */}
          <h2
            className={cn(`
              mx-auto mt-3 max-w-2xl
              pb-10 text-3xl font-extrabold tracking-tight
            `)}
          >
            <span className="pb-2">Beliebte Inhalte 🔥</span>
          </h2>

          <div
            className={cn(`
              mx-auto flex w-full
              flex-wrap items-stretch justify-around
              px-side pb-6 sm:max-w-3xl lg:max-w-max
            `)}
          >
            {featuredTaxonomies.map(renderFeaturedBox)}
          </div>
        </section>

        {/* <section className="mb-8 mt-20 text-center">
        
        </section> */}

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

        <section className="bg-blueWave bg-100% pt-24 text-center">
          {/* Banner für Autor*innengewinnung? */}
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
        <div className="landing-subjects group mx-auto -mt-3">
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

interface MathExamTaxonomy {
  id: number
  title: string
  school: (typeof schoolTypes)[number]
}

const mathExamTaxonomies: MathExamTaxonomy[] = [
  {
    id: 220418,
    title: 'Jahrgangsstufentest Mathematik',
    school: 'Mittelschule (Hauptschule)',
  },
  {
    id: 75678,
    title: 'Quali Abschlussprüfungen mit Lösung',
    school: 'Mittelschule (Hauptschule)',
  },
  {
    id: 247427,
    title: 'Mittlerer Schulabschluss an der Mittelschule',
    school: 'Mittelschule (Hauptschule)',
  },
  {
    id: 219731,
    title: 'Jahrgangsstufentest ',
    school: 'Realschule',
  },
  {
    id: 220404,
    title: 'Grundwissenstest 7. Klasse',
    school: 'Realschule',
  },
  {
    id: 220648,
    title: 'Jahrgangsstufentest 8. Klasse',
    school: 'Realschule',
  },
  {
    id: 220649,
    title: 'Jahrgangsstufentest 8. Klasse',
    school: 'Realschule',
  },
  {
    id: 220680,
    title: 'Grundwissentest 9. Klasse',
    school: 'Realschule',
  },
  {
    id: 220681,
    title: 'Grundwissentest 9. Klasse',
    school: 'Realschule',
  },
  {
    id: 75049,
    title: 'Abschlussprüfungen mit Lösung, Zweig I',
    school: 'Realschule',
  },
  {
    id: 76750,
    title: 'Abschlussprüfungen mit Lösungen, Zweig II und III',
    school: 'Realschule',
  },
  {
    id: 219775,
    title: 'Jahrgangsstufentest 8. Klasse - BMT 8',
    school: 'Gymnasium',
  },
  {
    id: 219737,
    title: 'Jahrgangsstufentest 10. Klasse - BMT 10',
    school: 'Gymnasium',
  },
  {
    id: 20852,
    title: 'Abiturprüfungen mit Lösung',
    school: 'Gymnasium',
  },
  {
    id: 91252,
    title: 'Fachhochschulreife',
    school: 'FOS & BOS',
  },
  {
    id: 91253,
    title: 'Fachgebundene Hochschulreife',
    school: 'FOS & BOS',
  },
]

async function fetchQuickbarData() {
  const req = await fetch(quickbarUrl)
  const data = (await req.json()) as QuickbarData

  data.forEach((entry) => {
    entry.pathLower = entry.path.map((x) => x.toLowerCase())
    entry.titleLower = entry.title.toLowerCase()
  })

  const filteredData = data.filter((entry) => {
    // not math
    if (!entry.root?.toLowerCase().startsWith('mathe')) return false

    if (mathExamTaxonomies.some((tax) => String(tax.id) === entry.id)) {
      return true
    }
    // check pathLower array against taxonomy array titles
    return entry.pathLower.some((pathTitle) =>
      mathExamTaxonomies.some((tax) => tax.title.toLowerCase() === pathTitle)
    )
  })

  return filteredData
}

const maxOnMobile = 4

function renderFeaturedBox(data: MathExamTaxonomy, index: number) {
  return (
    <Link
      key={data.title}
      className={cn(
        `
            group relative mx-2
            mb-4 box-border
            w-36 rounded p-2.5
            text-left leading-cozy text-brand transition-all 
            hover:text-almost-black hover:no-underline hover:shadow-menu
            mobile:w-52 lg:w-44 xl:w-48
          `,
        index >= maxOnMobile ? 'hidden mobile:block' : ''
      )}
      href={`${data.id}`}
    >
      <h4 className="mx-0 mb-14 mt-1 hyphens-auto break-normal text-xl font-bold">
        {data.title}
      </h4>
      <span className="font-sm absolute bottom-2 mt-1 block text-brand-400">
        {data.school}
      </span>
    </Link>
  )
}

// function renderSchoolButton(title: string) {
//   return (
//     <button
//       key={title}
//       className={cn(
//         `
//           m-2 flex w-60 justify-center
//           rounded-xl p-2 font-bold
//           text-brand shadow-menu transition-colors hover:bg-brand/5
//         `
//         // isActive ? 'bg-brand/10 text-black hover:bg-brand/10' : '',
//         // src ? '' : 'pl-16'
//       )}
//       onClick={() =>
//         // isExtraTerm ? router.push(term.href) : onMenuClick(index)
//         console.log('todo')
//       }
//     >
//       {title}
//     </button>
//   )
// }

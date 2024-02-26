/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsHeader } from '@/components/math-skills/math-skills-header'
import { NameInput } from '@/components/math-skills/name-input'
import {
  MathSkillsProvider,
  MathSkillsStorageData,
  deleteStored,
  getStored,
  updateStored,
} from '@/components/math-skills/utils/math-skills-data-context'
import { isProduction } from '@/helper/is-production'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: 'Meine Mathe-Skills',
          metaDescription:
            'Zeige deine mathematischen Skills. Interaktive Aufgaben ab der 5. Klasse.',
        }}
      />
      <Content />
      <style jsx global>{`
        html {
          background-color: white !important;
        }
        body,
        html,
        #__next {
          height: 100%;
        }
      `}</style>
    </FrontendClientBase>
  )
}

function Content() {
  const [data, setData] = useState<MathSkillsStorageData | undefined>(undefined)
  const name = data?.name
  useEffect(() => setData(getStored()), [])

  function updateData(updates: Partial<MathSkillsStorageData>) {
    setData(updateStored(updates))
  }

  return (
    <MathSkillsProvider value={{ data, updateData }}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <MathSkillsHeader />
          <div className="mx-4 justify-center sm:mt-10 sm:flex sm:flex-row-reverse sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/_assets/img/meine-mathe-skills/educated-lion.svg"
              className="mx-auto mt-5 w-52 self-start p-4 sm:mx-0 sm:-mt-1"
            />
            <div className="mx-auto mb-6 mt-4 max-w-md text-lg sm:mx-0 sm:leading-relaxed">
              {name ? (
                <>
                  Willkommen <b>{name}</b>,
                  <br />
                  schön, dass du hier bist!
                  <br />
                  <br />
                  Hier geht es darum Dinge zu können und das auch zu zeigen. Das
                  dürfen auch kleine Sachen sein.
                  <br />
                  Immer Schritt für Schritt!
                  <br />
                  <br />
                  Jetzt bist du an der Reihe:
                  <br />
                  Zeige, welche Mathe-Skills du drauf hast.
                  {/* Du hast schon … */}
                </>
              ) : (
                <>
                  <b>Willkommen!</b>
                  <br />
                  <br />
                  Hier geht es darum Dinge zu können und das auch zu zeigen. Das
                  dürfen auch kleine Sachen sein.
                  <br />
                  Immer Schritt für Schritt!
                  <br />
                  <br />
                  <b>Wie heißt du denn?</b>
                  <NameInput />
                </>
              )}
            </div>
          </div>
          <div className="mx-4 mt-10 text-2xl font-bold mobile:flex mobile:justify-center">
            <h2>Wähle eine Klassenstufe</h2>
          </div>
          <div className="mt-6 flex justify-center text-2xl font-bold sm:mt-8">
            <Link
              href="/meine-mathe-skills/klasse5"
              className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-center  text-white !no-underline transition-colors hover:bg-brand-500	"
            >
              <p className="text-2xl">5. Klasse</p>
            </Link>
          </div>
        </div>
        <div className="mb-3 ml-3 px-3 text-right text-gray-700">
          {isProduction ? null : (
            <button
              onClick={() => {
                deleteStored()
                setData(undefined)
              }}
            >
              (daten löschen)
            </button>
          )}{' '}
          <a className="hover:underline " href="https://de.serlo.org/legal">
            Impressum
          </a>
          <a
            className="ml-4 hover:underline"
            href="https://de.serlo.org/privacy"
          >
            Datenschutz
          </a>
          <span className="ml-4 opacity-50 hover:underline">
            <a href="https://www.freepik.com/free-vector/collection-cute-animals-wearing-graduation-cap-cartoon-style-vector_3780561.htm#query=animal%20illustration&position=1&from_view=keyword&track=ais&uuid=7991b85d-fd28-4da4-8e08-29af073982df">
              Bild von rawpixel.com
            </a>{' '}
            (Freepik){' '}
          </span>
        </div>
      </div>
    </MathSkillsProvider>
  )
}

export default ContentPage

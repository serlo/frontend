/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'
import { useState } from 'react'

import { NumberLineExercise } from '@/components/content/exercises/number-line-exercise/number-line-exercise'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'

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
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <Content />
    </FrontendClientBase>
  )
}

function Content() {
  const [page, setPage] = useState('landing')

  if (page === 'landing') {
    return (
      <>
        {renderHeader()}
        <div className="flex justify-center">
          <div className="my-10 text-xl leading-loose">
            Mein Geheimnis? Ich liebe es, Dinge zu können. Ich liebe es, meine
            <br />
            Skills zu zeigen . Und sind es auch kleine Dinge. Jeder Skill gibt
            <br />
            mir das Vertrauen, weiterzulernen, jeden Tag, Schritt für Schritt.
          </div>
        </div>
        <div className="mt-16 flex justify-center text-2xl font-bold">
          <h2>Wähle deine Klassenstufe</h2>
        </div>
        <div className="mt-16 flex justify-center text-2xl font-bold">
          <button
            className="h-48 w-36 rounded-xl bg-brand text-center  text-white hover:bg-brand-600"
            onClick={() => {
              setPage('m5')
            }}
          >
            <p>
              M<sub>5</sub>
            </p>
            <p className="mt-8 text-xl">Klasse 5</p>
          </button>
        </div>
        <div className="h-72"></div>
        <div className="px-3 text-right text-gray-700">
          Impressum | Datenschutz
        </div>
      </>
    )
  }
  if (page === 'm5') {
    return (
      <>
        {renderHeader()}
        <div className="text-center">
          <h2 className="my-10 text-2xl font-bold">
            M<sub>5</sub> Themenübersicht
          </h2>
        </div>
        <div className="flex justify-center py-10">
          <div className="w-72 rounded border bg-yellow-200 p-3">
            <h3 className="border-b-2 border-white text-xl">
              Natürliche Zahlen
            </h3>
            <div className="mt-4">
              <button
                className="serlo-link"
                onClick={() => {
                  setPage('number-line-exercise')
                }}
              >
                Zahlen anordnen - Level 1
              </button>
            </div>
          </div>
        </div>
        <div className="h-72"></div>
      </>
    )
  }
  if (page === 'number-line-exercise') {
    return (
      <>
        {renderHeader()}
        <div className="min-h-[70vh] sm:mx-auto sm:max-w-xl">
          <NumberLineExercise />
        </div>
      </>
    )
  }

  function renderHeader() {
    return (
      <div className="bg-yellow-100">
        <h1
          className="cursor-pointer p-3 text-3xl"
          onClick={() => {
            setPage('landing')
          }}
        >
          Meine Mathe Skills
        </h1>
      </div>
    )
  }
}

export default ContentPage

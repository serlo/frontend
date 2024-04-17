import { Draft, produce, enableMapSet } from 'immer'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

import { MathSkillsHeader } from './math-skills-header'
import { animalsData } from '../utils/animal-data'
import {
  MathSkillsProvider,
  MathSkillsStorageData,
  activateLocalStorage,
  deactivateLocalStorage,
  deleteStored,
  getEmptyData,
  getStored,
  isUsingLocal,
  updateStored,
} from '../utils/math-skills-data-context'
import { HeadTags } from '@/components/head-tags'
import { isProduction } from '@/helper/is-production'

enableMapSet()

export function MathSkillsWrapper({ children }: { children: ReactNode }) {
  const router = useRouter()
  const isLanding = !Object.keys(router.query).length

  const grade = router?.query?.grade
    ? String(router.query.grade).replace('klasse', '')
    : '_'

  const isExercise = !!router?.query?.exercise

  const [data, setData] = useState<MathSkillsStorageData>(getEmptyData())

  useEffect(() => {
    setData(getStored())
    // TODO
    /*updateData((data) => {
      data.startTs = new Date().getTime()
      console.log('update Data')
    })*/
  }, [])

  const [, setRenderCounter] = useState(1)

  function rerender() {
    setRenderCounter((x) => x + 1)
  }

  function updateData(fn: (arg: Draft<MathSkillsStorageData>) => void) {
    setData((data) => {
      const newVal = produce(fn)(data)
      updateStored(newVal)
      return newVal
    })
  }

  return (
    <>
      <HeadTags
        data={{
          title:
            !isLanding && grade
              ? 'Mathe Skills: Realschule Prüfungsvorbereitung' //`Mathe-Skills für die ${grade}. Klasse`
              : 'Meine Mathe-Skills',
          metaDescription: isLanding
            ? 'Mathe-Prüfungsvorbereitung Realschule Bayern' //'Zeige deine mathematischen Skills. Interaktive Aufgaben ab der 5. Klasse.'
            : '', //'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsProvider value={{ data, updateData }}>
        {/* This div here is for the outer flexbox */}
        <div className="min-h-[calc(100vh-8.5rem)] text-almost-black">
          <MathSkillsHeader />
          {children}
        </div>
        <footer className="mb-3 ml-3 mt-24 flex flex-col justify-between px-3 text-gray-700 sm:h-7 sm:flex-row">
          {isProduction || isExercise ? (
            <div></div>
          ) : (
            <span>
              <label className="mr-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isUsingLocal()}
                  onChange={(e) => {
                    if (e.target.checked) {
                      activateLocalStorage()
                    } else {
                      deactivateLocalStorage()
                    }
                    rerender()
                  }}
                />
                Fortschritt auf diesem Gerät speichern
              </label>
              <button
                onClick={() => {
                  deleteStored()
                  setData(getEmptyData())
                }}
                className="text-gray-400"
              >
                (daten löschen)
              </button>
            </span>
          )}
          <div>
            <span className="group relative mr-4 text-gray-400 hover:underline">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.freepik.com/free-vector/collection-cute-animals-wearing-graduation-cap-cartoon-style-vector_3780561.htm#query=animal%20illustration&position=1&from_view=keyword&track=ais&uuid=7991b85d-fd28-4da4-8e08-29af073982df"
              >
                Bildquelle
              </a>
              <span className="pointer-events-none absolute -right-1.5 -top-10 hidden w-max rounded-md bg-gray-200 px-2 py-1 text-almost-black group-focus-within:block group-hover:block">
                Tierbilder von rawpixel.com (Freepik)
              </span>
            </span>
            <a className="hover:underline" href="https://de.serlo.org/legal">
              Impressum
            </a>
            <a
              className="ml-4 hover:underline"
              href="https://de.serlo.org/privacy"
            >
              Datenschutz
            </a>
          </div>
        </footer>
      </MathSkillsProvider>
      <style jsx global>{`
        html {
          background-color: white !important;
        }
        :root {
          --color-animal: ${animalsData[data.animal].color};
        }
      `}</style>
    </>
  )
}

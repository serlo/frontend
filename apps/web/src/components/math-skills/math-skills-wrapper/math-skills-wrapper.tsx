import { Draft, produce } from 'immer'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

import { MathSkillsHeader } from './math-skills-header'
import {
  MathSkillsProvider,
  MathSkillsStorageData,
  deleteStored,
  getEmptyData,
  getStored,
  updateStored,
} from '../utils/math-skills-data-context'
import { HeadTags } from '@/components/head-tags'
import { isProduction } from '@/helper/is-production'

export function MathSkillsWrapper({ children }: { children: ReactNode }) {
  const router = useRouter()
  const isLanding = !Object.keys(router.query).length

  const grade = router?.query?.grade
    ? String(router.query.grade).replace('klasse', '')
    : '_'
  const [data, setData] = useState<MathSkillsStorageData>(getEmptyData())

  useEffect(() => setData(getStored()), [])

  useEffect(() => {}, [data])

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
              ? `Mathe-Skills für die ${grade}. Klasse`
              : 'Meine Mathe-Skills',
          metaDescription: isLanding
            ? 'Zeige deine mathematischen Skills. Interaktive Aufgaben ab der 5. Klasse.'
            : 'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsProvider value={{ data, updateData }}>
        <MathSkillsHeader />
        {children}
        <footer className="mb-3 ml-3 mt-auto flex justify-between px-3 text-gray-700">
          {isProduction ? null : (
            <button
              onClick={() => {
                deleteStored()
                setData(getEmptyData())
              }}
            >
              (daten löschen)
            </button>
          )}
          <div>
            <a className="hover:underline" href="https://de.serlo.org/legal">
              Impressum
            </a>
            <a
              className="ml-4 hover:underline"
              href="https://de.serlo.org/privacy"
            >
              Datenschutz
            </a>
            {isLanding && (
              <span className="ml-4 opacity-50 hover:underline">
                <a href="https://www.freepik.com/free-vector/collection-cute-animals-wearing-graduation-cap-cartoon-style-vector_3780561.htm#query=animal%20illustration&position=1&from_view=keyword&track=ais&uuid=7991b85d-fd28-4da4-8e08-29af073982df">
                  Bild von rawpixel.com
                </a>{' '}
                (Freepik){' '}
              </span>
            )}
          </div>
        </footer>
      </MathSkillsProvider>
      <style jsx global>{`
        html {
          background-color: white !important;
        }
        body,
        html,
        #__next {
          height: 100%;
        }
        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsHeader } from '@/components/math-skills/math-skills-header'
import {
  MathSkillsProvider,
  MathSkillsStorageData,
  getStored,
  updateStored,
} from '@/components/math-skills/utils/math-skills-data-context'

const ContentPage: NextPage = () => {
  const router = useRouter()

  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: `Mathe-Skills für die ${String(router.query.grade).replace(
            'klasse',
            ''
          )}. Klasse`,
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <Content />
      <style jsx global>{`
        html {
          background-color: white !important;
        }
      `}</style>
    </FrontendClientBase>
  )
}

function Content() {
  const router = useRouter()
  const grade = router.query.grade

  const [data, setData] = useState<MathSkillsStorageData | undefined>(undefined)
  useEffect(() => setData(getStored()), [])

  function updateData(updates: Partial<MathSkillsStorageData>) {
    setData(updateStored(updates))
  }

  if (grade !== 'klasse5') return null

  return (
    <MathSkillsProvider value={{ data, updateData }}>
      <MathSkillsHeader />
      <div className="text-center">
        <div className="mt-16 flex justify-center text-2xl font-bold">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-white">
            <p className="text-2xl">5. Klasse</p>
          </div>
        </div>
        <h2 className="mb-8 mt-5 text-2xl font-bold">Themenauswahl</h2>
      </div>
      <div className="flex flex-wrap justify-center py-10 mobileExt:flex-nowrap">
        <div className="w-72 rounded-lg bg-brand-100 p-5">
          <h3 className="pb-2 text-xl font-bold">Natürliche Zahlen</h3>
          <ul className="mt-1 text-lg">
            <li>
              <Link
                href="/meine-mathe-skills/klasse5/zahlen-finden"
                className="serlo-link"
              >
                Zahlenstrahl – Level 1
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-4 w-72 rounded-lg bg-brand-100 p-5 mobileExt:ml-4 mobileExt:mt-0">
          <h3 className="pb-2 text-xl font-bold">Rechnen in ℕ</h3>
          <ul className="mt-1 text-lg">
            <li>
              <Link
                href="/meine-mathe-skills/klasse5/potenzieren"
                className="serlo-link"
              >
                Potenzieren
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-72"></div>
    </MathSkillsProvider>
  )
}

export default ContentPage

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsHeader } from '@/components/math-skills/math-skills-header'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'
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
  const exercise = String(router.query.exercise)

  const [data, setData] = useState<MathSkillsStorageData | undefined>(undefined)
  useEffect(() => setData(getStored()), [])

  function updateData(updates: Partial<MathSkillsStorageData>) {
    setData(updateStored(updates))
  }

  if (!exercise) return null

  return (
    <MathSkillsProvider value={{ data, updateData }}>
      <MathSkillsHeader />
      <div className="min-h-[70vh] sm:mx-auto sm:max-w-xl">
        {exercise === 'zahlen-finden' ? <NumberLineExercise /> : null}
        {exercise === 'potenzieren' ? <NumberInputExercise /> : null}
      </div>
    </MathSkillsProvider>
  )
}

export default ContentPage

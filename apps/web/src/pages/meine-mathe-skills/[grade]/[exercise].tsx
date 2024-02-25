import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsHeader } from '@/components/math-skills/math-skills-header'
import { NumberInputExercise } from '@/components/math-skills/number-input-exercise/number-input-exercise'
import { NumberLineExercise } from '@/components/math-skills/number-line-exercise/number-line-exercise'

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

  if (!exercise) return null

  if (exercise === 'zahlen-finden') {
    return (
      <>
        <MathSkillsHeader />
        <div className="min-h-[70vh] sm:mx-auto sm:max-w-xl">
          <NumberLineExercise />
        </div>
      </>
    )
  }

  if (exercise === 'potenzieren') {
    return (
      <>
        <MathSkillsHeader />
        <div className="min-h-[70vh] sm:mx-auto sm:max-w-xl">
          <NumberInputExercise />
        </div>
      </>
    )
  }

  return null
}

export default ContentPage

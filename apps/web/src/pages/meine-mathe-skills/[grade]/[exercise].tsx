import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import {
  SupportedExercisesId,
  allExercises,
} from '@/components/math-skills/exercises/all-exercises'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'

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
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const router = useRouter()
  const exercise = String(router.query.exercise)

  if (!exercise) return null
  if (!Object.hasOwn(allExercises, exercise)) return null

  const data = allExercises[exercise as SupportedExercisesId] as {
    title: string
    level?: string
    component: JSX.Element
    smallprint?: JSX.Element
  }

  if (!data) return null

  return (
    <div className="relative mx-4 mt-20 max-w-lg bg-white sm:mx-auto sm:w-full">
      <h2 className="text-md mb-9 font-bold text-gray-400">
        {data.title}
        {data.level ? (
          <>
            : <span className="text-brand-500">{data.level}</span>
          </>
        ) : null}
      </h2>
      {data.component}
      {data.smallprint ? (
        <div className="mb-12 mt-14 hyphens-auto leading-snug">
          {data.smallprint}
        </div>
      ) : null}
    </div>
  )
}

export default ContentPage

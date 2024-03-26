import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import {
  SupportedExercisesId,
  allExercises,
} from '@/components/math-skills/exercises/all-exercises'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { cn } from '@/helper/cn'

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
    track?: number
    component: JSX.Element
    smallprint?: JSX.Element
  }

  if (!data) return null

  return (
    <div
      className={cn(
        'mx-4 mt-10 bg-white mobileExt:mx-auto sm:w-full',
        data.track ? 'max-w-2xl' : 'max-w-lg '
      )}
    >
      {data.component}

      {data.smallprint ? (
        <>
          <h2 className="text-md mb-5 mt-9 font-bold">
            {data.title}
            {data.level ? (
              <>
                : <span className="text-brand-500">{data.level}</span>
              </>
            ) : null}
          </h2>
          {data.smallprint ? (
            <div className="mb-12 hyphens-auto leading-snug">
              {data.smallprint}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default ContentPage

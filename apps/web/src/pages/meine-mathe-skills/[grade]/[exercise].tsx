import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import {
  SupportedExercisesId,
  allExercises,
} from '@/components/math-skills/exercises/all-exercises'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { CalculatorAllowedProvider } from '@/components/math-skills/utils/calculator-allowed-context'
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
  const exerciseQuery = String(router.query.exercise)
  if (!exerciseQuery) return null

  if (!Object.hasOwn(allExercises, exerciseQuery)) return null

  const exercise = allExercises[exerciseQuery as SupportedExercisesId] as {
    title: string
    subtitle?: string
    level?: string
    track?: number
    calculatorAllowed?: boolean
    component: JSX.Element
    smallprint?: JSX.Element
  }

  if (!exercise) return <>Unbekannte Aufgabe</>

  const {
    title,
    subtitle,
    track,
    component,
    smallprint,
    level,
    calculatorAllowed,
  } = exercise

  return (
    <CalculatorAllowedProvider value={calculatorAllowed}>
      <div
        className={cn(
          'relative mx-4 bg-white mobileExt:mx-auto sm:w-full',
          track ? 'max-w-2xl' : 'max-w-lg',
          subtitle ? 'mt-3 md:mt-6' : 'mt-12 mt-8'
        )}
      >
        {subtitle && (
          <>
            <p className="mb-8 mt-3">
              <Link
                href="/meine-mathe-skills#aufgaben"
                className="text-brand hover:text-brand-700"
              >
                zurück
              </Link>{' '}
              |{' '}
              <span className="font-bold">
                {title} ({subtitle})
              </span>
            </p>
          </>
        )}

        {component}

        {smallprint ? (
          <>
            <h2 className="text-md mb-5 mt-9 font-bold">
              {title}
              {level ? (
                <>
                  : <span className="text-brand-500">{level}</span>
                </>
              ) : null}
            </h2>
            {smallprint ? (
              <div className="mb-12 hyphens-auto leading-snug">
                {smallprint}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </CalculatorAllowedProvider>
  )
}

export default ContentPage

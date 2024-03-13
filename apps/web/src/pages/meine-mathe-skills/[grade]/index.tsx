import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { TopicOverview } from '@/components/math-skills/topic-overview/topic-overview'
import { cn } from '@/helper/cn'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const router = useRouter()
  const grade = router.query.grade

  if (grade === 'grundwissen-realschule-bayern')
    return (
      <>
        <div className="mx-4 max-w-md mobile:mx-auto sm:mt-10 lg:max-w-xl">
          <div className="sm:flex sm:flex-row-reverse sm:items-center">
            <WelcomeSection />
          </div>
          <h2 className="mt-10 text-xl">
            {/* should be select when there are more grades to select */}
            Übersicht{' '}
            <b className="text-newgreen">
              Training Mittlere Reife Bayern (Realschule)
            </b>
            :
            <div className="my-6 flex flex-wrap gap-3">
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/logarithmus-1"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Logarithmus zusammenfassen</b>
                  <br />
                  <span className="text-base">(Terme)</span>
                </p>
              </Link>
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/logarithmus-2"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Logarithmus zusammenfassen</b>
                  <br />
                  <span className="text-base">(mit 3. binomischer Formel)</span>
                </p>
              </Link>
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/triogonometrie-1"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Trigonometrie</b>
                  <br />
                  <span className="text-base">(Strahlensatz, Kosinussatz)</span>
                </p>
              </Link>
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/felix-test"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Normalform einer Parabel</b>
                  <br />
                  <span className="text-base">(Quadratische Funktionen)</span>
                </p>
              </Link>
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/volumenpyramide-1"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Volumen einer Pyramide</b>
                  <br />
                  <span className="text-base">(vierseitig)</span>
                </p>
              </Link>
              <Link
                href="/meine-mathe-skills/grundwissen-realschule-bayern/surfacepyramide-1"
                className={cn(
                  'flex aspect-square w-48 items-center justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
                  'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
                )}
              >
                <p>
                  <b>Oberfläche einer Pyramide</b>
                  <br />
                  <span className="text-base">(vierseitig)</span>
                </p>
              </Link>
            </div>
            <div className="h-24"></div>
          </h2>
        </div>
      </>
    )

  if (grade !== 'klasse5') return null

  return (
    <>
      <div className="mx-4 max-w-md mobile:mx-auto sm:mt-10 lg:max-w-xl">
        <div className="sm:flex sm:flex-row-reverse sm:items-center">
          <WelcomeSection />
        </div>
        <h2 className="mt-10 text-xl">
          {/* should be select when there are more grades to select */}
          Übersicht <b className="text-newgreen">Klasse 5</b>:
        </h2>
      </div>
      <div className="mx-4 max-w-md mobile:mx-auto sm:mt-2 sm:max-w-2xl sm:pl-28 lg:max-w-5xl lg:pl-[14.2rem]">
        <TopicOverview />
        <div className="h-24"></div>
      </div>
    </>
  )
}

export default ContentPage

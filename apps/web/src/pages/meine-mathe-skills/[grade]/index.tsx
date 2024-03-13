import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { middleSchoolFinalExam } from '@/components/math-skills/exercises/middle-school-final-exam'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { TopicOverview } from '@/components/math-skills/topic-overview/topic-overview'
import { animalsData } from '@/components/math-skills/utils/animal-data'
import { getPointsAmount } from '@/components/math-skills/utils/get-points-amount'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'
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

  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()

  function renderCard(id: string, title: string, subtitle: string) {
    const slug = `${String(grade)}/${id}`
    const { skillCent } = getExerciseData(slug)
    const points = Array.from({ length: getPointsAmount(skillCent) })

    return (
      <Link
        href={`/meine-mathe-skills/training-realschule-bayern/${id}`}
        className={cn(
          'flex aspect-square w-48 flex-col items-start justify-center rounded-2xl bg-newgreen bg-opacity-10 p-4 text-almost-black !no-underline',
          'transition-colors hover:bg-opacity-20 hover:shadow-menu active:bg-opacity-20'
        )}
      >
        <p className="mb-2">
          <b>{title}</b>
        </p>
        <p className="text-base">({subtitle})</p>
        <p className="mt-2 text-base">
          {data?.animal
            ? points.map(() => animalsData[data.animal].emoji)
            : null}
        </p>
      </Link>
    )
  }

  if (grade === 'training-realschule-bayern')
    return (
      <>
        <div className="mx-4 max-w-md mobile:mx-auto sm:mt-10 lg:max-w-4xl">
          <div className="sm:flex sm:flex-row-reverse sm:items-center sm:justify-center">
            <WelcomeSection />
          </div>
          <h2 className="mt-10 text-xl">
            Übersicht{' '}
            <b className="text-newgreen">
              Training Realschule Bayern (Abschlussprüfung)
            </b>
            :
            <div className="my-6 flex flex-wrap gap-3">
              {Object.entries(middleSchoolFinalExam).map(([id, obj]) =>
                renderCard(id, obj.title, obj.subtitle)
              )}
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

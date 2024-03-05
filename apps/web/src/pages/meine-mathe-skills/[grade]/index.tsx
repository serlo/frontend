import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { TopicOverview } from '@/components/math-skills/topic-overview/topic-overview'

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

/* eslint-disable @next/next/no-html-link-for-pages */
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { useMathSkillsStorage } from '@/components/math-skills/utils/math-skills-data-context'
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
  const { data } = useMathSkillsStorage()

  return (
    <div className="mx-4 max-w-md mobile:mx-auto sm:mt-10 lg:max-w-xl">
      <div className="sm:flex sm:flex-row-reverse sm:items-center sm:justify-center">
        <WelcomeSection />
      </div>
      {data?.name ? (
        <>
          <h2 className="mt-10 text-lg font-bold">Wähle eine Klassenstufe:</h2>
          <div className="mb-8 mt-4 flex pr-4 text-lg font-bold">
            <a
              href="/meine-mathe-skills/klasse5"
              onClick={(e) => {
                e.preventDefault()
                void router.push('/meine-mathe-skills/klasse5', undefined, {
                  shallow: true,
                  scroll: false,
                })
              }}
              className={cn(`
                flex h-24 w-24 items-center justify-center rounded-full bg-newgreen bg-opacity-30
              text-almost-black !no-underline transition-colors hover:bg-opacity-70 md:h-28 md:w-28
              `)}
            >
              <p>5. Klasse</p>
            </a>
            <a
              href="/meine-mathe-skills/grundwissen-realschule-bayern"
              onClick={(e) => {
                e.preventDefault()
                void router.push(
                  '/meine-mathe-skills/grundwissen-realschule-bayern',
                  undefined,
                  {
                    shallow: true,
                    scroll: false,
                  }
                )
              }}
              className={cn(`
               ml-8 flex h-24 w-24 items-center justify-center rounded-full bg-newgreen bg-opacity-30 text-center
              text-base text-almost-black !no-underline transition-colors hover:bg-opacity-70 md:h-28 md:w-28
              `)}
            >
              <p>
                Grundwissen
                <br />
                Mittlere Reife
                <br />
                Bayern (RS)
              </p>
            </a>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ContentPage

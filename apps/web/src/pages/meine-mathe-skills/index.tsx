/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LandingAnimal } from '@/components/math-skills/landing-animal'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { NameInput } from '@/components/math-skills/name-input'
import { useMathSkillsStorage } from '@/components/math-skills/utils/math-skills-data-context'

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
  const { data } = useMathSkillsStorage()
  const sharedWelcome = (
    <>
      <br />
      <br />
      Hier geht es darum, Mathematik können und das zu zeigen. Das dürfen auch
      kleine Sachen sein.
      <br />
      Immer Schritt für Schritt!
      <br />
      <br />
    </>
  )

  return (
    <div>
      <div className="mx-4 justify-center sm:mt-10 sm:flex sm:flex-row-reverse sm:items-center">
        <LandingAnimal />
        <div className="mx-auto mb-6 mt-4 min-h-[22rem] max-w-[26rem] text-lg sm:mx-0 sm:w-[26rem] sm:leading-relaxed">
          {data?.name ? (
            <>
              Hallo <b>{data.name}</b>,
              <br />
              schön, dass du hier bist!
              <br />
              <br />
              <b>Jetzt bist du dran:</b>
              <br />
              Zeige, welche Mathe-Skills du drauf hast.
            </>
          ) : (
            <>
              <b>Willkommen!</b>
              {sharedWelcome}
              <b>Wie heißt du denn?</b>
              <NameInput />
            </>
          )}
        </div>
      </div>
      <div className="mx-4 mt-2 text-2xl font-bold mobile:flex mobile:justify-center">
        <h2>Wähle eine Klassenstufe</h2>
      </div>
      <div className="mb-8 mt-6 flex justify-center text-2xl font-bold sm:mt-8">
        <Link
          href="/meine-mathe-skills/klasse5"
          className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-center  text-white !no-underline transition-colors hover:bg-brand-500"
        >
          <p className="text-2xl">5. Klasse</p>
        </Link>
      </div>
    </div>
  )
}

export default ContentPage

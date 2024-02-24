/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'

import { MathSkillsHeader } from '@/components/content/exercises/math-skills-header'
import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: 'Meine Mathe-Skills',
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <Content />
    </FrontendClientBase>
  )
}

function Content() {
  return (
    <>
      <MathSkillsHeader />
      <div className="mx-4 justify-center sm:mt-10 sm:flex sm:flex-row-reverse">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/_assets/img/exercise/smart-hippo.svg"
          className="mx-auto mt-5 w-48 p-4 sm:mx-0 sm:mt-0"
        />
        <div className="mx-auto mb-6 mt-4 max-w-md text-lg sm:mx-0 sm:leading-loose">
          <b>Mein Geheimnis?</b>
          <br />
          Ich liebe es, Dinge zu können und das auch zu Zeigen.
          <br /> Das können auch kleine Sachen sein.
          <br />
          Jeder Skill gibt mir das Vertrauen, weiterzulernen.
          <br />
          <i>Schritt für Schritt.</i>
        </div>
      </div>
      <div className="mx-4 mt-16 text-2xl font-bold mobile:flex mobile:justify-center">
        <h2>In welche Klasse gehst du?</h2>
      </div>
      <div className="mt-6 flex justify-center text-2xl font-bold sm:mt-8">
        <Link
          href="/meine-mathe-skills/5"
          className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-center  text-white !no-underline transition-colors hover:bg-brand-500	"
        >
          <p className="text-2xl">5. Klasse</p>
        </Link>
      </div>
      <div className="h-72"></div>
      <div className="px-3 text-right text-gray-700">
        <span className="opacity-50">
          <a href="https://www.freepik.com/free-vector/collection-cute-animals-wearing-graduation-cap-cartoon-style-vector_3780561.htm#query=animal%20illustration&position=1&from_view=keyword&track=ais&uuid=7991b85d-fd28-4da4-8e08-29af073982df">
            Tierbilder von rawpixel.com
          </a>{' '}
          (Freepik){' '}
        </span>
        | <a href="https://de.serlo.org/legal">Impressum</a> |{' '}
        <a href="https://de.serlo.org/privacy">Datenschutz</a>
      </div>
    </>
  )
}

export default ContentPage

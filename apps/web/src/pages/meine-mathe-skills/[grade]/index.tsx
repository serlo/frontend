import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'

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
    <div className="min-h-[80vh]">
      <div className="text-center">
        <div className="mt-16 flex justify-center text-2xl font-bold">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand-600 text-white">
            <p className="text-2xl">5. Klasse</p>
          </div>
        </div>
        <h2 className="mb-8 mt-5 text-2xl font-bold">Themenauswahl</h2>
      </div>
      <div className="flex flex-wrap justify-center py-10 mobileExt:flex-nowrap">
        <div className="w-72 rounded-lg bg-brand-100 p-5">
          <h3 className="pb-2 text-xl font-bold">Natürliche Zahlen</h3>
          <ul className="mt-1 text-lg">
            <li>
              <Link
                href="/meine-mathe-skills/klasse5/zahlen-finden"
                className="serlo-link"
              >
                Zahlenstrahl – Level 1
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-4 w-72 rounded-lg bg-brand-100 p-5 mobileExt:ml-4 mobileExt:mt-0">
          <h3 className="pb-2 text-xl font-bold">Rechnen in ℕ</h3>
          <ul className="mt-1 text-lg">
            <li>
              <Link
                href="/meine-mathe-skills/klasse5/potenzieren"
                className="serlo-link"
              >
                Potenzieren
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ContentPage

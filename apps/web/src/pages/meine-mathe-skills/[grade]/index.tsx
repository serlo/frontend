import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { animalsData } from '@/components/math-skills/utils/animal-data'
import { getPointsAmount } from '@/components/math-skills/utils/get-points-amount'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'

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
  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()
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
        <div className="w-72 rounded-lg border border-brand-200 p-5 shadow-menu">
          <h3 className="pb-2 text-xl font-bold">Natürliche Zahlen</h3>
          <h4 className="text-lg">Zahlenstrahl: Anordnen</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('zahlen-anordnen-1', 'Level 1')}
            {renderItem('zahlen-anordnen-2', 'Level 2')}
            {renderItem('zahlen-anordnen-profi', 'für Profis')}
          </ul>
          <h4 className="mt-1 text-lg">Zahlenstrahl: Ablesen</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('zahlen-ablesen-1', 'Level 1')}
            {renderItem('zahlen-ablesen-2', 'Level 2')}
            {renderItem('zahlen-ablesen-profi', 'für Profis')}
          </ul>
          <h4 className="mt-1 text-lg">Stellenwert-Tabelle</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('stellenwert-finden', 'Stelle finden')}
            {renderItem('stellenwert-tabelle-ablesen', 'ablesen')}
            <span></span>
          </ul>
          <h4 className="mt-1 text-lg">Stellenwerte ändern</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('stellenwerte-aendern-1', 'Level 1')}
            {renderItem('stellenwerte-aendern-profi', 'für Profis')}
            <span></span>
          </ul>
          <h4 className="mt-1 text-lg">Text in Zahl umwandeln</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('text-in-zahl-1', 'Level 1')}
            {renderItem('text-in-zahl-profi', 'für Profis')}
            <span></span>
          </ul>
          <h4 className="mt-1 text-lg">Zahlen vergrößern und verkleinern</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex flex-wrap justify-between">
            {renderItem('zahlen-vergroeßern-verkleinern-1', 'Level 1')}
            {renderItem('zahlen-vergroeßern-verkleinern-2', 'Level 2')}
            {renderItem('zahlen-vergroeßern-verkleinern-3', 'Level 3')}
            {renderItem('zahlen-vergroeßern-verkleinern-profi', 'für Profis')}
            <span></span>
          </ul>
          <h4 className="mt-1 text-lg">Zahlenabstände erkennen</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex flex-wrap justify-between">
            {renderItem('zahlenabstaende-erkennen-1', 'Level 1')}
            {renderItem('zahlenabstaende-erkennen-2', 'Level 2')}
            {renderItem('zahlenabstaende-erkennen-profi', 'Profi')}
            {renderItem('zahlenabstaende-erkennen-topprofi', 'TopProfi')}
            <span></span>
          </ul>
        </div>
        <div className="mt-4 w-72 rounded-lg border border-brand-200 p-5 shadow-menu mobileExt:ml-4 mobileExt:mt-0">
          <h3 className="pb-2 text-xl font-bold">Rechnen in ℕ</h3>
          <h4 className="text-lg">Potenzieren</h4>
          <ul className="-ml-0.25 mr-2 mt-1 flex justify-between">
            {renderItem('potenzwert-berechnen', 'Potenzwert berechnen')}
          </ul>
        </div>
      </div>
      <div className="h-72"></div>
    </div>
  )

  function renderItem(exerciseId: string, text: string) {
    if (!grade) return null
    const slug = `${String(grade)}/${exerciseId}`
    const { skillCent } = getExerciseData(slug)
    const points = Array.from({ length: getPointsAmount(skillCent) })

    return (
      <li>
        <Link
          href={`/meine-mathe-skills/${slug}`}
          className="mb-2 block rounded-md bg-brand-50 px-2 py-1.5 !no-underline transition-colors hover:bg-brand-200"
        >
          {text} <br />
          {data?.animal
            ? points.map(() => animalsData[data.animal].emoji)
            : null}
        </Link>
      </li>
    )
  }
}

export default ContentPage

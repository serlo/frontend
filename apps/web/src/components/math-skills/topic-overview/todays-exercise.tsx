import { grade5Data } from './grade-5-data'
import { animalsData } from '../utils/animal-data'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { Link } from '@/components/content/link'

export function TodaysExercise() {
  const { data } = useMathSkillsStorage()
  const selection = grade5Data[0].children.flatMap(
    (section) => section.children
  )
  const index = Math.max(
    Math.floor((new Date().getDate() * selection.length) / 31),
    selection.length
  )
  const todaysTopic = selection.at(index) ?? selection[0]
  const { id } = todaysTopic.children[0]
  return (
    <div className="h-fit w-full rounded-lg border border-brand-200 bg-newgreen bg-opacity-30 p-4 text-lg sm:basis-[33.2rem] lg:w-auto lg:basis-auto">
      {data?.animal ? animalsData[data.animal].emoji : ''} Zu viel Auswahl?
      <br /> Mach die Aufgabe des Tages:
      <br />{' '}
      <b>
        <Link href={`/meine-mathe-skills/klasse5/${id}`}>
          {todaysTopic.title}
        </Link>
      </b>
    </div>
  )
}

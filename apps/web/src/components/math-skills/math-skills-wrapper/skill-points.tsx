import { animalsData } from '../utils/animal-data'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

export function SkillPoints() {
  const { data } = useMathSkillsStorage()
  const { getExerciseData } = useExerciseData()

  const { skillCent } = getExerciseData()
  const { animal } = data

  return (
    <div className="-ml-1 mt-1 flex w-fit items-center sm:mx-auto sm:mt-2 sm:justify-center">
      {renderPoint(skillCent)}
      {renderPoint(skillCent - 100)}
      {renderPoint(skillCent - 200)}
    </div>
  )

  function renderPoint(percent: number) {
    if (percent >= 100) return renderFullPoint()
    const cleanPercent = Math.max(percent, 0)
    const radius = 40
    const circumference = radius * 2 * Math.PI
    return (
      <div
        className={cn(
          'relative mr-2 h-[43px] w-[43px] -rotate-90',
          percent <= 0 && 'opacity-60'
        )}
        style={{ color: `rgb(${animalsData[animal].color})` }}
      >
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            className="fill-current stroke-current opacity-20"
            style={{ fillOpacity: '0.5' }}
            strokeWidth="11"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
          ></circle>
          <circle
            className="stroke-current [transition:stroke-dashoffset_0.35s]"
            strokeWidth="11"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (cleanPercent / 100) * circumference
            }
          ></circle>
        </svg>
      </div>
    )
  }

  function renderFullPoint() {
    return (
      <div className="group -ml-0.5 -mt-2.5 mr-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Skill-Punkt mit Tier"
          src={`/_assets/img/math-skills/${animal}.svg`}
          className="w-12 origin-center transition-transform [transition-duration:0.35s] group-hover:[transform:rotateY(180deg)]"
        />
      </div>
    )
  }
}

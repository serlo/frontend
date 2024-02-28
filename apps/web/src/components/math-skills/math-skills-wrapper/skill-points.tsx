import { animalsData } from '../utils/animal-data'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '../utils/math-skills-data-context'

export function SkillPoints() {
  const { data } = useMathSkillsStorage()
  const { getExerciseData } = useExerciseData()

  const { skillCent } = getExerciseData()
  const animal = data?.animal ?? 'lion'

  return (
    <div className="mx-auto mt-3 flex min-h-[53px] sm:relative sm:-mt-[3.55rem] sm:w-full sm:max-w-lg sm:justify-center">
      {renderPoint(skillCent)}
      {renderPoint(skillCent - 100)}
      {renderPoint(skillCent - 200)}
    </div>
  )

  function renderPoint(percent: number) {
    if (percent <= 0) return null
    if (percent >= 100) return renderFullPoint()
    const radius = 40
    const circumference = radius * 2 * Math.PI
    return (
      <div
        className="relative ml-0.5 mr-1.5 mt-2.5 h-[43px] w-[43px] -rotate-90"
        style={{ color: animalsData[animal].color }}
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
            strokeDashoffset={circumference - (percent / 100) * circumference}
          ></circle>
        </svg>
      </div>
    )
  }

  function renderFullPoint() {
    return (
      <div className="group -ml-0.5 mr-1">
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

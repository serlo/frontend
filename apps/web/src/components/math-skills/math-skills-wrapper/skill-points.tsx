import {
  useExerciseData,
  useMathSkillsStorage,
} from '../utils/math-skills-data-context'

const animalColors = {
  lion: '#7A95F6',
  crocodile: '#7FC1F0',
  leopard: '#9983F0',
  monkey: '#9ED67C',
  penguin: '#91DCF3',
  zebra: '#7CAFEC',
} as const

export function SkillPoints() {
  const { data } = useMathSkillsStorage()
  const { getExerciseData } = useExerciseData()

  const { skillLevel } = getExerciseData()
  const animal = data?.animal ?? 'lion'

  return (
    <div className="mx-auto mt-3 flex sm:relative sm:-mt-[3.55rem] sm:w-full sm:max-w-lg sm:justify-center">
      {renderPoint(Math.min(skillLevel, 1))}
      {renderPoint(Math.min(skillLevel - 1, 1))}
      {renderPoint(Math.min(skillLevel - 2, 1))}
    </div>
  )

  function renderPoint(fraction: number) {
    if (fraction <= 0) return null
    if (fraction >= 0.99) return renderFullPoint()
    const percent = Math.round(fraction * 100)
    const radius = 40
    const circumference = radius * 2 * Math.PI
    return (
      <div
        className="relative ml-0.5 mr-1.5 mt-2.5 h-[43px] w-[43px] -rotate-90"
        style={{ color: animalColors[animal] }}
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

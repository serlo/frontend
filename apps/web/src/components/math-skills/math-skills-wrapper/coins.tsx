import { useMathSkillsStorage } from '../utils/math-skills-data-context'

const animalColors = {
  lion: '#7A95F6',
  crocodile: '#7FC1F0',
  leopard: '#9983F0',
  monkey: '#9ED67C',
  penguin: '#91DCF3',
  zebra: '#7CAFEC',
} as const

export function Coins() {
  const { data } = useMathSkillsStorage()
  const animal = data?.animal ?? 'lion'

  return (
    <div className="relative z-30 mx-auto -mt-[3.55rem] flex w-full max-w-lg">
      {renderFullCoin()}
      {renderProgress(10)}
      {renderProgress(0)}
    </div>
  )

  function renderProgress(percent: number) {
    const radius = 40
    const circumference = radius * 2 * Math.PI
    if (percent === 0) return null
    if (percent === 100) return renderFullCoin()
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

  function renderFullCoin() {
    return (
      <div className="group -ml-0.5 mr-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Tiermünze"
          src={`/_assets/img/math-skills/${animal}.svg`}
          className="w-12 origin-center transition-transform [transition-duration:0.35s] group-hover:[transform:rotateY(160deg)]"
        />
      </div>
    )
  }
}

import { useMathSkillsStorage } from '../utils/math-skills-data-context'

export function Coins() {
  const { data } = useMathSkillsStorage()
  const animal = data?.animal ?? 'lion'

  return (
    <div className="relative z-30 mx-auto -mt-[3.55rem] flex w-full max-w-lg">
      {renderFullCoin()}
      {renderFullCoin()}
      {renderFullCoin()}
    </div>
  )

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

import { faRepeat } from '@fortawesome/free-solid-svg-icons'

import { animals, useMathSkillsStorage } from './utils/math-skills-data-context'
import { FaIcon } from '../fa-icon'

export function LandingAnimal() {
  const { data, updateData } = useMathSkillsStorage()
  const animal = data?.animal ?? 'lion'

  function changeAnimal() {
    const index = animals.indexOf(animal)
    const newAnimal = index <= animals.length ? animals[index + 1] : animals[0]
    updateData({ animal: newAnimal })
  }

  return (
    <figure className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Tiermaskottchen"
        src={`/_assets/img/math-skills/${animal}.svg`}
        className="mx-auto mt-5 w-52 self-start p-4 sm:mx-0 sm:-mt-1"
      />
      <button
        className="serlo-button-light absolute bottom-7 right-7 h-8 w-8 bg-brand-200 !p-1.5"
        onClick={changeAnimal}
      >
        <span className="sr-only">Anderes Tier auswählen</span>
        <FaIcon icon={faRepeat} />
      </button>
    </figure>
  )
}

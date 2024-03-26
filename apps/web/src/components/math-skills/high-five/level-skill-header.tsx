import { SkillPoints } from '../math-skills-wrapper/skill-points'
import { useExerciseData } from '../utils/math-skills-data-context'

export function LevelSkillHeader({ onClose }: { onClose: () => void }) {
  const { getExerciseData } = useExerciseData()
  const { skillCent } = getExerciseData()

  return (
    <div className="my-5 flex items-center rounded-lg bg-gray-100 px-4 py-2">
      {skillCent >= 300 ? (
        <button
          className="rounded bg-newgreen bg-opacity-40 px-2 py-0.5 font-bold hover:bg-opacity-50"
          onClick={onClose}
        >
          Super! Aufgabe abschließen
        </button>
      ) : (
        <p className="grow">Erreiche 3 Skill-Punkte:</p>
      )}
      <div className="ml-auto">
        <SkillPoints />
      </div>
      <style jsx global>
        {`
          header .skill-points {
            display: none;
          }
        `}
      </style>
    </div>
  )
}

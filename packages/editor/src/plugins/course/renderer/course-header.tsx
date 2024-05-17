import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

export function CourseHeader({ title }: { title: JSX.Element }) {
  const { strings } = useInstanceData()

  return (
    <>
      <p className="serlo-p mb-0 mt-10 text-[1rem] font-bold">
        <FaIcon icon={faGraduationCap} /> {strings.entities.course}
      </p>
      <h1 className="mx-side my-0 text-2xl font-bold">{title}</h1>
    </>
  )
}

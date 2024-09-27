import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useInstanceData } from '@editor/utils/use-instance-data'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export function CourseHeader({ title }: { title: JSX.Element }) {
  const { strings } = useInstanceData()

  return (
    <>
      <p className="serlo-p mb-0 mt-10 text-[1rem] font-bold">
        <FaIcon icon={faGraduationCap} /> {strings.entities.course}
      </p>
      <div className="mx-side my-0 text-2xl font-bold">{title}</div>
    </>
  )
}

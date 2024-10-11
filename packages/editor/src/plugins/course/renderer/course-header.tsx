import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export function CourseHeader({ title }: { title: JSX.Element }) {
  const courseStrings = useStaticStrings().plugins.course

  return (
    <>
      <p className="serlo-p mb-0 mt-10 text-[1rem] font-bold">
        <FaIcon icon={faGraduationCap} /> {courseStrings.title}
      </p>
      <div className="mx-side my-0 text-2xl font-bold">{title}</div>
    </>
  )
}

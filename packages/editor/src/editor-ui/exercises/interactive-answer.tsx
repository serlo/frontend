import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faCheckCircle,
  faCheckSquare,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

interface InteractiveAnswerProps {
  isRadio?: boolean
  isActive?: boolean
  handleChange: () => void
  answerID?: string
  feedbackID: string
  answer: HTMLInputElement | React.ReactNode
  feedback: React.ReactNode
  remove: () => void
}

export function InteractiveAnswer({
  isRadio,
  isActive,
  answer,
  feedback,
  remove,
  handleChange,
}: InteractiveAnswerProps) {
  const exStrings = useStaticStrings().plugins.exercise
  const icon = isRadio
    ? isActive
      ? faCheckCircle
      : faCircle
    : isActive
      ? faCheckSquare
      : faSquare

  return (
    <div className="relative mb-2.5 flex items-center border-t-2 border-editor-primary">
      <div className="mr-2.5 w-[10%] text-center font-bold">
        {exStrings.correct}?
        <button className="p-2" onClick={handleChange}>
          <FaIcon icon={icon} className="mt-0.5 text-xl text-brand" />
        </button>
      </div>
      <div className="ml-2.5 w-full rounded-sm">
        <div className="pl-5 pt-2.5">
          <label className="ml-side block text-sm font-bold">
            {exStrings.answer}
          </label>
          <>{answer}</>
        </div>
        <button
          onClick={remove}
          className="serlo-button-editor-secondary absolute right-1 top-2 z-20"
        >
          <FaIcon icon={faTrashAlt} />
        </button>
        <div className="mt-1.5 py-2.5 pl-5">
          <label className="ml-side block text-sm font-bold">
            {exStrings.feedback}
          </label>
          <div className="ml-0.5">{feedback}</div>
        </div>
      </div>
    </div>
  )
}

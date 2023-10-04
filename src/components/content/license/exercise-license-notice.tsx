import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'

import { Link } from '../link'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import type { License } from '@/fetcher/query-types'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface ExerciseLicenseNoticeProps {
  data: License
  type?: 'exercise' | 'solution' | 'exercise-group'
}

export function ExerciseLicenseNotice({
  data,
  type,
}: ExerciseLicenseNoticeProps) {
  const { title: explanation, default: isDefault, url, id, shortTitle } = data
  const { strings } = useInstanceData()

  if (isDefault) return null

  const titleParts = explanation.split('CC')
  const licenseName =
    titleParts.length === 2 ? `CC${titleParts[1]}` : explanation
  const isCreativeCommons = licenseName.indexOf('CC') > -1

  const typeString =
    type === 'solution'
      ? strings.entities.solution
      : strings.content.exercises.task
  const licenseHref = `/license/detail/${id}`

  const tooltipTitle = `${
    shortTitle ? shortTitle : strings.license.special
  } (${typeString})`

  const tooltipExplanation = isCreativeCommons
    ? explanation
    : `${explanation} –– ${strings.license.nonFree}`

  return (
    <>
      <Link
        className={tw`
          serlo-button-blue-transparent serlo-tooltip-trigger w-[33px] text-[18px]
          text-base font-normal hover:no-underline
        `}
        href={licenseHref}
        noExternalIcon
      >
        <>
          <EditorTooltip
            text={tooltipTitle}
            hotkeys={tooltipExplanation}
            className="right-0 top-10"
          />
          <span className="relative -ml-[1px] inline-block h-5 w-5 align-sub text-xl">
            <FaIcon icon={faCreativeCommons} className="absolute" />
            {!isCreativeCommons && (
              <FaIcon
                icon={faSlash}
                className="absolute -left-[3px] -scale-x-[0.6] scale-y-[0.6]"
              />
            )}
          </span>
        </>
      </Link>
    </>
  )
}

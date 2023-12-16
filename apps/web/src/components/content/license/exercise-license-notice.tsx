import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'

import { Link } from '../link'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { getLicense } from '@/data/licenses/licenses-helpers'
import { cn } from '@/helper/cn'

interface ExerciseLicenseNoticeProps {
  exerciseLicenseId?: number
  solutionLicenseId?: number
}
/** Small license info button for Exercise and Solution  */
export function ExerciseLicenseNotice({
  exerciseLicenseId,
  solutionLicenseId,
}: ExerciseLicenseNoticeProps) {
  const { strings, licenses } = useInstanceData()

  const exerciseLicense = getLicense(licenses, exerciseLicenseId)
  const solutionLicense = getLicense(licenses, solutionLicenseId)

  //  Both default, don't display
  if (exerciseLicense.isDefault && solutionLicense.isDefault) return null

  const { task } = strings.content.exercises
  const { solution } = strings.entities

  // Task special, solution default: Display with "Aufgabenstellung"
  // Task and solution special and the same: Display with "Aufgabenstellung und Lösung"
  // Task default, solution special (very rare): Display with "Lösung"
  const typeString =
    !exerciseLicense.isDefault && solutionLicense.isDefault
      ? task
      : exerciseLicense.id === solutionLicense.id
        ? `${task} & ${solution}`
        : solution

  const licenseToDisplay = exerciseLicense.isDefault
    ? solutionLicense
    : exerciseLicense

  const { title: explanation, id, shortTitle } = licenseToDisplay

  const titleParts = explanation.split('CC')
  const licenseName =
    titleParts.length === 2 ? `CC${titleParts[1]}` : explanation
  const isCreativeCommons = licenseName.indexOf('CC') > -1

  const licenseHref = `/license/detail/${id}`

  const tooltipTitle = `${shortTitle ? shortTitle : strings.license.special} (${
    strings.license.appliesTo
  }: ${typeString})`

  const tooltipExplanation = isCreativeCommons
    ? explanation
    : `${explanation} –– ${strings.license.nonFree}`

  return (
    <>
      <Link
        className={cn(`
          serlo-button-blue-transparent serlo-tooltip-trigger w-[33px] text-[18px] text-base font-normal hover:no-underline
        `)}
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

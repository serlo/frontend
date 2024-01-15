import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function AiExerciseGenerationButton({
  isSingularExercise,
}: {
  isSingularExercise?: boolean
}) {
  const router = useRouter()

  const { buttonTitleSingular, buttonTitle: buttonTitleString } =
    useLoggedInData()!.strings.ai.exerciseGeneration

  return (
    <Link
      href={{
        pathname: router.pathname,
        // Opens the wizard through the query param
        query: { ...router.query, showAiWizard: null },
      }}
      passHref
      shallow
      replace
      className="serlo-button-editor-secondary serlo-tooltip-trigger"
    >
      <EditorTooltip
        text={isSingularExercise ? buttonTitleSingular : buttonTitleString}
        className="-left-40"
      />
      <FaIcon icon={faWandSparkles} />
    </Link>
  )
}

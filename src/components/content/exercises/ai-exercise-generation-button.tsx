import { faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

export function AiExerciseGenerationButton({
  isSingularExercise,
}: {
  isSingularExercise?: boolean
}) {
  const router = useRouter()

  const { buttonTitleSingular, buttonTitle: buttonTitleString } =
    useLoggedInData()!.strings.ai.exerciseGeneration

  return (
    <button
      className="serlo-button-editor-secondary serlo-tooltip-trigger"
      onClick={() => {
        const currentPath = router.pathname
        const currentQuery = router.query

        currentQuery.showAiWizard = 'true'

        router
          .push(
            {
              pathname: currentPath,
              query: currentQuery,
            },
            undefined,
            { shallow: true }
          )
          .then(() => void null)
          .catch(() => void null)
      }}
    >
      <EditorTooltip
        text={isSingularExercise ? buttonTitleSingular : buttonTitleString}
        className="-left-40"
      />
      <FaIcon icon={faWandSparkles} />
    </button>
  )
}

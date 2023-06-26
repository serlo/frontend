import { Renderer } from '../box/renderer'
import { useInstanceData } from '@/contexts/instance-context'

interface SolutionRendererProps {
  prerequisite: JSX.Element | null
  strategy: JSX.Element | null
  steps: JSX.Element | null
}

export function SolutionRenderer({
  prerequisite,
  strategy,
  steps,
}: SolutionRendererProps) {
  const { strings } = useInstanceData()

  return (
    <>
      {renderPrerequisite()}
      {renderStrategy()}
      {steps}
    </>
  )

  function renderPrerequisite() {
    if (!prerequisite) return null
    return (
      <p className="serlo-p">
        {strings.content.exercises.prerequisite} {prerequisite}
      </p>
    )
  }

  function renderStrategy() {
    return (
      <Renderer boxType="approach" anchorId="strategy">
        <>{strategy}</>
      </Renderer>
    )
  }
}

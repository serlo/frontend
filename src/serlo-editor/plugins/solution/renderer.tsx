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
      {prerequisite ? (
        <p className="serlo-p">
          {strings.content.exercises.prerequisite} {prerequisite}
        </p>
      ) : null}
      <Renderer boxType="approach" anchorId="strategy">
        <>{strategy}</>
      </Renderer>
      {steps}
    </>
  )
}

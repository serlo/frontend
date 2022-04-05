import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export function LoadingError({ error }: { error: string }) {
  const { strings } = useInstanceData()
  // eslint-disable-next-line no-console
  console.log(error)
  return (
    <p className="serlo-p mt-12 text-brand">
      <FaIcon icon={faExclamationCircle} /> {strings.loading.unknownProblem}
    </p>
  )
}

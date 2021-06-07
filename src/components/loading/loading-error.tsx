import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useInstanceData } from '@/contexts/instance-context'

export function LoadingError({ error }: { error: object }) {
  const { strings } = useInstanceData()
  console.log(error)
  return (
    <p className="serlo-p mt-12 text-brand">
      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
      {strings.loading.unknownProblem}
    </p>
  )
}

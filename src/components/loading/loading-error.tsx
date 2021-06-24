import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useInstanceData } from '@/contexts/instance-context'

export function LoadingError({ error }: { error: string }) {
  const { strings } = useInstanceData()
  // eslint-disable-next-line no-console
  console.log(error)
  return (
    <p className="serlo-p mt-12 text-brand">
      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
      {strings.loading.unknownProblem}
    </p>
  )
}

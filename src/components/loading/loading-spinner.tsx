import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { useInstanceData } from '@/contexts/instance-context'

export interface LoadingSpinnerProps {
  text?: string
  noText?: boolean
}

export function LoadingSpinner({ text, noText }: LoadingSpinnerProps) {
  const { strings } = useInstanceData() // $center={noText}
  return (
    <div className={clsx('mt-12 text-brand', noText && 'text-center')}>
      <p className="serlo-p">
        <FontAwesomeIcon icon={faSpinner} spin size={noText ? '2x' : '1x'} />{' '}
        {(!noText && text) ?? strings.loading.isLoading}
      </p>
    </div>
  )
}

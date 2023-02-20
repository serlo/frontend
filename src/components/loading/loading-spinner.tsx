import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
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
        <FaIcon
          icon={faSpinner}
          className={clsx('animate-spin-slow', noText && 'h-8')}
        />{' '}
        {(!noText && text) ?? strings.loading.isLoading}
      </p>
    </div>
  )
}

import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { cn } from '@editor/utils/cn'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from './fa-icon'

export interface LoadingSpinnerProps {
  text?: string
  noText?: boolean
}

export function LoadingSpinner({ text, noText }: LoadingSpinnerProps) {
  const strings = useStaticStrings()
  return (
    <div className={cn('mt-12 text-brand', noText && 'text-center')}>
      <p className="serlo-p">
        <FaIcon
          icon={faSpinner}
          className={cn('animate-spin-slow', noText && 'h-8')}
        />{' '}
        {(!noText && text) ?? strings.misc.loading}
      </p>
    </div>
  )
}

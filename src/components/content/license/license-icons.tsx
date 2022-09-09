import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons/faCreativeCommons'
import { faCreativeCommonsBy } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsBy'
import { faCreativeCommonsSa } from '@fortawesome/free-brands-svg-icons/faCreativeCommonsSa'
import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'

interface LicenseIconsProps {
  title: string
  isDefault: boolean
}

export function LicenseIcons({ title, isDefault }: LicenseIconsProps) {
  const titleParts = title.split('CC')
  const licenseName = titleParts.length === 2 ? `CC${titleParts[1]}` : title
  const isCreativeCommons = licenseName.indexOf('CC') > -1

  if (isDefault) {
    return (
      <>
        {renderIcon({ icon: faCreativeCommons, className: 'h-8' })}{' '}
        {renderIcon({ icon: faCreativeCommonsBy, className: 'h-8' })}{' '}
        {renderIcon({ icon: faCreativeCommonsSa, className: 'h-8' })}
      </>
    )
  }

  if (isCreativeCommons) {
    return renderIcon({ icon: faCreativeCommons })
  }

  return (
    <span className="relative inline-block w-10 h-8">
      {renderIcon({ icon: faCreativeCommons, className: 'absolute' })}
      {renderIcon({
        icon: faSlash,
        className: '-scale-x-[0.6] absolute -left-[4px] scale-y-[0.6]',
      })}
    </span>
  )

  function renderIcon(props: { className?: string; icon: IconDefinition }) {
    return (
      <FaIcon
        className={clsx(
          'text-brand-lighter mb-0.25 mobile:text-[2rem] mobile:mt-0.25 mobile:mr-1',
          props.className
        )}
        icon={props.icon}
      />
    )
  }
}

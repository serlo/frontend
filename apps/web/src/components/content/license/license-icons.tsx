import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa,
} from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'

import { FaIcon } from '@/components/fa-icon'

interface LicenseIconsProps {
  title: string
  isDefault?: boolean
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
    <span className="relative inline-block h-8 w-10">
      {renderIcon({ icon: faCreativeCommons, className: 'absolute' })}
      {renderIcon({
        icon: faSlash,
        className: '-scale-x-[0.6] absolute left-4 scale-y-[0.6]',
      })}
    </span>
  )

  function renderIcon(props: { className?: string; icon: IconDefinition }) {
    return (
      <FaIcon
        className={cn(
          'mb-0.25 text-brand-400 mobile:mr-1 mobile:mt-0.25 mobile:text-[2rem]',
          props.className
        )}
        icon={props.icon}
      />
    )
  }
}

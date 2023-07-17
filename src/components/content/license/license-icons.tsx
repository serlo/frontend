import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsSa,
} from '@fortawesome/free-brands-svg-icons'
import { faSlash } from '@fortawesome/free-solid-svg-icons'
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
        <Icon icon={faCreativeCommons} className="h-8" />{' '}
        <Icon icon={faCreativeCommonsBy} className="h-8" />{' '}
        <Icon icon={faCreativeCommonsSa} className="h-8" />
      </>
    )
  }

  if (isCreativeCommons) {
    return <Icon icon={faCreativeCommons} />
  }

  return (
    <span className="relative inline-block h-8 w-10">
      <Icon icon={faCreativeCommons} className="absolute" />
      <Icon
        icon={faSlash}
        className="absolute -left-[4px] -scale-x-[0.6] scale-y-[0.6]"
      />
    </span>
  )
}

function Icon({
  className,
  icon,
}: {
  className?: string
  icon: IconDefinition
}) {
  return (
    <FaIcon
      className={clsx(
        'mb-0.25 text-brand-400 mobile:mr-1 mobile:mt-0.25 mobile:text-[2rem]',
        className
      )}
      icon={icon}
    />
  )
}

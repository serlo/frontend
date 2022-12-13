import clsx from 'clsx'

import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface LogoProps {
  foldOnMobile?: boolean
}

export function Logo({ foldOnMobile }: LogoProps) {
  const { strings } = useInstanceData()

  return (
    <Link href="/" path={['logo']} className="w-min sm:w-auto">
      <img
        className="inline"
        alt="Serlo"
        src="/_assets/img/serlo-logo.svg"
        width="120"
        height="80"
      />
      <span
        className={clsx(
          'font-handwritten text-xl align-text-top text-truegray-700',
          'inline-block mt-4 ml-2',
          foldOnMobile &&
            'ml-9 mt-2 block mobile:inline-block mobile:ml-9 mobile:whitespace-nowrap sm:mt-4 sm:ml-2'
        )}
      >
        {strings.header.slogan}
      </span>
    </Link>
  )
}

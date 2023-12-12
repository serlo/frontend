import { cn } from '@serlo/tailwind/helper/cn'

import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface LogoProps {
  foldOnMobile?: boolean
}

export function Logo({ foldOnMobile }: LogoProps) {
  const { strings } = useInstanceData()

  return (
    <Link href="/" className="w-min sm:w-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="inline"
        alt="Serlo"
        src="/_assets/img/serlo-logo.svg"
        width="120"
        height="80"
      />
      <span
        className={cn(
          'align-text-top font-handwritten text-xl text-almost-black',
          foldOnMobile
            ? 'ml-9 mt-2 block mobileExt:ml-9 mobileExt:inline-block mobileExt:whitespace-nowrap sm:ml-2 sm:mt-4'
            : 'absolute ml-2 mt-8 inline-block'
        )}
      >
        {strings.header.slogan}
      </span>
    </Link>
  )
}

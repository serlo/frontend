import { Link } from '@/components/content/link'

export interface LogoProps {
  foldOnMobile?: boolean
}

// Chancenwerk-Branding: neues Logo, Slogan "Die freie Lernplattform" entfällt
export function Logo(_props: LogoProps) {
  return (
    <Link href="/" className="inline-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="inline h-auto w-[180px] mobileExt:w-[226px] md:w-[280px]"
        alt="Serlo – operated by Chancenwerk"
        src="/_assets/img/serlo-chancenwerk-logo.png"
        width="226"
        height="50"
      />
    </Link>
  )
}

import clsx from 'clsx'

const partners = [
  {
    name: 'Bundesministerium für Bildung und Forschung',
    logo: '/_assets/img/landing/partners/logo_bmbf.svg',
    padding: 0,
  },
  {
    name: 'Ludwig-Maximilians-Universität München',
    logo: '/_assets/img/landing/partners/logo_lmu.svg',
    padding: 8,
  },
  {
    name: 'Wikimedia Deutschland',
    logo: '/_assets/img/landing/partners/logo_wikimedia.svg',
    padding: 0,
  },
  {
    name: 'Beisheim Stiftung',
    logo: '/_assets/img/landing/partners/logo_beisheimstiftung.svg',
    padding: 10,
  },
  {
    name: 'Europäische Union',
    logo: '/_assets/img/landing/partners/logo_eu.svg',
    padding: 0,
  },
  {
    name: 'Deloitte',
    logo: '/_assets/img/landing/partners/logo_deloitte.svg',
    padding: 28,
  },
  {
    name: 'Technische Universität München',
    logo: '/_assets/img/landing/partners/logo_tum.svg',
    padding: 15,
  },
  {
    name: 'Ashoka Deutschland',
    logo: '/_assets/img/landing/partners/logo_ashoka.svg',
    padding: 6,
  },
]

export function PartnerList({ inContent }: { inContent?: boolean }) {
  return (
    <div
      className={clsx(
        'mt-auto pb-7 flex flex-wrap justify-evenly mx-side',
        'sm:justify-center max-w-5xl sm:mx-auto',
        inContent && 'sm:ml-0 sm:!justify-start',
        'text-gray-800'
      )}
    >
      {partners.map(renderPartner)}
    </div>
  )

  function renderPartner({
    name,
    logo,
    padding,
  }: {
    name: string
    logo: string
    padding: number
  }) {
    return (
      <img
        key={name}
        className={clsx(
          'max-h-[4.5rem] sm:max-h-[5.3rem] md:max-h-24 max-w-[20rem] px-8 mb-16 sm:px-8',
          inContent && '!mb-8 sm:pl-0 sm:pr-12'
        )}
        style={{
          opacity: inContent ? '1' : '0.6',
          filter: inContent ? undefined : 'grayscale(1)',
          mixBlendMode: inContent ? undefined : 'multiply',
          paddingTop: `${padding}px`,
          paddingBottom: `${padding}px`,
        }}
        src={logo}
        alt={`Logo von ${name}`}
        title={name}
      />
    )
  }
}

import clsx from 'clsx'

const partners = [
  {
    name: 'Beisheim Stiftung',
    logo: '/_assets/img/landing/partners/logo_beisheimstiftung.svg',
    padding: 8,
  },
  {
    name: 'Ludwig-Maximilians-Universität München',
    logo: '/_assets/img/landing/partners/logo_lmu.svg',
    padding: 8,
  },
  {
    name: 'Wikimedia Deutschland',
    logo: '/_assets/img/landing/partners/logo_wikimedia.svg',
    padding: 8,
  },
  {
    name: 'Bundesministerium für Bildung und Forschung',
    logo: '/_assets/img/landing/partners/logo_bmbf.svg',
    padding: 0,
  },
  {
    name: 'Europäische Kommission',
    logo: '/_assets/img/landing/partners/logo_eu.svg',
    padding: 8,
  },
  {
    name: 'Deloitte',
    logo: '/_assets/img/landing/partners/logo_deloitte.svg',
    padding: 22,
  },
  {
    name: 'Hasso-Plattner-Institut',
    logo: '/_assets/img/landing/partners/logo_hpi.svg',
    padding: 8,
  },
  {
    name: 'Ashoka Deutschland',
    logo: '/_assets/img/landing/partners/logo_ashoka.svg',
    padding: 6,
  },
]

export function PartnerListNew() {
  return (
    <div
      className={clsx(
        'mt-auto pb-7 flex flex-wrap justify-evenly mx-side',
        'sm:justify-center max-w-5xl sm:mx-auto',
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
        className="max-h-20 max-w-[19rem] px-8 mb-16 sm:px-8"
        style={{
          opacity: '0.6',
          filter: 'grayscale(1)',
          mixBlendMode: 'multiply',
          paddingTop: `${padding}px`,
          paddingBottom: `${padding}px`,
        }}
        src={logo}
        alt={`Logo of ${name}`}
        title={name}
      />
    )
  }
}

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
    padding: 22,
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
        'mx-side mt-auto flex max-w-5xl  flex-wrap pb-7 text-gray-800 sm:mx-auto',
        inContent ? 'justify-start' : 'justify-evenly sm:justify-center'
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={name}
        className={clsx(
          `
            max-h-[4.5rem] max-w-[20rem] px-8 opacity-80
            sm:max-h-[5.3rem] sm:px-8 md:max-h-24
          `,
          inContent ? 'mb-8 sm:pl-4' : 'mb-16'
        )}
        style={{
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

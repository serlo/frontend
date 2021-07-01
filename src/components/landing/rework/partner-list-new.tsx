import clsx from 'clsx'

const partners = [
  {
    name: 'Beisheim Stiftung',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-beisheim.png',
  },
  {
    name: 'Ludwig-Maximilians-Universität München',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-lmu.svg',
  },
  {
    name: 'Technische Universität München',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-tum.svg',
  },
  {
    name: 'Wikimedia Deutschland',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-wikimedia.svg',
  },
  {
    name: 'Europäische Kommission',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-eu.svg',
  },
  {
    name: 'Ashoka Deutschland',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-ashoka.png',
  },
  {
    name: 'Hasso-Plattner-Institut',
    logo: 'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-hpi.png',
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

  function renderPartner({ name, logo }: { name: string; logo: string }) {
    return (
      <img
        className={clsx('max-h-12 px-8 mb-16 sm:px-16')}
        style={{ filter: 'invert(1)', opacity: '0.45' }}
        src={logo}
        alt={name}
        title={name}
      />
    )
  }
}

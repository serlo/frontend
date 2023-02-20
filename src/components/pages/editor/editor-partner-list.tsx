import clsx from 'clsx'

const partners = [
  {
    name: 'Bundesministerium für Bildung und Forschung',
    logo: '/_assets/img/landing/partners/logo_bmbf.svg',
    padding: 2,
  },
  {
    name: 'Stifterverband für die Deutsche Wissenschaft e.V.',
    logo: '/_assets/img/editor/partners/logo_stifterverband.svg',
    padding: 10,
  },
  {
    name: 'Wikimedia Deutschland e.V',
    logo: '/_assets/img/editor/partners/logo_wikimedia-de.svg',
    padding: 9,
  },

  {
    name: 'Education Innovation Lab gUG',
    logo: '/_assets/img/editor/partners/logo_eil.svg',
    padding: 21,
  },
  {
    name: 'edu-sharing.net e.V.',
    logo: '/_assets/img/editor/partners/logo_edusharing.svg',
    padding: 20,
  },
  {
    name: 'itslearning GmbH',
    logo: '/_assets/img/editor/partners/logo_itslearning.svg',
    padding: 26,
  },
  {
    name: 'Dataport',
    logo: '/_assets/img/editor/partners/logo_dataport.svg',
    padding: 23,
  },
]

export function EditorPartnerList() {
  return (
    <div
      className={clsx(
        'mt-auto pb-7 flex flex-wrap justify-evenly',
        'sm:justify-center',
        'text-gray-800'
      )}
    >
      {partners.map(renderPartner)}
    </div>
  )

  function renderPartner({ name, logo, padding }: typeof partners[0]) {
    return (
      <img
        key={name}
        className="max-h-[4.5rem] sm:max-h-[5.3rem] md:max-h-24 max-w-[20rem] px-7 mb-12"
        style={{
          // opacity: '0.6',
          // filter: 'grayscale(1)',
          // mixBlendMode: 'multiply',
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

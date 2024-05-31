import { cn } from '@/helper/cn'

export const partners = [
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
    name: 'itslearning GmbH',
    logo: '/_assets/img/editor/partners/logo_itslearning.svg',
    padding: 26,
  },
  {
    name: 'edu-sharing.net e.V.',
    logo: '/_assets/img/editor/partners/logo_edusharing.svg',
    padding: 20,
  },
  {
    name: 'Dataport',
    logo: '/_assets/img/editor/partners/logo_dataport.svg',
    padding: 23,
  },
  {
    name: 'FWU Medieninstitut der Länder',
    logo: '/_assets/img/editor/partners/logo_fwu.svg',
    padding: 15,
  },
]

export function EditorPartnerList() {
  return (
    <div
      className={cn(`
        mt-auto flex flex-wrap justify-evenly pb-7
        text-gray-800 sm:justify-center
      `)}
    >
      {partners.map(renderPartner)}
    </div>
  )

  function renderPartner({ name, logo, padding }: (typeof partners)[0]) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={name}
        className="mb-12 max-h-[4.5rem] max-w-[20rem] px-7 sm:max-h-[5.3rem] md:max-h-24"
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

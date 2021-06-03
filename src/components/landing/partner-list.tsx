import clsx from 'clsx'

interface PartnerListProps {
  higher?: boolean
}

export function PartnerList({ higher }: PartnerListProps) {
  return (
    <div className="mt-auto mb-7 w-full">
      <h2 className="text-lg mb-5">Partner und Förderer</h2>
      <div className="text-white flex justify-between flex-wrap">
        {renderLogo(
          'Beisheim Stiftung',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-beisheim.png'
        )}
        {renderLogo(
          'Ludwig-Maximilians-Universität München',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-lmu.svg'
        )}
        {renderLogo(
          'Technische Universität München',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-tum.svg'
        )}
        {renderLogo(
          'Wikimedia Deutschland',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-wikimedia.svg'
        )}
        {renderLogo(
          'Europäische Kommission',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-eu.svg'
        )}
        {renderLogo(
          'Ashoka Deutschland',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-ashoka.png'
        )}
        {renderLogo(
          'Hasso-Plattner-Institut',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-hpi.png'
        )}
      </div>
    </div>
  )

  function renderLogo(title: string, url: string) {
    return (
      <img
        className={clsx('max-h-10', higher && ' lg:max-h-16')}
        src={url}
        alt={title}
        title={title}
      />
    )
  }
}

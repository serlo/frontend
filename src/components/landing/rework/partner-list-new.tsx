import clsx from 'clsx'

interface PartnerListProps {
  higher?: boolean
}

export function PartnerListNew({ higher }: PartnerListProps) {
  return (
    <div className="mt-auto mb-7">
      <div className="text-gray-800 flex flex-wrap justify-center max-w-5xl mx-auto">
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
        className={clsx('max-h-12 px-16 mb-16', higher && ' lg:max-h-16')}
        style={{ filter: 'invert(1)', opacity: '0.45' }}
        src={url}
        alt={title}
        title={title}
      />
    )
  }
}
